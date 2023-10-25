/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.getTable();
  }

  getTable() {
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    thead.innerHTML =
      "<tr><th>Имя</th>" +
      "<th>Возраст</th>" +
      "<th>Зарплата</th>" +
      "<th>Город</th>" +
      "<th></th></tr>";
    table.append(thead);

    let tbody = document.createElement("tbody");
    table.append(tbody);

    tbody.innerHTML = this.rows.reduce(
      (acc, i) =>
        acc +
        (`<tr>` +
          `<td>${i.name}</td>` +
          `<td>${i.age}</td>` +
          `<td>${i.salary}</td>` +
          `<td>${i.city}</td>` +
          `<td><button>X</button></td>
          </tr>`),
      ""
    );

    tbody.addEventListener("click", function (event) {
      let button = event.target.closest("button");
      if (!button) return;

      button.closest("tr").remove();
    });

    return table;
  }
}
