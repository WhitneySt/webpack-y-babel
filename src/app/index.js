import "./styles/style.scss";
import image from './assets/images/logo.svg';


//Actualizar las imágenes en el atributo src de las etiquetas
const logoImage = document.getElementById("logo");

logoImage.setAttribute("src", image);