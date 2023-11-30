const bcryptjs = require("bcryptjs");

module.exports = {
  hashPassword: (password) => {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(password, salt);
  },
  comparePassword: (password, hashPassword) => {
    return bcryptjs.compareSync(password, hashPassword);
  },
};
