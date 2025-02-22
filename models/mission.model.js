import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Mission = sequelize.define(
  "missions",
  {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: {
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

export default Mission;