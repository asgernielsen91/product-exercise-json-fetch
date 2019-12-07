"use strict";

// =========== Single Page Application functionality =========== //

// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  location.href = `#${pageId}`;
  setActiveTab(pageId);
}

// sets active tabbar/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll(".tabbar a");
  for (let page of pages) {
    if (`#${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }

  }
}

// set default page
function setDefaultPage() {
  let page = "products";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}

setDefaultPage();

// =========== Product functionality =========== //

/*let products = [{
    brand: "Apple",
    model: "Macbook Pro 13",
    price: 12000,
    img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp13touch-space-select-201807?wid=904&hei=840&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1529520060550"
  },
  {
    brand: "Apple",
    model: "Macbook Pro 15",
    price: 21000,
    img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp13touch-space-select-201807?wid=904&hei=840&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1529520060550"
  },
  {
    brand: "ASUS",
    model: "Zenbook 14",
    price: 4555,
    img: "https://c1.neweggimages.com/ProductImage/34-235-078-V19.jpg"
  }
];*/

let products = [];
fetch('json.json/main.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
    products = json;
    appendProducts(products);
  })


console.log(products);

function appendProducts(productArray) {
  let htmlTemplate = "";
  for (let product of productArray) {
    console.log(product);
    htmlTemplate += `
      <img src='${product.img}'>
      <h2>${product.model}</h2>
      <h3>${product.brand}</h3>
      <p>${product.price}</p>
`;

  }
  document.querySelector("#products-container").innerHTML = htmlTemplate;

}

appendProducts(products);

function addNewProduct() {
  let model = document.querySelector("#model").value;
  let brand = document.querySelector("#brand").value;
  let price = document.querySelector("#price").value;
  let img = document.querySelector("#img").value;

  let newProduct = {
    model: model,
    brand: brand,
    price: price,
    img: img
  };

  console.log(newProduct);
  products.push(newProduct);
  console.log(newProduct);
  appendProducts(products);
  document.querySelector("#model").value = "";
  document.querySelector("#brand").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#img").value = "";
  showPage("products");
}

function search(value) {
  console.log(search);
  let searchQuery = value.toLowerCase();
  let filteredProduct = [];
  for (let product of products) {
    let model = product.model.toLowerCase();
    let brand = product.brand.toLowerCase();
    if (model.includes(searchQuery) || brand.includes(searchQuery)) {
      filteredProduct.push(product);
    }
  }

  console.log(filteredProduct);
  appendProducts(filteredProduct);
}