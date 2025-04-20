import {Item, getItems} from "../model.js";
export async function index(itemsList: HTMLElement){

    console.log("Welcome to GarageSale!");

    await renderItems(""); 


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

