function makeDiagonalRed(table) {
  const changeColor = table.firstElementChild.children;

  for (let i = 0; i < changeColor.length; i++) {
    changeColor[i].children[i].style.backgroundColor = "red";
  }
}
