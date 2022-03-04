const { rejects } = require("assert");

//LLAMANDO A COLORS
require("colors");

//FUNCTION QUE EXPORTAREMOS
const mostrarMenu = () => {
  return new Promise((resolve) => {
    //ESTE SERIA EL MENU
    console.log(`${"1.".green} Crear tarea`);
    console.log(`${"2.".green} Listar tares`);
    console.log(`${"3.".green} Listar tareas completadas`);
    console.log(`${"4.".green} Listar tareas pendientes`);
    console.log(`${"4.".green} Completar tarea(s)`);
    console.log(`${"5.".green} Borrar tarea`);
    console.log(`${"0.".green} Salir \n`);

    //PARA RECIBIR INFORMACION QUE VIENE DESDE EL USUARIO
    const readline = require("readline").createInterface({
      //Esto hace que Node pause la ejecucion, esperar unos caracteres y el enter de usuario
      input: process.stdin,
      //Para mostrar un mensaje en consola cuando yo le estoy piendo algo al usuario
      output: process.stdout,
    });

    //Esto funciona similar al Prmpt().. aqui mostramos un mensaje y el usuario ingresa un valor
    //y luego hacemos algo con ese mensaje

    readline.question("Seleccione una opción ", (opt) => {
      console.log(opt);

      readline.close();
      resolve(opt);
    });
  }); //Fin de la promesa
};

const pausa = () => {
  return new Promise((resolve) => {
    //PARA RECIBIR INFORMACION QUE VIENE DESDE EL USUARIO
    const readline = require("readline").createInterface({
      //Esto hace que Node pause la ejecucion, esperar unos caracteres y el enter de usuario
      input: process.stdin,
      //Para mostrar un mensaje en consola cuando yo le estoy piendo algo al usuario
      output: process.stdout,
    });

    //Esto funciona similar al Prmpt().. aqui mostramos un mensaje y el usuario ingresa un valor
    //y luego hacemos algo con ese mensaje
    readline.question(
      `\n Precione ${"ENTER".green}  para continuar \n`,
      (opt) => {
        //cerramos el readline porque sino se queda esperado y esperando informacion del usuario
        readline.close();
        resolve();
      }
    );
  }); //Fin de la promesa
};

//EXPORTANDO LA FUNCTION
module.exports = { mostrarMenu, pausa };
