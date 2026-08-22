// ============================================================================
//  mesh.js — the animated mesh gradient.
//
//  The look we're after is the one canvas-rendered gradients have: a single
//  colour field that flows and folds into itself, not a stack of blurred
//  blobs sliding past each other. CSS can't do that, so this renders it.
//
//  How it works: for every pixel, the position is first pushed around by a
//  couple of sine waves (a domain warp — this is what makes the colour
//  boundaries bend and curl instead of staying round), then the colour is an
//  inverse-distance blend of five control points that are themselves drifting
//  on slow lissajous paths. That is a mesh gradient, and it is cheap because
//  it runs on a 64x64 buffer that CSS then scales up and softens.
//
//  Colours are read from the --g-base / --g1..--g4 custom properties already
//  on the element, so the palette lives in styles.css and nothing here needs
//  to know about it.
//
//  Motion follows the same rule as before: cards hold still and only flow
//  while hovered; anything marked .gcard-live flows continuously, and pauses
//  itself when scrolled out of view.
// ============================================================================

window.MeshGradient = (() => {
  const SIZE = 64; // buffer is 64x64; CSS scales and blurs it up
  const POINTS = 5;
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const parseColor = (str) => {
    const m = String(str).trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (m) {
      const h = m[1].length === 3 ? m[1].replace(/./g, (c) => c + c) : m[1];
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    }
    const rgb = String(str).match(/(\d+(?:\.\d+)?)/g);
    return rgb && rgb.length >= 3 ? [+rgb[0], +rgb[1], +rgb[2]] : [200, 200, 200];
  };

  const palette = (el) => {
    const cs = getComputedStyle(el);
    return ['--g1', '--g2', '--g3', '--g4', '--g-base']
      .map((v) => cs.getPropertyValue(v))
      .filter((v) => v && v.trim())
      .map(parseColor);
  };

  class Mesh {
    constructor(el, seed) {
      this.el = el;
      this.t = seed * 37.6; // a different phase per card
      this.running = false;
      this.frame = 0;

      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = SIZE;
      canvas.className = 'mesh-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      el.insertBefore(canvas, el.firstChild);

      this.ctx = canvas.getContext('2d');
      this.image = this.ctx.createImageData(SIZE, SIZE);
      this.colors = palette(el);

      // control points: a base position and a slow elliptical drift each
      this.pts = [];
      for (let i = 0; i < POINTS; i++) {
        const a = (i / POINTS) * Math.PI * 2 + seed;
        this.pts.push({
          x: 0.5 + Math.cos(a) * 0.34,
          y: 0.5 + Math.sin(a) * 0.34,
          ax: 0.16 + (i % 3) * 0.05,
          ay: 0.14 + (i % 2) * 0.06,
          sx: 0.17 + i * 0.031,
          sy: 0.13 + i * 0.027,
          ph: a,
        });
      }

      this.draw();
      el.classList.add('has-mesh');
    }

    draw() {
      const { image, colors, pts, t } = this;
      const data = image.data;
      const n = colors.length;
      if (!n) return;

      // where each control point is right now
      const px = [], py = [];
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        px.push(p.x + Math.cos(t * p.sx + p.ph) * p.ax);
        py.push(p.y + Math.sin(t * p.sy + p.ph * 1.3) * p.ay);
      }

      let o = 0;
      for (let y = 0; y < SIZE; y++) {
        const v = y / SIZE;
        for (let x = 0; x < SIZE; x++) {
          const u = x / SIZE;

          // domain warp: this is what bends the colour boundaries
          const wu = u + 0.085 * Math.sin(v * 5.4 + t * 0.31) + 0.045 * Math.cos(v * 9.1 - t * 0.19);
          const wv = v + 0.085 * Math.cos(u * 4.8 - t * 0.27) + 0.045 * Math.sin(u * 8.3 + t * 0.23);

          let r = 0, g = 0, b = 0, wsum = 0;
          for (let i = 0; i < px.length; i++) {
            const dx = wu - px[i];
            const dy = wv - py[i];
            const d2 = dx * dx + dy * dy + 0.014;
            const w = 1 / (d2 * d2); // 1/d^4 keeps the cells distinct
            const c = colors[i % n];
            r += c[0] * w;
            g += c[1] * w;
            b += c[2] * w;
            wsum += w;
          }

          data[o++] = r / wsum;
          data[o++] = g / wsum;
          data[o++] = b / wsum;
          data[o++] = 255;
        }
      }
      this.ctx.putImageData(image, 0, 0);
    }

    tick = () => {
      if (!this.running) return;
      if (!this.el.isConnected) return this.stop(); // view was re-rendered
      this.t += 0.016;
      this.draw();
      this.frame = requestAnimationFrame(this.tick);
    };

    start() {
      if (this.running || reduceMotion()) return;
      this.running = true;
      this.frame = requestAnimationFrame(this.tick);
    }

    stop() {
      this.running = false;
      cancelAnimationFrame(this.frame);
    }
  }

  // the ancestor whose hover should bring the card to life
  const HOVER_HOSTS = '.pcard-wrap, .acard, .show-card, .news-item, .nav-panel-item';

  let seedCounter = 0;
  let io = null;

  const observer = () => {
    if (io) return io;
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const mesh = e.target._mesh;
          if (!mesh) return;
          e.isIntersecting ? mesh.start() : mesh.stop();
        });
      },
      { rootMargin: '120px' }
    );
    return io;
  };

  const scan = (root = document) => {
    root.querySelectorAll('.gcard:not(.has-mesh)').forEach((el) => {
      let mesh;
      try {
        mesh = new Mesh(el, seedCounter++);
      } catch (err) {
        return; // canvas unavailable: the CSS gradient underneath still shows
      }
      el._mesh = mesh;

      if (el.classList.contains('gcard-live')) {
        // always flowing, but only while it is on screen
        observer().observe(el);
        mesh.start();
        return;
      }

      const host = el.closest(HOVER_HOSTS) || el;
      host.addEventListener('mouseenter', () => mesh.start());
      host.addEventListener('mouseleave', () => mesh.stop());
    });
  };

  return { scan };
})();
