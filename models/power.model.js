import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Power = sequelize.define(
  "powers",
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
    description: {
        type: DataTypes.STRING,
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

export default Power;