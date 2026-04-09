const header = document.querySelector(".site-header");
const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a[href^='#']");
const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-counter]");

const galleryFrame = document.querySelector(".gallery-frame");
const galleryTrack = document.querySelector("[data-gallery-track]");
const gallerySlides = Array.from(document.querySelectorAll(".gallery-slide"));
const galleryDots = Array.from(
  document.querySelectorAll("[data-gallery-dots] .thumb-dot")
);
const galleryPrev = document.querySelector("[data-gallery-prev]");
const galleryNext = document.querySelector("[data-gallery-next]");

const testimonialSlides = Array.from(
  document.querySelectorAll("[data-testimonial-slider] .testimonial-card")
);
const testimonialSlider = document.querySelector("[data-testimonial-slider]");
const testimonialDots = Array.from(
  document.querySelectorAll("[data-testimonial-dots] .thumb-dot")
);

let galleryIndex = 0;
let testimonialIndex = 0;
let testimonialTimer;
const compactNavBreakpoint = 1024;

function setHeaderState() {
  if (window.scrollY > 18) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
}

function isCompactNav() {
  return window.innerWidth <= compactNavBreakpoint;
}

function syncNavState(nextOpen = false) {
  if (!navMenu || !navToggle) {
    return;
  }

  const shouldOpen = isCompactNav() && nextOpen;
  navMenu.classList.toggle("is-open", shouldOpen);
  document.body.classList.toggle("menu-open", shouldOpen);
  navToggle.setAttribute("aria-expanded", String(shouldOpen));
  navToggle.setAttribute(
    "aria-label",
    shouldOpen ? "Close navigation" : "Toggle navigation"
  );
}

function toggleMenu(forceClose = false) {
  if (!navMenu || !navToggle) {
    return;
  }

  syncNavState(forceClose ? false : !navMenu.classList.contains("is-open"));
}

function animateCounter(counter) {
  const target = Number(counter.dataset.counter);
  const suffix = target === 96 ? "%" : target === 1800 ? "+" : "+";
  const duration = 1600;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
    counter.textContent = `${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

function updateGallery(index) {
  if (!galleryTrack || gallerySlides.length === 0) {
    return;
  }

  galleryIndex = (index + gallerySlides.length) % gallerySlides.length;
  galleryTrack.style.transform = `translateX(-${galleryIndex * 100}%)`;

  gallerySlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === galleryIndex);
  });

  galleryDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === galleryIndex);
  });
}

function updateTestimonials(index) {
  if (testimonialSlides.length === 0) {
    return;
  }

  testimonialIndex =
    (index + testimonialSlides.length) % testimonialSlides.length;

  testimonialSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === testimonialIndex);
  });

  testimonialDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === testimonialIndex);
  });
}

function startTestimonialAutoPlay() {
  clearInterval(testimonialTimer);
  testimonialTimer = window.setInterval(() => {
    updateTestimonials(testimonialIndex + 1);
  }, 4500);
}

function enableSwipe(container, onPrev, onNext) {
  if (!container) {
    return;
  }

  let startX = 0;
  let startY = 0;
  let isTracking = false;

  container.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    startX = event.clientX;
    startY = event.clientY;
    isTracking = true;
  });

  container.addEventListener("pointerup", (event) => {
    if (!isTracking) {
      return;
    }

    isTracking = false;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      onNext();
    } else {
      onPrev();
    }
  });

  container.addEventListener("pointercancel", () => {
    isTracking = false;
  });
}

setHeaderState();
syncNavState(false);
updateGallery(0);
updateTestimonials(0);
startTestimonialAutoPlay();

window.addEventListener("scroll", setHeaderState);
window.addEventListener("resize", () => syncNavState(false));

if (navToggle) {
  navToggle.addEventListener("click", () => toggleMenu());
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => toggleMenu(true));
});

document.addEventListener("click", (event) => {
  if (
    !isCompactNav() ||
    !navMenu?.classList.contains("is-open") ||
    navbar?.contains(event.target)
  ) {
    return;
  }

  toggleMenu(true);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");

      if (entry.target.hasAttribute("data-counter")) {
        animateCounter(entry.target);
      }

      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.22,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));
counters.forEach((counter) => revealObserver.observe(counter));

galleryPrev?.addEventListener("click", () => updateGallery(galleryIndex - 1));
galleryNext?.addEventListener("click", () => updateGallery(galleryIndex + 1));

galleryDots.forEach((dot, index) => {
  dot.addEventListener("click", () => updateGallery(index));
});

testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    updateTestimonials(index);
    startTestimonialAutoPlay();
  });
});

enableSwipe(
  galleryFrame,
  () => updateGallery(galleryIndex - 1),
  () => updateGallery(galleryIndex + 1)
);

enableSwipe(
  testimonialSlider,
  () => {
    updateTestimonials(testimonialIndex - 1);
    startTestimonialAutoPlay();
  },
  () => {
    updateTestimonials(testimonialIndex + 1);
    startTestimonialAutoPlay();
  }
);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    toggleMenu(true);
  }
});

document.querySelector(".form-card")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector("button");

  if (!button) {
    return;
  }

  const originalText = button.textContent;
  button.textContent = "Inquiry Sent";
  button.disabled = true;

  window.setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    form.reset();
  }, 1800);
});
