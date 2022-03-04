//IMPORTAR FIleSystem
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
//LLAMANDO A LA LIBRERIA COLORS
require("colors");

//TRAYENDO A LA CLASE CON LAS FUNCTIONS DESDE helpers/mensajes.js
/*const { mostrarMenu, pausa } = require("./helpers/mensajes");*/

//TRAYENDO A LA CLASE CON LAS FUNCTIONS DESDE helpers/inquirer.js
const {
  inquirerMenu,
  stop,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");
const { pausa } = require("./helpers/mensajes");

//Importamos tarea
const Tarea = require("./models/tarea");

//Importamos Tareas
const Tareas = require("./models/tareas");

console.clear();

//FUNCTION PARA EJECUTAR LAS CLASES
const main = async () => {
  let opt = "";

  //Instanciar la function tarea, importada desde models/tareas
  const tareas = new Tareas();
  //

  //leerDB saca las tareas que estan registradas en el archivo que tenemos como DB
  const tareasDB = leerDB();

  if (tareasDB) {
    //Si existen, Establecer las tareas
    //tareas.
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    //EJECUTANDO LA CLASE IMPORTADA
    opt = await inquirerMenu();

    //Este switch permite que uno pueda seleccionar la opcion con la que se va a trabajar
    switch (opt) {
      case "1":
        //crear input para que el usuario pueda meter nombre de una tarea y luego
        //y luego la guardamos en una constante llama desc
        const desc = await leerInput("Descripción:");
        //Aqui crearemos una tarea usndo la function de tareas, donde le pasamos por parametro
        //el valor de la tarea que el usuarios creo
        tareas.crearTarea(desc);

        break;

      case "2":
        tareas.listadoCompleto();
        //console.log(tareas.listadoArr);

        break;
      case "3":
        //LIstar tareas completadas
        tareas.listarPendientesCompletadas((completadas = true));
        //console.log(tareas.listadoArr);

        break;
      case "4":
        //LIstar tareas NO pendientes
        tareas.listarPendientesCompletadas((completadas = false));
        //console.log(tareas.listadoArr);

        break;

      case "5":
        //Completado o pendiente
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);

        break;

      case "6": //Borrar
        //LIstar tareas NO pendientes
        const id = await listadoTareasBorrar(tareas.listadoArr);

        if (id !== "0") {
          const ok = await confirmar("¿Estás seguro? ");
          //TODO: preguntar si esta seguro
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
          0;
        }

        break;
    }

    guardarDB(tareas.listadoArr);

    //Este opt console.log muestra el objeto con el valor que ejegimos segun la opcion
    //console.log({ opt });
    //Ejecucion de la function stop
    await stop();
  } while (opt !== "0");

  //EJECUTAR PAUSA CON ENTER
  //  pausa();
};

//EJECUTADO LA CLASE DE MAIN
main();
