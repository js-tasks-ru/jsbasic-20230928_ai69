import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #modal;

  constructor() {
    this.render();
  }

  render() {
    this.#modal = createElement(`<div class="modal">
              <div class="modal__overlay"></div>
              <div class="modal__inner">
                <div class="modal__header">

                  <button type="button" class="modal__close">
                    <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
                  </button>

                  <h3 class="modal__title">
                  </h3>

                </div>
                <div class="modal__body"></div>
              </div>`);

  }

  setTitle(title) {
    this.#modal.querySelector('.modal__title').textContent = title;
  }

  setBody(body) {
    this.#modal.querySelector('.modal__body').append(body);

  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.append(this.#modal);
    this.#modal.addEventListener("click", this.onClickClose);
    document.addEventListener('keydown', this.onKeyEscape);
  }

  onKeyEscape = (event) => {
    if (event.code == 'Escape') {
      this.close();
      document.removeEventListener('keydown', this.onKeyEscape);
    }
  };
  onClickClose = (event) => {
    let button = event.target.closest(".modal__close");
    if (button) {

      this.close();
    }
  };

  close() {
    document.body.classList.remove('is-modal-open');
    this.#modal.remove();

  }
}


