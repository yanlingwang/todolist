


// //keydown event
// document.getElementById("add-task-input").onkeydown=function(event){
//   var li=document.createElement("li");
//   var inputContent=document.getElementById("add-task-input").value;
//   var inputContentTag=document.createTextNode(inputContent);
//   li.appendChild(inputContentTag);
//   if(event.keyCode==13){
//   	if(this.value==""){return;}
//     var content=this.value;
//     this.value="";
//     inputContent=content;
//     document.getElementById("task-list").appendChild(li);
//   }
// }


// //add a new task to to-do list
// function addTask(taskObj){
  
// }



initData();
showTasks();
//initialize data
function initData(){
  if(!localStorage.task){
  	var taskJson=[{
  	  "id":0,
  	  "finish":false,
  	  "content":"walking"
  	},{
      "id":1,
      "finish":false,
      "content":"running"
	}];
	localStorage.task = JSON.stringify(taskJson);
  }
}



//keydown event
document.getElementById("add-task-input").onkeydown=function(event){
  if(event.keyCode==13){
  	if(this.value==""){return;}
    var content=this.value;
    this.value="";
    var taskObj={};
    taskObj.content=content;
    taskObj.finish=false;
    addTask(taskObj);
    showTasks();
  }
  return taskObj;
}



// //add a new task to to-do list
// function addTask(taskObj){
//   //create a new li to task list when a new task is added 
//   var inputContent=taskObj.content;
//   var li=document.createElement("li");
//   var inputContentTag=document.createTextNode(inputContent);
//   document.getElementById("task-list").appendChild(li);
//   li.appendChild(inputContentTag);
  
//   //add mark when a certain task is clicked
//   li.addEventListener('click',function(event){
//   	event.target.classList.toggle('checked');
//   },false);

//   //add delete button 
//   var delBtn=document.createElement("a");
//   var txt=document.createTextNode("\u00D7");
//   delBtn.className="del-task";
//   delBtn.appendChild(txt);
//   li.appendChild(delBtn);
// }








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
  if (taskArr.length === 0) {
    taskObj.id = 0;
  } else {
    taskObj.id = taskArr[taskArr.length - 1].id + 1;
  }

  console.log("taskArr.length"+taskArr.length)
  console.log("here:"+taskObj.id);
  taskArr.push(taskObj);
  updateTask(taskArr);

}

//show all tasks
function showTasks(){
  var taskArr=getTask();
  var liContent;
  for(var i=0;i<taskArr.length;i++){
    liContent='<li  class="task">'+'<a class="checked">O</a>'+taskArr[i].content+'<a class="edit-task">'+'edit'+'</a>'+'<a class="del-task">'+'del'+'</a>'+'</li>';
    this.id=i;
  }
  document.getElementById('task-list').innerHTML+=liContent;
}

//delete a task
function delTask(elem){
  var elem=elem.parentNode.getAttribute("id");
  var taskArr=getTask();
  for(var i=0;i<taskArr.length;i++){
  	if(taskArr[i].id==id){
  		taskArr.splice(i,1);
  	}
  }
  updateTask(taskArr);
  showTasks();
}



// function getTaskIndexById(id){
// 	var allTasks=getTask();
// 	for(var i=0;i<allTasks.length;i++){
// 		return i;
// 	}
// 	return -1;
// }

// function updateTask(tasks){
// 	localStorage.task=JSON.stringify(tasks);
// }
// //delete task
// function deleteTask(){

// }

// var dels=document.getElementsByClassName("del-task");

// for(var i=0;i<dels.length;i++){
// 	console.log(dels.length);
//   dels[i].onclick=function(){
//   	console.log(1)
//     // var delsParents=this.parentElement;
//     // console.log(delsParents);
//     // delsParents.style.display="none";
//   }
// }
