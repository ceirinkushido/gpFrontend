function checkId(){
    var xmlhttp = new XMLHttpRequest();
    if (sessionStorage.getItem("userlevel") == 4) {
        xmlhttp.open("GET", "http://34.89.108.223/companies/"+sessionStorage.getItem("id"));
    } else {
        xmlhttp.open("GET", "http://34.89.108.223/users/"+sessionStorage.getItem("id"));
    }
    xmlhttp.addEventListener("load", function() {
        try{
            var user = JSON.parse(this.responseText);
            console.log(user);
            if (sessionStorage.getItem("userlevel") == 4) {
                sessionStorage.setItem("firstname", user.msg.companyname);  
            } else {
                sessionStorage.setItem("firstname", user.msg.firstname);    
            }
            sessionStorage.setItem("lastname", user.msg.lastname);
            sessionStorage.setItem("id", user.msg.id);
            sessionStorage.setItem("name", user.name);
            sessionStorage.setItem("email", user.msg.email);
        }
        catch(e){
            console.log(e)
            sessionStorage.setItem("firstname", "");
            sessionStorage.setItem("lastname", "");
            sessionStorage.setItem("id", "");
            sessionStorage.setItem("name", "");
            sessionStorage.setItem("email", "");
        }
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    xmlhttp.send();
}

//#region user management
function userEdit(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", "http://34.89.108.223/users/"+sessionStorage.getItem("id"));
    xmlhttp.addEventListener("load", function() {
        console.log("RAN RESPONSE");
        loginMenuManager();
        location.reload();
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    xmlhttp.send(JSON.stringify({
        "firstname": document.getElementById("ChangeFirstname").value,
        "lastname": document.getElementById("ChangeLastname").value,
        "email" : document.getElementById("ChangeEmail").value,
        "password" : document.getElementById("ChangePassword1").value
    }));
}

function entityEdit(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", "http://34.89.108.223/companies/"+sessionStorage.getItem("id"));
    xmlhttp.addEventListener("load", function() {
        console.log("RAN RESPONSE");
        loginMenuManager();
        location.reload();
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    xmlhttp.send(JSON.stringify({
        "companyname": document.getElementById("ChangeConpanyname").value,
        "nif": document.getElementById("ChangeEmail").value,
        "email" : document.getElementById("ChangeNif").value,
        "password" : document.getElementById("ChangePassword2").value
    }));
}

function userLogin(){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://34.89.108.223/users/login");
    xmlhttp.addEventListener("load", function() {
        console.log("RAN RESPONSE");
        loginMenuManager();
        try{
            var user = JSON.parse(this.responseText);
            console.log(user);
            sessionStorage.setItem("firstname", user.msg.firstname);
            sessionStorage.setItem("lastname", user.msg.lastname);
            sessionStorage.setItem("id", user.msg.id);
            sessionStorage.setItem("name", user.name);
            sessionStorage.setItem("email", user.msg.email);
            sessionStorage.setItem("token", user.token);
            if (user.msg.usertype.student || user.msg.usertype.graduate || user.msg.usertype.teaching ||user.msg.usertype.scholarship || user.msg.usertype.retired) {
                sessionStorage.setItem("userlevel", 2);
            } else if(user.msg.usertype.outsider){
                sessionStorage.setItem("userlevel", 1)
            } else if(user.msg.usertype.admin){
                sessionStorage.setItem("userlevel", 3)
            }
        }catch(e){
            console.log(e)
            sessionStorage.setItem("firstname", "");
            sessionStorage.setItem("lastname", "");
            sessionStorage.setItem("id", "");
            sessionStorage.setItem("name", "");
            sessionStorage.setItem("email", "");
            sessionStorage.setItem("token", "");
            sessionStorage.setItem("userlevel", 0);
        }
        window.location.href = "/";
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        "email": document.getElementById("LoginUsername").value,
        "password" : document.getElementById("LoginPassword").value
    }));
}

function enitityLogin(){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://34.89.108.223/companies/login");
    xmlhttp.addEventListener("load", function() {
        console.log("RAN RESPONSE");
        loginMenuManager();
        try{
            var user = JSON.parse(this.responseText);
            console.log(user);
            sessionStorage.setItem("firstname", user.msg.companyname);
            sessionStorage.setItem("id", user.msg.id);
            sessionStorage.setItem("email", user.msg.email);
            sessionStorage.setItem("token", user.token);

            sessionStorage.setItem("userlevel", 4)
        }catch(e){
            console.log(e)
            sessionStorage.setItem("firstname", "");
            sessionStorage.setItem("lastname", "");
            sessionStorage.setItem("id", "");
            sessionStorage.setItem("name", "");
            sessionStorage.setItem("email", "");
            sessionStorage.setItem("token", "");
            sessionStorage.setItem("userlevel", 0);
        }
        window.location.href = "/";
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        "email": document.getElementById("entityUsername").value,
        "password" : document.getElementById("entityPassword").value
    }));
}

function logOut(){
    sessionStorage.setItem("firstname", "");
    sessionStorage.setItem("lastname", "");
    sessionStorage.setItem("id", "");
    sessionStorage.setItem("name", "");
    sessionStorage.setItem("email", "");
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("userlevel", 0);
    window.location.href = "/";
}

function deleteMe(){
    var xmlhttp = new XMLHttpRequest();
    if (sessionStorage.getItem("userlevel") == 4) {
        xmlhttp.open("DELETE", "http://34.89.108.223/companies/"+sessionStorage.getItem("id"));
    } else {
        xmlhttp.open("DELETE", "http://34.89.108.223/users/"+sessionStorage.getItem("id"));
    }
    xmlhttp.addEventListener("load", function() {
        logOut();
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    xmlhttp.send();
}

function getEntities() {
    var req = new XMLHttpRequest();
    req.open("GET", "http://34.89.108.223/companies/");
    req.addEventListener("load", function() {
        var usersList = JSON.parse(this.responseText);

        console.log(usersList);
        var tb = document.getElementById('users');
        console.log(tb)
        tb.innerHTML = '';

        for (var i in usersList) {
            var tr = document.createElement('tr');

            var tdName = document.createElement('td');
            var tdEmail = document.createElement('td');
            var tdPassword = document.createElement('td');
            var tdButtonUpdateUser = document.createElement('td');
            var tdButtonDeleteUser = document.createElement('td');
            
            tdName.innerHTML = "<input type='text' class='form-control' id='"+
                usersList[i].id+"Name' name='companyname' placeholder='"+usersList[i].companyname+"'>";

            tdEmail.innerHTML = "<input type='text' class='form-control' id='"+
                usersList[i].id+"Email' name='email' placeholder='"+usersList[i].email+"'>";

            tdPassword.innerHTML = "<input type='text' class='form-control' id='"+
                usersList[i].id+"Password' name='password' placeholder='Password'>";

            tdButtonUpdateUser.innerHTML = 
                "<button type='button' class='btn btn-warning' onclick='updateUser(\"entity\", \"" + usersList[i].id +  "\")'  data-toggle='modal' data-target='#ModalCenter'>"+
                    "Editar Utilizador"+
                "</button>";
                
            tdButtonDeleteUser.innerHTML =
                "<button type='button' class='btn btn-danger' onclick='deleteUser(\"entity\", \"" + usersList[i].id +  "\")'  data-toggle='modal' data-target='#ModalCenter'>"+
                    "Apagar Utilizador"+
                "</button>";
            
            tr.appendChild(tdName);
            tr.appendChild(tdEmail);
            tr.appendChild(tdPassword);
            tr.appendChild(tdButtonUpdateUser);
            tr.appendChild(tdButtonDeleteUser);

            tb.appendChild(tr);
        }
        getUsers();
    });
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    req.send();



}

function getUsers(){
    var req = new XMLHttpRequest();
    req.open("GET", "http://34.89.108.223/users/");
    req.addEventListener("load", function() {
        var usersList = JSON.parse(this.responseText);

        console.log(usersList);
        var tb = document.getElementById('users');
        console.log(tb)

        for (var i in usersList) {
            var tr = document.createElement('tr');

            var tdName = document.createElement('td');
            var tdEmail = document.createElement('td');
            var tdPassword = document.createElement('td');
            var tdButtonUpdateUser = document.createElement('td');
            var tdButtonDeleteUser = document.createElement('td');
            
            tdName.innerHTML = "<input type='text' class='form-control' id='"+
                usersList[i].id+"Name' name='companyname' placeholder='"+usersList[i].firstname+"'>";

            tdEmail.innerHTML = "<input type='text' class='form-control' id='"+
                usersList[i].id+"Email' name='email' placeholder='"+usersList[i].email+"'>";

            tdPassword.innerHTML = "<input type='text' class='form-control' id='"+
                usersList[i].id+"Password' name='password' placeholder='Password'>";

            tdButtonUpdateUser.innerHTML = 
                "<button type='button' class='btn btn-warning' onclick='updateUser(\"user\", \"" + usersList[i].id +  "\")'  data-toggle='modal' data-target='#ModalCenter'>"+
                    "Editar Utilizador"+
                "</button>";
                
            tdButtonDeleteUser.innerHTML =
                "<button type='button' class='btn btn-danger' onclick='deleteUser(\"user\", \"" + usersList[i].id +  "\")'  data-toggle='modal' data-target='#ModalCenter'>"+
                    "Apagar Utilizador"+
                "</button>";
            
            tr.appendChild(tdName);
            tr.appendChild(tdEmail);
            tr.appendChild(tdPassword);
            tr.appendChild(tdButtonUpdateUser);
            tr.appendChild(tdButtonDeleteUser);

            tb.appendChild(tr);
        }
    });
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    req.send();
}


function updateUser(type,userId){
    if (type == "entity") { 
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("PUT", "http://34.89.108.223/companies/"+userId);
        xmlhttp.addEventListener("load", function() {
            console.log("RAN RESPONSE");
            loginMenuManager();
            location.reload();
        });
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
        xmlhttp.send(JSON.stringify({
            "email": document.getElementById(userId+"Email").value,
            "companyname": document.getElementById(userId+"Name").value,
            "password" : document.getElementById(userId+"Password").value
        }));  
    } else if(type == "user"){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("PUT", "http://34.89.108.223/users/"+userId);
        xmlhttp.addEventListener("load", function() {
            console.log("RAN RESPONSE");
            loginMenuManager();
            location.reload();
        });
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
        xmlhttp.send(JSON.stringify({
            "email": document.getElementById(userId+"Email").value,
            "firstname": document.getElementById(userId+"Name").value,
            "password" : document.getElementById(userId+"Password").value
        }));   
    }
    
}

function deleteUser(type, userId){
    var xmlhttp = new XMLHttpRequest();
    if (type == "entity") { 
        xmlhttp.open("DELETE", "http://34.89.108.223/companies/"+userId);
    } else if(type == "user"){
        xmlhttp.open("DELETE", "http://34.89.108.223/users/"+userId);
    }
    xmlhttp.addEventListener("load", function() {
        console.log("RAN RESPONSE");
        loginMenuManager();
        location.reload();
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    xmlhttp.send();
}
//#endregion

//#region project management
function getProjects() {
    
    var req = new XMLHttpRequest();
    req.open("GET", "/api/projects/");
    req.addEventListener("load", function() {
        var projects = JSON.parse(this.responseText);
        console.log(projects);
        var tb = document.getElementById('projects');
        console.log(tb)
        tb.innerHTML = '';
        for (var i in projects) {
            var tr = document.createElement('tr');

            var tdTitle = document.createElement('td');
            var tdCreated = document.createElement('td');
            var tdUpdated = document.createElement('td');
            var tdButtonProjectActions = document.createElement('td');
            var tdButtonTasksView = document.createElement('td');
            
            tdTitle.innerHTML = "<input type='text' class='form-control' id='"+projects[i].id+"Title' name='title' placeholder='"+projects[i].title+"'>";
            tdCreated.innerHTML = projects[i].creation_date;
            tdUpdated.innerHTML = projects[i].last_updated;
            tdButtonProjectActions.innerHTML = 
                "<div class='btn-group' role='group' aria-label='Basic example'>"+
                    "<button type='button' type='submit' onclick='updateProject(" + projects[i].id +  ")' class='btn btn-outline-success'>Update</button>"+
                    "<button type='button' type='submit' onclick='deleteProject(" + projects[i].id +  ")' class='btn btn-outline-danger'>Delete</button>"+
                "</div>";
            tdButtonTasksView.innerHTML =
                "<button type='button' class='btn btn-info' onclick='getTasks(" + projects[i].id +  ")'  data-toggle='modal' data-target='#ModalCenter'>"+
                    "Ver Taregas"+
                "</button>";
            
            tr.appendChild(tdTitle);
            tr.appendChild(tdCreated);
            tr.appendChild(tdUpdated);
            tr.appendChild(tdButtonProjectActions);
            tr.appendChild(tdButtonTasksView);

            tb.appendChild(tr);
        }
    });
    req.send();
}

function updateProject(id){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", "/api/projects/"+id+"/");
    xmlhttp.addEventListener("load", function() {
        console.log("RAN RESPONSE");
        loginMenuManager();
        location.reload();
        getProjects();
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        "title": document.getElementById(id+"Title").value,
    }));
}

function deleteProject(id){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("DELETE", "/api/projects/"+id+"/");
    xmlhttp.addEventListener("load", function() {
        console.log("RAN RESPONSE");
        loginMenuManager();
        location.reload();
        getProjects();
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send();
}

function newProject(){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/projects/");
    xmlhttp.addEventListener("load", function() {
        console.log("RAN RESPONSE");
        loginMenuManager();
        location.reload();
        getProjects();
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        "title": document.getElementById("NewProjetTitle").value,
    }));
}
//#endregion

//#region task management
function getTasks(id) {
    
    var req = new XMLHttpRequest();
    req.open("GET", "/api/projects/"+id+"/tasks/");
    req.addEventListener("load", function() {
        
        var tasks = JSON.parse(this.responseText);
        console.log(tasks);
        
        var th = document.getElementById('TaskThead');
        console.log(th)
        th.innerHTML = '';

        var trTitles = document.createElement('tr');
        var trContent = document.createElement('tr');

        var thTitle = document.createElement('th');
        var thCreated = document.createElement('th');
        var thCompleted = document.createElement('th');
        var thButtonTaskActions = document.createElement('th');

        thTitle.innerHTML = "Nome da tarefa";
        thCreated.innerHTML = "Data de inicio";
        thCompleted.innerHTML = "Tarefa completa?";
        thButtonTaskActions.innerHTML = "Ação";

        trTitles.appendChild(thTitle);
        trTitles.appendChild(thCreated);
        trTitles.appendChild(thCompleted);
        trTitles.appendChild(thButtonTaskActions);

        var thTitle1 = document.createElement('th');
        var thCreated1 = document.createElement('th');
        var thCompleted1 = document.createElement('th');
        var thButtonTaskAction1 = document.createElement('th');

        thTitle1.innerHTML = "<input type='text' class='form-control' id='NewTaskTitle' name='title' placeholder='Nova Tarefa'>";
        thCreated1.innerHTML = "<h6>Auto inserida</h6>";
        thCompleted1.innerHTML = "<h6>Auto inserida</h6>";
        thButtonTaskAction1.innerHTML = "<button type='submit' onclick='newTask(" + id + ")' class='btn btn-primary'>Inserir</button>";

        trContent.appendChild(thTitle1);
        trContent.appendChild(thCreated1);
        trContent.appendChild(thCompleted1);
        trContent.appendChild(thButtonTaskAction1);

        th.appendChild(trTitles);
        th.appendChild(trContent);
        
        var tb = document.getElementById('tbTasksBody');
        console.log(tb)
        tb.innerHTML = '';
        for (var i in tasks) {

            var tr = document.createElement('tr');

            var tdTitle = document.createElement('td');
            var tdCreated = document.createElement('td');
            var tdCompleted = document.createElement('td');
            var tdButtonTaskActions = document.createElement('td');
            
            tdTitle.innerHTML = "<input type='text' class='form-control' id='"+tasks[i].id+"Title' name='title' value='"+tasks[i].title+"'>";
            tdCreated.innerHTML = tasks[i].creation_date;
            if (tasks[i].completed == 1) {
                tr.classList.add("bg-success")
                tdCompleted.innerHTML = 
                "<label class='switch'>"+
                    "<input id='" + tasks[i].id + "Checked' type='checkbox' checked>"+
                "<span class='slider round'></span>"+
                "</label>";
            }else{
                tdCompleted.innerHTML = 
                "<label class='switch'>"+
                    "<input id='" + tasks[i].id + "Checked' type='checkbox'>"+
                "<span class='slider round'></span>"+
                "</label>";
            }
            
            tdButtonTaskActions.innerHTML = 
                "<div class='btn-group' role='group' aria-label='Basic example'>"+
                    "<button type='button' type='submit' onclick='updateTask(" + id + "," + tasks[i].id +  ")' class='btn btn-warning'>Update</button>"+
                    "<button type='button' type='submit' onclick='deleteTask(" + id + "," + tasks[i].id +  ")' class='btn btn-danger'>Delete</button>"+
                "</div>";
            
            tr.appendChild(tdTitle);
            tr.appendChild(tdCreated);
            tr.appendChild(tdCompleted);
            tr.appendChild(tdButtonTaskActions);
            tb.appendChild(tr);
        }
    });
    req.send();
}

function newTask(id){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/projects/"+id+"/tasks/");
    xmlhttp.addEventListener("load", function() {
        console.log("RAN RESPONSE");
        loginMenuManager();
        location.reload();
        getProjects();
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        "title": document.getElementById("NewTaskTitle").value,
    }));
}

function updateTask(projectId,taskId){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", "/api/projects/" + projectId + "/tasks/" + taskId + "/");
    xmlhttp.addEventListener("load", function() {
        console.log("RAN RESPONSE");
        loginMenuManager();
        location.reload();
        getProjects();
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        "title": document.getElementById(taskId+"Title").value,
        "completed": document.getElementById(taskId+"Checked").checked === true ? 1 : 0
    }));
}

function deleteTask(projectId,taskId){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("DELETE", "/api/projects/" + projectId + "/tasks/" + taskId + "/");
    xmlhttp.addEventListener("load", function() {
        console.log("RAN RESPONSE");
        loginMenuManager();
        location.reload();
        getProjects();
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send();
}
//#endregion