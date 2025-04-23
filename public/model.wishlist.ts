// import {items as tempItems, cart as tempCart, wishlist as tempUserWishlist} from "./devtemps.js"
// import {getItem} from "./model.items.js"

export type WishlistItem = {
    itemId: string;
    quantity: number; 
    itemName: string;
    itemPrice: number; 
}

export async function addToWishList(itemId: string, quantity : number): Promise<void> {
    console.log(`addToWishList with itemId = "${itemId}" starts`);
    const body = JSON.stringify({itemId: itemId, quantity: quantity});
    console.log(`body: ${body}`);
    const token = localStorage.getItem('token');

    try {
        const res = await fetch(`/wishlist`, {
            method: "post",
            body: body,
            headers: {
                "Authorization": `Bearer ${token}`,
                "content-type": "application/json"
            }
        });
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to add item to cart. Status: ${res.status}. Message: ${message}`);
        }        
    }catch (error) {
        console.error("Error adding item to wishlist:", error);        
        throw error;        
    } 
}

// export type ReturnWishlist = { itemId: string, quantity: number, itemName: string }[];
export async function getWishlist(): Promise<WishlistItem[]> {
    console.log("getWishlist starts");    
    const token = localStorage.getItem('token');

    try {
        const res = await fetch(`/wishlist`, {
            headers: {
                "Authorization": `Bearer ${token}`, // Include the token
                "content-type": "application/json"
            }
        });
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to get wishlist. Status: ${res.status}. Message: ${message}`);
        }        
        const wishlist = await res.json() as WishlistItem[];         
        console.log("Wishlist found:", wishlist);
        
        return wishlist;

    }catch (error) {
        console.error("Error getting wishlist:", error);
        return [];        
    } 
}

// export async function updateQuantityInWishlist(itemId: string, quantity: number): Promise<void> {
//     console.log(`updateQuantityInWishlist with itemId = "${itemId}" and quantity = "${quantity}" starts`);
//     const body = JSON.stringify({itemId: itemId, quantity: quantity});
//     console.log(`body: ${body}`);
//     const token = localStorage.getItem('token');

//     try {
//         const res = await fetch(`/wishlist`, {
//             method: "post",
//             body: body,
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "content-type": "application/json"
//             }
//         });
//         if (!res.ok) {
//             const message = await res.text();             
//             throw new Error(`Failed to update quantity in wishlist. Status: ${res.status}. Message: ${message}`);
//         }        
//     }catch (error) {
//         console.error("Error updating quantity in wishlist:", error);        
//         throw error;        
//     } 
// }

export async function deleteFromWishlist(itemId: string): Promise<void> {
    console.log(`deleteFromWishlist with itemId = "${itemId}" starts`);
    const token = localStorage.getItem('token');

    try {
        const res = await fetch(`/wishlist/${itemId}`, {
            method: "delete",           
            headers: {
                "Authorization": `Bearer ${token}`,
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




