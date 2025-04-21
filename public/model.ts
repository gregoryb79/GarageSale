export type Item = {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageurl: string;
    stock: number;
    category: string
    createdAt?: string;
    updatedAt?: string;
  };

type Cart = {
    _id: string;
    userId: string; 
    items: [{itemId : string,
        quantity: number}];
    createdAt?: string; 
    updatedAt?: string; 
}

type Wishlist = {
    _id: string;
    userId: string; 
    items: [{itemId : string,
            quantity: number}];
    createdAt?: string; 
    updatedAt?: string; 
}

type User = {
    _id: string;
    email: string;
    password: string;
}

let currentUser: User = {
    _id: "",
    email: "",
    password: ""
  };

try {
   currentUser = await getMe(); 
}catch (error) {
    console.error("Error getting user:", error);
}



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


export type ReturnCart =  [{itemId : string, quantity: number}];
export async function getCart(): Promise<ReturnCart|[]> {
    console.log("getCart starts");    
    try {
        const res = await fetch(`/users/${currentUser._id}/cart`);
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to get cart. Status: ${res.status}. Message: ${message}`);
        }        
        const cart = await res.json() as Cart; 
        return cart.items; 
    }catch (error) {
        console.error("Error getting cart:", error);
        return [];     
    } 
}

export type ReturnWishlist = [{itemId : string, quantity: number}];
export async function getWishlist(): Promise<ReturnWishlist|[]> {
    console.log("getWishlist starts");    
    try {
        const res = await fetch(`/users/${currentUser._id}/wishlist`);
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to get wishlist. Status: ${res.status}. Message: ${message}`);
        }        
        const wishlist = await res.json() as Wishlist; 
        return wishlist.items; 
    }catch (error) {
        console.error("Error getting wishlist:", error);
        return [];        
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
        return [];        
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