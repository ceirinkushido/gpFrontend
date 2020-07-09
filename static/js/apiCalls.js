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
    if (sessionStorage.getItem("userlevel") == 3) {
        req.open("GET", "http://34.89.108.223/projects/");
    } else {
        req.open("GET", "http://34.89.108.223/projects/aproved");
    }

    req.addEventListener("load", function() {
        var projects = JSON.parse(this.responseText);
        console.log(projects);
        var tb = document.getElementById('projects');
        console.log(tb)
        tb.innerHTML = '';
        for (var i in projects) {
            var tr = document.createElement('tr');

            var tdTitle = document.createElement('td');
            var tdDescription = document.createElement('td');
            var tdStart = document.createElement('td');
            var tdEnd = document.createElement('td');
            var tdWorkingHours = document.createElement('td');
            var tdConfirmed = document.createElement('td');
            var tdButtonTasksView = document.createElement('td');
            
            tdTitle.innerHTML = projects[i].name;
            tdDescription.innerHTML = projects[i].project_description;
            tdWorkingHours.innerHTML = projects[i].hours_per_day;
            tdStart.innerHTML = projects[i].start_date;
            tdEnd.innerHTML = projects[i].end_date;    

            if (sessionStorage.getItem("userlevel") == 3) {
                if (projects[i].project_status) {
                    if (projects[i].students.includes(sessionStorage.getItem("id"))) {
                        tdConfirmed.innerHTML = "<h5>Candidatado</h5>";
                        tr.classList.add("table-success");
                    }else{
                        tdConfirmed.innerHTML = "<h5>Considere ajudar este projeto</h5>";
                        tr.classList.add("table-info");
                    }
                } else {
                    tdConfirmed.innerHTML = "<h5>ESTE PROJETO NÃO ESTÁ APROVADO</h5>\n"+
                        "<button type='button' class='btn btn-warning' onclick='aproveProject(\"" + projects[i].id +  "\")'>"+
                            "Aprovar Projeto"+
                        "</button>";
                    tr.classList.add("table-danger");
                }
                req.open("GET", "http://34.89.108.223/projects/");
            }
            
            tdButtonTasksView.innerHTML =
                "<button type='button' class='btn btn-info' onclick='getTasks(\"" + projects[i].id +  "\")'  data-toggle='modal' data-target='#ModalCenter'>"+
                    "Ver Detalhes"+
                "</button>";
            
            tr.appendChild(tdTitle);
            tr.appendChild(tdDescription);
            tr.appendChild(tdStart);
            tr.appendChild(tdEnd);
            tr.appendChild(tdWorkingHours);
            tr.appendChild(tdConfirmed);
            tr.appendChild(tdButtonTasksView);
            tb.appendChild(tr);
        }
    });
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    req.send();
}

