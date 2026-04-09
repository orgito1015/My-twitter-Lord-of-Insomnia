/* rain-animation.js — shared animated rain for all pages */
(function () {
  const canvas = document.getElementById('rain-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let drops  = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function init() {
    drops = [];
    const count = Math.floor(canvas.width / 6);
    for (let i = 0; i < count; i++) {
      drops.push({
        x:       Math.random() * canvas.width,
        y:       Math.random() * canvas.height,
        len:     Math.random() * 18 + 6,
        speed:   Math.random() * 2.5 + 1.2,
        opacity: Math.random() * 0.4 + 0.05,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drops.forEach(d => {
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - 1, d.y + d.len);
      ctx.strokeStyle = `rgba(120, 160, 220, ${d.opacity})`;
      ctx.lineWidth   = 0.8;
      ctx.stroke();
      d.y += d.speed;
      if (d.y > canvas.height) {
        d.y = -d.len;
        d.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); init(); });
  resize();
  init();
  draw();
})();
