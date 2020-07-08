(function () {
    function init() {
        var router = new Router([
            new Route('landing', 'landing.html', true),
            new Route('login', 'login.html'), 
            new Route('about', 'about.html'),
            new Route('myProfile', 'myProfile.html'),
            new Route('projects', 'projects.html'),
            new Route('register', 'register.html')
        ]);
    }
    init();
}());

function menuSwap(currentMenu) {
    checkAlive();
    var links = document.getElementsByClassName('nav-link');
    for(let item of links){
        item.classList.remove("active");
        if(item.id == (currentMenu+"Btn")){
            item.classList.add("active");
            if (currentMenu == 'projects') {
                getProjects();
            }
        }
    }
}

function loginMenuManager(){
    if (sessionStorage.getItem("username") !="" ) {
        $("#userMenuSection").show();
        $("#loginBtn").hide();
        $("#registerBtn").hide();
        $("#projectsBtn").show();
    }else{
        $("#userMenuSection").hide();
        $("#loginBtn").show();
        $("#registerBtn").show();
        $("#projectsBtn").hide();
        $("#aboutBtn").hide();
    }
    
    console.log(sessionStorage.getItem("username"))
}

function loadMe(component){
    console.log(component);
    if (component == 'userEdit') {
        $("#ChangeName").attr("placeholder", sessionStorage.getItem("name")).val("").focus().blur();
        $("#ChangeEmail").attr("placeholder", sessionStorage.getItem("email")).val("").focus().blur();
    }
}