function checkAlive(){
    var req = new XMLHttpRequest();
    req.open("GET", "/api/");
    req.addEventListener("load", function() {
        try{
            var user = JSON.parse(this.responseText);
            console.log(user);
            sessionStorage.setItem("username", user.username);
            sessionStorage.setItem("id", user.id);
            sessionStorage.setItem("name", user.name);
            sessionStorage.setItem("email", user.email);
        }catch(e){
            console.log(e)
            sessionStorage.setItem("username", "");
            sessionStorage.setItem("id", "");
            sessionStorage.setItem("name", "");
            sessionStorage.setItem("email", "");
        }

        loginMenuManager();
    });
    req.send();
}

function logOut(){
    var req = new XMLHttpRequest();
    req.open("GET", "/api/user/logout");
    req.addEventListener("load", function() {
        sessionStorage.setItem("username", "");
        loginMenuManager();
    });
    req.send();
}


function userEdit(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", "/api/user/");
    xmlhttp.addEventListener("load", function() {
        console.log("RAN RESPONSE");
        //checkAlive();
        location.reload();
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        "name": document.getElementById("ChangeName").value,
        "email" : document.getElementById("ChangeEmail").value,
        "password" : document.getElementById("ChangePassword").value,
        "id" : sessionStorage.getItem("username").value
    }));
}

function userLogin(){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://34.89.108.223/users/login");
    xmlhttp.addEventListener("load", function() {
        console.log("RAN RESPONSE");
        //checkAlive();
        try{
            var user = JSON.parse(this.responseText);
            console.log(user);
            sessionStorage.setItem("username", user.username);
            sessionStorage.setItem("id", user.id);
            sessionStorage.setItem("name", user.name);
            sessionStorage.setItem("email", user.email);
        }catch(e){
            console.log(e)
            sessionStorage.setItem("username", "");
            sessionStorage.setItem("id", "");
            sessionStorage.setItem("name", "");
            sessionStorage.setItem("email", "");
        }
        //window.location.href = "/";
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        "email": document.getElementById("LoginUsername").value,
        "password" : document.getElementById("LoginPassword").value
    }));
}

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
        //checkAlive();
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
        //checkAlive();
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
        //checkAlive();
        location.reload();
        getProjects();
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        "title": document.getElementById("NewProjetTitle").value,
    }));
}

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
        //checkAlive();
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
        //checkAlive();
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
        //checkAlive();
        location.reload();
        getProjects();
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send();
}