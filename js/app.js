// loading all products
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  const productsContainer = document.getElementById("all-products");
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product">
      <div>
        <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price.toFixed(2)}</h2>
      <button onclick="addToCart(${product.id},${
      product.price
    })" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button>
    </div>
      `;
    productsContainer.appendChild(div);
  }
};

// cart calculation from here

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  document.getElementById("total-Products").innerText = count;

  updatePrice(price); //update price for each product added to cart
  updateTaxAndCharge(); //update delivery charge and tax as per price
  updateTotal(); //update total price of the cart
};

//get value after converting innertext to floating number
const getValue = (id) => {
  const elementText = document.getElementById(id).innerText;
  const value = parseFloat(elementText);
  return value;
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// main price update function
const updatePrice = (price) => {
  const previousPrice = getValue("price");
  const updatedPrice = previousPrice + price;

  setInnerText("price", updatedPrice);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const productPrice = getValue("price");
  if (productPrice > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", productPrice * 0.2);
  }
  if (productPrice > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", productPrice * 0.3);
  }
  if (productPrice > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", productPrice * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getValue("price") + getValue("delivery-charge") + getValue("total-tax");
  setInnerText("total", grandTotal);
};
