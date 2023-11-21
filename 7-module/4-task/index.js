import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  slider;
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();

    this.iniValue();
  }

  iniValue(){
    let thumb = this.slider.querySelector('.slider__thumb');
    thumb.firstElementChild.textContent = this.value;
  }
  get elem() {
    return this.slider;
  }

  render() {
    this.slider = createElement(`<div class="slider">

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

    this.changePositionCoordinates(true);
    let thumb = this.slider.querySelector('.slider__thumb');

    thumb.addEventListener("pointerdown", this.onPointerDown);
    this.slider.addEventListener("click", this.onClick);

  }

  onClick = (event) => {
    const slider = event.target.closest(".slider");
    if (slider) {
      this.calcCoordinates(event.clientX);
      this.changePositionCoordinates();
      let sliderChange = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      });
      this.slider.dispatchEvent(sliderChange);
    }
  };

  onPointerDown = (event) => {
    event.preventDefault();
    const thumb = event.target.closest(".slider__thumb");
    thumb.ondragstart = () => false;

    if (thumb) {
      document.addEventListener('pointermove', this.onPointerMove);
      document.addEventListener('pointerup', this.onPointerUp);
    }
  }

  calcCoordinates (X) {
    let progress = this.slider.querySelector('.slider__progress');
    let thumb = this.slider.querySelector('.slider__thumb');

    let newLeft = X - this.slider.getBoundingClientRect().left;
    let newRight = newLeft / this.slider.getBoundingClientRect().width;

    if (newLeft < 0) {
      newRight = 0;
    }
    if (newRight > 1) {
      newRight = 1;
    }
    thumb.style.left = newRight * 100 + '%';
    progress.style.width = newRight * 100 + '%';

    this.value = Math.round(newRight * (this.steps - 1));
    thumb.firstElementChild.textContent = this.value;
  }
  onPointerMove = (event) => {
    this.slider.classList.add('slider_dragging');
    this.calcCoordinates(event.clientX);

  }

  onPointerUp = (event) => {
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);
    this.changePositionCoordinates();
    this.slider.classList.remove('slider_dragging');
    let sliderChange = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.slider.dispatchEvent(sliderChange);
  }

  changePositionCoordinates(isIni = false) {
    let thumb = this.slider.querySelector('.slider__thumb');
    let progress = this.slider.querySelector('.slider__progress');
    let step = this.slider.querySelector('.slider__steps');

    let leftPercents = this.value / (this.steps - 1) * 100;
    thumb.style.left = leftPercents + '%';
    progress.style.width = leftPercents + '%';

    if (isIni) {
      let span;
      for (let i = 0; i < this.steps; i++) {
        span = createElement('<span></span>');
        step.append(span);
        if (this.value === i) {
          span.classList.toggle('slider__step-active');
        }
      }
      this.slider.append(step);
    } else {
      step.querySelector('.slider__step-active').classList.toggle('slider__step-active');
      step.children[this.value].classList.toggle('slider__step-active');

    }
  }

}
