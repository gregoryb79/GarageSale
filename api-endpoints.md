
# GarageSale API

---

## Auth
- `POST /auth/register` – Register a new user
- `POST /auth/login` – Log in an existing user
- `GET /auth/me` – Get authenticated user profile

---

## Users
- `GET /users/:id` – Get user by ID
<!-- - `GET /users/:id/cart` – Get user's cart
- `GET /users/:id/wishlist` – Get user's wishlist --> i don't think we even need it, we allways work with current user

---

## Items
- `GET /items` – Get all store items
- `GET /items?search=query` - Get store items that answer to query in name|description|category
- `POST /items` – Add new item (admin only)
- `GET /items/:id` – Get item by ID
- `PUT /items/:id` – Edit item info (admin only)
- `DELETE /items/:id` – Delete an item

---

## Cart
- `GET /cart` – Get current user's cart
- `POST /cart` - add item to current user's cart

## Wishlist
- `GET /wishlist` – Get current user's wishlist
- `POST /wishlist` - add item to current user's wishlist