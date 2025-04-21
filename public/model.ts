import {items as tempItems, cart as tempCart, wishlist as tempWishlist} from "./devtemps.js"









export type User = {
    _id: string;
    email: string;
    password: string;
}

let currentUser: User = {
    _id: "",
    email: "",
    password: ""
  };

// try {
//    currentUser = await getMe(); 
// }catch (error) {
//     console.error("Error getting user:", error);
// }



export async function doLogout() {
    console.log("doLogout starts");    
    try {
        const res = await fetch("/auth/logout");
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to logout. Status: ${res.status}. Message: ${message}`);
        }        
    }catch (error) {
        console.error("Error logging out:", error);
        throw error;        
    } 
}

export async function doLogIn(email : string, password: string): Promise<void> {

    console.log(`doLogIn starts with: ${email} - ${password}`);
    
    const credentials = {
        email: email,
        password: password,
    };    
  
    const body = JSON.stringify(credentials);
    console.log(`body: ${body}`);
  
    try{
        const res = await fetch(`/auth/login`, {
            method: "post",
            body,
            headers: {
                "content-type": "application/json"
            }
        });
        if (!res.ok) {
            const message = await res.text(); 
            console.log(`Failed to log in. Status: ${res.status}. Message: ${message}`);
            throw new Error(message);
        }
        console.log(`loged in with: ${email} - ${password}`);
        
    }catch(error){
        console.error(`Error logging in`, error);  
        throw error;      
    }    
}



export async function getCart(): Promise<ReturnCart|[]> {
    console.log("getCart starts");    
    try {
        const res = await fetch(`/cart`);
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to get cart. Status: ${res.status}. Message: ${message}`);
        }        
        const cart = await res.json() as Cart; 
        return cart.items; 
    }catch (error) {
        console.error("Error getting cart:", error);
        return tempCart;     
    } 
}

export async function getWishlist(): Promise<ReturnWishlist|[]> {
    console.log("getWishlist starts");    
    try {
        const res = await fetch(`/wishlist`);
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to get wishlist. Status: ${res.status}. Message: ${message}`);
        }        
        const wishlist = await res.json() as Wishlist; 
        return wishlist.items; 
    }catch (error) {
        console.error("Error getting wishlist:", error);
        return tempWishlist;        
    } 
}

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

export async function addToCart(itemId: string): Promise<void> {
    console.log(`addToCart with itemId = "${itemId}" starts`);
    const body = JSON.stringify({itemId: itemId});
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

export async function addToWishList(itemId: string): Promise<void> {
    console.log(`addToWishList with itemId = "${itemId}" starts`);
    const body = JSON.stringify({itemId: itemId});
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

async function getMe(): Promise<User>{
    console.log("getMe starts");    
    try {
        const res = await fetch("/auth/me");
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to get user. Status: ${res.status}. Message: ${message}`);
        }        
        const user = await res.json() as User; 
        return user; 
    }catch (error) {
        console.error("Error getting user:", error);
        throw error;        
    }
}
