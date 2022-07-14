const Cyclists = require("../models/cyclistsModel");
const CyclingTeam = require("../models/cyclingTeamModel");

const registroCiclista = (req, res) => {
  const cyclists = new Cyclists();
  const cyclingTeam = new CyclingTeam();

  const { codigoEquipo, nombre, pais } = req.body;

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

  cyclists.codigoCiclista = generarCodigoAleatorio(3);
  cyclists.codigoEquipo = codigoEquipo;
  cyclists.nombre = nombre;
  cyclists.pais = pais;

  if (!cyclists.codigoEquipo || !cyclists.nombre || !cyclists.pais) {
    res.status(404).send({ messaje: "Los campos no pueden estar vacios" });
  }

  CyclingTeam.find({ codigoEquipo }, function (err, response) {
    if (err) {
      res.status(404).json({ message: "Error del servidor" });
    } else {
      if (response.length === 0) {
        res.status(200).json({ message: "El equipo no existe" });
      } else {
        cyclists.save((err, userStored) => {
          if (err) {
            res.status(500).send({ message: "El ciclista ya existe" });
          } else {
            if (!userStored) {
              res.status(404).send({ message: "Error al crear el ciclista" });
            } else {
              res.status(201).json({ message: userStored });
            }
          }
        });
      }
    }
  });
};

const listarCiclistas = (req, res) => {
  Cyclists.find().then((cyclists) => {
    if (cyclists.length === 0) {
      res.status(201).send("no se ha encontado ningun ciclista registrado");
    } else {
      res.status(200).json(cyclists);
    }
  });
};

const listarCiclistasPorId = (req, res) => {
  const codigoCiclista = req.query.codigoCiclista;

  if (!codigoCiclista) {
    res.status(404).json({ message: "No llego el codigo del ciclista" });
  }

  Cyclists.find({ codigoCiclista }, function (err, cyclists) {
    if (err) {
      res.status(404).json({ message: "Error del servidor" });
    } else {
      if (cyclists.length === 0) {
        res.status(404).json({ message: "El equipo no existe" });
      } else {
        res.status(201).json(cyclists);
      }
    }
  });
};

const actualziarCiclista = (req, res) => {
  const cyclists = new Cyclists();

  const id = req.body._id;
  cyclists.nombre = req.body.nombre;
  cyclists.pais = req.body.pais;

  if (!cyclists.nombre || !cyclists.pais) {
    res.status(404).send({ messaje: "Los campos no pueden estar vacios" });
  }
  Cyclists.findOne({ _id: id }, (err, response) => {
    if (err) {
      res.status(404).json({ message: "El ciclista no existe" });
    } else {
      Cyclists.updateOne(
        { _id: id },
        {
          $set: {
            codigoCiclista: response.codigoCiclista,
            codigoEquipo: response.codigoEquipo,
            nombre: cyclists.nombre,
            pais: cyclists.pais,
          },
        },
        (err, result) => {
          if (err) {
            res
              .status(404)
              .json({ message: "Error al actualizar el ciclista" });
          } else {
            Cyclists.find({ _id: id }, (err, result) => {
              res.status(404).json({ result });
            });
          }
        }
      );
    }
  });
};

const eliminarCiclista = (req, res) => {
  const codigoCiclista = req.query.codigoCiclista;

  if (!codigoCiclista) {
    res.status(404).json({ message: "No llego el codigo del ciclista" });
  } else {
    Cyclists.findOneAndDelete({ codigoCiclista }, function (err, cyclists) {
      if (err) {
        res.status(404).json({ message: "Error del servidor" });
      } else {
        if (cyclists === null) {
          res.status(404).json({ message: "El ciclista no existe" });
        } else {
          res
            .status(404)
            .json(
              `El ciclista de nombre: ${cyclists.nombre} con codigo: ${cyclists.codigoCiclista} ha sido elimado con exito`
            );
        }
      }
    });
  }
};

module.exports = {
  registroCiclista,
  listarCiclistas,
  listarCiclistasPorId,
  eliminarCiclista,
  actualziarCiclista,
};
