const loadProducts = () => {
  document.getElementById("det-products").style.display = "none";
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    // fetch("../js/data.json")
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  document.getElementById("all-products").innerText = "";
  document.getElementById("det-products").innerText = "";
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");

    // product card HTML section
    div.innerHTML = `
      <div class="single-product card">
        <div class="product-image">
          <img class=" card-header img-fluid card-img-top " src=${image}></img>
        </div>
        <div class="card-body card-details">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">Category: ${product.category}</p>
          <h3><b>Price:</b> $ ${product.price}</h3>
    
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Rating:</b><span class="text-danger"> ${product.rating.rate}</span></li>
            <li class="list-group-item"><b>Review:</b><span class="text-success"> ${product.rating.count}</span></li>
          </ul>
        </div>
         
       <div class="card-footer">
         <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success"><i class="fas fa-shopping-cart"></i> Add Cart</button>
         <button onclick="loadProductDetails(${product.id})" type="button" class="btn btn-primary">
         <i class="fas fa-info-circle"></i>
         Details
       </button>
       </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// add data to the cart function
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;

  updateTotal();
};

// product details load function
const loadProductDetails = async (id) => {
  document.getElementById("det-products").style.display = "block";

  const div = document.createElement("div");
  let product = null;
  if (product !== null) {
    product = null;
    div.innerHTML = "";
    document.getElementById("all-products").value = "";
  } else if (product === null) {
    const url = `https://fakestoreapi.com/products/${id}`;
    const res = await fetch(url);
    product = await res.json();

    // details modal HTML section
    div.innerHTML = `
      <div class="modal-content">
        <div class="row">
          <div class="col-md-4">
            <img src="${product.image}" class="img-fluid rounded-start" alt="Pictures">
          </div>

          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title text-start">${product.title}</h5>
              <p class="card-text text-start">${product.description}</p>
              <p class="card-text text-start">Category: ${product.category}</p>
              <p class="card-text text-start">Price: ${product.price}</p>
              <p class="card-text text-start">Rating: ${product.rating.rate}</p>
              <p class="card-text text-start">Review: ${product.rating.count}</p>
            </div>
          </div>
        </div>
        <button onclick="loadProducts()" class="btn btn-dark close ">Go Home</button>
      </div>
       
      `;
    document.getElementById("det-products").appendChild(div);
  }
};

// get the input value function
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted < 200) {
    setInnerText("delivery-charge", 20);
  }
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

// grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// clear cart data
const clearCartData = (
  productsId,
  priceID,
  deliveryChargeId,
  taxID,
  totalID
) => {
  document.getElementById(productsId).innerText = 0;
  document.getElementById(priceID).innerText = 0;
  document.getElementById(deliveryChargeId).innerText = 0;
  document.getElementById(taxID).innerText = 0;
  document.getElementById(totalID).innerText = 0;
};

// check cart function
const checkCart = () => {
  if (document.getElementById("total-Products").innerText === "0") {
    document.getElementById("modal-message").innerText = `Opps!!! 
    Please add some products to your cart.`;
  } else {
    document.getElementById("modal-message").classList.add("text-success");
    document.getElementById(
      "modal-message"
    ).innerText = `Thank you for your purchase!!!`;
  }
};
