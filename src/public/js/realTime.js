
const socket = io();

document.getElementById('addProductForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const productData = {
    title: e.target.title.value,
    price: e.target.price.value,

  };
  socket.emit('newProduct', productData);
});

socket.on('realtime', (products) => {
  const productContainer = document.getElementById('productContainer');
  productContainer.innerHTML = '';  // Limpiar antes de actualizar
  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.innerHTML = `<p>${product.title} - ${product.price}</p>`;
    productContainer.appendChild(productElement);
  });
});

socket.on("realtime", (data) => {
  let productList = document.getElementById("productContainer");
  let etiquetaProducto = [];
  data.products.forEach((element) => {
    etiquetaProducto += `
      <h3>Zapatillas: ${element.title}</h3>
      <p>${element.description}</p>
      <span>$ ${element.price}</span>`;
  });
  productList.innerHTML = etiquetaProducto;
});

document.getElementById('addProductForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const productData = {
    title: e.target.title.value,
    price: e.target.price.value,
    // Otros campos
  };
  socket.emit('newProduct', productData);
});

socket.on('updateProducts', (products) => {
  const productContainer = document.getElementById('productContainer');
  productContainer.innerHTML = '';  // Limpiar antes de actualizar
  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.innerHTML = `<p>${product.title} - ${product.price}</p>`;
    productContainer.appendChild(productElement);
  });
});