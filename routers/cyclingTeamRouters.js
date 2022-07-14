const express = require("express");
const CyclingTeamController = require("../controllers/cyclingTeam");

const api = express.Router();

api.post("/cycling-team", CyclingTeamController.registroEquipo);
api.get("/cycling-team", CyclingTeamController.listarEquipos);
api.post("/cycling-team-id", CyclingTeamController.listarEquiposPorId);
api.delete("/cycling-team-id", CyclingTeamController.eliminarCyclingTeam);
api.put("/cycling-team", CyclingTeamController.actualziarEquipoTeam);
module.exports = api;