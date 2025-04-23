
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
            const errorResponse = await res.json(); 
            console.log(`Failed to register. Status: ${res.status}. Message: ${errorResponse.message}`);
            throw new Error(errorResponse.message);
        }
        const data = await res.json();
        console.log(`loged in with: ${email} - ${password}, Response:`, data);

        if (data.token) {
            localStorage.setItem('token', data.token);
            console.log(`Token stored in local storage: ${data.token}`);
        } else {
            console.error('No token received from the server');
            throw new Error('No token received from the server');
        } 
        console.log(`Registered and logged in with: ${userInfo.email} - ${userInfo.password}`);        
    }catch(error){
        console.error(`Error registering, throwing error: ${error}`);  
        throw error;      
    }    
}