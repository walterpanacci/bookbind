const heroTextHeader = document.querySelector(".hero-text-header");
const heroText = document.querySelector(".hero-text");
const heroRow1 = document.querySelector(".hero-header-row-1");
const heroRow2 = document.querySelector(".hero-header-row-2");
const box2 = document.querySelector(".box--2");

const howToImg1 = document.querySelector(".how-it-works-image--1");
const howToImg2 = document.querySelector(".how-it-works-image--2");
const howToImg3 = document.querySelector(".how-it-works-image--3");

const btnLeft = document.querySelector(".btn--left");
const btnRight = document.querySelector(".btn--right");
const dots = document.querySelectorAll(".dot");
const slides = document.querySelectorAll(".slide");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModal = document.querySelector(".close-modal");

const form = document.querySelector(".cta-form");

const year = document.querySelector(".year");

const aboutSite = document.querySelector(".about-site");
const modalFooter = document.querySelector(".modal--footer");
const closeFooter = document.querySelector(".close--footer");
const overlayFooter = document.querySelector(".overlay--footer");

const allLinks = document.querySelectorAll("a");

let currentSlide = 0;
/* Sliding text in the hero section */

function heroTextAppear() {
  heroTextHeader.style.transform = "translateX(0)";
  heroText.style.transform = "translateX(0)";
}
heroTextAppear();

/* Sliding text in the how-it-works section*/

const observer1 = new IntersectionObserver(
  function (entries, observer) {
    const entry = entries[0];
    if (!entry.isIntersecting) return;
    else howToImg1.style.transform = "scale(1)";
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.3,
  }
);

const observer2 = new IntersectionObserver(
  function (entries, observer) {
    const entry = entries[0];
    if (!entry.isIntersecting) return;
    else howToImg2.style.transform = "translateX(0)";
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.3,
  }
);

const observer3 = new IntersectionObserver(
  function (entries, observer) {
    const entry = entries[0];
    if (!entry.isIntersecting) return;
    else howToImg3.style.transform = "scale(1)";
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.3,
  }
);

observer1.observe(howToImg1);
observer2.observe(box2);
observer3.observe(howToImg3);

/* Slider */

console.log(slides);

const goToSlide = function (n) {
  slides.forEach(
    (sl, i) => (sl.style.transform = `translateX(${100 * (i - n)}%)`)
  );
  dots.forEach((dt) => dt.classList.remove("dot--active"));
  document
    .querySelector(`.dot[data-slide='${currentSlide}']`)
    .classList.add("dot--active");
};

const prevSlide = function () {
  currentSlide--;
  if (currentSlide === -1) {
    currentSlide = slides.length - 1;
  }
  goToSlide(currentSlide);
};

const nextSlide = function () {
  currentSlide++;
  if (currentSlide === slides.length) {
    currentSlide = 0;
  }
  goToSlide(currentSlide);
};

goToSlide(0);

dots.forEach((dt) =>
  dt.addEventListener("click", function () {
    dots.forEach((dt) => dt.classList.remove("dot--active"));
    this.classList.add("dot--active");
    currentSlide = this.dataset.slide;
    goToSlide(this.dataset.slide);
  })
);

btnLeft.addEventListener("click", prevSlide);

btnRight.addEventListener("click", nextSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});

/* Form submission message */

form.addEventListener("submit", function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  closeModal.classList.remove("hidden");
});

closeModal.addEventListener("click", function (e) {
  e.preventDefault();
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  closeModal.classList.add("hidden");
});

/* Updating copyright year */
const now = new Date();
year.textContent = `${now.getFullYear()}`;

/* Footer Modal */

aboutSite.addEventListener("click", function () {
  modalFooter.classList.remove("hidden");
  closeFooter.classList.remove("hidden");
  overlayFooter.classList.remove("hidden");
});

closeFooter.addEventListener("click", function (e) {
  e.preventDefault();
  modalFooter.classList.add("hidden");
  overlayFooter.classList.add("hidden");
  closeFooter.classList.add("hidden");
});

/* Smooth Scrolling */

allLinks.forEach((link) =>
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    console.log(href);
    if (href === "#") window.scrollTo({ top: 0, behavior: "smooth" });
    if (href !== "#") {
      const goTo = document.querySelector(href);
      goTo.scrollIntoView({ behavior: "smooth" });
    }
  })
);
