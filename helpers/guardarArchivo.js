const fs = require("fs");

//Aqui estamos guardando. convirtiendo las tareas a un archivo json para que guardada ahi
//<ESta cost archivo tiene la direccion que vamos a utilizar para los fs.
const archivo = "./db/data.json";

const guardarDB = (data) => {
  //Aqui estamos guardando un archivo y el JSON.stringify() convierte un objeto a string
  fs.writeFileSync(archivo, JSON.stringify(data));
};

//Aqui va a salir la informacion de lo que se lea en el archivo que tenemos como DB
const leerDB = () => {
  //Esto verifica si el archivo existe . Si existe pues que lea lo que esta adentro o
  //sino existe entonces que no haga nada
  if (!fs.existsSync(archivo)) {
    return null;
  } else {
    //sacando lo que esta adentro de la carpeta que tenemos como DB
    const info = fs.readFileSync(archivo, { encoding: "utf-8" });

    //Para convertir esto de string a objeto( como estaba antes un arreglo de tareas )
    const data = JSON.parse(info);
    //Retornando las tareas que estan guadadas directamente en el archivo que tenemos como DB
    return data;
  }
};

module.exports = { guardarDB, leerDB };
