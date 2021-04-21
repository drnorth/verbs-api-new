import { Request, Response, NextFunction } from "express";
import { User } from "user/user.entity";
import { SimulatorService } from "./simulator.service";

export class SimulatorController {
  static async getTest(req: Request, res: Response, next: NextFunction) {
    const test = await new SimulatorService().getTest(
      req.user as User,
      req.params.type || "WORD"
    );
    return res.send(test);
  }

  static async resultTest(req: Request, res: Response, next: NextFunction) {
    await new SimulatorService().getResult(req.user as User, req.body);
    return res.send("DONE");
  }
}