function updateProject(id){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", "http://34.89.108.223/projects/"+id);
    xmlhttp.addEventListener("load", function() {
        console.log("RAN RESPONSE");
        loginMenuManager();
        location.reload();
        getProjects();
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    xmlhttp.send(JSON.stringify({
        "contact_person": document.getElementById(id+"contact_person").value,
        "email": document.getElementById(id+"email").value,
        "phone": document.getElementById(id+"phone").value,
        "entities_involved": document.getElementById(id+"entities_involved").value,
        "intervention_area": document.getElementById(id+"intervention_area").value,
        "location": document.getElementById(id+"location").value,
        "activities_description": document.getElementById(id+"activities_description").value,
        "objectives": document.getElementById(id+"objectives").value,
        "observations": document.getElementById(id+"observations").value,
        "training_type": document.getElementById(id+"training_type").value,
        "project_status": false
    }));
}

function deleteProject(id){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("DELETE", "http://34.89.108.223/projects/"+id);
    xmlhttp.addEventListener("load", function() {
        console.log("RAN RESPONSE");
        loginMenuManager();
        location.reload();
        getProjects();
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    xmlhttp.send();
}

function newProject(){

    var xmlhttp = new XMLHttpRequest();
    if (sessionStorage.getItem("userlevel") == 4) {
        xmlhttp.open("POST", "http://34.89.108.223/projects/company/"+sessionStorage.getItem("id"));
    } else {
        xmlhttp.open("POST", "http://34.89.108.223/projects/users/"+sessionStorage.getItem("id"));
    }
    xmlhttp.addEventListener("load", function() {
        console.log("RAN RESPONSE");
        loginMenuManager();
        location.reload();
        getProjects();
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    xmlhttp.send(JSON.stringify({
        "name": document.getElementById("name").value,
        "contact_person": document.getElementById("contact_person").value,
        "email" : document.getElementById("email").value,
        "phone" : document.getElementById("phone").value,
        "location" : document.getElementById("location").value,
        "project_description" : document.getElementById("project_description").value,
        "intervention_area" : document.getElementById("intervention_area").value,
        "target_users" : document.getElementById("target_users").value,
        "objectives": document.getElementById("objectives").value,
        "activities_description" : document.getElementById("activities_description").value,
        "specific_training" : document.getElementById("specific_training").checked,
        "training_type" : document.getElementById("training_type").value,
        "hours_per_day" : document.getElementById("hours_per_day").value,
        "entities_involved" : document.getElementById("entities_involved").value,
        "observations": document.getElementById("observations").value,
        "start_date" : document.getElementById("start_date").value,
        "end_date" : document.getElementById("end_date").value,
    }));
}

function aproveProject(id){
    var req = new XMLHttpRequest();
    req.open("PUT", "http://34.89.108.223/projects/"+id);
    req.addEventListener("load", function() {
        console.log("RAN RESPONSE");
        loginMenuManager();
        location.reload();
        getProjects();
    });
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    req.send(JSON.stringify({
        "project_status": true
    }));
}

function applyToProject(id){
    var req = new XMLHttpRequest();
    req.open("GET", "http://34.89.108.223/projects/apply/"+id+"/"+sessionStorage.getItem("id"));
    req.addEventListener("load", function() {
        console.log("RAN RESPONSE");
        loginMenuManager();
        location.reload();
        getProjects();
    });
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    req.send();
}
//#endregion

//#region task management
function getTasks(id) {
    
    var req = new XMLHttpRequest();
    req.open("GET", "http://34.89.108.223/projects/"+id);
    req.addEventListener("load", function() {
        
        var tasks = JSON.parse(this.responseText);
        console.log(tasks);
        document.getElementById('ProjetNameTasks').innerHTML = "Detalhes do Projeto: "+tasks.msg.name;
        var th = document.getElementById('TaskThead');
        console.log(th)
        th.innerHTML = '';

        //#region modal default table
        var trTitles = document.createElement('tr');

        var thContact = document.createElement('th');
        var thEntities = document.createElement('th');
        var thAreas = document.createElement('th');
        var thLocation = document.createElement('th');
        var thActivities = document.createElement('th');
        var thObjectives = document.createElement('th');
        var thObservations = document.createElement('th');
        var thRequiredTraining = document.createElement('th');

        var thButtonTaskActions = document.createElement('th');

        thContact.innerHTML = "Contactos";
        thEntities.innerHTML = "Entidades Envolvidas";
        thAreas.innerHTML = "Areas de Intrevenção";
        thLocation.innerHTML = "Localização";
        thActivities.innerHTML = "Atividades";
        thObjectives.innerHTML = "Objetivos";
        thObservations.innerHTML = "Observações";
        thRequiredTraining.innerHTML = "Treino Especializado";
        thButtonTaskActions.innerHTML = "Ação";
        
        trTitles.appendChild(thContact);
        trTitles.appendChild(thEntities);
        trTitles.appendChild(thAreas);
        trTitles.appendChild(thLocation);
        trTitles.appendChild(thActivities);
        trTitles.appendChild(thObjectives);
        trTitles.appendChild(thObservations);
        trTitles.appendChild(thRequiredTraining);
        trTitles.appendChild(thButtonTaskActions);
        th.appendChild(trTitles);
        //#endregion

        var tb = document.getElementById('tbTasksBody');
        var tr = document.createElement('tr');
        tb.innerHTML="";

        var tdContact = document.createElement('th');
        var tdEntities = document.createElement('th');
        var tdAreas = document.createElement('th');
        var tdLocation = document.createElement('th');
        var tdActivities = document.createElement('th');
        var tdObjectives = document.createElement('th');
        var tdObservations = document.createElement('th');
        var tdRequiredTraining = document.createElement('th');

        var tdButtonTaskActions = document.createElement('th');

        if (sessionStorage.getItem("userlevel") == 3) {
            
            tdContact.innerHTML = "<input type='text' class='form-control' id='"+
                tasks.msg.id+"contact_person' name='companyname' placeholder='"+tasks.msg.contact_person+"'>\n"+
                "<input type='text' class='form-control' id='"+
                tasks.msg.id+"email' name='companyname' placeholder='"+tasks.msg.email+"'>\n"+
                "<input type='text' class='form-control' id='"+
                tasks.msg.id+"phone' name='companyname' placeholder='"+tasks.msg.phone+"'>";

            tdEntities.innerHTML = "<input type='text' class='form-control' id='"+
                tasks.msg.id+"entities_involved' name='companyname' placeholder='"+tasks.msg.entities_involved+"'>";
            
            tdAreas.innerHTML = "<input type='text' class='form-control' id='"+
                tasks.msg.id+"intervention_area' name='companyname' placeholder='"+tasks.msg.intervention_area+"'>";
            
            tdLocation.innerHTML = "<input type='text' class='form-control' id='"+
                tasks.msg.id+"location' name='companyname' placeholder='"+tasks.msg.location+"'>";
            
            tdActivities.innerHTML = "<input type='text' class='form-control' id='"+
                tasks.msg.id+"activities_description' name='companyname' placeholder='"+tasks.msg.activities_description+"'>";
            
            tdObjectives.innerHTML = "<input type='text' class='form-control' id='"+
                tasks.msg.id+"objectives' name='companyname' placeholder='"+tasks.msg.objectives+"'>";
            
            tdObservations.innerHTML = "<input type='text' class='form-control' id='"+
                tasks.msg.id+"observations' name='companyname' placeholder='"+tasks.msg.observations+"'>";
            
            if (tasks.msg.specific_training) {
                tdRequiredTraining.innerHTML = "<input type='text' class='form-control' id='"+
                    tasks.msg.id+"training_type' name='companyname' placeholder='"+tasks.msg.training_type+"'>";
            } else {
                tdRequiredTraining.innerHTML = "<input type='hidden' class='form-control' id='"+
                tasks.msg.id+"training_type' name='companyname' value='nenhum'> Não";
            }

            tdButtonTaskActions.innerHTML =  
            
                "<div class='btn-group' role='group' aria-label='Basic example'>"+
                    "<button type='button' type='submit' onclick='updateProject(\"" + tasks.msg.id +  "\")' class='btn btn-warning'>Guardar</button>"+
                    "<button type='button' type='submit' onclick='deleteProject(\"" + tasks.msg.id +  "\")' class='btn btn-danger'>Apagar</button>"+
                    "<button type='button' type='submit' onclick='applyToProject(\"" + tasks.msg.id +  "\")' class='btn btn-success'>Candidatar</button>"
                "</div>";

        }else if(sessionStorage.getItem("id") != 4 ){

            tdContact.innerHTML = tasks.msg.contact_person+"\n"+tasks.msg.email+"\n"+tasks.msg.phone;
            tdEntities.innerHTML = tasks.msg.entities_involved;
            tdAreas.innerHTML = tasks.msg.intervention_area;
            tdLocation.innerHTML = tasks.msg.location;
            tdActivities.innerHTML = tasks.msg.activities_description;
            tdObjectives.innerHTML = tasks.msg.objectives;
            tdObservations.innerHTML = tasks.msg.observations;
            if (tasks.msg.specific_training) {
                tdRequiredTraining.innerHTML = tasks.msg.training_type;
            } else {
                tdRequiredTraining.innerHTML = "Não";
            }
            tdButtonTaskActions.innerHTML = 
                "<div class='btn-group' role='group' aria-label='Basic example'>"+
                    "<button type='button' type='submit' onclick='applyToProject(\"" + tasks.msg.id +  "\")' class='btn btn-success'>Candidatar</button>"
                "</div>";
        }else{
            tdContact.innerHTML = tasks.msg.contact_person+"\n"+tasks.msg.email+"\n"+tasks.msg.phone;
            tdEntities.innerHTML = tasks.msg.entities_involved;
            tdAreas.innerHTML = tasks.msg.intervention_area;
            tdLocation.innerHTML = tasks.msg.location;
            tdActivities.innerHTML = tasks.msg.activities_description;
            tdObjectives.innerHTML = tasks.msg.objectives;
            tdObservations.innerHTML = tasks.msg.observations;
            if (tasks.msg.specific_training) {
                tdRequiredTraining.innerHTML = tasks.msg.training_type;
            } else {
                tdRequiredTraining.innerHTML = "Não";
            }
        }

        tr.appendChild(tdContact);
        tr.appendChild(tdEntities);
        tr.appendChild(tdAreas);
        tr.appendChild(tdLocation);
        tr.appendChild(tdActivities);
        tr.appendChild(tdObjectives);
        tr.appendChild(tdObservations);
        tr.appendChild(tdRequiredTraining);
        tr.appendChild(tdButtonTaskActions);
        tb.appendChild(tr);
    });
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    req.send();
}

//#endregion