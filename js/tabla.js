import { limpiarForm } from "./form.js";

const divSpinner = document.getElementById("divSpinner");

function crearTabla(items) {
  const tabla = document.createElement("table");

  tabla.appendChild(crearCabecera(items[0]));
  tabla.appendChild(crearCuerpo(items));

  return tabla;
}

function crearCabecera(item) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  for (const key in item) {
    if (key != "id") {
      const th = document.createElement("th");
      const texto = document.createTextNode(key);
      th.appendChild(texto);
      tr.appendChild(th);
    }
  }
  thead.appendChild(tr);

  return thead;
}

function crearCuerpo(items) {
  const tbody = document.createElement("tbody");
  items.forEach((item) => {
    const tr = document.createElement("tr");
    for (const key in item) {
      if (key == "id") {
        tr.setAttribute("data-id", item[key]);
      } else {
        const td = document.createElement("td");
        const texto = document.createTextNode(item[key]);
        td.appendChild(texto);
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  });

  return tbody;
}

export function actualizarLista(lista, contenedor) {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.lastChild);
  }

  if (lista) {
    agregarSpinner();
    limpiarForm();

    setTimeout(() => {
      contenedor.appendChild(crearTabla(lista));
      eliminarSpinner();
    }, 3070);
  }
}

function agregarSpinner() {
  let spinner = document.createElement("img");
  spinner.setAttribute("src", "./image/spinner.gif");
  spinner.setAttribute("alt", "imagen spinner");

  divSpinner.appendChild(spinner);
}

function eliminarSpinner() {
  while (divSpinner.firstChild) {
    divSpinner.removeChild(divSpinner.lastChild);
  }
}

