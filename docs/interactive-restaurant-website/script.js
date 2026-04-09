const menuItems = [
  {
    category: "starters",
    name: "Burrata Ember Salad",
    price: "$18",
    description:
      "Heirloom tomato, grilled peach, basil oil, and toasted almond for a bright, creamy opening course.",
    tags: ["Fresh", "Seasonal", "Chef favorite"],
    label: "Starter",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "starters",
    name: "Charred Prawn Skewers",
    price: "$22",
    description:
      "Wood-fired prawns with smoked chili butter and a citrus finish that cuts through the richness.",
    tags: ["Fire-grilled", "Citrus", "Shareable"],
    label: "Starter",
    image:
      "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "mains",
    name: "Coal-Fired Ribeye",
    price: "$42",
    description:
      "Prime cut ribeye, truffle jus, confit shallots, and roasted garlic puree for the signature house plate.",
    tags: ["Signature", "Smoked butter", "Best seller"],
    label: "Main",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "mains",
    name: "Saffron Sea Bass",
    price: "$36",
    description:
      "Butter-poached sea bass over saffron cream with fennel and a delicate citrus glaze.",
    tags: ["Refined", "Seafood", "Silky"],
    label: "Main",
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "desserts",
    name: "Midnight Chocolate Dome",
    price: "$16",
    description:
      "Dark chocolate shell, warm ganache center, toasted hazelnut crunch, and gold-leaf finish.",
    tags: ["Decadent", "Tableside finish", "Rich"],
    label: "Dessert",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "desserts",
    name: "Vanilla Citrus Pavlova",
    price: "$14",
    description:
      "Crisp meringue, whipped vanilla cream, mandarin curd, and fresh berries with floral perfume.",
    tags: ["Light", "Elegant", "Seasonal"],
    label: "Dessert",
    image:
      "https://images.unsplash.com/photo-1464306076886-da185f6a9d05?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "drinks",
    name: "Smoked Cherry Old Fashioned",
    price: "$15",
    description:
      "Bourbon, black cherry, smoked sugar, and orange zest served under a glass cloche.",
    tags: ["Signature bar", "Smoked", "Bold"],
    label: "Drink",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "drinks",
    name: "Golden Hour Spritz",
    price: "$13",
    description:
      "Sparkling citrus aperitif with herbal bitters, prosecco lift, and fresh rosemary aroma.",
    tags: ["Refreshing", "Aperitif", "Bright"],
    label: "Drink",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80",
  },
];

const gallerySlides = [
  {
    title: "Chef's Table Energy",
    description:
      "Close-up visuals of fire, plating, and motion give the brand an appetizing sense of immediacy.",
    tag: "Kitchen theatre",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Mood-Lit Dining Room",
    description:
      "Interior photography balances warmth and elegance, helping guests picture the full evening before they book.",
    tag: "Atmosphere first",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Desserts With Drama",
    description:
      "Layered overlays, rounded surfaces, and tight spacing keep premium food imagery at the center of the experience.",
    tag: "Visual appetite",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Bar & Lounge Glow",
    description:
      "Nighttime cocktail moments add depth to the story and widen the brand beyond dinner alone.",
    tag: "After-dark experience",
    image:
      "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&w=1600&q=80",
  },
];

const menuGrid = document.getElementById("menu-grid");
const menuTabs = document.querySelectorAll(".menu-tab");
const navLinks = document.querySelectorAll(".nav-links a");
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-links");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("[data-section]");
const parallaxItems = document.querySelectorAll("[data-parallax]");
const reservationForm = document.getElementById("reservation-form");
const formFeedback = document.getElementById("form-feedback");
const galleryTrack = document.getElementById("gallery-track");
const galleryDots = document.getElementById("gallery-dots");
const galleryPrev = document.getElementById("gallery-prev");
const galleryNext = document.getElementById("gallery-next");
const dateInput = reservationForm?.querySelector('input[name="date"]');

let activeCategory = "all";
let currentSlide = 0;
let galleryInterval;

function renderMenu(category = "all") {
  if (!menuGrid) return;

  const filtered =
    category === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === category);

  menuGrid.innerHTML = filtered
    .map(
      (item) => `
        <article class="menu-card reveal is-visible">
          <figure class="menu-card-figure">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
            <span class="menu-card-tag">${item.label}</span>
          </figure>
          <div class="menu-card-body">
            <div class="menu-card-header">
              <div>
                <h3>${item.name}</h3>
              </div>
              <strong>${item.price}</strong>
            </div>
            <p>${item.description}</p>
            <div class="menu-card-tags">
              ${item.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
            <span class="menu-card-cta">Add to craving list &#8594;</span>
          </div>
        </article>
      `,
    )
    .join("");
}

