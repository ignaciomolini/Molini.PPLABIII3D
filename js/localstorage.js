export function almacenarDatos(listaAnuncios) {
  localStorage.setItem("anuncios", JSON.stringify(listaAnuncios));
}

export function obtenerAnuncios() {
  return JSON.parse(localStorage.getItem("anuncios")) || [];
}

