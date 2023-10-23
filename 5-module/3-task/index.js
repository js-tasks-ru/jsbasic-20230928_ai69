function initCarousel() {
  const btnCaruselRoot = document.querySelector(".carousel");

  //левая стрелка невидима
  btnCaruselRoot.children[1].style.display = "none";
  let count = 0;

  btnCaruselRoot.addEventListener("click", function (event) {
    clickLeftRight(event);
  });

  //эвент на стрелки
  function clickLeftRight(event) {
    const btnLeftRight = event.target.closest("div.carousel__arrow");
    if (!btnLeftRight) {
      return;
    }

    switch (btnLeftRight.classList[1]) {
      case "carousel__arrow_left":
        changeDisplay(btnLeftRight, --count, btnCaruselRoot);
        break;
      case "carousel__arrow_right":
        changeDisplay(btnLeftRight, ++count, btnCaruselRoot);
        break;
    }
  }
}

/**
 *Функция перемещения слайдов и переключения видимости стрелок
 *
 * @param {object} btn ссылка кнопку движения слайдов
 * @param {number} count счетчик координаты окна
 * @param {object} btnCaruselRoot ссылка на компонент карусели
 * @returns {undefined}
 */
function changeDisplay(btn, count, btnCaruselRoot) {
  btnCaruselRoot.children[2].style.transform = `translateX(-${
    btnCaruselRoot.children[2].offsetWidth * count
  }px)`;
  console.log(btn.classList[1]);

  if (count === 0 && btn.classList[1] == "carousel__arrow_left") {
    btn.style.display = "none";
  } else if (
    count === btnCaruselRoot.children[2].children.length - 1 &&
    btn.classList[1] == "carousel__arrow_right"
  ) {
    btn.style.display = "none";
  } else {
    btnCaruselRoot.children[0].style.display &&= "";
    btnCaruselRoot.children[1].style.display &&= "";
  }
}
