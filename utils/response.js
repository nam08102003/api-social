const pkg = require("lodash");
const {
  MESSAGE_FAILED,
  MESSAGE_SUCCESS,
  MESSAGE_RESPONSE_FALIED,
  MESSAGE_RESPONSE_SUCCESS,
} = require("../constants/index.js");

const handleResponse = (res, status, message, data = null) => {
  const result = {
    code: status,
    status_code: MESSAGE_SUCCESS,
    message: message ?? MESSAGE_RESPONSE_SUCCESS,
  };

  if (data) {
    result.data = data;
  }

  if (+status < 400) {
    return res.status(status).json(result);
  } else {
    return res.status(status).json({
      code: status,
      status_code: MESSAGE_FAILED,
      message: message ?? MESSAGE_RESPONSE_FALIED,
    });
  }
};

module.exports = handleResponse;
