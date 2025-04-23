import {addToCart} from "../model.cart.js";
import {getItems} from "../model.items.js";
import {addToWishList} from "../model.wishlist.js";

export async function index(itemsList: HTMLElement, searchForm: HTMLFormElement) {

    console.log("Welcome to GarageSale!");

    await renderItems(""); 

    itemsList.addEventListener("click", async (event) => {
        const target = event.target as HTMLElement;

        const listItem = target.closest("li.listing");
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
                    await addToCart(itemId,1);
                    console.log(`Item ${itemId} added to cart successfully.`);
                    alert("Item added to your shopping cart.");
                } catch (error) {
                    console.error(`Error adding item ${itemId} to cart:`, error);
                    alert("Failed to add item to cart. Please try again.");
                }
            } else if (button.textContent === "Add to Wishlist") {                
                console.log(`Adding item ${itemId} to wishlist...`);
                try {
                    await addToWishList(itemId,1);
                    console.log(`Item ${itemId} added to wishlist successfully.`);
                    alert("Item added to your wishlist.");
                } catch (error) {
                    console.error(`Error adding item ${itemId} to cart:`, error);
                    alert("Failed to add item to wishlist. Please try again.");
                }
            }
        }
        
    });

    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(searchForm);
        const query = formData.get("search") as string;        
        console.log(`Searching for: ${query}`);

        try{
            await renderItems(`?search=${query}`);
        } catch (error) {
            console.error("Error rendering items:", error);
        }
                        
    });


    async function renderItems(query: string) {
        try{
            const items = await getItems(query);            
            console.log(items);
    
            if(items.length > 0) {              
               itemsList.innerHTML = items
                    .map((item) => `                                
                                    <li class="listing" data-id="${item._id}">
                                        <h3>${item.name}</h3>
                                        <img src="${item.imageurl}" alt="image of ${item.name}">
                                        <p>${item.description}</p>
                                        <p>Price: ${item.price.toFixed(2)}</p>
                                        <button>Add to Cart</button>
                                        <button>Add to Wishlist</button>
                                    </li>
                                    `)
                    .join("\n");
            }else if (query != ""){
                itemsList.innerHTML = "<h3>No results for your search...</h3>"
            }else{
                itemsList.innerHTML = "<h3>Oops, something went wrong, please retry...</h3>"
            }        
            
        }catch(error){
            console.error(error);
        }     
    }
        
}

