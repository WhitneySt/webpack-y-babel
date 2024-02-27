import "./styles/style.scss";
import image from "./assets/images/logo.svg";
import {
  createTransaction,
  deleteATransaction,
  getTransactions,
} from "./services/transactionServices";
import printTransactions from "./modules/printTransactions";
import { getDataForm } from "./modules/getDataForm";

//Actualizar las imágenes en el atributo src de las etiquetas
let transactions = [];
const logoImage = document.getElementById("logo");
const transactionsContainer = document.getElementById("transactions");
const form = document.getElementById("form");



logoImage.setAttribute("src", image);

//Queremos listar los movimientos o trasacciones
document.addEventListener("DOMContentLoaded", async () => {
  transactions = await getTransactions();
  printTransactions(transactionsContainer, transactions);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newTransaction = getDataForm(form);
  const responseTransaction = await createTransaction(newTransaction);
  transactions.push(responseTransaction.data);
  printTransactions(transactionsContainer, transactions);
  form.reset();
});

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete")) {
    const id = event.target.getAttribute("name");
    await deleteATransaction(id);
    transactions = await getTransactions();
    printTransactions(transactionsContainer, transactions);
    }
    
    if (event.target.classList.contains("edit")) {
        console.log("Quiero editar");
    }
});
