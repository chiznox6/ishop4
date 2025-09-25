# iShop4U - Unified Affiliate Shopping Cart

## Overview

iShop4U is a full-stack e-commerce application designed to provide a seamless shopping experience by unifying products from various affiliate sources into a single cart. It leverages a robust Flask API backend with a dynamic React frontend, focusing on efficient product browsing, cart management, and a streamlined checkout process through affiliate platforms.

The project emphasizes key learning goals including; using a Flask API backend with a React frontend, implementing complex data models and relationships, performing full CRUD operations, and connecting client and server using `fetch()`.

## Features

### 1. User Browses Products
*   Products are retrieved from mock affiliate APIs (simulating Amazon PA-API, AliExpress API, etc.) or can be considered as entered manually through stored affiliate links.
*   Product data is stored in the backend database and displayed on the `/shop` page.
*   Each product includes an “Add to iShop4U Cart” button.

### 2. Add to Cart
*   When the "Add to Cart" button is clicked, the selected product is added to the user's cart (represented by an `Order` and `OrderItem` in the database) with details such as `product_id`, `user_id`, and `quantity`.
*   Cart data updates dynamically in the frontend, providing immediate feedback to the user.
*   Users can view a summary of their selected items, including the total count in the navigation bar.

### 3. Cart Page
*   Located at the `/cart` route, this page displays all products the user has added to their cart.
*   Each product entry includes:
    *   Name, image, price, source (implicitly from product details), and a “Go to Buy” button.
*   Users have the flexibility to update the quantity of each item or remove items entirely from their cart.
*   Example “Go to Buy” buttons:
    *   "Buy on Amazon" → Designed to open the affiliate link for that product.
    *   "Buy on AliExpress" → Designed to open the affiliate link for that product.

### 4. Checkout Flow
*   The checkout process is completed externally on the respective affiliate platforms.
*   iShop4U facilitates this by providing:
    *   **Open All in Tabs:** A feature to open each affiliate product link in a new browser tab, allowing the user to complete purchases on the original sites.
    *   **Copy Checkout List:** Generates a convenient list of all affiliate links for the user to copy and use.
*   **Important:** iShop4U7 does not handle payments directly, ensuring simplicity and compliance with affiliate program terms.

## Benefits

*   **Unified Shopping Cart:** Provides a single, convenient cart for products sourced from multiple affiliate platforms.
*   **Preserves Affiliate Commission Structure:** Designed to seamlessly redirect users to affiliate sites, ensuring proper commission tracking.
*   **User-Friendly Shopping Hub:** Offers a centralized and intuitive experience for discovering and managing products.
*   **Full-Stack Alignment:** Fully aligned with Flask + React stack requirements, demonstrating robust full-stack development principles.

## Bottom Line

iShop4U maintains a mirror cart by storing product and cart data locally in its backend database. The actual checkout process is handled by redirecting users via affiliate links, ensuring a simple, compliant, and effective shopping solution.

## Technologies Used

**Backend:**
*   Python 3
*   Flask
*   SQLAlchemy (ORM)
*   Flask-Migrate (Database migrations)
*   Flask-Bcrypt (Password hashing)
*   Flask-CORS (Cross-Origin Resource Sharing)
*   SQLAlchemy-Serializer (JSON serialization)
*   Faker (for seeding data)

**Frontend:**
*   React.js
*   React Router DOM (Client-side routing)
*   Formik & Yup (Form management and validation)
*   Tailwind CSS (Styling - inferred from `tailwind.config.js`)
*   Lucide React (Icons - inferred from `Layout.jsx`)
*   Vite (Build tool)

## Data Models & Relationships

The backend database is structured with the following key models and relationships:

*   **`User`**: Represents application users.
    *   One-to-Many with `Order` (a user can have multiple orders/carts).
*   **`AffiliateSource`**: Stores information about different affiliate platforms.
    *   One-to-Many with `Product` (an affiliate source can have many products).
*   **`Product`**: Details of products available in the store.
    *   One-to-Many with `OrderItem` (a product can be part of multiple order items).
*   **`Order`**: Represents a user's shopping cart or a placed order.
    *   One-to-Many with `OrderItem` (an order contains multiple order items).
    *   Many-to-Many with `Product` through `OrderItem` (an order can contain many products, and a product can be in many orders).
