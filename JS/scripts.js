let greeting = document.getElementById("greeting");

if(!window.sessionStorage.userEmail){
    console.log("User Dosent Login");
    this.location.href = "Pages/signin.html";
}else{
    console.log("Welcome to you Ya sahby: " + window.sessionStorage.userName);
    greeting.innerHTML = "Welcome " +  sessionStorage.userName;
}



