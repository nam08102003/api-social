const {
  STATUS_CODE_ERROR,
  STATUS_CODE_SUCCESS,
  STATUS_CODE_CREATED,
  REGEX_EMAIL,
} = require("../constants");
const UserModel = require("../models/UserModel");
const { comparePassword, hashPassword } = require("../utils");
const handleResponse = require("../utils/response");
const transformerUser = require("../utils/transformer");

module.exports = {
  handleLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return handleResponse(
          res,
          STATUS_CODE_ERROR,
          "Vui lòng nhập đầy đủ thông tin"
        );
      }
      if (!REGEX_EMAIL.test(email)) {
        return handleResponse(
          res,
          STATUS_CODE_ERROR,
          "Email không đúng định dạng"
        );
      }
      const check = await UserModel.findOne({ email });
      if (!check) {
        return handleResponse(
          res,
          STATUS_CODE_ERROR,
          "Tài khoản không tồn tại"
        );
      }
      const checkPassword = comparePassword(password, check.password);
      if (!checkPassword) {
        return handleResponse(
          res,
          STATUS_CODE_ERROR,
          "Tài khoản hoặc mật khẩu không chính xác"
        );
      }
      const result = transformerUser(check);
      return handleResponse(
        res,
        STATUS_CODE_SUCCESS,
        "Đăng nhập thành công",
        result
      );
    } catch (e) {
      return handleResponse(res, STATUS_CODE_ERROR, "Có lỗi. Vui lòng thử lại");
    }
  },
  handleRegister: async (req, res) => {
    const { email, password, name } = req.body;
    try {
      if (!email || !password || !name) {
        return handleResponse(
          res,
          STATUS_CODE_ERROR,
          "Vui lòng nhập đầy đủ thông tin"
        );
      }
      if (!REGEX_EMAIL.test(email)) {
        return handleResponse(
          res,
          STATUS_CODE_ERROR,
          "Email không đúng định dạng"
        );
      }
      if (password.trim().length < 8) {
        return handleResponse(
          res,
          STATUS_CODE_ERROR,
          "Mật khẩu phải tối thiểu 8 ký tự"
        );
      }
      if (password.trim().length > 30) {
        return handleResponse(
          res,
          STATUS_CODE_ERROR,
          "Mật khẩu phải tối đa 30 ký tự"
        );
      }
      const check = await UserModel.findOne({ email });
      if (check) {
        return handleResponse(res, STATUS_CODE_ERROR, "Tài khoản đã tồn tại");
      }
      const hashPass = hashPassword(password);
      const newUser = await UserModel.create({
        email,
        password: hashPass,
        name,
      });
      if (!newUser) {
        return handleResponse(
          res,
          STATUS_CODE_ERROR,
          "Có lỗi. Vui lòng thử lại"
        );
      }
      return handleResponse(
        res,
        STATUS_CODE_CREATED,
        "Đăng ký tài khoản thành công"
      );
    } catch (e) {
      return handleResponse(res, STATUS_CODE_ERROR, "Có lỗi. Vui lòng thử lại");
    }
  },
};