*   **`OrderItem`**: An association model linking `Order` and `Product`.
    *   Contains `quantity` (user-submittable) and `price` attributes.
*   **`SalesData`**: Stores monthly sales figures for business overview.
*   **`ProductCategoryData`**: Stores product count per category for business overview.
*   **`ShipmentSummaryData`**: Stores key metrics for shipment overview.
*   **`MockAmazonProduct`**: Stores mock data to simulate Amazon products for frontend display and search.

## Folder Structure

```
/project-phase-4/
├───.git/
├───backend/
│   ├───app.db
│   ├───app.py
│   ├───config.py
│   ├───models.py
│   ├───requirements.txt
│   ├───seed.py
│   ├───migrations/
│   └───venv/
├───node_modules/
├───public/
├───src/
│   ├───App.css
│   ├───App.jsx
│   ├───index.css
│   ├───main.jsx
│   ├───assets/
│   ├───components/
│   │   ├───Breadcrumbs.jsx
│   │   ├───BusinessOverview.jsx
│   │   ├───Dashboard.jsx
│   │   ├───DonutChart.jsx
│   │   ├───ItemsShipped.jsx
│   │   ├───Layout.jsx
│   │   ├───LevelComparison.jsx
│   │   ├───ProductForm.jsx
│   │   ├───SalesGraph.jsx
│   │   ├───ShipmentSummary.jsx
│   │   ├───Sidebar.jsx
│   │   └───TopProducts.jsx
│   ├───pages/
│   │   ├───BrandsPage.jsx
│   │   ├───CartPage.jsx
│   │   ├───CheckoutPage.jsx
│   │   ├───DealsPage.jsx
│   │   ├───DonutChartPage.jsx
│   │   ├───HomePage.jsx
│   │   ├───ItemsShippedPage.jsx
│   │   ├───LevelComparisonPage.jsx
│   │   ├───LoginPage.jsx
│   │   ├───OrderConfirmationPage.jsx
│   │   ├───SalesGraphPage.jsx
│   │   ├───ShipmentSummaryPage.jsx
│   │   ├───ShopPage.jsx
│   │   └───TopProductsPage.jsx
│   └───services/
│       └───api.jsx
├───.eslintrc.cjs
├───.gitignore
├───eslint.config.js
├───HOMEPAGE_REDESIGN.md
├───HOW_TO_RUN.md
├───index.html
├───package-lock.json
├───package.json
├───postcss.config.js
├───README.md
├───REQUIREMENTS_CHECK.md
├───start-app.sh
├───tailwind.config.js
├───vite.config.js
└───WARP.md
```

## Setup and Installation

Follow these steps to get the iShop4U application up and running on your local machine.

### 1. Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Create and activate a Python virtual environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```
3.  **Install backend dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Clean up existing database and migrations (if any, for a fresh start):**
    ```bash
    rm app.db
    rm -rf migrations/versions/*
    ```
5.  **Generate and apply database migrations:**
    ```bash
    flask db migrate -m "Initial migration with all models"
    flask db upgrade
    ```
6.  **Seed the database with sample data:**
    ```bash
    python seed.py
    ```
7.  **Start the Flask backend server:**
    ```bash
    python app.py
    ```
    *   The backend will run on `http://127.0.0.1:5555`. Keep this terminal open.

### 2. Frontend Setup

1.  **Open a new terminal window and navigate to the project root directory:**
    ```bash
    cd /home/james/project-phase-4
    ```
2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```
3.  **Start the React development server:**
    ```bash
    npm run dev
    ```
    *   The frontend will typically run on `http://localhost:5173`.

## Usage

Once both the backend and frontend servers are running, open your web browser and navigate to the frontend URL (e.g., `http://localhost:5173`).

*   **Browse Products:** Explore the `/shop` page to see products.
*   **Authentication:** Use the `/login` page to sign up or log in.
*   **Cart Management:** Add products to your cart, view and manage them on the `/cart` page.
*   **Checkout:** Proceed to checkout from the cart page, which will guide you through the affiliate platform redirection.
*   **Dashboard:** Visit the `/dashboard` to see business overview data.

## Contributing

Feel free to fork the repository and contribute.

## License

[Specify your license here, e.g., MIT License]

## Contact

**Project Lead:** James Kariuki
**Team Members:**
*   Rubil Mogere
*   Dorothy Wanjiru
*   Mary Nyarangi
*   Alex Kamau