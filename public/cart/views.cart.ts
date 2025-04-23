// import { deleteFromWishlist, getWishlist, updateQuantityInWishlist} from "./model.account.js";
import {getCart, deleteFromCart, addToCart} from "../model.cart.js";

export async function index(cart: HTMLElement, totalPrice: HTMLElement) {

    console.log("cart page");

    await renderItems(); 

    cart.addEventListener("click", async (event) => {
        const target = event.target as HTMLElement;

        const listItem = target.closest("li.cart-item");
        if (!listItem) return; 
        
        const itemId = listItem.getAttribute("data-id");
        console.log(`itemId: ${itemId} clicked`);
        
        if (!itemId) return;       
        const quantityElement = listItem.querySelector("div.quantityCluster p");
        if (!quantityElement) return; 
        const quantity = parseInt(quantityElement.textContent || "0", 0);
        console.log(`Quantity for item ${itemId}: ${quantity}`);

        if (target.matches('button')) {
            const button = target as HTMLButtonElement;
            console.log(`Button clicked in item ${itemId}, text: ${button.textContent}`);

            if (button.textContent === "Remove") {                
                console.log(`Deleting item ${itemId} from cart...`);
                try {
                    await deleteFromCart(itemId);
                    console.log(`Item ${itemId} deleted from cart successfully.`);                    
                    await renderItems();
                } catch (error) {
                    console.error(`Error deleting item ${itemId} from cart:`, error);
                    alert("Failed to remove item. Please try again.");
                }
            } else if (button.textContent === "-") {
                console.log(`Decreasing quantity of item ${itemId} in cart...`);
                if (quantity > 1){
                    try {
                        await addToCart(itemId, (-1));                        
                        console.log(`Quantity of item ${itemId} decreased successfully.`); 
                        await renderItems();
                    } catch (error) {
                        console.error(`Error decreasing quantity of item ${itemId}:`, error);
                        alert("Failed to decrease quantity. Please try again.");
                    }
                }else{
                    try{
                        await deleteFromCart(itemId);
                        console.log(`Item ${itemId} deleted from cart successfully.`);
                        await renderItems();
                    }catch (error) {
                        console.error(`Error deleting item (q = 0) ${itemId} from cart:`, error);
                        alert("Failed to decrease quantity. Please try again.");
                    }                    
                }
            } else if (button.textContent === "+") {
                console.log(`Increasing quantity of item ${itemId} in cart...`);
                try {
                    await addToCart(itemId,1);                    
                    console.log(`Quantity of item ${itemId} increased successfully.`);                        
                    await renderItems();
                } catch (error) {
                    console.error(`Error increasing quantity of item ${itemId}:`, error);
                    alert("Failed to increase quantity. Please try again.");
                }                
            }
        }
        
    });


    async function renderItems() {  
         
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found in local storage. User is not logged in.");
            cart.innerHTML = "<h3>Please log in to see your cart...</h3>";
            return;
        }

        try {
            const items = await getCart();
            console.log(items);

            const total = items.reduce((sum, item) => sum + item.quantity * item.itemPrice, 0);                        
              totalPrice.textContent = `Total Price: $${total.toFixed(2)}`;

            if(items.length > 0) {              
                cart.innerHTML = items
                    .map((item) => `                                
                                    <li class="cart-item" data-id="${item.itemId}">
                                        <p>${item.itemName} - Price: $${item.itemPrice}</p>
                                        <button>Remove</button>
                                        <div class="quantityCluster">
                                            <button>-</button>
                                            <p> ${item.quantity} </p>
                                            <button>+</button>
                                        </div>                                                        
                                    </li>
                                    `)
                    .join("\n");
            }else{
                cart.innerHTML = "<h3>Your cart is empty...</h3>";
            } 
        }catch(error){
            console.error(error);
            cart.innerHTML = "<h3>Oops, something went wrong, please retry...</h3>";
        }                         
    }        
}

