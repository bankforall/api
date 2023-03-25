const { v4: uuid } = require("uuid");

const generateInviteCode = () => {
  return uuid().replace(/-/g, "").substring(0, 8);
};

module.exports = generateInviteCode;

