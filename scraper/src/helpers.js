function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}

exports.decimalToFraction = decimal => {
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

exports.calculateScore = (votes, averageScore) => {
  if (votes === 0) {
    return null;
  }

  const raw = votes ** averageScore / votes + 5 * averageScore;
  const float = parseFloat(raw.toFixed(1));
  const score = parseInt(float, 10);

  return score;
};

const padZero = num => (num.toString().length < 2 ? `0${num}` : num);

// https://gist.github.com/Erichain/6d2c2bf16fe01edfcffa

exports.convertMS = milliseconds => {
  let day;
  let hour;
  let minute;
  let seconds;

  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  seconds %= 60;
  hour = Math.floor(minute / 60);
  minute %= 60;
  day = Math.floor(hour / 24);
  hour %= 24;

  return { day, hour: padZero(hour), minute: padZero(minute), seconds: padZero(seconds) };
};

exports.asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

exports.asyncConcat = async (array, toConcat) => {
  return new Promise(resolve => {
    if (Array.isArray(toConcat)) {
      return resolve([...array, ...toConcat]);
    }
    return resolve([...array, toConcat]);
  });
};
