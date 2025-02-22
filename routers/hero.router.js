import express from "express";
import { HeroController } from "../controllers/index.controller.js";

const heroRouter = express.Router()

heroRouter.get("/", HeroController.getAllHeroes);
heroRouter.get("/:id", HeroController.getHeroById);
heroRouter.post("/", HeroController.createHero);
heroRouter.put("/:id", HeroController.updateHero);
heroRouter.delete("/:id", HeroController.deleteHero);

heroRouter.patch("/:id/powers/add", HeroController.addPowerToHero)
heroRouter.patch("/:id/powers/remove", HeroController.removePowerToHero)
heroRouter.patch("/:id/missions/add", HeroController.addMissionToHero)
heroRouter.patch("/:id/missions/remove", HeroController.removeMissionToHero)
heroRouter.patch("/:id/restore", HeroController.restoreHero)

export default heroRouter;