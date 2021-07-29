import { NextFunction, Request, Response } from "express";
import { LanguageService } from './language.service';
import httpStatus from "http-status";
import ApiError from "utils/ApiError";

export class LanguageController {
  static async all(req: Request, res: Response, next: NextFunction) {
    const languages = await new LanguageService().all();
    return res.send(languages);
  }
}