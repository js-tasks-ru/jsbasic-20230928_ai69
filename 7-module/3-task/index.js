import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #slider;

  constructor({steps, value = 0}) {
    this.steps = steps;
    this.value = value;
    this.render();
  }

  get elem() {
    return this.#slider;
  }

  render() {
    this.#slider = createElement(`<div class="slider">

	  <!--Ползунок слайдера с активным значением-->
	  <div class="slider__thumb">
	    <span class="slider__value">0</span>
	  </div>

	  <!--Полоска слайдера-->
	  <div class="slider__progress"></div>

	  <!-- Шаги слайдера (вертикальные чёрточки) -->
	  <div class="slider__steps">
	  </div>
	 </div>`);

    this.changeCoordinates(true);
    this.#slider.addEventListener("click", this.onMouseDown);

  }

  onMouseDown = (event) => {
    const slider = event.target.closest(".slider");
    if (slider) {
      const part = slider.getBoundingClientRect().width / (this.steps - 1);
      this.value = Math.round((event.clientX - slider.getBoundingClientRect().left) / part);
      this.changeCoordinates(false);
      let sliderChange = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      });
      this.#slider.dispatchEvent(sliderChange);
    }
  };

  changeCoordinates(isIni) {
    let thumb = this.#slider.querySelector('.slider__thumb');
    let progress = this.#slider.querySelector('.slider__progress');
    let step = this.#slider.querySelector('.slider__steps');

    thumb.firstElementChild.textContent = '' + this.value;
    let leftPercents = this.value / (this.steps - 1) * 100;
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    if (isIni) {
      let span;
      for (let i = 0; i < this.steps; i++) {
        span = createElement('<span></span>');
        step.append(span);
        if (this.value === i) {
          span.classList.toggle('slider__step-active');
        }
      }
      this.#slider.append(step);
    } else {

      step.querySelector('.slider__step-active').classList.toggle('slider__step-active');
      step.children[this.value].classList.toggle('slider__step-active');


    }
  }


}
