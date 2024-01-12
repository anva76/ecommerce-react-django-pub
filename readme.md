# E-Commerce web application

## E-Commerce application overview

This is a demo project that implements a web store application.

The frontend part of this project was created by using React and the Vite development server while the backend API server is based on the Django REST framework and PostgreSQL. To implement authentication, the standard Django token authentication module was used.

## Backend API endpoints

### Products (public)

`GET` /api/products/\[?search|sort|category|max_price|min_price|color|brand|category=<value>\]

`GET` /api/products/{id}

### Brands (public)

`GET` /api/brands

### Categories (public)

`GET` /api/categories

`GET` /api/categories/{id}

### Orders (private)

`GET` /api/orders

`POST` /api/orders

`GET` /api/orders/{id}

### User

**Public**

`POST` /api/user/create

**Private**

`POST` /api/user/token/

`GET` /api/user/me/

`PATCH` /api/user/me/




