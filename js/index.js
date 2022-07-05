/* --------OBJETOS-------- */

const productos = [
  {
    id: 0,
    nombre: "Procesador AMD Ryzen 5 5600",
    marca: "amd",
    precio: 25000,
    categoria: "procesadorAmd",
    img: "'../img/ProcesadorAMDRyzen55600.jpg'",
  },
  {
    id: 1,
    nombre: "Procesador Intel Core i5 11400",
    marca: "intel",
    precio: 27860,
    categoria: "procesadorIntel",
    img: "'../img/ProcesadorIntelCorei511400.jpg'",
  },
  {
    id: 2,
    nombre: "Memoria Adata DDR4 8GB 2666MHz",
    marca: "adata",
    precio: 5399,
    categoria: "memoria",
    img: "'../img/Memoria Adata DDR4 8GB 2666MHz.jpg'",
  },
  {
    id: 3,
    nombre: "Memoria Patriot Viper DDR4 8GB 3200MHz Steel SODIMM Notebook",
    marca: "patriot",
    precio: 5460,
    categoria: "memoriaSodimm",
    img: "'../img/Memoria Patriot Viper DDR4 8GB 3200MHz Steel SODIMM Notebook.jpg'",
  },
  {
    id: 4,
    nombre: "Mother Gigabyte AB350M V2.0 DS3H AM4",
    marca: "intel",
    precio: 8000,
    categoria: "motherIntel",
    img: "'../img/Mother Gigabyte AB350M V2.0 DS3H AM4.jpg'",
  },
  {
    id: 5,
    nombre: "Mother ASUS PRIME H310M-R R2.0 1151 OEM",
    marca: "amd",
    precio: 7790,
    categoria: "motherAmd",
    img: "'../img/Mother ASUS PRIME H310M-R R2.0 1151 OEM.jpg'",
  },
  {
    id: 6,
    nombre: "Placa de Video ASUS GeForce GTX 1660 SUPER 6GB'",
    marca: "geforce",
    precio: 80000,
    categoria: "placaGeForce",
    img: "'../img/Placa de Video ASUS GeForce GTX 1660 SUPER 6GB.jpg'",
  },
  {
    id: 7,
    nombre: "Placa de Video Asrock Radeon RX 570 4GB'",
    marca: "amd",
    precio: 74650,
    categoria: "placaAmd",
    img: "'../img/Placa de Video Asrock Radeon RX 570 4GB.jpg' ",
  },
];

/* ---------VARIABLES GLOBALES--------- */

let carrito = [];
const buscadorProductos = document.getElementById("buscadorProductos");
const buscar = document.getElementById("buscar");
const busqueda = document.getElementById("listaBuscador");
let lista = document.getElementById("miLista");

/* --------PRODUCTOS RENDERIZADOS-------- */

function renderizarProductos() {
  let lista = document.getElementById("miLista");
  lista.innerhtml = "";
  for (const producto of productos) {
    lista.innerHTML += `<li class="col-sm-3 list-group-item">
          <h4 class="texto--id"> ID: ${producto.id} </h4>
          <img src=${producto.img} class="img-fluid">
          <p> Producto: ${producto.nombre}</p>
          <p><strong> $ ${producto.precio} </strong></p>
          <button class='btn btn-danger alerta' id='btn${producto.id}'>Comprar</button>
          </li>`;
  }

  //Boton agregar al carrito
  productos.forEach((producto) => {
    document
      .getElementById(`btn${producto.id}`)
      .addEventListener("click", function () {
        agregarAlCarrito(producto);
      });
  });
}

/* -------EVENTOS--------- */

//Alerta de compra
function agregarAlCarrito(productoEnCarrito) {
  carrito.push(productoEnCarrito);
  //Swal alert
  Swal.fire({
    text: "Agregaste " + productoEnCarrito.nombre + "al carrito",
    icon: "success",
  });
  document.getElementById("tablabody").innerHTML += `
      <tr>
          <td>${productoEnCarrito.id}</td>
          <td>${productoEnCarrito.nombre}</td>
          <td>${productoEnCarrito.precio}</td>
      </tr>`;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* -------BUSCADOR------- */

const filtrar = (e) => {
  e.preventDefault();

  busqueda.innerHTML = "";

  const texto = buscadorProductos.value.toLowerCase();

  let productosFiltrados = productos.filter((elemento) =>
    elemento.nombre.toLowerCase().includes(texto)
  );
  console.table(productosFiltrados);

  for (let producto of productos) {

    let nombre = producto.nombre.toLowerCase();
    if (nombre.indexOf(texto) != -1) {
      busqueda.innerHTML += `
     <li class="col-sm-3 list-group-item">
        <h4 class="texto--id"> ID: ${producto.id} </h4>
        <img src=${producto.img} class="img-fluid">
        <p> Producto: ${producto.nombre}</p>
        <p><strong> $ ${producto.precio} </strong></p>
        <button class='btn btn-danger' id='btn${producto.id}'>Comprar</button>
        </li>
     `;
    }
    
  }

  if (busqueda.innerHTML === "") {
    busqueda.innerHTML = `
   <li class="col-sm-3 list-group-item"><h4>Producto no encontrado...</h4></li>

   `;
  }

  //ocultar productos
  lista.style.display = "none";
};

//btn de busqueda
buscar.addEventListener("click", filtrar);

/* ----Storage Carrito---- */
if (localStorage.getItem("carrito") != null) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
} else {
  carrito = [];
}


/* ----LLAMADA A RENDERIZAR---- */
renderizarProductos();
