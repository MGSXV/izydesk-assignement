# izydesk-assignement

## Description

This project is an e-commerce platform developed as part of a technical assignment. It includes both frontend and backend components to manage products, orders, and handle payments via Stripe.

## Architecture

The application follows a microservices architecture, with separate services for the frontend and backend. This design enhances scalability and maintainability.

## Technologies

### Frontend

*   **ReactJS:** A JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **TailwindCSS:** A utility-first CSS framework for rapidly styling custom designs.
*   **Vite:** A fast build tool that aims to provide a faster and leaner development experience for modern web projects.
*   **ShadCN:** Re-usable components that you can copy and paste into your apps.

### Backend

*   **Php 8.2:** The server-side scripting language.
*   **Symfony 6:** A PHP framework for web and API development.
*   **Nginx:** A web server that can also be used as a reverse proxy, load balancer, HTTP cache, and web accelerator.
*   **PostgrSQL:** A powerful, open source relational database system.
*   **PgAdmin:** A popular and powerful open source administration and development platform for PostgreSQL.

### Infrastructure

*   **Docker:** A platform for building, shipping, and running applications in containers.
*   **Docker Compose:** A tool for defining and running multi-container Docker applications.

## How to Run

1.  Clone the repository:

    ```bash
    git clone [https://github.com/](https://github.com/)<your-username>/izydesk-assignement.git
    ```
2.  Navigate to the project directory:

    ```bash
    cd izydesk-assignement
    ```
3.  Run the setup script:

    ```bash
    chmod +x run.sh
    ./run.sh
    ```

    This script will start the Docker containers and install the necessary dependencies.

4. Register using Postman (or any alternative) to the Route `/api/auth/register` to start using.

## Features

### Core Functionalities

*   **Product Listing:** Displays a variety of products with details.
*   **Product Details:** Detailed view of individual products.
*   **Shopping Cart:** Add, modify, and remove items from the cart.
*   **Order System:** Form to validate and process orders.
*   **Stripe Integration:** Secure payment processing. (There are a lot of bugs here!!!)

### Back-office

*   **Product Management:** Create, edit, and delete products.
*   **Category Management:** Organize products into categories.
*   **Order Overview:** View past orders with details.

## Areas for Improvement

*   **Backend Input Validation:** Implement more robust validation for data inputs on the backend.
*   **Pagination:** Add pagination to optimize data requests and improve performance.
*   **Error Handling and Logging:** Enhance error handling and logging for better debugging and maintenance.
*   **Frontend Performance:** Optimize frontend performance for smoother user experience.
*   **Security Measures:** Implement additional security measures to protect against common web vulnerabilities.
*   **Docker Optimization:** Optimize Docker setup for production deployment.
*   **React Components Abstraction:** Create more abstractions for React components to improve code reusability and maintainability.

## Additional Notes

*   **Stripe Configuration:** Ensure to configure Stripe API keys in the appropriate environment variables.
*   **Database Migration:** Run database migrations if necessary.
*   **Testing:** Instructions on how to run tests.

This README provides a comprehensive overview of the project, its features, and how to run it. Remember to replace the placeholders with your actual information.