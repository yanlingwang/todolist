// display tasks
showTasks();
var taskArr=getTask();
console.log(taskArr);

//keydown event
document.getElementById("add-task-input").onkeydown=function(event){
  // key "enter"
  if(event.keyCode==13){
  	if(this.value==""){return;}
    var content=this.value;
    this.value="";
    var taskObj={};   
    taskObj.finish=false;
    taskObj.content=content;
    addTask(taskObj);
    showTasks();
  }
}

//get all tasks
function getTask() {
  if (localStorage.task) {
  	return JSON.parse(localStorage.task);
  } else {
  	return [];
  } 
}

//update task
function updateTask(tasks){
	localStorage.task=JSON.stringify(tasks);
}

//add a new task 
function addTask(taskObj){
  if(taskArr.length === 0){
    taskObj.id=0;
  }else{
    taskObj.id=taskArr[taskArr.length-1].id+1;
  }
  taskArr.push(taskObj);
  updateTask(taskArr);
}

//modify: bind() id
//delete a task
function deleteTask(e){
  //get the task id of each task
  var id=e.parentNode.getAttribute("taskId");
	for(var i=0;i<taskArr.length;i++){ 
	  if(id == taskArr[i].id){     
	    taskArr.splice(i,1);	
	    break;   
	  }
  }
  updateTask(taskArr);
  showTasks();
}

//edit a task when it is double clicked
function editTask(e){
  var previousTaskContent=e.innerHTML;
  var editInputObj=document.createElement('input');
  editInputObj.type="text";
  editInputObj.value=previousTaskContent;
  //if the new task content is null, the previous one remains
  editInputObj.onblur=function(){
    e.innerHTML=this.value?this.value:previousTaskContent;
  }
  e.appendChild(editInputObj);
  editInputObj.focus();
  var id=e.parentNode.getAttribute("taskId");
  for(var i=0;i<taskArr.length;i++){
    if(taskArr[i].id == id){
      taskArr[i].content=editInputObj.value;
      break;
    }
  }
  updateTask(taskArr);  
}

//change the state of item, depending on whether the item has completed or not
//function clickCheckbox(e,id)
function clickCheckbox(e){
  // var taskId = id; 
  var taskId=e.parentNode.getAttribute("taskId");
  for(var i=0;i<taskArr.length;i++){
	if(taskArr[i].id == taskId){
	  taskArr[i].finish=!taskArr[i].finish;	
	}		 	   
	    updateTask(taskArr);
      showTasks();  
  }
}

//onclick event
var obj={
  on:function(element,type,handler){
    if(element.addEventListener){
      element.addEventListener(type,handler,false);
    }else{
      element.attachEvent('on'+type,handler);
    }
  }
}

//modify:filter()
//show filter task lists
function showFilterTaskList(){
  var allTasks=document.getElementById('all-tasks');
  var activeTasks=document.getElementById("active-tasks");
  var completedTasks=document.getElementById("completed-tasks");
  var activeList=document.getElementById("active-list");
  var completedList=document.getElementById("completed-list");
  //show all tasks
  obj.on(allTasks,'click',function(){
    showTasks();
  })
  //show active tasks
  obj.on(activeTasks,'click',function(){
    activeList.style.display="block";
    completedList.style.display="none";
  })
  //show completed tasks
  obj.on(completedTasks,'click',function(){
    activeList.style.display="none";
    completedList.style.display="block";
  })

  // ['active', 'completed', 'delelted']

  // function(type) {
  //   obj.filter(function(t, kye) => {
  //     if (t === type) return true;
  //     return false;
  //   })
  // }

  //clear all completed tasks
  var clearCompleted=document.getElementById("clear-completed");
  clearCompleted.onclick=function(){
    for(var i=0;i<taskArr.length;i++){
      if (taskArr[i].finish == true){
        taskArr.splice(i,1);
      }
    }
    updateTask(taskArr);
    showTasks();
  }
}
showFilterTaskList();

//show all tasks on to-do list
function showTasks(){
  var taskList=document.getElementById('task-list');
  var taskCount=document.getElementById('task-count');
  var activeList= '<ul id="active-list">'
  var completedList='<ul id="completed-list">';
  var taskArr=getTask();
  var liContent;                      
  for(var i=0;i<taskArr.length;i++){
    if(!taskArr[i].finish){
      liContent='<li '+'taskId="' + taskArr[i].id + '" '+'class="task"'+'>'
      +'<a class="check" onclick="clickCheckbox(this);">O</a>'
      +'<span class="task-content" ondblclick="editTask(this);">'+taskArr[i].content+'</span>'
      +'<a class="del-task" onclick="deleteTask(this);">'+'del'+'</a>'
      +'</li>'; 
      activeList+=liContent;
    }else{
      liContent='<li '+'taskId="' + taskArr[i].id + '" '+'class="task finished"'+'>'
      +'<a class="check" onclick="clickCheckbox(this);">O</a>'
      +'<span class="task-content" ondblclick="editTask(this);">'+taskArr[i].content+'</span>'
      +'<a class="del-task" onclick="deleteTask(this);">'+'del'+'</a>'
      +'</li>'; 
      completedList+=liContent;
    }
  }
    activeList+="</ul>";
    completedList+="</ul>";
    taskList.innerHTML=activeList+completedList;
    //show the number of items left
    taskCount.innerHTML=taskArr.length;
}