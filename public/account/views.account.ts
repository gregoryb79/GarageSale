import { deleteFromWishlist, getWishlist, addToWishList} from "../model.wishlist.js";
import {addToCart} from "../model.cart.js";
export async function index(wishlist: HTMLElement){

    console.log("account page");

    await renderItems(); 

    wishlist.addEventListener("click", async (event) => {
        const target = event.target as HTMLElement;

        const listItem = target.closest("li.wishlist-item");
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
            if (button.textContent === "Move to Cart") {                
                console.log(`Adding item ${itemId} to cart...`);
                try {
                    await addToCart(itemId,quantity);
                    console.log(`${quantity} of item ${itemId} added to cart successfully.`);
                    await deleteFromWishlist(itemId); 
                    console.log(`Item ${itemId} removed from wishlist after adding to cart.`);
                    if (quantity > 1){
                        alert("Items moved to your shopping cart.");
                    }else{
                        alert("Item moved to your shopping cart.");
                    }
                    await renderItems();
                } catch (error) {
                    console.error(`Error adding item ${itemId} to cart:`, error);
                    alert("Failed to mpoe to cart. Please try again.");
                }
            } else if (button.textContent === "Remove") {                
                console.log(`Deleting item ${itemId} from wishlist...`);
                try {
                    await deleteFromWishlist(itemId);
                    console.log(`Item ${itemId} deleted from wishlist successfully.`);
                    await renderItems();
                } catch (error) {
                    console.error(`Error deleting item ${itemId} from wishlist:`, error);
                    alert("Failed to remove item. Please try again.");
                }
            } else if (button.textContent === "-") {
                console.log(`Decreasing quantity of item ${itemId} in wishlist...`);
                if (quantity > 1){
                    try {
                        await addToWishList(itemId, (-1));
                        quantityElement.textContent = ` ${(quantity - 1).toFixed(0)} `;
                        console.log(`Quantity of item ${itemId} decreased successfully.`);                        
                    } catch (error) {
                        console.error(`Error decreasing quantity of item ${itemId}:`, error);
                        alert("Failed to decrease quantity. Please try again.");
                    }
                }else{
                    try{
                        await deleteFromWishlist(itemId);
                        console.log(`Item ${itemId} deleted from wishlist successfully.`);
                        await renderItems();
                    }catch (error) {
                        console.error(`Error deleting item (q = 0) ${itemId} from wishlist:`, error);
                        alert("Failed to decrease quantity. Please try again.");
                    }                    
                }
            } else if (button.textContent === "+") {
                console.log(`Increasing quantity of item ${itemId} in wishlist...`);
                try {
                    await addToWishList(itemId,1);
                    quantityElement.textContent = ` ${(quantity + 1).toFixed(0)} `;
                    console.log(`Quantity of item ${itemId} increased successfully.`);                        
                } catch (error) {
                    console.error(`Error increasing quantity of item ${itemId}:`, error);
                    alert("Failed to increase quantity. Please try again.");
                }                
            }
        }
        
    });


    async function renderItems() {
        try{
            const items = await getWishlist();            
            console.log(items);
    
            if(items.length > 0) {              
                wishlist.innerHTML = items
                    .map((item) => `                                
                                    <li class="wishlist-item" data-id="${item.itemId}">
                                        <p>${item.itemName}</p>
                                        <div class="quantityCluster">
                                            <button>-</button>
                                            <p> ${item.quantity} </p>
                                            <button>+</button>
                                        </div>                
                                        <button>Move to Cart</button>
                                        <button>Remove</button>
                                    </li>
                                    `)
                    .join("\n");
            }else{
                wishlist.innerHTML = "<h3>Your wishlist is empty...</h3>";
            }                
        }catch(error){
            console.error(error);
            wishlist.innerHTML = "<h3>Oops, something went wrong, please retry...</h3>";
        }     
    }
        
}

