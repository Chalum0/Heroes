import { HeroService } from "../services/index.service.js";

export async function getAllHeroes(req, res, next) {
  try {
    const heroes = await HeroService.getAllHeroes();
    res.json(heroes);
  } catch (error) {
    next(error)
  }
}

export async function getHeroById(req, res, next) {
  try {
    const id = req.params.id;
    const hero = await HeroService.getHeroById(id);
    res.json(hero);
  } catch (error) {
    next(error)
  }
}

export async function createHero(req, res, error) {
  try {
    const { alias, identity, powerDate } = req.body;
    const newHero = await HeroService.createHero({
      alias,
      identity,
      powerDate,
      powers,
      missions,
    });
    res.json(newHero);
  } catch (error) {
    next(error)
  }
}

export async function updateHero(req, res, next) {
  try {
    const id = req.params.id;
    const { alias, identity, powerDate } = req.body;
    const updatedHero = await HeroService.updateHero(id, {
      alias,
      identity,
      powerDate,
    });
    res.json(updatedHero);
  } catch (error) {
    next(error)
  }
}

export async function addPowerToHero(req, res, next) {
  try {
    const id = req.params.id;
    const { powerId } = req.body;
    const updatedHero = await HeroService.addPowerToHero(id, { powerId });
    res.json(updatedHero);
  } catch (error) {
    next(error)
  }
}
export async function removePowerToHero(req, res, next) {
  try {
    const id = req.params.id;
    const { powerId } = req.body;
    const updatedHero = await HeroService.removePowerToHero(id, { powerId });
    res.json(updatedHero);
  } catch (error) {
    next(error)
  }
}

export async function addMissionToHero(req, res, next) {
  try {
    const id = req.params.id;
    const { missionId } = req.body;
    const updatedHero = await HeroService.addMissionToHero(id, { missionId });
    res.json(updatedHero);
  } catch (error) {
    next(error)
  }
}
export async function removeMissionToHero(req, res, next) {
  try {
    const id = req.params.id;
    const { missionId } = req.body;
    const updatedHero = await HeroService.removeMissionToHero(id, { missionId });
    res.json(updatedHero);
  } catch (error) {
    next(error)
  }
}

export async function deleteHero(req, res, next) {
  try {
    const id = req.params.id;
    const deletedHero = await HeroService.deleteHero(id);
    res.json(deletedHero);
  } catch (error) {
    next(error)
  }
}

export async function restoreHero(req, res, next) {
  try {
    const id = req.params.id;
    const restoredHero = await HeroService.restoreHero(id);
    res.json(restoredHero);
  } catch (error) {
    next(error)
  }
}
