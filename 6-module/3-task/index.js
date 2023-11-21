import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  #count = 0;

  constructor(slides) {
    this.slides = slides;

    this.render();
  }

  get elem() {
    return this.divCarousel;
  }

  sourceSlide() {
    return `<div class="carousel__slide" data-id="penang-shrimp">
        <img src="/assets/images/carousel/penang_shrimp.png" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€16.00</span>
          <div class="carousel__title">Penang shrimp</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`;
  }

  sourceArrows() {
    return `<div class="carousel">
      <!--Кнопки переключения-->
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>`;
  }

  insertData(div, slide) {
    div.querySelector(
      ".carousel__img"
    ).src = `/assets/images/carousel/${slide.image}`;
    div.querySelector(
      "span.carousel__price"
    ).textContent = `€${slide.price.toFixed(2)}`;
    div.querySelector(".carousel__title").textContent = slide.name;
    div.dataset.id = slide.id;
  }

  render() {
    this.divCarousel = createElement(this.sourceArrows);
    this.divCarousel.children[1].style.display = "none";
    let inner = createElement('<div class="carousel__inner"></div>');

    for (let slide of this.slides) {
      let divSlide = createElement(this.sourceSlide);
      this.insertData(divSlide, slide);
      inner.append(divSlide);
    }

    this.divCarousel.append(inner);

    this.divCarousel.addEventListener("click", this.onClickArrow);

    this.divCarousel.addEventListener("click", this.onClick);
    //this.divCarousel.addEventListener("product-add", (event) => {});
  }

  onClick = (event) => {
    let button = event.target.closest(".carousel__button");
    if (button) {

      let addEvent = new CustomEvent("product-add", {
        detail: button.closest(".carousel__slide").dataset.id,
        bubbles: true,
      });

      this.divCarousel.dispatchEvent(addEvent);
    }
  };

  onClickArrow = (event) => {
    const btnLeftRight = event.target.closest(".carousel__arrow");
    if (!btnLeftRight) {
      return;
    }

    switch (btnLeftRight.classList[1]) {
      case "carousel__arrow_left":
        --this.#count;
        this.moveSlide();
        this.changeArrowVisibility(btnLeftRight);
        break;
      case "carousel__arrow_right":
        ++this.#count;
        this.moveSlide();
        this.changeArrowVisibility(btnLeftRight);
        break;
    }
  };

  moveSlide() {
    this.divCarousel.children[2].style.transform = `translateX(-${
      this.divCarousel.children[2].offsetWidth * this.#count
    }px)`;
  }

  changeArrowVisibility(btn) {
    if (this.#count === 0 && btn.classList[1] == "carousel__arrow_left") {
      btn.style.display = "none";
    } else if (
      this.#count === this.divCarousel.children[2].children.length - 1 &&
      btn.classList[1] == "carousel__arrow_right"
    ) {
      btn.style.display = "none";
    } else {
      this.divCarousel.children[0].style.display &&= "";
      this.divCarousel.children[1].style.display &&= "";
    }
  }
}
