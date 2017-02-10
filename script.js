var taskArr=getTask();
console.log(taskArr);
// display tasks
showTasks();

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
};


//get all tasks
function getTask() {
  return JSON.parse(localStorage.task);
}


//update task
function updateTask(tasks){
  localStorage.task=JSON.stringify(tasks);
}


//add new task to to-do list
function addTask(taskObj){
  var taskArr=getTask();
  //set the id of task object
  if (taskArr.length === 0) {
    taskObj.id = 0;
  } else {
    taskObj.id = taskArr[taskArr.length - 1].id + 1;
  }
  taskArr.push(taskObj);
  updateTask(taskArr);
}



//delete a task from to-do list
function deleteTask(e){
  //get the task id of each task
  var id=e.parentNode.getAttribute("taskId");
	var taskArr=getTask(); 	
  	for(var i=0;i<taskArr.length;i++){ 
  	  if(id==taskArr[i].id){     
  	    taskArr.splice(i,1);	
  	    break;   
  	  }
    }
    updateTask(taskArr);
    showTasks();
}



//edit the content of a task when it is double clicked
function editTask(e){
  var previousTaskContent=e.innerHTML;
  var editInputObj=document.createElement('input');
  editInputObj.type="text";
  editInputObj.value=previousTaskContent;
  // if the new task content is null, the previous one remains
  editInputObj.onblur=function(){
  	e.innerHTML=this.value?this.value:previousTaskContent;
  }
  e.innerHTML=previousTaskContent;
  e.appendChild(editInputObj);
  editInputObj.focus();
}



//show all tasks on to-do list
function showTasks(){
  var taskList=document.getElementById('task-list');
  var taskUl="<ul>"    
  var taskArr=getTask();
  var liContent;         
  //add all tasks to task list               
  for(var i=0;i<taskArr.length;i++){
    liContent='<li '+'taskId="' + taskArr[i].id + '" '+'class="task"'+'>'
    +'<a class="check" onclick="clickCheckbox(this);">O</a>'
    +'<span class="task-content" ondblclick="editTask(this);">'+taskArr[i].content+'</span>'
    +'<a class="del-task" onclick="deleteTask(this);">'+'del'+'</a>'
    +'</li>';  
    taskUl+=liContent;
  }
    taskUl+="</ul>";
    taskList.innerHTML=taskUl;
}


//when the checkbox of a task is clicked
function clickCheckbox(e){
	var taskId=e.parentNode.getAttribute("taskId");
    var taskArr=getTask();
	for(var i=0;i<taskArr.length;i++){
		if(taskArr[i].id == taskId){
			taskArr[i].finish=!taskArr[i].finish;	
			console.log(taskArr[i].finish);
			if(taskArr[i].finish==true){
			    console.log(e.parentNode);			
				e.parentNode.classList.add("completed");
			}else{
				console.log(e.parentNode);
				e.parentNode.classList.add("uncompleted");
			}
		}		 	   
	    updateTask(taskArr);
        showTasks();  
    }
}



var taskCount=document.getElementById('task-count');
var taskArr=getTask();
taskCount.innerHTML=taskArr.length;
while(addTask){
	taskCount++;
}





//show active tasks
// var activeTasks=document.getElementById("active-tasks");
// activeTasks.onclick=function(){
//   var taskArr=getTask();
//   var newArr=[];
//   for(var i=0;i<taskArr.length;i++){
//     if(taskArr[i].finish=false){
//       newArr.push(taskArr[i]);
//     }
//   }

// }



//clear all completed tasks
var clearCompleted=document.getElementById("clear-completed");
clearCompleted.onclick=function(){
	var taskArr=getTask();
	for(var i=0;i<taskArr.length;i++){
		while(taskArr[i].finish == true){
			taskArr.splice(i,1);
		}
	}
    updateTask(taskArr);
    showTasks();
}