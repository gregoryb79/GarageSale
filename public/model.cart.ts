export type CartItem = {
    itemId: string;
    quantity: number; 
    itemName: string;
    itemPrice: number; 
}

// export type ReturnCart =  {itemId : string, quantity: number, itemName: string, itemPrice: number}[];
export async function getCart(): Promise<CartItem[]> {
    console.log("getCart starts"); 
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`/cart`, {
            headers: {
                "Authorization": `Bearer ${token}`, 
                "content-type": "application/json"
            }
        });
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to get cart. Status: ${res.status}. Message: ${message}`);
        }        
        const cart = await res.json() as CartItem[];
        console.log("Cart found:", cart);         
        
        return cart;

    }catch (error) {
        console.error("Error getting wishlist:", error);
        return [];        
    } 
}

export async function addToCart(itemId: string,quantity : number): Promise<void> {
    console.log(`addToCart with itemId = "${itemId}" starts`);
    const token = localStorage.getItem('token');
    const body = JSON.stringify({itemId: itemId, quantity: quantity});
    console.log(`body: ${body}`);

    try {
        const res = await fetch(`/cart`, {
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
        console.error("Error adding item to cart:", error);        
        throw error;        
    } 
}

export async function deleteFromCart(itemId: string): Promise<void> {
    console.log(`deleteFromCart with itemId = "${itemId}" starts`);
    const token = localStorage.getItem('token');

    try {
        const res = await fetch(`/cart/${itemId}`, {
            method: "delete",           
            headers: {
                "Authorization": `Bearer ${token}`,
                "content-type": "application/json"
            }
        });
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to delete item from cart. Status: ${res.status}. Message: ${message}`);
        }        
    }catch (error) {
        console.error("Error deleting item from cart:", error);        
        throw error;        
    } 
}


