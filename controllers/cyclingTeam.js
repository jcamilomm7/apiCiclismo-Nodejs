const CyclingTeam = require("../models/cyclingTeamModel.js");
const Cyclists = require("../models/cyclistsModel");

const registroEquipo = (req, res) => {
  const cyclingTeam = new CyclingTeam();
  const cyclists = new Cyclists();

  const { nombre, pais } = req.body;

  /* Pude ir en otro archivo para que quede refactorizado */
  const generarCodigoAleatorio = (longitud) => {
    let numeros = "0123456789";
    let letras = "abcdefghijklmnopqrstuvwxyz";
    let todo = numeros + letras;
    let codigo = "";
    for (let x = 0; x < longitud; x++) {
      let aleatorio = Math.floor(Math.random() * todo.length);
      codigo += todo.charAt(aleatorio);
    }
    return codigo;
  };

  cyclingTeam.codigoEquipo = generarCodigoAleatorio(3);
  cyclingTeam.nombre = nombre;
  cyclingTeam.pais = pais;

  if (!cyclingTeam.nombre || !cyclingTeam.pais) {
    res.status(404).send({ messaje: "Los campos no pueden estar vacios" });
  }

  cyclingTeam.save((err, userStored) => {
    if (err) {
      res.status(500).send({ message: "El equipo ya existe" });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "Error al crear el usuario" });
      } else {
        res.status(201).json({ message: userStored });
      }
    }
  });
};

const listarEquipos = (req, res) => {
  CyclingTeam.find().then((ciclingTeam) => {
    if (ciclingTeam.length === 0) {
      res.status(201).send("no se ha encontado ningun usuario");
    } else {
      res.status(200).json(ciclingTeam);
    }
  });
};

const listarEquiposPorId = (req, res) => {
  const codigoEquipo = req.query.codigoEquipo;

  if (!codigoEquipo) {
    res.status(404).json({ message: "No llego el codigo del equipo" });
  }

  CyclingTeam.find({ codigoEquipo }, function (err, cyclingTeam) {
    if (err) {
      res.status(404).json({ message: "Error del servidor" });
    } else {
      if (cyclingTeam.length === 0) {
        res.status(404).json({ message: "El equipo no existe" });
      } else {
        let objeto = {
          codigoEquipo: "",
          nombre: "",
          pais: "",
          ciclistas: [],
        };

        let cyclingTeam1 = cyclingTeam[0];

        objeto.codigoEquipo = cyclingTeam1.codigoEquipo;
        objeto.nombre = cyclingTeam1.nombre;
        objeto.pais = cyclingTeam1.pais;
        console.log(objeto);

        Cyclists.find({ codigoEquipo }, function (err, cyclists) {
          if (err) {
            res.status(404).json({ message: "Error del servidor" });
          } else {
            if (cyclists.length === 0) {
              objeto.ciclistas = [];
            } else {
              objeto.ciclistas = cyclists;
              res.status(201).json({ message: objeto });
            }
          }
        });
      }
    }
  });
};

const actualziarEquipoTeam = (req, res) => {
  const cyclingTeam = new CyclingTeam();

  const id = req.body._id;
  cyclingTeam.nombre = req.body.nombre;
  cyclingTeam.pais = req.body.pais;
  cyclingTeam.ciclistas = [];

  if (!cyclingTeam.nombre || !cyclingTeam.pais) {
    res.status(404).send({ messaje: "Los campos no pueden estar vacios" });
  }
  CyclingTeam.findOne({ _id: id }, (err, response) => {
    if (err) {
      res.status(404).json({ message: "El equipo no existe" });
    } else {
      CyclingTeam.updateOne(
        { _id: id },
        {
          $set: {
            codigoEquipo: response.codigoEquipo,
            nombre: cyclingTeam.nombre,
            pais: cyclingTeam.pais,
          },
        },
        (err, result) => {
          if (err) {
            res.status(404).json({ message: "Error al actualizar el equipo" });
          } else {
            CyclingTeam.find({ _id: id }, (err, result) => {
              res.status(404).json({ result });
            });
          }
        }
      );
    }
  });
};

const eliminarCyclingTeam = (req, res) => {
  const codigoEquipo = req.query.codigoEquipo;

  if (!codigoEquipo) {
    res.status(404).json({ message: "No llego el codigo del equipo" });
  } else {
    CyclingTeam.findOneAndDelete({ codigoEquipo }, function (err, cyclingTeam) {
      if (err) {
        res.status(404).json({ message: "Error del servidor" });
      } else {
        if (cyclingTeam === null) {
          res.status(404).json({ message: "El equipo no existe" });
        } else {
          res
            .status(404)
            .json(
              `El equipo con el nombre de : ${cyclingTeam.nombre} con codigo: ${cyclingTeam.codigoEquipo} ha sido elimado con exito`
            );
        }
      }
    });
  }
};

module.exports = {
  registroEquipo,
  listarEquipos,
  listarEquiposPorId,
  eliminarCyclingTeam,
  actualziarEquipoTeam,
};
