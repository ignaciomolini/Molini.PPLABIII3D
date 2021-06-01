import Anuncio_Auto from "./Anuncio.js";
import {
  btnMod,
  btnBaja,
  btnCancel,
  frmAnuncio,
  cargarForm,
  limpiarForm,
} from "./form.js";
import { almacenarDatos, obtenerAnuncios } from "./localstorage.js";
import { actualizarLista } from "./tabla.js";

const listaAnuncios = obtenerAnuncios();
const divTabla = document.getElementById("divTabla");

window.addEventListener("DOMContentLoaded", inicializarManejadores);

function inicializarManejadores() {
  frmAnuncio.addEventListener("submit", handlerSubmit);
  document.addEventListener("click", handlerClick);
  btnBaja.addEventListener("click", handlerBaja);
  btnMod.addEventListener("click", handlerModificacion);
  btnCancel.addEventListener("click", (e) => {
    e.preventDefault();
    limpiarForm();
  });
  if (listaAnuncios.length > 0) {
    actualizarLista(listaAnuncios, divTabla);
  }
}

function handlerClick(e) {
  if (e.target.matches("td")) {
    let id = e.target.parentNode.dataset.id;
    cargarForm(listaAnuncios, id);
    btnBaja.classList.remove("ocultar");
    btnMod.classList.remove("ocultar");
    btnAlta.classList.add("ocultar");
  }
}

function handlerSubmit(e) {
  e.preventDefault();
  const nuevoAnuncio = obtenerAnuncio();
  if (nuevoAnuncio) {
    altaAnuncio(nuevoAnuncio);
    actualizarLista(listaAnuncios, divTabla);
  }
}

function handlerBaja(e) {
  e.preventDefault();
  if (confirm("Confirma eliminacion?")) {
    let id = parseInt(frmAnuncio.id.value);
    eliminarAnuncio(id);
    actualizarLista(listaAnuncios, divTabla);
  } else {
    limpiarForm();
  }
}

function handlerModificacion(e) {
  e.preventDefault();
  if (confirm("Confirma modificacion?")) {
    let id = parseInt(frmAnuncio.id.value);
    modificarAnuncio(id);
    actualizarLista(listaAnuncios, divTabla);
  } else {
    limpiarForm();
  }
}

function altaAnuncio(a) {
  listaAnuncios.push(a);
  almacenarDatos(listaAnuncios);
}

function obtenerAnuncio() {
  const nuevoAnuncio = new Anuncio_Auto(
    Date.now(),
    frmAnuncio.titulo.value,
    frmAnuncio.transaccion.value,
    frmAnuncio.descripcion.value,
    frmAnuncio.precio.value,
    frmAnuncio.puertas.value,
    frmAnuncio.kms.value,
    frmAnuncio.potencia.value
  );

  return nuevoAnuncio;
}

function eliminarAnuncio(id) {
  let index = listaAnuncios.findIndex((a) => a.id === id);
  listaAnuncios.splice(index, 1);
  almacenarDatos(listaAnuncios);
}

function modificarAnuncio(id) {
  let index = listaAnuncios.findIndex((a) => a.id === id);
  const nuevoAnuncio = obtenerAnuncio();
  listaAnuncios.splice(index, 1, nuevoAnuncio);
  almacenarDatos(listaAnuncios);
}
