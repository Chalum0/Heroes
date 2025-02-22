import express from "express"
import { PowerController } from "../controllers/index.controller.js"

const powerRouter = express.Router()

powerRouter.get("/", PowerController.getAllPowers)
powerRouter.get("/:id", PowerController.getPowerById);
powerRouter.post("/", PowerController.createPower);
powerRouter.put("/:id", PowerController.updatePower);
powerRouter.delete("/:id", PowerController.deletePower);

powerRouter.patch("/:id/restore", PowerController.restorePower);

export default powerRouter;
