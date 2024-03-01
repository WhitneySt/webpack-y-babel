import "./styles/style.scss";
import image from "./assets/images/logo.svg";
import {
  createTransaction,
  deleteATransaction,
  getATransaction,
  getTransactions,
} from "./services/transactionServices";
import printTransactions from "./modules/printTransactions";
import { getDataForm } from "./modules/getDataForm";
import Swal from "sweetalert2";

//Actualizar las imágenes en el atributo src de las etiquetas
let transactions = [];
const logoImage = document.getElementById("logo");
const transactionsContainer = document.getElementById("transactions");
const form = document.getElementById("form");


const convertForm = (form, editData) => {
  const title = document.getElementById("titleForm");
  title.innerText = "Editar Movimiento";
  const formChildrens = Array.from(form.children);
  formChildrens.forEach((element) => {
    if (element.getAttribute("name")) {
      const key = element.getAttribute("name");
      element.value = editData[key];
    }
  });
};

logoImage.setAttribute("src", image);

//Queremos listar los movimientos o trasacciones
document.addEventListener("DOMContentLoaded", async () => {
  transactions = await getTransactions();
  printTransactions(transactionsContainer, transactions);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newTransaction = getDataForm(form);
  // const date = new Date().toLocaleDateString("en-US");
  const date = new Date();
  console.log(date);
  newTransaction.creationDate = date;
  newTransaction.validate = false;
  console.log(newTransaction);
  const responseTransaction = await createTransaction(newTransaction);
  transactions.push(responseTransaction.data);
  printTransactions(transactionsContainer, transactions);
  form.reset();
});

document.addEventListener("click", async (event) => {
  //Eliminar movimientos
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
  //Editar Movimientos
  if (event.target.classList.contains("edit")) {
    const id = event.target.getAttribute("name");
    const transaction = await getATransaction(id);
    console.log(transaction);
    convertForm(form, transaction);
    // const editedTransaction = getDataForm(form);
    // console.log(editedTransaction);
  }
});

//1. Terminar con las funcionalidades del CRUD Movimientos:
//Obtener todos los movimientos: X, crear nuevo movimiento: X, eliminar Movimiento: X, editar Movimiento: Pending, filtrar movimientos por tipo: pending

//2. Configuración de webpack para trabajar con multipages
//3. Deployment: JSON SERVER (Railways), ghPages
