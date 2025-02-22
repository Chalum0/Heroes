import {
    ConflictError,
    BadRequestError,
    NotFoundError,
} from "../errors/api.error.js";
import { PowerRepository } from "../repositories/index.repository.js";

export async function getPowerById(id) {
  const power = await PowerRepository.getPowerById(id);

  if (!power) {
    throw new NotFoundError("Le pouvoir n'existe pas.");
  }

  return {
    id: power.id,
    alias: power.alias,
    powerDate: power.powerDate.slice(-4),
  };
}

export async function createPower({ name }) {

    if (await PowerRepository.powerExists(name)) {
      throw new ConflictError("Le pouvoir existe déjà (name).");
    }

    const power = await PowerRepository.createPower({ name });

    return power.dataValues;
  }

export async function updatePower(id, { name }) {
  if (!name || name.length < 3 || !/^[a-zA-Z ]+$/.test(name)) {
    throw new BadRequestError("Nom non valide (3 caractères min, etc.)");
  }

  if (await PowerRepository.powerExists(name)) {
    throw new ConflictError("Le pouvoir existe déjà (nom).");
  }

  if (!await PowerRepository.getPowerById(id)) {
    throw new NotFoundError("Le pouvoir n'existe pas, id:");
  }

  const power = await PowerRepository.updatePower(id, { name });

  return power.dataValues;
}

export async function deletePower(id) {
  if (!(await getPowerById(id))) {
    throw new NotFoundError("Le pouvoir n'existe pas.");
  }

  return await PowerRepository.deletePower(id);
}

export async function getAllPowers() {
  const powers = await PowerRepository.getAllPowers();

  const formattedPowers = powers.map((power) => {
    return {
      id: power.id,
      name: power.name,
    };
  });

  return formattedPowers;
}

export async function restorePower(id) {
  const restoredPower = await PowerRepository.restorePower(id);

  if (!restoredPower) {
    throw new NotFoundError(
      "Le pouvoir n'existe pas. Le pouvoir ne peut pas être restauré."
    );
  }

  if (await PowerRepository.powerExists(restoredPower.name)) {
    throw new ConflictError("Le pouvoir existe déjà. Le pouvoir ne peut pas être restauré.")
  }

  return restoredPower;
}
