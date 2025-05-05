const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];

/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
    const newArticle = document.createElement("article");

    const articleImg = document.createElement("img");
    articleImg.src = product.imageSrc;
    articleImg.alt = product.name;

    const productDetails = document.createElement("div");
    productDetails.classList.add("product-details");

    const headingDiv = document.createElement("h3");
    headingDiv.innerText = product.name;

    const productDesc = document.createElement("p");
    productDesc.innerText = product.description;

    const productPrice = document.createElement("p");
    productPrice.classList.add("price");
    productPrice.innerText = `$${product.price}`;

    const buttonDiv = document.createElement("div");
    const button = document.createElement("button");
    button.classList.add("buy-button");
    button.innerText = "Add to cart";

    const span = document.createElement("span");
    span.classList.add("num-in-cart");

    if (product.numInCart > 0) {
        span.innerText = `${product.numInCart} in cart`;
    }

    button.addEventListener("click", (e) => {
        product.numInCart += 1;
        rerenderAllProducts();
        rerenderCart();
    })
    
    buttonDiv.appendChild(button);
    buttonDiv.appendChild(span);

    productDetails.appendChild(headingDiv);
    productDetails.appendChild(productDesc);
    productDetails.appendChild(productPrice);
    productDetails.appendChild(buttonDiv);

    newArticle.appendChild(articleImg);
    newArticle.appendChild(productDetails);

    return newArticle;
}

/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
    /*
    1. remove all <article>s
    2. recreate them using the data in PRODUCTS
    3. modify the re-creation so it uses shouldProductBeVisible() (details are near the bottom of the lab directions)

    You can remove and recreate the heading element if it makes things easier.
     */

    const productList = document.querySelector(".product-list");
    productList.innerHTML = "";

    const searchHeading = document.createElement("h2");
    searchHeading.innerText = "Search results";
    productList.appendChild(searchHeading);

    for (let product of PRODUCTS) {
        if (shouldProductBeVisible(product)) {
            productList.appendChild(renderProductCard(product));
        }
    }
}

/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
    /*
    1. remove all card items
    2. recreate them and the remove buttons based off the data in PRODUCTS
     */

    const shoppingCart = document.querySelector(".cart-items");
    shoppingCart.innerHTML = "";

    for (let product of PRODUCTS) {
        if (product.numInCart > 0) {
            const item = document.createElement("p");
            item.innerText = `${product.name} x${product.numInCart}`;

            const removeButton = document.createElement("button");
            removeButton.classList.add("remove-button");
            removeButton.innerText = "Remove";

            removeButton.addEventListener("click", (e) => {
                product.numInCart -= 1;
                rerenderAllProducts();
                rerenderCart();
            })

            shoppingCart.appendChild(item);
            shoppingCart.appendChild(removeButton);
        }
    }
}

const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");

minPriceInput.addEventListener("change", () => {
    rerenderAllProducts();
    rerenderCart()});

maxPriceInput.addEventListener("change", () => {
    rerenderAllProducts();
    rerenderCart()});
/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {
    let minPrice;
    let maxPrice;

    minPrice = Number.parseFloat(minPriceInput.value);
    maxPrice = Number.parseFloat(maxPriceInput.value);

    if (!isNaN(minPrice) && product.price < minPrice) {
        return false;
    }

    if (!isNaN(maxPrice) && product.price > maxPrice) {
        return false;
    }

    return true;
}

const productList = document.querySelector(".product-list");

rerenderAllProducts();
rerenderCart();
