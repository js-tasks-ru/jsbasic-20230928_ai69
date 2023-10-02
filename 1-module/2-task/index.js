/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid(name) {
  if (typeof name != "string" || name.length < 4 || testOfSymbols(name)) {
    return false;
  }
  return true;
}

function testOfSymbols(name) {
  for (let char of name) {
    if (" ".indexOf(char) > -1) {
      return true;
    }
  }
}

function sayHello() {
  let userName = prompt("Введите ваше имя");

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print("Некорректное имя");
  }
}
