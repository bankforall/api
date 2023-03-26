const time = {
  w: 604800,
  d: 86400,
  h: 3600,
  m: 60,
  s: 1,
};

const convertTime = (timeString) => {
  const timeArr = timeString.split(" ");
  let total = 0;
  timeArr.forEach((item) => {
    const num = parseInt(item.substring(0, item.length - 1));
    const unit = item.substring(item.length - 1);
    total += num * time[unit];
  });
  return total;
};

module.exports = {
  convertTime,
};
