const { credit } = require("../constants/credit");

const convertCredit = (creditString) => {
  return credit[creditString];
};

module.exports = convertCredit;
