const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const setPointerPosition = (x, y) => {
  root.style.setProperty("--pointer-x", `${x}%`);
  root.style.setProperty("--pointer-y", `${y}%`);
};

setPointerPosition(50, 50);

if (!reduceMotion) {
  window.addEventListener("pointermove", (event) => {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;

    setPointerPosition(x, y);

    document.querySelectorAll(".parallax-layer").forEach((layer, index) => {
      const depth = (index + 1) * 8;
      const offsetX = ((x - 50) / 50) * depth;
      const offsetY = ((y - 50) / 50) * depth;

      if (layer.classList.contains("stage-ring")) {
        return;
      }

      layer.style.transform = `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), 80px)`;
    });
  });
}

const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  if (reduceMotion) {
    return;
  }

  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 12;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

const revealItems = document.querySelectorAll(".reveal");

if (reduceMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const canvas = document.querySelector(".particle-canvas");
const context = canvas ? canvas.getContext("2d") : null;

if (canvas && context && !reduceMotion) {
  const particles = [];
  let width = 0;
  let height = 0;
  let animationFrame = 0;

  const resizeCanvas = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.8);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const createParticles = () => {
    particles.length = 0;
    const total = Math.max(40, Math.min(78, Math.floor(width / 24)));

    for (let index = 0; index < total; index += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        size: Math.random() * 1.8 + 0.5,
        color:
          Math.random() > 0.45
            ? "rgba(245, 183, 44, 0.62)"
            : "rgba(151, 193, 255, 0.58)",
      });
    }
  };

  const drawParticles = () => {
    context.clearRect(0, 0, width, height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < -20) particle.x = width + 20;
      if (particle.x > width + 20) particle.x = -20;
      if (particle.y < -20) particle.y = height + 20;
      if (particle.y > height + 20) particle.y = -20;

      context.beginPath();
      context.fillStyle = particle.color;
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fill();

      for (let next = index + 1; next < particles.length; next += 1) {
        const peer = particles[next];
        const dx = particle.x - peer.x;
        const dy = particle.y - peer.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
          context.beginPath();
          context.strokeStyle = `rgba(245, 196, 90, ${0.085 - distance / 2200})`;
          context.lineWidth = 1;
          context.moveTo(particle.x, particle.y);
          context.lineTo(peer.x, peer.y);
          context.stroke();
        }
      }
    });

    animationFrame = window.requestAnimationFrame(drawParticles);
  };

  resizeCanvas();
  createParticles();
  drawParticles();

  window.addEventListener("resize", () => {
    window.cancelAnimationFrame(animationFrame);
    resizeCanvas();
    createParticles();
    drawParticles();
  });
} else if (canvas) {
  canvas.remove();
}
