//vamos a importar la libreria uuid desdeel otro archivo

const Tarea = require("./tarea");

/*

_listado:
         {'uuid-12341232-1234124-2: { id:12, desc:asd, completadoeEN:12342}'} },

*/
//Clase para agrupar las tareas en un arreglo para que todas las tareas esten juntas
class Tareas {
  //definicion:

  //cuando colocamos {} lo que motrara y guardara sera un  objeto.
  //Cuando usas [] lo que guarada y mostrara sera un arreglo

  _listado = {};

  //Function usando Getter para traer la lista de tareas que hemos registrado y a la hora de llamar a
  //a la clase esta function es tomada como una propiedad asi que se puede llamar muy facil. Como usualmente
  //sucede. Ejemplo: clase.propiedad
  get listadoArr() {
    //cuando colocamos {} lo que motrara y guardara sera un  objeto.
    //Cuando usas [] lo que guarada y mostrara sera un arreglo
    const listado = [];
    //TRANFORMACION DE OBJETO A ARREGLO para poder manejar mejor los dato a la hora de mostrarlos
    //Voy a extraer todas las llaves que se encuentren en el objeto _listado y las vamos a recibir con
    //el callback en forma de arreglo

    //ESte Object.keys nos ayuda a obtener todas las llaves y con el forEach ayuda a recorrer un objeto y
    //lo muestra en forma de arreglo
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      //paso la llave
      listado.push(tarea);
    });

    return listado;
  } /* ety  */

  constructor() {
    this._listado = {};
  }
  ///BORRAR
  borrarTarea(id = "") {
    //Si existe esa propiedad con ese ID. Entonces borrala
    if (this._listado[id]) {
      delete this._listado[id];
    }
  } //Fin de  borrar tarea
  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);

    //Grabamos en _listado la tarea correspondiente con su ID unico
    this._listado[tarea.id] = tarea;

    //como atras se insertaen un objeto, con push si es un arreglo
  }

  listadoCompleto() {
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      //const estado = { completadoEn } ? "Completado".green : "Pendiente".red;
      let estado = "";
      if (completadoEn !== null) {
        estado = "Completado".green;
      } else {
        estado = "Pendiente".red;
      }

      console.log(`${idx} ${desc} :: ${estado} `);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    this.listadoArr.forEach((tarea, i) => {
      let estado = "";
      const idx = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;

      //Tareas completadas
      if (completadoEn !== null && completadas == true) {
        estado = "Completado".green;
        console.log(`${idx} ${desc} ${estado}`);
      }
      //pendientes
      if (completadoEn == null && completadas == false) {
        estado = "Pendiente".red;
        console.log(`${idx} ${desc} ${estado}`);
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

//Estamos exportando por defecto. No usaremos llaves {} porque luego tendria que importarlo
//y hacer la desestructuracion de la tarea

module.exports = Tareas;
