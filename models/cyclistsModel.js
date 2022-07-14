const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CyclistsSchame = Schema({
  codigoCiclista: {
    type: String,
    unique: true,
  },
  codigoEquipo: String,
  nombre: String,
  pais: String,
});

module.exports = mongoose.model("cyclists", CyclistsSchame);
