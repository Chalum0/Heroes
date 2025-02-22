import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Power from "./power.model.js";
import Mission from "./mission.model.js";


const Hero = sequelize.define(
  "heroes",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    powerDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    defaultScope: {
      where: {
        isDeleted: false,
      },
    },
    scopes: {
      deleted: {
        where: {
          isDeleted: true,
        },
      },
      withDeleted: {},
    },
  }
);

Power.belongsToMany(Hero, {
  through: 'HeroPower',
  foreignKey: 'powerId',
  as: 'hero',
  onDelete: 'CASCADE'
});
Mission.belongsToMany(Hero, {
  through: 'HeroMission',
  foreignKey: 'missionId',
  as: 'hero',
  onDelete: 'CASCADE'
});
Hero.belongsToMany(Power, {
  through: 'HeroPower',
  foreignKey: 'heroId',
  as: 'powers',
  onDelete: 'CASCADE'
});
Hero.belongsToMany(Mission, {
  through: 'HeroMission',
  foreignKey: 'heroId',
  as: 'missions',
  onDelete: 'CASCADE'
});

export default Hero;
