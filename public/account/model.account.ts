import { get } from "http";
import {items as tempItems, cart as tempCart, wishlist as tempUserWishlist} from "../devtemps.js"
import {Item, Cart, Wishlist, ReturnWishlist} from "../model.js"

export async function getWishlist(): Promise<ReturnWishlist|[]> {
    console.log("getWishlist starts");    
    try {
        const res = await fetch(`/wishlist`);
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to get wishlist. Status: ${res.status}. Message: ${message}`);
        }        
        const wishlist = await res.json() as Wishlist;         
        const items = wishlist.items; 
        const userWishlist : ReturnWishlist = [];
        for (const item of items) {
            const itemId = item.itemId;
            const quantity = item.quantity;
            const itemName = await getItemName(itemId);
            userWishlist.push({itemId, quantity, itemName});
        }
        return userWishlist;

    }catch (error) {
        // console.error("Error getting wishlist:", error);
        return tempUserWishlist;        
    } 
}

export async function updateQuantityInWishlist(itemId: string, quantity: number): Promise<void> {
    console.log(`updateQuantityInWishlist with itemId = "${itemId}" and quantity = "${quantity}" starts`);
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
            throw new Error(`Failed to update quantity in wishlist. Status: ${res.status}. Message: ${message}`);
        }        
    }catch (error) {
        console.error("Error updating quantity in wishlist:", error);        
        throw error;        
    } 
}

export async function deleteFromWishlist(itemId: string): Promise<void> {
    console.log(`deleteFromWishlist with itemId = "${itemId}" starts`);    ;

    try {
        const res = await fetch(`/wishlist/${itemId}`, {
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

async function getItemName(itemId: string): Promise<string> {
    console.log(`getItemName with itemId = "${itemId}" starts`);
    try {
        const res = await fetch(`/items/${itemId}`);
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to get item name. Status: ${res.status}. Message: ${message}`);
        }        
        const item = await res.json() as Item; 
        return item.name;
    }catch (error) {
        console.error("Error getting item name:", error);
        return "";        
    }
}

