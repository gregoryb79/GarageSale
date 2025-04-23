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

export async function getItem(itemId: string): Promise<Item|null> {
    console.log(`getItemName with itemId = "${itemId}" starts`);
    try {
        const res = await fetch(`/items/${itemId}`);
        if (!res.ok) {
            const message = await res.text();             
            throw new Error(`Failed to get item name. Status: ${res.status}. Message: ${message}`);
        }        
        const item = await res.json() as Item; 
        return item;
    }catch (error) {
        console.error("Error getting item name:", error); 
        return null;              
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

        return items.filter((item: { category: string }) => ((item.category !== 'Testing') && (item.category !== 'Test'))); 
    }catch (error) {
        console.error("Error getting items:", error);
        return [];        
    } 
}