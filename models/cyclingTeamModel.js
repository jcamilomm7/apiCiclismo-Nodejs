const mongoose= require ('mongoose');
const Schema = mongoose.Schema;

const CyclingTeamSchame= Schema({
    codigoEquipo:{
        type:String,
        unique:true
    },
    nombre: String,
    pais: String,
    ciclistas: Array,
});

module.exports=mongoose.model("cyclingteam",CyclingTeamSchame);