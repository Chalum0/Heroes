import { heroesMocks } from "../mocks/hero.mock.js";
import { powersMocks } from "../mocks/power.mock.js";
import { missionsMocks } from "../mocks/mission.mock.js";
import { HeroService, PowerService, MissionService } from "./index.service.js";

export async function initializeHeroMock() {
  console.log("========== START POWER MOCKING ==========");
  for (const power of powersMocks) {
    try {
      const newPower = await PowerService.createPower(power);
      console.log(newPower);
    } catch (error) {
      console.log("[ERROR]", error.message);
    }
  }
  console.log("========== ENDING POWER MOCKING ==========");



  console.log("========== START MISSION MOCKING ==========");
  for (const mission of missionsMocks) {
    try {
      const newMission = await MissionService.createMission(mission);
      console.log(newMission);
    } catch (error) {
      console.log("[ERROR]", error.message);
    }
  }
  console.log("========== ENDING MISSION MOCKING ==========");



  console.log("========== START HERO MOCKING ==========");
  for (const hero of heroesMocks) {
    try {
      const newHero = await HeroService.createHero(hero);
      console.log(newHero);
    } catch (error) {
      console.log("[ERROR]", error.message);
    }
  }
  console.log("========== ENDING HERO MOCKING ==========");

  return await HeroService.getAllHeroes();
}
