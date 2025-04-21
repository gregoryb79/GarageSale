import { deleteFromWishlist, getWishlist, updateQuantityInWishlist} from "./model.account.js";
import {addToCart} from "../home/model.home.js";
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
        if (target.matches('button')) {
            const button = target as HTMLButtonElement;
            console.log(`Button clicked in item ${itemId}, text: ${button.textContent}`);
            if (button.textContent === "Add to Cart") {                
                console.log(`Adding item ${itemId} to cart...`);
                try {
                    // await addToCart(itemId);
                    console.log(`Item ${itemId} added to cart successfully.`);
                    alert("Item added to your shopping cart.");
                } catch (error) {
                    console.error(`Error adding item ${itemId} to cart:`, error);
                    alert("Failed to add item to cart. Please try again.");
                }
            } else if (button.textContent === "Add to Wishlist") {                
                console.log(`Adding item ${itemId} to wishlist...`);
                try {
                    // await addToWishList(itemId);
                    console.log(`Item ${itemId} added to wishlist successfully.`);
                    alert("Item added to your wishlist.");
                } catch (error) {
                    console.error(`Error adding item ${itemId} to cart:`, error);
                    alert("Failed to add item to cart. Please try again.");
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
                                        <button>Delete</button>
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

