
# GarageSale API

---

## Auth
- `POST /auth/register` – Register a new user
- `POST /auth/login` – Log in an existing user
- `GET /auth/me` – Get authenticated user profile

---

## Users
- `GET /users/:id` – Get user by ID
- `GET /users/:id/cart` – Get user's cart
- `GET /users/:id/wishlist` – Get user's wishlist

---

## Items
- `GET /items` – Get all store items
- `POST /items` – Add new item (admin only)
- `GET /items/:id` – Get item by ID
- `PUT /items/:id` – Edit item info (admin only)
- `DELETE /items/:id` – Delete an item

---

## Cart
- `GET /cart` – Get current user's cart
- `POST