function setActiveTab(targetCategory) {
  activeCategory = targetCategory;

  menuTabs.forEach((tab) => {
    const isActive = tab.dataset.category === targetCategory;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-pressed", String(isActive));
  });

  renderMenu(targetCategory);
}

menuTabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveTab(tab.dataset.category));
});

function renderGallery() {
  if (!galleryTrack || !galleryDots) return;

  galleryTrack.innerHTML = gallerySlides
    .map(
      (slide) => `
        <article class="gallery-slide">
          <img src="${slide.image}" alt="${slide.title}" loading="lazy" />
          <div class="gallery-caption">
            <div>
              <h3>${slide.title}</h3>
              <p>${slide.description}</p>
            </div>
            <span>${slide.tag}</span>
          </div>
        </article>
      `,
    )
    .join("");

  galleryDots.innerHTML = gallerySlides
    .map(
      (_, index) => `
        <button
          type="button"
          aria-label="View gallery slide ${index + 1}"
          data-slide-index="${index}"
        ></button>
      `,
    )
    .join("");

  galleryDots.querySelectorAll("button").forEach((dot) => {
    dot.addEventListener("click", () => {
      updateGallery(Number(dot.dataset.slideIndex));
      restartGalleryInterval();
    });
  });

  updateGallery(0);
}

function updateGallery(index) {
  if (!galleryTrack || !galleryDots) return;

  currentSlide = (index + gallerySlides.length) % gallerySlides.length;
  galleryTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

  galleryDots.querySelectorAll("button").forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === currentSlide);
  });
}

function restartGalleryInterval() {
  window.clearInterval(galleryInterval);
  galleryInterval = window.setInterval(() => {
    updateGallery(currentSlide + 1);
  }, 6000);
}

galleryPrev?.addEventListener("click", () => {
  updateGallery(currentSlide - 1);
  restartGalleryInterval();
});

galleryNext?.addEventListener("click", () => {
  updateGallery(currentSlide + 1);
  restartGalleryInterval();
});

navToggle?.addEventListener("click", () => {
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isExpanded));
  navMenu?.classList.toggle("open", !isExpanded);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle?.setAttribute("aria-expanded", "false");
    navMenu?.classList.remove("open");
  });
});

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
    rootMargin: "0px 0px -6% 0px",
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeId = entry.target.id;
      navLinks.forEach((link) => {
        const matches = link.getAttribute("href") === `#${activeId}`;
        link.classList.toggle("is-active", matches);
      });
    });
  },
  {
    threshold: 0.35,
    rootMargin: "-20% 0px -45% 0px",
  },
);

sections.forEach((section) => sectionObserver.observe(section));

function updateChrome() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 24);
}

function updateParallax() {
  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallax || 0);
    const rect = item.getBoundingClientRect();
    const distanceFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
    const translateY = Math.max(Math.min(distanceFromCenter * -speed, 40), -40);
    item.style.transform = `translate3d(0, ${translateY}px, 0)`;
  });
}

function formatReservationDate(rawDate) {
  if (!rawDate) return "your selected date";

  const parsed = new Date(`${rawDate}T00:00:00`);
  return Number.isNaN(parsed.getTime())
    ? rawDate
    : parsed.toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
}

reservationForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(reservationForm);
  const firstName = (formData.get("name") || "Guest").toString().trim().split(" ")[0];
  const guests = formData.get("guests");
  const date = formatReservationDate((formData.get("date") || "").toString());
  const time = (formData.get("time") || "your chosen time").toString();

  formFeedback.hidden = false;
  formFeedback.textContent = `${firstName}, your reservation request for ${guests} on ${date} at ${time} is ready for host confirmation.`;

  reservationForm.reset();
});

document.addEventListener("scroll", () => {
  updateChrome();
  updateParallax();
});

window.addEventListener("resize", updateParallax);

if (dateInput) {
  dateInput.min = new Date().toISOString().split("T")[0];
}

setActiveTab(activeCategory);
renderGallery();
restartGalleryInterval();
updateChrome();
updateParallax();
