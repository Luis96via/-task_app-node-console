//vamos a requerir a la libreria uuid

const { v4: uuidv4 } = require("uuid");

//Clase para crear una tarea y darle nombre a traves del parametro
class Tarea {
  //definicion:

  id = "";
  desc = "";
  completadoEn = null;

  //constructor: lO que se ejecuta cuando creemos una nueva instacia de nuestra tarea
  constructor(desc) {
    //Para conseguir un id unico o identificador unico usaremos un  paquete qe se llamada uuid
    this.id = uuidv4();
    //
    //
    //recibimos el parametro desc y asignamos el valor que trae a la propiedad desc
    this.desc = desc;
    //
    //
    this.completadoEn = null;
  }
}

//Estamos exportando por defecto. No usaremos llaves {} porque luego tendria que importarlo
//y hacer la desestructuracion de la tarea

module.exports = Tarea;
