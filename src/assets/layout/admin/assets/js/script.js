
const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text"),
    logo = body.querySelector(".logo-admin");


toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
    logo.style.display = (sidebar.classList.contains("close")) ? "none" : "block";
    
})

// searchBtn.addEventListener("click" , () =>{
//     sidebar.classList.remove("close");
//     logo.style.display = "block";
// })

// modeSwitch.addEventListener("click" , () =>{
//     body.classList.toggle("dark");
    
//     if(body.classList.contains("dark")){
//         modeText.innerText = "Light mode";
//     }else{
//         modeText.innerText = "Dark mode";
        
//     }
//     logo.style.display = "block";
// });