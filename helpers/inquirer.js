//Esta es la libreria que se usa para hacer que el menu se mueva y que adquiera paractiacamente
//todo adquiera una funcionalidad
const inquirer = require("inquirer");

//Libreria para dar color en consola
require("colors");

/*Este es un archivo de configuracion, para definir el tipo de trabajo que vamos a requerirle
 acuando definimos los tipos: ejemplo type: list( te listara lo que definas en el choices )
Si defines: type:input ( La libreria funcionara como un prompt y cambia el parametro 
    choices a message  y defines el mensaje como haremos aqui) Para mas inf 
    documentacion en npm
 */
const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1".green}. Crear tarea`,
      },
      {
        value: "2",
        name: `${"2".green}. Listar tareas`,
      },
      {
        value: "3",
        name: `${"3".green}. Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4".green}. Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5".green}. Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6".green}. Borrar tarea`,
      },
      {
        value: "0",
        name: `${"3".green}. Salir`,
      },
    ],
  },
];

//Esto define lo que dira en la cabecera
const inquirerMenu = async () => {
  console.clear();
  //CABECERA
  console.log("=======================".green);
  console.log(" Seleccione una Opción".red);
  console.log("=======================\n".green);

  //PAra no retornar un objeto completo, desestructuramos el valor
  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

//Funtion que manejara el estop con el ENTER
const stop = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"enter".green} para continuar`,
    },
  ];
  //Este es solo un espacio entre el enu y la cabecera
  console.log("\n");

  //Aqui se ejecuta el prompt con el objeto adentro, a traves del await
  await inquirer.prompt(question);
};

//Functions para hacer la misma funcionalidad que un prompt
//osea que el usuario lea en pantalla y segun eso escriba algo y ese valor lo podemos tomar
//en una variable

//Este es paa defnir el nombre de la tarea
const leerInput = async () => {
  const question = [
    {
      type: "input",
      name: "desc",
      message: "Descripción:",
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: `0.`.green + " Cancelar ",
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
  // {
  // value: tarea.id,
  // name: `${"1".green}. Crear tarea`,
  // }
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: (tarea.completadoEn) ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
  // {
  // value: tarea.id,
  // name: `${"1".green}. Crear tarea`,
  // }
};

//Exportacion de los modulos
module.exports = {
  inquirerMenu,
  stop,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
};
