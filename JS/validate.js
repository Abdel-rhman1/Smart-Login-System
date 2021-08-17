let login = document.getElementById("login"); // login submit button
let signup = document.getElementById("signup"); // signup submit button
let userName = document.getElementById("name"); // userName Input
let email = document.getElementById("email");   // email Input 
let password = document.getElementById("password"); // password Input
let inputLoginError = document.getElementById("inputLoginError"); // Login container Errors
let inputRegisterError = document.getElementById("inputRegisterError"); // Register Container Errors
let navItem = document.getElementById("nav-item"); 
let LocaleStorageUsers; // locale Storage Array


if(localStorage.getItem("Users")){ // check if there are Users Item in LocalStorage
    LocaleStorageUsers  = JSON.parse (localStorage.getItem("Users")); // to convert it array of objects
}else{
    LocaleStorageUsers = [];
}



if(login!=null){ // if the user in the login page
    login.addEventListener("click" , function(){
        validateLogin(); // function to validate login Inputs
    });
}

function addUser(){ // function to add user object into localStorage
    let user = {
        name : userName.value,
        email : email.value,
        password : password.value, 
    };
    LocaleStorageUsers.push(user);
    localStorage.setItem("Users" , JSON.stringify(LocaleStorageUsers)); // to convert array of Objects into string
    window.location.href = "signin.html"; //
}

function validateInputs(){ // validate Register Inputs
    let name = false , mail = false , pass = false;
    let errors = ``;
    let emailRegex = /^[a-zA-z0-9]{1,18}\@(gmail|yahoo|info|twitter)\.(com|org)$/i;
    let nameRegex  = /^[a-zA-Z0-9]{4,15}$/i;

    if(nameRegex.test(userName.value)){
        name = true;
    }else{
        errors +=`Invalid Name > 4 letters or digits Only`+'<br/>';
    }
    if(emailRegex.test(email.value)){
        mail = true; 
    }else{
        errors+=`Invalid Mail `+'<br/>';
    }
    if(password.value.trim().length > 6 ){
        pass = true;
    }else{
        errors+= `pass Must > than 6 chars`+'<br/>';
    }
    
    if(mail && pass  && name ){
        inputRegisterError.style.display = "none";
        if(!checkingExisting(email.value , password.value)){
            addUser();
        }else{
            inputRegisterError.innerHTML = "This Mail is Already exist";
            inputRegisterError.style.display = "block";
        }
    }else{
        inputRegisterError.innerHTML = errors;
        inputRegisterError.style.display = "block";
    }
}


if(signup!=null){ // if the user in the signup page
    signup.addEventListener("click" , function(){
        validateInputs();
    });
}


function checkingExisting(email){
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
    let mail = false , pass = false , errors=``;
    let emailRegex = /^[a-zA-z0-9]{1,18}\@(gmail|yahoo|info|twitter)\.(com|org)$/i;
    if(emailRegex.test(email.value)){
        mail = true;
    }else{
        errors += `InValid Mail`+`<br/>`;
    }
    if(password.value.trim().length == 0){
        errors += `InValid Password` + `<br/>`;
    }else{
        pass = true;
    }
    if(!mail || !pass){
        inputLoginError.innerHTML = errors;
        inputLoginError.style.display = "block";
    }
    else{
        let i; errors = ``;
        if((i = checkingExisting(email.value))!=false){
            if(LocaleStorageUsers[i-1].password==password.value){
                sessionStorage.setItem("userEmail" , email.value);
                sessionStorage.setItem("userId" , i-1);
                sessionStorage.setItem("userName" , LocaleStorageUsers[i-1].name);
                window.location.href = "../index.html";
            }else{
                errors += `this Password not matching This Mail`;
                inputLoginError.innerHTML = errors;
                inputLoginError.style.display = "block";
            }
        }else{
            errors+=`This User dosent Regitser in Our System`;
            inputLoginError.innerHTML = errors;
            inputLoginError.style.display = "block";
        }
    }
}


function logOut(){ //logout function (Removing session)
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    this.location.href = "Pages/signin.html";
}



if(navItem!=null){ // check if the user in the home page
    navItem.addEventListener("click" , function(){
        logOut();
    });
}
