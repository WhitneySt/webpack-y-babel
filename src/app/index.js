import "./styles/style.scss";
import image from "./assets/images/logo.svg";
import {
  createTransaction,
  deleteATransaction,
  editATransaction,
  getATransaction,
  getTransactions,
} from "./services/transactionServices";
import printTransactions, { filterByTypes } from "./modules/printTransactions";
import { getDataForm, insertDataToForm } from "./modules/getDataForm";
import Swal from "sweetalert2";

//Actualizar las imágenes en el atributo src de las etiquetas
let transactions = [];
let isEdit = false;
const logoImage = document.getElementById("logo");
const title = document.getElementById("titleForm");
const transactionsContainer = document.getElementById("transactions");
const form = document.getElementById("form");
const filterButtons = document.querySelectorAll(".button__filter");




//De esta manera insertamos las imágenes en la UI cuando tenemos los recursos localmente.
logoImage.setAttribute("src", image);

//Queremos listar los movimientos o trasacciones
document.addEventListener("DOMContentLoaded", async () => {
  transactions = await getTransactions();
  printTransactions(transactionsContainer, transactions);
});

//Escuchamos los click en los botones de filtrado

filterButtons.forEach(button => {
  // let filterResult =[]
  button.addEventListener("click", () => {
    // if (button.id === "todos") {
    //   filterResult = transactions;
    // } else {
    //   filterResult = filterByTypes(transactions, button.id)
    // }
    const filterResult =
      button.id === "todos"
        ? transactions
        : filterByTypes(transactions, button.id);
    printTransactions(transactionsContainer, filterResult);
  })
})

//Controlamos el evento submit del formulario. Este form tiene dos acciones: Agregar y editar movimiento 
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let message = "";
  const newTransaction = getDataForm(form);

  if (isEdit) {
    //Cuando queremos editar
    await editATransaction(isEdit, newTransaction);
    transactions = await getTransactions();
    title.innerText = "Agregar un nuevo movimiento";
    isEdit = false;
    message = "El movimiento ha sido editado exitosamente"
  } else {
    //Cuando queremos agregar nuevo movimiento
    // const date = new Date().toLocaleDateString("en-US");
    newTransaction.creationDate = new Date();
    newTransaction.validate = false;
    console.log(newTransaction);
    const responseTransaction = await createTransaction(newTransaction);
    transactions.push(responseTransaction.data);
    message = "El movimiento ha sido creado exitosamente";
    
  }

  printTransactions(transactionsContainer, transactions);
  Swal.fire({
    title: "Excelente!",
    text: message,
    icon: "success",
  });
  form.reset();
  
});

document.addEventListener("click", async (event) => {
  //Click para eliminar movimientos
  if (event.target.classList.contains("delete")) {
    const id = event.target.getAttribute("name");
    Swal.fire({
      title: "¿Estás seguro de eliminar?",
      text: "No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡Elimínalo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteATransaction(id);
        console.log(response);
        transactions = await getTransactions();
        printTransactions(transactionsContainer, transactions);
        Swal.fire({
          title: "Borrado!",
          text: "El movimiento ha sido eliminado!",
          icon: "success",
        });
      }
    });
  }
  //Click para editar Movimientos
  if (event.target.classList.contains("edit")) {
    const isEdit = event.target.getAttribute("name");    
    const transaction = await getATransaction(isEdit);  
    title.innerText = "Editar Movimiento";
    insertDataToForm(form, transaction);
    // const editedTransaction = getDataForm(form);
    // console.log(editedTransaction);
  }
});

//1. Terminar con las funcionalidades del CRUD Movimientos:
//Obtener todos los movimientos: X, crear nuevo movimiento: X, eliminar Movimiento: X, editar Movimiento: X, filtrar movimientos por tipo: pending

//2. Configuración de webpack para trabajar con multipages
//3. Deployment: JSON SERVER (Railways), ghPages
