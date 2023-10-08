function camelize(str) {
  return str
    .split("-")
    .reduce((camelStr, x) => camelStr + `${x[0].toUpperCase() + x.slice(1)}`);
}
