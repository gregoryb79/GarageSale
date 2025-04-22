import { doRegister } from "./model.js";

export async function onRegisterFormSubmit(formData: FormData): Promise<boolean> {

    const rawData = Object.fromEntries(formData);  
    console.log(`register form submitted, email: ${rawData.email},\n
                 password: ${rawData.password}`);

    if(!rawData.email){
        throw new Error("email can't be empty"); 
    }
    if (typeof rawData.email !== "string"){
        throw new Error("email must be a string");
    }
    if(!rawData.password){
        throw new Error("Password can't be empty"); 
    }
    if (typeof rawData.password !== "string"){
        throw new Error("Password must be a string");
    }    
          
    const email = rawData.email;
    const password = rawData.password; 

    try{
        await doRegister(email,password);
        return true;         
    } catch (error){
        console.error(`failed to register with: ${email}, error: ${error}`);
        return true; // temp for testing, remove this line when done!!!
        // throw error;
    }        
     
   
}