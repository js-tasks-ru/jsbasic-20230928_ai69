function showSalary(users, age) {
  return users
    .filter((x) => x.age <= age)
    .map((prop) => `${prop.name}, ${prop.balance}`)
    .join("\n");
}
