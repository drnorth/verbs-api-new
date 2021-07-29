import { getRepository } from "typeorm";
import { ICreateVerb, IVerb } from "types.common/verbs.types";
import httpStatus from "http-status";
import ApiError from "utils/ApiError";
import { Verb } from "./entities/verb.entity";
import mockVerbs from "./mock";
import { VerbTranslation } from "./entities/translations.entity";

export class VerbsService {
  private verbRepository = getRepository(Verb);
  private verbTranslationRepo = getRepository(VerbTranslation);

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

  async initial(): Promise<any> {
    const verbs = await this.findAll("ru");

    if (verbs.length) {
      await this.delete(verbs.map((e) => e.id));
    }

    mockVerbs.forEach(async (verb) => {
      const {translations, ...others} = verb;
      const newVerb = await this.create(others);
      const transForSave = translations.split(',').map((translation)=> {
        return { verb: {id: newVerb.id}, language: { code: 'ru'}, translation: translation.trim()}
      })
      await this.verbTranslationRepo.save(transForSave);
    });

    return true;
  }
}
