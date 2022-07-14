const express = require("express");
const CyclistsController = require("../controllers/cyclists");

const api = express.Router();

api.post("/cyclists", CyclistsController.registroCiclista);
api.get("/cyclists", CyclistsController.listarCiclistas);
api.post("/cyclists-id", CyclistsController.listarCiclistasPorId);
api.delete("/cyclists-id", CyclistsController.eliminarCiclista);
api.put("/cyclists", CyclistsController.actualziarCiclista);
module.exports = api;