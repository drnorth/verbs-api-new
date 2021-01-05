import { Router } from "express";
import { VerbController } from "./verb.controller";

const router = Router();

router.route("/").get(VerbController.getAll).post(VerbController.addVerb);

router.route("/init").get(VerbController.initial);

router
  .route("/:id")
  .get(VerbController.findVerb)
  .put(VerbController.updateVerb)
  .delete(VerbController.deleteVerb);

export default router;
