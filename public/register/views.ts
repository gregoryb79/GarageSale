import {onRegisterFormSubmit} from "./controller.js";

export function register(registerForm : HTMLFormElement,loadingSpinner : HTMLElement){

    registerForm.addEventListener("submit", async function(e){
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

            const result = await onRegisterFormSubmit(formData);
                        
            if (result){
                window.location.replace("../home/home.html");
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

        registerForm.reset();  
    });
}