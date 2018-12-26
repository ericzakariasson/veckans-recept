function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}

module.exports.decimalToFraction = decimal => {
  if (decimal === parseInt(decimal, 10)) {
    return {
      top: parseInt(decimal, 10),
      bottom: 1,
      display: `${decimal}` // /1
    };
  }

  let top = decimal.toString().includes('.') ? decimal.toString().replace(/\d+[.]/, '') : 0;
  const bottom = 10 ** top.toString().replace('-', '').length;
  if (decimal >= 1) {
    top = +top + Math.floor(decimal) * bottom;
  } else if (decimal <= -1) {
    top = +top + Math.ceil(decimal) * bottom;
  }

  const x = Math.abs(gcd(top, bottom));
  return {
    top: top / x,
    bottom: bottom / x,
    display: `${top / x}/${bottom / x}`
  };
};

module.exports.calculateScore = (votes, averageScore) => {
  const raw = votes ** averageScore / votes + 5 * averageScore;
  const float = parseFloat(raw.toFixed(1));
  const score = parseInt(float, 10);

  return score;
};
