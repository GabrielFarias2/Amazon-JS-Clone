// ...existing code...
import {
  cart,
  addToCart,
  calculatecartQuantity,
  loadCartFetch,
} from "../data/cart.js";
import { products, loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./ultility/money.js";

loadAmazonPage();

async function loadAmazonPage() {
  console.log("carregando pagina Amazon....");

  await Promise.all([loadProductsFetch(), loadCartFetch()]);

  console.log("Dados carregados. Renderizando produtos...");
  RenderProductsGrid();
  initSearch();
}

function RenderProductsGrid(list = products) {
  const container = document.querySelector(".js-products-grid");
  if (!container) return;

  if (!Array.isArray(list) || list.length === 0) {
    container.innerHTML = `<div class="no-results">Nenhum produto encontrado.</div>`;
    return;
  }

  let productsHTML = "";

  list.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extrainfoHTML ? product.extrainfoHTML() : ""}

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>`;
  });

  container.innerHTML = productsHTML;

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      addToCart(productId);

      const carttQuantity = calculatecartQuantity();
      const qtyEl = document.querySelector(".js-cart-quantity");
      if (qtyEl) qtyEl.innerHTML = carttQuantity;
    });
  });

  const initialQuantity = calculatecartQuantity();
  const headerQtyEl = document.querySelector(".js-cart-quantity");
  if (headerQtyEl) headerQtyEl.innerHTML = initialQuantity;
}

function initSearch() {
  const input = document.querySelector(".search-bar");
  if (!input) return;

  const doSearch = (ev) => {
    const q = (ev.target.value || "").trim().toLowerCase();
    if (!q) {
      RenderProductsGrid();
      return;
    }

    const filtered = products.filter((p) => {
      const nameMatch = p.name && p.name.toLowerCase().includes(q);
      const keywordMatch =
        Array.isArray(p.keywords) &&
        p.keywords.some((k) => k.toLowerCase().includes(q));
      return nameMatch || keywordMatch;
    });

    RenderProductsGrid(filtered);
  };

  input.addEventListener("input", debounce(doSearch, 250));

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const firstBtn = document.querySelector(
        ".js-products-grid .add-to-cart-button"
      );
      if (firstBtn)
        firstBtn.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}
