// Change style of navbar on scroll
window.onscroll = function() {myFunction()};
function myFunction() {
    var navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-bar" + " w3-card-2" + " w3-animate-top" + " w3-white";
    } else {
        navbar.className = navbar.className.replace(" w3-card-2 w3-animate-top w3-white", "w3-bar w3-text-white");
    }
}
var navSignin = document.getElementById('navSignin');
var navSignout = document.getElementById('navSignout');

successMsg = document.getElementById('success-msg');
errorMsg = document.getElementById('error-msg');

// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}

function signupClose(){
    document.getElementById('id02').style.display='none';
    document.getElementById('uname').value='';
    document.getElementById('pwd').value='';
    document.getElementById('cpwd').value='';
    errorMsg.style.display='none';
    successMsg.style.display='none';
}

// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}
// Get the modal
var modal = document.getElementById('id01');
	// When the user clicks anywhere outside of the modal close it
	window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}
function validateForm() {
    var username = document.getElementById("uname").value;
    var password = document.getElementById("pwd").value;
    var confirm = document.getElementById("cpwd").value;
    errorMsg.innerHTML="";
    if (username == "") {
        console.log('myerr:no username');
        errorMsg.innerHTML="Username field is empty";
        return false;
    }
    if(password==""){
        console.log('myerr:no pwd');
        errorMsg.innerHTML = errorMsg.innerHTML + "&#13;&#10;"+"Password field is empty";
        return false;
    }
    if(password!=confirm || confirm==""){
        console.log('myerr:no match');
        errorMsg.innerHTML = errorMsg.innerHTML + "&#13;&#10;" + "Password and confirm password do not match";
        return false;
    }
    return true;
}
//on sign in

//on sign up
function SignUp(){
    /* New session */
    if (validateForm()){
        successMsg.style.display='block';
        successMsg.innerHTML="Waiting...";
        hasura.setUsername(document.getElementById("uname").value);
        hasura.auth.signup(document.getElementById("pwd").value,
        function onSuccess(){
            errorMsg.style.display='none';
            successMsg.style.display='block';
            successMsg.innerHTML ="User created succesfully!";
            navSignin.style.display='none';
            navSignout.style.display='block';
        },
        function onError(r){
            successMsg.style.display='none';
            errorMsg.style.display='block';
            navSignin.style.display='block';
            navSignout.style.display='none';
            errorMsg.innerHTML ="Error: "+ (r.code?r.code:r.message)+". Try again!";
        });
    }
    else{
        errorMsg.style.display='block';
    }
};
var slideIndex = 0;
	showSlides();

	function showSlides() {
	    var i;
	    var slides = document.getElementsByClassName("mySlides");
	    var dots = document.getElementsByClassName("dot");
	    for (i = 0; i < slides.length; i++) {
	       slides[i].style.display = "none";
	    }
	    slideIndex++;
	    if (slideIndex> slides.length) {slideIndex = 1;}
	    for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	    }
	    slides[slideIndex-1].style.display = "block";
	    dots[slideIndex-1].className += " active";
	    setTimeout(showSlides, 5000); // Change image every 10 seconds
	}