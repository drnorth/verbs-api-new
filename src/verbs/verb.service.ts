import { getRepository } from "typeorm";
import { ICreateVerb, IVerb } from "types.common/verbs.types";
import httpStatus from "http-status";
import ApiError from "utils/ApiError";
import { Verb } from "./verb.entity";
import mockVerbs from "./mock";

export class VerbsService {
  private verbRepository = getRepository(Verb);

  async create(createVerb: ICreateVerb): Promise<IVerb> {
    const verb = this.verbRepository.save(createVerb);
    return verb;
  }

  async findAll(): Promise<IVerb[]> {
    return await this.verbRepository.find({
      order: {
        inf: "ASC",
      },
    });
  }

  async findById(id: string): Promise<IVerb> {
    const verb = await this.verbRepository.findOne(id);

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
