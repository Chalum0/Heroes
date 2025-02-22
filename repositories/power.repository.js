import Power from "../models/power.model.js";

export async function createPower({name}) {
  const power = await Power.create({name})
  return power
}

export async function getPowerById(id) {
  const power = await Power.findByPk(id);
  if (!power) {
    return null;
  }

  return power;
}

export async function getDeletedPowerById(id) {
  const power = await Power.scope("deleted").findByPk(id);
  if (!power) {
    return null;
  }

  return power;
}

export async function updatePower(id, values) {
  const power = await getPowerById(id);
  if (!power) {
    return null;
  }

  return await power.update(values);
}

export async function deletePower(id) {
  const power = await getPowerById(id);
  if (!power) {
    return null;
  }

  return await updatePower(power.id, { isDeleted: true });
}

export async function getAllPowers() {
    return await Power.findAll();
  }

export async function powerExists(name) {
  const power = await Power.findOne({ where: { name } });
  return Boolean(power);
}

export async function powerDeletedExists(name) {
  const power = await Power.scope("deleted").findOne({ where: { name } });
  return Boolean(power);
}

export async function getAllPowersWithDeleted() {
  await Power.scope("withDeleted").findAll();
}

export async function getAllPowersDeleted() {
  await Power.scope("deleted").findAll();
}

export async function restorePower(id) {
  const deletedPower = await getDeletedPowerById(id);

  if (!deletedPower) {
    return null;
  }

  return await deletedPower.update({ isDeleted: false });
}
