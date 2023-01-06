import "./style.css";

// IMAGE SLIDER //
const slideBtns = document.querySelectorAll("[data-slideBtn]");
const slideContainer = document.querySelector("[data-slideContainer]");
const slides = [...document.querySelectorAll("[data-slide]")];
let currentIndex = 0;
let isMoving = false;

// btn handle function
function handleSlideBtnClick(e) {
  if (isMoving) return;
  isMoving = true;
  // TODO: see if slider is already moving
  e.currentTarget?.id === "prev" ? currentIndex-- : currentIndex++;

  slideContainer.dispatchEvent(new Event("sliderMove"));
}

// remove/add attributes function
const removeDisabledAttributes = (els) =>
  els.forEach((el) => el.removeAttribute("disabled"));

const addDisabledAttributes = (els) =>
  els.forEach((el) => el.setAttribute("disabled", "true"));

// event listeners
slideBtns.forEach((btn) => btn.addEventListener("click", handleSlideBtnClick));

slideContainer.addEventListener("sliderMove", () => {
  // 1. translate the container to the right/left
  slideContainer.style.transform = `translateX(-${
    currentIndex * slides[0].clientWidth
  }px)`;

  // 2. remove disabled attributes
  removeDisabledAttributes(slideBtns);

  // 3. renable disabled attributes if needed
  currentIndex === 0 && addDisabledAttributes([slideBtns[0]]);
});

// transition end event
slideContainer.addEventListener("transitionend", () => (isMoving = false));

// disable image drag events
document
  .querySelectorAll("[data-slide] img")
  .forEach((img) => (img.ondragstart = () => false));
 
// intersection observer for slider
const slideObserver = new IntersectionObserver(
  (slide) => {
    console.log(slide[0].isIntersecting);
    /*  if (slide[0].isIntersecting) {
    addDisabledAttributes([slideBtns[1]]);
  } */
  },
  { threshold: 0.75 }
);

slideObserver.observe(slides[slides.length - 1]);
