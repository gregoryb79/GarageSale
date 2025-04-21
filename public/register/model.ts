
export async function doRegister(email : string, password: string): Promise<void> {   
      
    console.log(`doRegister starts with: ${email} - ${password}`);
    
    const userInfo = {
        email: email,
        password: password,
    };    
  
    const body = JSON.stringify(userInfo);
    console.log(`body: ${body}`);

    try{
        const res = await fetch(`/auth/register`, {
            method: "post",
            body,
            headers: {
                "content-type": "application/json"
            }
        });
        if (!res.ok) {
            const message = await res.text(); 
            console.log(`Failed to register. Status: ${res.status}. Message: ${message}`);
            throw new Error(message);
        }
        console.log(`Registered with: ${userInfo.email} - ${userInfo.password}`);        
    }catch(error){
        console.error(`Error registering, throwing error: ${error}`);  
        throw error;      
    }    
}