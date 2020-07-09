(function () {
    function init() {
        var router = new Router([
            new Route('landing', 'landing.html', true),
            new Route('login', 'login.html'), 
            new Route('about', 'about.html'),
            new Route('myProfile', 'myProfile.html'),
            new Route('projects', 'projects.html'),
            new Route('register', 'register.html'),
            new Route('editUsers', 'editUsers.html')
        ]);
    }
    init();
}());

function menuSwap(currentMenu) {
    loginMenuManager();
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
    checkId();
    switch (sessionStorage.getItem("userlevel")){
        case "1":
            console.log("hit 1");
            $("#userMenuSection").show();
            $("#loginBtn").hide();
            $("#registerBtn").hide();
            $("#projectsBtn").show();
            $("#editUsers").hide();
            break;
        case "2":
            console.log("hit 2");
            $("#userMenuSection").show();
            $("#loginBtn").hide();
            $("#registerBtn").hide();
            $("#projectsBtn").show();
            $("#editUsers").hide();
            break;
        case "3":
            console.log("hit 3");
            $("#userMenuSection").show();
            $("#loginBtn").hide();
            $("#registerBtn").hide();
            $("#projectsBtn").show();
            $("#editUsers").show();
            break;
        case "4":
            console.log("hit 3");
            $("#userMenuSection").show();
            $("#loginBtn").hide();
            $("#registerBtn").hide();
            $("#editUsers").hide();
            $("#projectsBtn").show();
            break;
        default:
            console.log("hit 0");
            $("#userMenuSection").hide();
            $("#loginBtn").show();
            $("#registerBtn").show();
            $("#projectsBtn").hide();
            $("#aboutBtn").hide();
            $("#editUsers").hide();
            break;
    };
}

function loadMe(component){
    console.log(component);
    if (component == 'userEdit') {
        $("#ChangeName").attr("placeholder", sessionStorage.getItem("name")).val("").focus().blur();
        $("#ChangeEmail").attr("placeholder", sessionStorage.getItem("email")).val("").focus().blur();
    }
}


function toggleVisibility(toggleType){
    switch(toggleType){
        case "register":
            if(document.getElementById('togBtn').checked){
                document.getElementById('registerUser').style.display = 'block';
                document.getElementById('registerEntity').style.display = 'none';
            }
            else{
                document.getElementById('registerUser').style.display = 'none';
                document.getElementById('registerEntity').style.display = 'block';
            }
            break;
        case "login":
            if(document.getElementById('togBtn').checked){
                document.getElementById('loginUser').style.display = 'block';
                document.getElementById('loginEntity').style.display = 'none';
            }
            else{
                document.getElementById('loginUser').style.display = 'none';
                document.getElementById('loginEntity').style.display = 'block';
            }
            break;
        case 'edit':
            if(document.getElementById('togBtn').checked){
                document.getElementById('editUser').style.display = 'block';
                document.getElementById('editEntity').style.display = 'none';
            }
            else{
                document.getElementById('editUser').style.display = 'none';
                document.getElementById('editEntity').style.display = 'block';
            }
            break
        default:
            break;
    }

}