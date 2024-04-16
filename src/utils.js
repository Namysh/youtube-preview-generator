const ranges = [
  { divider: 1e3, suffix: "k" },
  { divider: 1e6, suffix: "m" },
  { divider: 1e9, suffix: "b" },
];

export const transform = (input = 0) => {
  for (let index = ranges.length - 1; index >= 0; index--) {
    if (input > ranges[index].divider) {
      let quotient = input / ranges[index].divider;

      if (quotient < 10) {
        quotient = Math.floor(quotient * 10) / 10;
      } else {
        quotient = Math.floor(quotient);
      }

      return quotient.toString() + ' ' + ranges[index].suffix;
    }
  }

  return input.toString();
};
