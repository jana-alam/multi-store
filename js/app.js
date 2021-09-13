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
  const productsContainer = document.getElementById("all-products");
  for (const product of products) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100 shadow">
        <img style="width:150px;height:150px;"class="card-img-top m-auto pt-4" src=${image}></img>
        <div class="card-body">
          <h3>${product.title}</h3>
          <p class="mb-0 fst-italic">Category: ${product.category}</p>
                   
        </div>
        <div class="px-3 mb-2">
          <div>
            Ratings: <span class="ratings">${product.rating.rate}</span> (${
      product.rating.count
    }) 
          </div> 
          <h3>Price: $ ${product.price.toFixed(2)}</h3>
          <div>
          <button onclick="addToCart(${product.id},${
      product.price
    })" id="addToCart-btn" class="btn btn-success">add to cart</button>
                <button id="details-btn" class="btn btn-danger">Details</button></div>
        </div>      
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
