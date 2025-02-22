import {
    ConflictError,
    BadRequestError,
    NotFoundError,
} from "../errors/api.error.js";
import { MissionRepository } from "../repositories/index.repository.js";

export async function getMissionById(id) {
  const mission = await MissionRepository.getMissionById(id);

  if (!mission) {
    throw new NotFoundError("Le pouvoir n'existe pas.");
  }

  return {
    id: mission.id,
    alias: mission.alias,
    missionDate: mission.missionDate.slice(-4),
  };
}

export async function createMission({ name, description }) {
  if (!name || name.length < 3 || !/^[a-zA-Z ]+$/.test(name)) {
    throw new BadRequestError("Nom invalide (3 caractères min, etc.)");
  }
  if (await MissionRepository.missionExists(name)) {
    throw new ConflictError("La mission existe déjà (name).");
  }

  const mission = await MissionRepository.createMission({ name, description });

  return mission.dataValues;
}

export async function updateMission(id, { name, description }) {
  if (!name || name.length < 3 || !/^[a-zA-Z ]+$/.test(name)) {
    throw new BadRequestError("Nom invalide (3 caractères min, etc.)");
  }
  if (await MissionRepository.missionExists(name)) {
    throw new ConflictError("La mission existe déjà (nom).");
  }

  if (!await MissionRepository.getMissionById(id)) {
    throw new NotFoundError("La mission n'existe pas, id:");
  }

  const mission = await MissionRepository.updateMission(id, { name, description });

  return mission.dataValues;
}

export async function deleteMission(id) {
  if (!(await getMissionById(id))) {
    throw new NotFoundError("La mission n'existe pas.");
  }

  return await MissionRepository.deleteMission(id);
}

export async function getAllMissions() {
  const missions = await MissionRepository.getAllMissions();

  const formattedMissions = missions.map((mission) => {
    return {
      id: mission.id,
      name: mission.name,
      description: mission.description,
    };
  });

  return formattedMissions;
}

export async function restoreMission(id) {
  const restoredMission = await MissionRepository.restoreMission(id);

  if (!restoredMission) {
    throw new NotFoundError(
      "La mission n'existe pas. La mission ne peut pas être restauré."
    );
  }

  if (await MissionRepository.missionExists(restoredMission.name)) {
    throw new ConflictError("La mission existe déjà. La mission ne peut pas être restauré.")
  }

  return restoredMission;
}
