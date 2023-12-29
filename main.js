
var signupNameInput=document.getElementById('signupName');
var signupEmailInput=document.getElementById('signupEmail');
var signupPasswordInput=document.getElementById('signupPassword');
var exist=document.getElementById('exist');
var incorrect=document.getElementById('incorrect');
var loginList=[];

if(localStorage.getItem('user') !=null)
{
   loginList=JSON.parse(localStorage.getItem('user'));
   display(loginList);
}

function signUp(){
    if(signupNameInput.value=='' || signupEmailInput.value=='' || signupPasswordInput.value==''){
    return(exist.innerHTML=`<span class="text-danger m-3">All inputs is required</span>`);
  }
  else if(nameValid() && emailValid() && passwordValid())
   {
   var user={
      signupName:signupNameInput.value,
      signupEmail:signupEmailInput.value,
      signupPassword:signupPasswordInput.value,
   }
   for(var i=0;i < loginList.length;i++){
    if(loginList[i].signupEmail === signupEmailInput.value){
     return(exist.innerHTML=`<span class="text-danger m-3">email already exists</span>`);
    }
}  
   loginList.push(user);
   localStorage.setItem('user',JSON.stringify(loginList));
   display(loginList);
   exist.innerHTML=`<span class="text-success m-3">Success</span>` ;
    }
    noMatch()
};


function display(list){
   var box='';
   for(var i=0 ; i< list.length ;i++){
     box +=`
     <td>${list[i].signupName}</td>
     <td>${list[i].signupEmail}</td>
     <td>${list[i].signupPassword}</td>
     ` ;
}
}


function nameValid(){
   var regex = /[A-Za-z1-9]{3,}/ 
   return regex.test(signupNameInput.value);
}
function emailValid(){
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(signupEmailInput.value);
 }
 function passwordValid(){
    let regex =  /[A-Za-z1-9.]{4,15}/ 
    return regex.test(signupPasswordInput.value);
 }
 function noMatch(){
   if(!nameValid())
   exist.innerHTML=`<span class="text-danger m-3">Name not match</span>`
   else if(!emailValid())
   exist.innerHTML=`<span class="text-danger m-3">Email not match</span>`
   else if(!passwordValid())
    exist.innerHTML=`<span class="text-danger m-3">Password not match</span>`
}



var usernameSession=JSON.parse(localStorage.getItem('username'))

function login(){
   var signinEmailInput=document.getElementById('signinEmail');
   var signinPasswordInput=document.getElementById('signinPassword');
   
    for(var i=0;i < loginList.length;i++){
    
       if( signinEmailInput.value=='' || signinPasswordInput.value==''){
          return(incorrect.innerHTML=`<span class="text-danger m-3">All inputs is required</span>`);
        }
       else if(signinEmailInput.value == loginList[i].signupEmail &&
          signinPasswordInput.value == loginList[i].signupPassword){
            usernameSession=loginList[i].signupName
            localStorage.setItem('username',JSON.stringify(usernameSession))
            window.location.href="home.html";
            return true
       }
 };
 incorrect.innerHTML=`<span class="text-danger m-3">incorrect email or password</span>`;
 }
 function welcome(){
   var usernamehome=document.getElementById('username');
   usernamehome.innerHTML=`welcome ${usernameSession}`
 }
 function logout(){
   localStorage.remove('username')
   window.location.href="index.html";
 }