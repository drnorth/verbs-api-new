import { getRepository } from "typeorm";
import { ICreateVerb } from "types.common/verbs.types";
import httpStatus from "http-status";
import ApiError from "utils/ApiError";
import { Verb } from "./entities/verb.entity";

export class VerbsService {
  private verbRepository = getRepository(Verb);

  async create(createVerb: ICreateVerb) {
    const verb = this.verbRepository.save(createVerb);
    return verb;
  }

  async findAll(lang: string) {
    return await this.verbRepository
      .createQueryBuilder("verb")
      .leftJoinAndSelect(
        "verb.translations",
        "translations",
        "translations.languageCode = :lang",
        { lang }
      )
      .orderBy({
        inf: "ASC",
      })
      .getMany();
  }

  async findById(id: string, lang: string) {
    const verb = await this.verbRepository
      .createQueryBuilder("verb")
      .leftJoinAndSelect(
        "verb.translations",
        "verbTranslations",
        "verbTranslations.language = :lang",
        { lang }
      )
      .orderBy({
        inf: "ASC",
      })
      .getOne();

    if (!verb) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return verb;
  }

  async update(id: string, CreateVerbDto: ICreateVerb): Promise<any> {
    return await this.verbRepository.update(id, CreateVerbDto);
  }

  async delete(id: string | string[]): Promise<any> {
    return await this.verbRepository.delete(id);
  }
}
