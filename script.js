// display tasks
renderTasks();
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
    renderTasks();
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

//delete a task
function deleteTask(e,id){
	for(var i=0;i<taskArr.length;i++){ 
	  if(this.id == taskArr[i].id){     
	    taskArr.splice(i,1);	
	    break;   
	  }
  }
  updateTask(taskArr);
  renderTasks();
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
    for(var i=0;i<taskArr.length;i++){
      if(taskArr[i].id == id){
        taskArr[i].content=editInputObj.value;
        break;
      }
    }
    updateTask(taskArr); 
  }
  e.appendChild(editInputObj);
  editInputObj.focus();
  var id=e.parentNode.getAttribute("taskId");
}

//change the state of item, depending on whether the item has completed or not
function clickCheckbox(e,id){
  var taskId = this.id; 
  for(var i=0;i<taskArr.length;i++){
	if(taskArr[i].id == taskId){
	  taskArr[i].finish=!taskArr[i].finish;	
	}		 	   
	    updateTask(taskArr);
      renderTasks();  
  }
}

// function filterItems(type) {
//   return taskArr.filter(function(item, key) {
//     if (item.finish === false) {
//       return true;
//     }
//     return false;
//   })
// }

function filterItems(type){
  if(type === 'active'){
    return taskArr.filter(function(item,key){
      if(item.finish === false){
        return true;
      }
      return false;
    });
  }else if(type === 'completed'){
    return taskArr.filter(function(item,key){
      if(item.finish === true){
        return true;
      }
      return false;
    })
  }else if(type === 'all'){
     return;
  }else if(type === 'clearAllCompleted'){
    for(var i=0;i<taskArr.length;i++){
      if (taskArr[i].finish == true){
        taskArr.splice(i,1);
      }
    }
    updateTask(taskArr);
    return;
  }
}

//show filter task lists
function showFilterTaskList(){
  var allTasks=getItemById('all-tasks');
  var activeTasks=getItemById('active-tasks');
  var clearCompleted=getItemById('clear-completed');
  var completedTasks=getItemById('completed-tasks');
  var activeLists=getItemById('active-list');
  var completedList=getItemById('completed-list');

  // allTasks.onclick = function(type, e) {
  //   console.log('type : ', type);
  //   var displayedItems = [];
  //   if (type === 'delete') {
  //     taskArr = [];
  //   } else {
  //     displayedItems = filterItems(type);
  //   }
  //   console.log('displayed items : ', displayedItems);
  //   renderTasks(displayedItems);
  // }.bind(this, 'all');

  var callback=function(type,e){
    var displayedItems=[];
    displayedItems=filterItems(type);
    renderTasks(displayedItems);
  }
  listener(allTasks,'click',callback.bind(this,'all'));
  listener(activeTasks,'click',callback.bind(this,'active'));
  listener(completedTasks,'click',callback.bind(this,'completed'));
  listener(clearCompleted,'click',callback.bind(this,'clearAllCompleted'));
}
showFilterTaskList();


//add color to filter buttons when they are clicked
var sortTask=getItemById('sort-task');
var sortControls=sortTask.getElementsByTagName('a');
for(var i=0;i<sortControls.length;i++){
  sortControls[i].index=i;   
  sortControls[i].onclick=function(){
    for(var j=0;j<sortControls.length;j++){
      if(j == this.index){
        sortControls[j].style.color="#339999";
      }else{
        sortControls[j].style.color="#ccc";
      }
    }
  }
}

//render all tasks on to-do list
// function renderTasks(val) {}
function renderTasks(val){
  var taskList=document.getElementById('task-list');
  var taskCount=document.getElementById('task-count');
  var activeList= '<ul id="active-list">'
  var completedList='<ul id="completed-list">';
  var taskArr=val || getTask();
  var liContent;                      
  for(var i=0;i<taskArr.length;i++){
    liContent='<li '+'taskId="' + taskArr[i].id + '" '+'class="task"'+'>'
      +'<a '+'class="check"'+'id="'+taskArr[i].id+'"'+'onclick="clickCheckbox.call(this,id);"'+'>'+'O'+'</a>'
      // +'<span class="task-content" ondblclick="editTask(this);">'+taskArr[i].content+'</span>'
      +'<span '+'class="task-content"'+'ondblclick="editTask(this);"'+'id="'+taskArr[i].id+'"'+'>'+taskArr[i].content+'</span>'
      +'<a '+'class="del-task"'+'id="'+taskArr[i].id+'"'+'onclick="deleteTask.call(this,id);"'+'>'+'del'+'</a>'
      +'</li>';
    if(!taskArr[i].finish){
      activeList+=liContent;
    }else{
      completedList+=liContent;
    }
  }
    activeList+="</ul>";
    completedList+="</ul>";
    taskList.innerHTML=activeList+completedList;
    //show the number of items left
    taskCount.innerHTML=taskArr.length;
}

// function handleClick(e, type) {
//   console.log('type : ', type);
// }

function listener(node,type,callback){
  node.addEventListener(type,callback,false);
}

function getItemById(id) {
  return document.getElementById(id);
}
