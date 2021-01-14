import BaseValidator from "utils/baseValidator";
import { body } from "express-validator";

export class AuthValidator extends BaseValidator {
  login() {
    return [
      body("fastLogin", "fastlogin is required").isBoolean(),
      body("hashKey", "hashKey is required").isString(),
      body("deviceId", "deviceId is requered").isString(),
    ];
  }
  refreshToken() {
    return [body("refreshToken", "refreshToken is required").isString()];
  }
}
