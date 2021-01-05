import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.route("/").get(UserController.all).post(UserController.save);

router.route("/:id").get(UserController.one).delete(UserController.remove);

export default router;
