# E-Cart Store

A responsive e-commerce web app built with React, TypeScript, and Material UI. Products and categories are fetched from the [Platzi Fake Store API](https://api.escuelajs.co/api/v1).

---

## How to Clone and Run

**Prerequisites:** Node.js ≥ 18

```bash
# Clone the repository
git clone https://github.com/prateek0128/ecommerce-website.git
cd e-commerce-web

# Install dependencies
npm install

# Start the development server
npm run dev
```

App runs at `http://localhost:5173` by default.

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Features Implemented

- **Product Listing** — Fetches all products from the Platzi Fake Store API and displays them as cards on the home page.
- **Category Filter** — Multi-select dropdown to filter products by one or more categories (fetched dynamically from the API).
- **Sort** — Sort products by price (low→high, high→low) or name (A→Z, Z→A).
- **Pagination** — Client-side pagination with 10 products per page; scrolls to top on page change.
- **Product Details** — Dedicated page per product showing image, title, price, description, and quantity selector.
- **Add to Cart** — Select quantity and add a product to the cart from the details page.
- **Cart Page** — View all cart items, see per-item quantity, total item count, and total price. Remove individual items with a fade-out animation.
- **Persistent Cart** — Cart state is saved to `localStorage` and restored on page reload.
- **Toast Notifications** — Snackbar feedback on add-to-cart and remove-from-cart actions.
- **Back Navigation** — "Back" button on detail and cart pages returns to the previous route.

---

## Assumptions Made

- The Platzi Fake Store API (`https://api.escuelajs.co/api/v1`) is publicly accessible and does not require authentication.
- Sorting and pagination are handled client-side after fetching all products (the API does not guarantee stable server-side sorting).
- When multiple categories are selected, products are fetched per category in parallel and deduplicated by `id`.
- No checkout or payment flow is in scope — the cart is the final step.
- Product images use the first URL in the `images` array returned by the API; broken image URLs are handled by the browser's default fallback.
- The app is single-user with no authentication; cart data is stored in the browser's `localStorage`.
