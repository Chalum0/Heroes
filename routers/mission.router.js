import express from "express"
import { PowerController } from "../controllers/index.controller.js"

const missionRouter = express.Router()

missionRouter.get("/", PowerController.getAllPowers)
missionRouter.get("/:id", PowerController.getPowerById);
missionRouter.post("/", PowerController.createPower);
missionRouter.put("/:id", PowerController.updatePower);
missionRouter.delete("/:id", PowerController.deletePower);

missionRouter.patch("/:id/restore", PowerController.restorePower);

export default missionRouter;