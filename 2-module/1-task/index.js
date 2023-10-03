function sumSalary(salaries) {
  let sumOfSalary = 0;

  for (let key in salaries) {
    if (Number.isFinite(salaries[key])) {
      sumOfSalary += salaries[key];
    }
  }

  return sumOfSalary;
}
