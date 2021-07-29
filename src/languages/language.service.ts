import { getRepository, FindConditions, QueryBuilder } from "typeorm";
import { Language } from "./entities/language.entity";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";

export class LanguageService {
  private languageRepository = getRepository(Language);

  all() {
    return this.languageRepository.find();
  }

}