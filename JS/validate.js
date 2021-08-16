let login = document.getElementById("login");
let signup = document.getElementById("signup");
let userName = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let inputLoginError = document.getElementById("inputLoginError");
let inputRegisterError = document.getElementById("inputRegisterError");
let navItem = document.getElementById("nav-item");

let LocaleStorageUsers;


if(localStorage.getItem("Users")){
    LocaleStorageUsers  = JSON.parse (localStorage.getItem("Users"));
}else{
    LocaleStorageUsers = [];
}



if(login!=null){
    login.addEventListener("click" , function(){
        validateLogin();
        console.log(email.value);
        console.log(password.value);
    });
}



function addUser(){
    let user = {
        name : userName.value,
        email : email.value,
        password : password.value, 
    };
    LocaleStorageUsers.push(user);

    localStorage.setItem("Users" , JSON.stringify(LocaleStorageUsers));
}



function validateInputs(){
    let emailRegex = /^[a-zA-z0-9]{4,18}\@(gmail|yahoo|info|twitter)\.(com|org)$/i;
    let nameRegex  = /^[a-zA-Z0-9]{4,15}$/;
    if(emailRegex.test(email.value) && password.value.trim().length > 6 &&nameRegex.test(userName.value) ){
        inputRegisterError.style.display = "none";
        if(!checkingExisting(email.value , password.value)){
            console.log("There Must inset user Into Data Base");
            addUser();
        }else{
            inputRegisterError.innerHTML = "This Mail is Already exist";
            inputRegisterError.style.display = "block";
            console.log("email already exists");
        }
    }else{
        inputRegisterError.style.display = "block";
    }
}



if(signup!=null){
    signup.addEventListener("click" , function(){
        validateInputs();
    });
}


function checkingExisting(email){
    console.log(LocaleStorageUsers.length);
    if(LocaleStorageUsers.length==0) return false;
    else {
        for(let i=0;i<LocaleStorageUsers.length;i++){
            if(LocaleStorageUsers[i].email == email){
                return i+1;
            }
        }
        return false;
    }
}

function validateLogin(){
    console.log("Inside The DFunction");
    if(email.value.trim().length == 0 || password.value.trim().length == 0){
        inputLoginError.style.display = "block";
        console.log("Inside The condition");
    }else{
        let i;
        if((i = checkingExisting(email.value))!=false){
            console.log("This Mail IS exting");
            console.log("I: " + i);
            if(LocaleStorageUsers[i-1].password==password.value){
                console.log("good You are Allowed To enter to Home Page");
                sessionStorage.setItem("userEmail" , email.value);
                sessionStorage.setItem("userId" , i-1);
                sessionStorage.setItem("userName" , LocaleStorageUsers[i-1].name);
               
                window.location.href = "../index.html";
                
            }
        }else{
            console.log("This Mail Dosent Exist");
        }
    }
}


function logOut(){
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    this.location.href = "Pages/signin.html";
}


if(navItem!=null){
    navItem.addEventListener("click" , function(){
        logOut();
    });
}
