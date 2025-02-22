import sequelize from "./config/database.js";
import express from "express";
import heroRouter from "./routers/hero.router.js";
import powerRouter from "./routers/power.router.js";
import missionRouter from "./routers/mission.router.js";
import { logMiddleware } from "./middlewares/log.middleware.js";

import { initializeHeroMock } from "./services/mock.service.js";
import { errorHandler } from "./middlewares/error.middleware.js";

await sequelize.sync({ force: true });
console.log("Base de donnée synchronisée !");

await initializeHeroMock();

const app = express();

app.use(express.json());
app.use(logMiddleware);

app.use("/api/v1/heroes/", heroRouter);
app.use("/api/v1/powers/", powerRouter);
app.use("/api/v1/missions/", missionRouter);

app.use(express.static("public"));

app.use(errorHandler)

app.listen(3000, () => console.log("Server listen on http://localhost:3000"));
