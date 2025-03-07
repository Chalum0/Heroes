import {
  ConflictError,
  BadRequestError,
  NotFoundError,
} from "../errors/api.error.js";
import { HeroRepository, PowerRepository, MissionRepository } from "../repositories/index.repository.js";

export async function getHeroById(id) {
  const hero = await HeroRepository.getHeroById(id);

  if (!hero) {
    throw new NotFoundError("Le héros n'existe pas.");
  }

  return {
    id: hero.id,
    alias: hero.alias,
    powerDate: hero.powerDate.slice(-4),
  };
}

export async function createHero({ alias, identity, powerDate, powers = [], missions = [] }) {
  if (!alias || alias.length < 3 || !/^[a-zA-Z ]+$/.test(alias)) {
    throw new BadRequestError("Alias non valide (3 caractères min, etc.)");
  }

  if (await HeroRepository.heroExists(alias)) {
    throw new ConflictError("Le héros existe déjà (alias).");
  }

  const hero = await HeroRepository.createHero({ alias, identity, powerDate });

  if (powers.length > 0) {
    for (const powerId of powers) {
      const power = await PowerRepository.getPowerById(powerId);
      if (power) {
        await hero.addPower(power);
      }
    }
  }

  if (missions.length > 0) {
    for (const missionId of missions) {
      const mission = await MissionRepository.getMissionById(missionId);
      if (mission) {
        await hero.addMission(mission);
      }
    }
  }

  return hero.dataValues;
}

export async function addPowerToHero(heroId, powerId){
  const hero = await HeroRepository.getHeroById(heroId)
  const power = await PowerRepository.getPowerById(powerId);
  if (power) {
    await hero.addPower(power);
  }
  return hero.datavalues;
}
export async function removePowerToHero(heroId, powerId){
  const hero = await HeroRepository.getHeroById(heroId)
  const power = await PowerRepository.getPowerById(powerId);
  if (power) {
    await hero.removePower(power);
  }
  return hero.datavalues;
}

export async function addMissionToHero(heroId, missionId){
  const hero = await HeroRepository.getHeroById(heroId)
  const mission = await MissionRepository.getMissionById(missionId);
  if (mission) {
    await hero.addMission(mission);
  }
  return hero.datavalues;
}
export async function removeMissionToHero(heroId, missionId){
  const hero = await HeroRepository.getHeroById(heroId)
  const mission = await MissionRepository.getMissionById(missionId);
  if (mission) {
    await hero.removeMission(mission);
  }
  return hero.datavalues;
}

export async function updateHero(id, { alias, identity, powerDate }) {
  if (!alias || alias.length < 3 || !/^[a-zA-Z ]+$/.test(alias)) {
    throw new BadRequestError("Alias non valide (3 caractères min, etc.)");
  }

  if (await HeroRepository.heroExists(alias)) {
    throw new ConflictError("Le héros existe déjà (alias).");
  }

  if (!await HeroRepository.getHeroById(id)) {
    throw new NotFoundError("Le héros n'existe pas, id:");
  }

  const hero = await HeroRepository.updateHero(id, {
    alias,
    identity,
    powerDate,
  });

  return hero.dataValues;
}

export async function deleteHero(id) {
  if (!(await getHeroById(id))) {
    throw new NotFoundError("Le héros n'existe pas.");
  }

  return await HeroRepository.deleteHero(id);
}

export async function getAllHeroes() {
  const heroes = await HeroRepository.getAllHeroes();

  const formattedHeroes = heroes.map((hero) => {
    return {
      id: hero.id,
      alias: hero.alias,
      powerDate: hero.powerDate.slice(-4),
      powers: hero.powers?.map((p) => p.name) || [],
      missions: hero.missions?.map((p) => p.name) || [],
    };
  });

  return formattedHeroes;
}

export async function restoreHero(id) {
  const restoredHero = await HeroRepository.restoreHero(id);

  if (!restoredHero) {
    throw new NotFoundError(
      "Le héros n'existe pas. Le héros ne peut pas être restauré."
    );
  }

  if (await HeroRepository.heroExists(restoredHero.alias)) {
    throw new ConflictError("L'alias existe déjà. Le héros ne peut pas être restauré.")
  }

  return restoredHero;
}
