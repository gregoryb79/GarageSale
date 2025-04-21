import {items as tempItems, cart as tempCart, wishlist as tempWishlist} from "../devtemps.js"
import {Item, Cart, Wishlist} from "../model.js"

export async function getItems(query: string): Promise<Item[]> {
    console.log(`getItems with query = "${query}" starts`);
    try {
        const res = await fetch(`/items${query}`);
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to get items. Status: ${res.status}. Message: ${message}`);
        }        
        const items = await res.json() as Item[]; 
        return items; 
    }catch (error) {
        console.error("Error getting items:", error);
        return tempItems;        
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

export async function addToWishList(itemId: string, quantity : number): Promise<void> {
    console.log(`addToWishList with itemId = "${itemId}" starts`);
    const body = JSON.stringify({itemId: itemId, quantity: quantity});
    console.log(`body: ${body}`);

    try {
        const res = await fetch(`/wishlist`, {
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

