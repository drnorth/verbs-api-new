import BaseValidator from "utils/baseValidator";
import { body } from "express-validator";

export class UserValidator extends BaseValidator {
  add() {
    return [
      body("deviceId", "deviceId is required").isString(),
      body("name", "name type must be string").optional().isString(),
      body("email", "email type must be E-mail").optional().isEmail(),
      body("password", "password type must be string").optional().isString(),
      body("salt", "salt type must be string").optional().isString(),
      body("lang", "lang type must be string").optional().isString(),
      body("premium", "lang type must be boolean").optional().isBoolean(),
    ];
  }
}
