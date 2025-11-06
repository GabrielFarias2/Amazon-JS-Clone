# JavaScript Amazon Project

Descrição
---------
Projeto front-end que simula um e‑commerce mínimo (listagem de produtos, busca, carrinho, checkout, pedidos e rastreio). Destina‑se a demonstrar organização por módulos ES, carregamento de dados (local + backend demo) e renderização dinâmica no browser.

Objetivo
--------
Fornecer uma experiência de loja com:
- Grid de produtos preenchida por código JS.
- Busca client‑side que filtra produtos já carregados.
- Carrinho com operações (adicionar, remover, atualizar quantidade) e persistência em localStorage.
- Páginas de checkout, resumo de pedido e tracking com interação mínima.
- Carregamento de produtos do backend demo: `https://supersimplebackend.dev/products`.

Visão geral da estrutura
------------------------
- amazon.html, orders.html, checkout.html, tracking.html — páginas públicas (entry points).
- javascript/ — entry points e renderers (módulos ES):
  - amazon.js — inicializa página principal, carrega dados e renderiza grid + busca.
  - checkout.js — inicializa checkout (carrega cart / delivery).
  - dynamic-orders.js — lógica para a página de pedidos.
  - tracking.js — lógica para a página de rastreio.
  - checkout/ — orderSummary.js, paymentSummary.js (renderers do checkout).
  - ultility/money.js — formatação de preços e utilitários.
- data/ — camada de dados (modelos + loaders):
  - products.js — classes Product/Clothing/Appliance, `products` (array) e função `loadProducts(...)` / `loadProductsFetch()` para popular `products` a partir do backend.
  - cart.js — estado do carrinho (exportado) e funções: addToCart, removefromCart, updateQuantity, calculatecartQuantity, load/salvar em localStorage.
  - deliveryOptions.js — lista de opções de entrega e utilitários.
  - orders.js — funções relacionadas a pedidos (listar / consultar).
- styles/, images/ — assets visuais.
- backend/products.json — cópia local utilizada em alguns fluxos.

Como os módulos interagem (fluxo de inicialização)
-------------------------------------------------
1. Cada página importa seu script principal com `<script type="module" src="javascript/xxx.js">`.
2. Script principal chama os loaders do data/ (por exemplo: `loadProducts()` e `loadCart()`), aguardando-os quando necessário.
3. Após os dados estarem prontos, o script chama as funções de render (por exemplo `RenderProductsGrid()` ou `renderOrderSummary()`).
4. Renderers constroem HTML (inserem em containers com classes `.js-*`) e registram listeners de UI (clicks, input, change).
5. Eventos atualizam o estado em `data/*` (ex.: cart.updateQuantity) e chamam novamente os renderers afetados (header, resumo de pagamento).

Contratos importantes (o que os módulos exportam / esperam)
----------------------------------------------------------
- data/products.js
  - export let products — array de instâncias Product/Clothing/Appliance
  - export function loadProducts(callback) ou loadProductsFetch() — popula `products`
  - export function getProduct(id)
- data/cart.js
  - export let cart — estrutura com items { productId, quantity, deliveryOptionId }
  - funções: addToCart(productId), removefromCart(productId), updateQuantity(productId, qty), calculatecartQuantity(), load/salvar localStorage
- checkout/orderSummary.js & paymentSummary.js
  - funções exportadas: renderOrderSummary(), renderPaymentSummary() — recebem os dados via imports dos data/* e fazem render.

Padrões de uso e convenções
--------------------------
- Renderers são idempotentes: substituem o HTML do container (innerHTML) e re‑anexam listeners.
- Loaders retornam/aceitam callback ou Promise; render aguarda carregamento antes de usar dados.
- Nomes de classes CSS com prefixo `js-` indicam containers usados pelo JS.
- Paths nos imports e nas tags `<script>` devem ser relativos (sem barra inicial) para funcionar corretamente no GitHub Pages (por exemplo `javascript/amazon.js`).

Persistência e backend
----------------------
- Carrinho é persistido em localStorage; todas operações no `cart` atualizam e salvam.
- Produtos podem ser carregados do backend `https://supersimplebackend.dev/products`. A função de carregamento popula o export `products` para que o restante do app use as mesmas instâncias.

Principais interações na UI
---------------------------
- Busca: input `.search-bar` filtra `products` por nome/keywords e chama RenderProductsGrid(filtered).
- Adicionar ao carrinho: botão com `data-product-id` chama addToCart, atualiza contador `.js-cart-quantity`.
- Checkout: orderSummary mostra cada item do cart; permite alterar quantidade e selecionar opção de entrega (que chama cart.updatedeliveryOption(...)).
- Tracking/orders: leem `location.search` (URL params) para exibir/consultar pedido.

Observação sobre deploy (GitHub Pages)
-------------------------------------
- Use caminhos relativos nos imports e assets (sem `"/"` no início) para evitar problemas de base path no Pages.
- As páginas já usam módulos ES — GitHub Pages serve via HTTP, então imports e fetch funcionarão normalmente.

Contato
-------
Se precisar de documentação adicional (mapa de módulos detalhado, diagrama de fluxo ou exemplos de uso das APIs `cart`/`products`), eu gero um apêndice técnico separado.