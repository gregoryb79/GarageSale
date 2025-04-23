import {onLoginFormSubmit} from "./controller.js";

export function logIn(loginForm : HTMLFormElement, loadingSpinner : HTMLElement){

    console.log("Welcome to GarageSale! Please log in to continue.");
    const token = localStorage.getItem('token');
    if (token){
        console.log("Token found in local storage. Redirecting to home page.");
        window.location.replace("./home/home.html");
        return;
    }

    loginForm.addEventListener("submit", async function(e){
        e.preventDefault();         

        const formElement = e.target as HTMLFormElement;
        const formData = new FormData(formElement , e.submitter);              

        formElement
            .querySelectorAll("input, button")
            .forEach((element) => (element as HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement).disabled = true);
        try{

            if (loadingSpinner) {
                loadingSpinner.style.display = "block";
            }

            const result = await onLoginFormSubmit(formData);
                        
            if (result){
                window.location.replace("./home/home.html");
                return;
            }                     
        }catch(error){
            console.error(error);
            alert(error);
        }finally {        
            if (loadingSpinner) {
                loadingSpinner.style.display = "none";
            }
        }    

        formElement
            .querySelectorAll("input, button")
            .forEach((element) => (element as HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement).disabled = false);

        loginForm.reset();  
    });
}