import { Request, Response, NextFunction } from "express";
import { User } from "user/user.entity";
import { FindWordService } from "./findWord.service";

export class FindWordController {
  static async getTest(req: Request, res: Response, next: NextFunction) {
    const test = await new FindWordService().getTest(req.user as User);
    return res.send(test);
  }

  static async resultTest(req: Request, res: Response, next: NextFunction) {
    await new FindWordService().getResult(req.user as User, req.body);
    return res.send("DONE");
  }
}
