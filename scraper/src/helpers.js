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
  if (votes === 0) {
    return null;
  }

  const raw = votes ** averageScore / votes + 5 * averageScore;
  const float = parseFloat(raw.toFixed(1));
  const score = parseInt(float, 10);

  return score;
};

const padZero = num => (num.toString().length < 2 ? `0${num}` : num);

module.exports.msToTime = s => {
  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;
  const hrs = (s - mins) / 60;
  return `${padZero(hrs)}:${padZero(mins)}:${padZero(secs)}`;
};

module.exports.asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

module.exports.asyncConcat = async (array, toConcat) => {
  return new Promise(resolve => {
    if (Array.isArray(toConcat)) {
      return resolve([...array, ...toConcat]);
    }
    return resolve([...array, toConcat]);
  });
};
