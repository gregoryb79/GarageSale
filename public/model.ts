
export async function doLogIn(email : string, password: string): Promise<void> {
 
    console.log(`doLogIn starts with: ${email} - ${password}`);
    
    const credentials = {
        email: email,
        password: password,
    };    
  
    const body = JSON.stringify(credentials);
    console.log(`body: ${body}`);
  
    try{
        const res = await fetch(`/auth/login`, {
            method: "post",
            body,
            headers: {
                "content-type": "application/json"
            }
        });
        if (!res.ok) {
            const errorResponse = await res.json(); 
            console.log(`Failed to log in. Status: ${res.status}. Message: ${errorResponse.message}`);
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
        
    }catch(error){
        console.error(`Error logging in`, error);  
        throw error;      
    }    
}