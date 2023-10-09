function getMinMax(str) {
  return minMaxString(
    str
      .split(" ")
      .filter((x) => isFinite(x))
      .map((x) => +x)
  );
}

function minMaxString(massive) {
  return {
    min: Math.min(...massive),
    max: Math.max(...massive),
  };
}
