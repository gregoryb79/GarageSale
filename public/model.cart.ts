import {items as tempItems, cart as tempCart, wishlist as tempUserWishlist} from "./devtemps.js"
import {getItem} from "./model.items.js"
// import {Item, Cart, Wishlist, ReturnCart} from "./model.js"

export type Cart = {
    _id: string;
    userId: string; 
    items: {itemId : string,
        quantity: number}[];
    createdAt?: string; 
    updatedAt?: string; 
}

export type ReturnCart =  {itemId : string, quantity: number, itemName: string, itemPrice: number}[];
export async function getCart(): Promise<ReturnCart|[]> {
    console.log("getWishlist starts");    
    try {
        const res = await fetch(`/cart`);
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to get cart. Status: ${res.status}. Message: ${message}`);
        }        
        const cart = await res.json() as Cart;         
        const items = cart.items; 
        const userCart : ReturnCart = [];
        for (const item of items) {
            try {
                const itemDetails = await getItem(item.itemId);
                if (!itemDetails) {
                    console.error(`Item with ID ${item.itemId} not found.`);
                    continue;
                }
                const itemId = item.itemId;
                const quantity = item.quantity;
                const itemName = itemDetails.name;
                const itemPrice = itemDetails.price;
                userCart.push({itemId, quantity, itemName, itemPrice});
            }catch (error) {
                console.error(`Error fetching item details for ID ${item.itemId}:`, error);
                continue;
            } 
            
        }
        return userCart;

    }catch (error) {
        // console.error("Error getting wishlist:", error);
        return tempCart;        
    } 
}

export async function addToCart(itemId: string,quantity : number): Promise<void> {
    console.log(`addToCart with itemId = "${itemId}" starts`);
    const body = JSON.stringify({itemId: itemId, quantity: quantity});
    console.log(`body: ${body}`);

    try {
        const res = await fetch(`/cart`, {
            method: "post",
            body: body,
            headers: {
                "content-type": "application/json"
            }
        });
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to add item to cart. Status: ${res.status}. Message: ${message}`);
        }        
    }catch (error) {
        console.error("Error adding item to cart:", error);        
        throw error;        
    } 
}

export async function updateQuantityInCart(itemId: string, quantity: number): Promise<void> {
    console.log(`updateQuantityInCart with itemId = "${itemId}" and quantity = "${quantity}" starts`);
    const body = JSON.stringify({itemId: itemId, quantity: quantity});
    console.log(`body: ${body}`);

    try {
        const res = await fetch(`/cart`, {
            method: "post",
            body: body,
            headers: {
                "content-type": "application/json"
            }
        });
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to update quantity in cart. Status: ${res.status}. Message: ${message}`);
        }        
    }catch (error) {
        console.error("Error updating quantity in cart:", error);        
        throw error;        
    } 
}

export async function deleteFromCart(itemId: string): Promise<void> {
    console.log(`deleteFromCart with itemId = "${itemId}" starts`);    ;

    try {
        const res = await fetch(`/cart/${itemId}`, {
            method: "delete",           
            headers: {
                "content-type": "application/json"
            }
        });
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to delete item from wishlist. Status: ${res.status}. Message: ${message}`);
        }        
    }catch (error) {
        console.error("Error deleting item from wishlist:", error);        
        throw error;        
    } 
}


