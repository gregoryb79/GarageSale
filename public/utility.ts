import { doLogOut } from "./model.js";

export function exit(exitButton: HTMLButtonElement) {
    
    exitButton.addEventListener("click", async (event) => {
        event.preventDefault();
        console.log("Exit button clicked, logging out and redirecting to login page...");
        doLogOut();
        window.location.href = "../index.html"; 
    });

}
