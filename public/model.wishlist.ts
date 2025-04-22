import {items as tempItems, cart as tempCart, wishlist as tempUserWishlist} from "./devtemps.js"
import {getItem} from "./model.items.js"

export type Wishlist = {
    _id: string;
    userId: string; 
    items: {itemId : string,
            quantity: number}[];
    createdAt?: string; 
    updatedAt?: string; 
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

export type ReturnWishlist = { itemId: string, quantity: number, itemName: string }[];
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
            try {
                const itemDetails = await getItem(item.itemId);
                if (!itemDetails) {
                    console.error(`Item with ID ${item.itemId} not found.`);
                    continue;
                }
                const itemId = item.itemId;
                const quantity = item.quantity;
                const itemName = itemDetails.name;
                userWishlist.push({itemId, quantity, itemName});
            }catch (error) {
                console.error(`Error fetching item details for ID ${item.itemId}:`, error);
                continue;
            }                      
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




