import express from "express";
import { HeroController } from "../controllers/index.controller.js";

const heroRouter = express.Router()

heroRouter.get("/", HeroController.getAllHeroes);
heroRouter.get("/:id", HeroController.getHeroById);
heroRouter.post("/", HeroController.createHero);
heroRouter.put("/:id", HeroController.updateHero);
heroRouter.delete("/:id", HeroController.deleteHero);

heroRouter.patch("/:id/restore", HeroController.restoreHero)

export default heroRouter;