let wage = document.getElementById("userInput");
let mode = "done"

wage.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {addTask()}
});
let appState = {}


function getOldSession(){
  if(localStorage.getItem("appState") == null){
    appState = {
      currentUser: "Anonymous",
      tasks: []
    };
  console.log('I was here')
  }else{
    appState = JSON.parse(localStorage.getItem("appState"))
  }
}

function saveCurrentSession(){
  localStorage.setItem("appState", JSON.stringify(appState))
}

function addTask() {
  const userInput = document.getElementById("userInput").value;
  if (userInput) {
    const newTask = {
      note: "",
      priority: 1,
      dateDone: "",
      username: appState.currentUser,
      isDone: false,
      dateCreated: new Date(),
      body: userInput
    };
    appState.tasks.push(newTask);
    document.getElementById("userInput").value = "";
  }
  thisIsAFunctionThatRenderTodoList(mode);
}

function thisIsAFunctionThatRenderTodoList(mode) {
  let todoListContent = "";
  const toDoListShowCase = document.getElementById("toDoListCollumn");
  let task = 0;
  if(appState.tasks.length > 0 && mode =="all"){
    appState.tasks.map((todo, i) => {
      if (todo.username === appState.currentUser && todo.isDone == false) {
        todoListContent += `
        <div id="listRenderArea" class="form-check">
          <input class="form-check-input" type="checkbox" value="" onchange="handleCheck(this);" id="todo-id-${i}">
          <label class="form-check-label" for="todo-id-${i}" id="label-id-${i}" onmouseover="showDeleteBtn(this)" onmouseout="hideDeleteBtn(this)">${todo.body} <button class="btn btn-sm btn-outline-danger btn-delete invisible" onclick='thisFunctionWillDeleteSomethingOnToDoList(${i})'>X</button></label>
        </div>`  
      } else if (todo.username === appState.currentUser && todo.isDone == true) {
        todoListContent += `
        <div id="listRenderArea" class="form-check">
          <input class="form-check-input" type="checkbox" value="" onchange="handleCheck(this);" checked id="todo-id-${i}">
          <label class="form-check-label" for="todo-id-${i}" id="label-id-${i}" onmouseover="showDeleteBtn(this)" onmouseout="hideDeleteBtn(this)"><del>${todo.body}</del> <button class="btn btn-sm btn-outline-danger btn-delete invisible" onclick='thisFunctionWillDeleteSomethingOnToDoList(${i})'>X</button></label>
        </div>` 
      }
  })
  }if(appState.tasks.length > 0 && mode ==="done"){
    appState.tasks.map((todo, i) => {
      if (todo.username === appState.currentUser && todo.isDone == true ) {
        todoListContent += `
        <div id="listRenderArea" class="form-check">
          <input class="form-check-input" type="checkbox" value="" onchange="handleCheck(this);" id="todo-id-${i}" checked>
          <label class="form-check-label" for="todo-id-${i}" id="label-id-${i}" onmouseover="showDeleteBtn(this)" onmouseout="hideDeleteBtn(this)"><del>${todo.body}</del> <button class="btn btn-sm btn-outline-danger btn-delete invisible" onclick='thisFunctionWillDeleteSomethingOnToDoList(${i})'>X</button></label>
        </div>`
      }
    })
  }if(appState.tasks.length > 0 && mode ==="undone"){
    appState.tasks.map((todo, i) => {
      if (todo.username === appState.currentUser && todo.isDone == false) {
        todoListContent += `
        <div id="listRenderArea" class="form-check">
          <input class="form-check-input" type="checkbox" value="" onchange="handleCheck(this);" id="todo-id-${i}">
          <label class="form-check-label" for="todo-id-${i}" id="label-id-${i}" onmouseover="showDeleteBtn(this)" onmouseout="hideDeleteBtn(this)">${todo.body} <button class="btn btn-sm btn-outline-danger btn-delete invisible" onclick='thisFunctionWillDeleteSomethingOnToDoList(${i})'>X</button></label>
        </div>`
      }
    })
  }
  updateCurrentStatic()
  saveCurrentSession()
  toDoListShowCase.innerHTML = todoListContent;
}

function handleCheck(checkbox) {
  let index = checkbox.id.split('-')[2];
  changeTaskState(index);
  thisIsAFunctionThatRenderTodoList(mode);
}

function changeTaskState(index) {
  if(appState.tasks[index].isDone === false){
    appState.tasks[index].isDone = true;
  } else {appState.tasks[index].isDone = false;}
}


function thisFunctionWillDeleteSomethingOnToDoList(id){
  appState.tasks.splice(id,1)
  thisIsAFunctionThatRenderTodoList(mode);
  updateCurrentStatic()
}

function updateCurrentStatic(){
  doneLen = appState.tasks.filter((todo) => todo.isDone===true).length;
  undoneLen = appState.tasks.filter((todo) => todo.isDone===false).length;
  if(undoneLen<1){
    document.getElementById("currentStatic").innerHTML = ``;
  }else{
    document.getElementById("showallbutton").lastChild.innerHTML = `${doneLen+undoneLen}`
    document.getElementById("showundonebutton").lastChild.innerHTML = `${undoneLen}`
    document.getElementById("showdonebutton").lastChild.innerHTML = `${doneLen}`
  }
}

function showDeleteBtn(element) {
  element.lastChild.classList.remove("invisible");
}

function hideDeleteBtn(element) {
  element.lastChild.classList.add("invisible");
}

function activeButton(button){
  const listVariable = ['showundonebutton', 'showallbutton', 'showdonebutton']
  listVariable.map((variable) => {
    if(variable === button){
      document.getElementById(variable).classList.add("active")
    }else{
      document.getElementById(variable).classList.remove("active")     
    }
  })
}

function thisisABadNameYeahButIDontCare(newmode){
  mode = newmode;
  thisIsAFunctionThatRenderTodoList(mode)
}

getOldSession()
thisIsAFunctionThatRenderTodoList(mode);