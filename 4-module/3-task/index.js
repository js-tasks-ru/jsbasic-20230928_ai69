function highlight(table) {
  const trs = table.querySelector("tbody").children;

  for (let tr of trs) {
    changeAvailableRow(tr);
    changeGender(tr);
    changeAgeInfo(tr);
  }
}

function changeAvailableRow(td) {
  if (td.lastElementChild.hasAttribute("data-available")) {
    if (td.lastElementChild.dataset.available == "true") {
      td.classList.add("available");
    } else {
      td.classList.add("unavailable");
    }
  } else {
    td.hidden = true;
  }
}

function changeGender(td) {
  if (td.lastElementChild.previousElementSibling.innerHTML == "m") {
    td.classList.add("male");
  } else {
    td.classList.add("female");
  }
}

function changeAgeInfo(td) {
  if (+td.firstElementChild.nextElementSibling.innerHTML < 18) {
    td.style.textDecoration = "line-through";
  }
}
