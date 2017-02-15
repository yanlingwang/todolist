// display tasks
renderTasks();
var taskArr = getTask();

//keydown event
getItemById("add-task-input").onkeydown = function(event) {
  // key "enter"
  if(event.keyCode == 13) {
  	if(this.value == ""){return;}
    var content = this.value;
    this.value = "";
    var taskObj = {};   
    taskObj.finish = false;
    taskObj.content = content;
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
function updateTask(tasks) {
	localStorage.task = JSON.stringify(tasks);
}

//add a new task 
function addTask(taskObj) {
  if(taskArr.length === 0) {
    taskObj.id = 0;
  }else {
    taskObj.id = taskArr[taskArr.length-1].id+1;
  }
  taskArr.push(taskObj);
  updateTask(taskArr);
}

//delete a task
function deleteTask(e, id) {
	for(var i = 0;i<taskArr.length;i++) { 
	  if(this.id == taskArr[i].id) {     
	    taskArr.splice(i,1);	
	    break;   
	  }
  }
  updateTask(taskArr);
  renderTasks();
}

//edit a task when it is double clicked
function editTask(e) {
  var previousTaskContent = e.innerHTML;
  var editInputObj = document.createElement('input');
  editInputObj.type = "text";
  editInputObj.value = previousTaskContent;
  var id = e.parentNode.getAttribute("taskId");
  //if the new task content is null, the previous one remains
  editInputObj.onblur = function() {
    e.innerHTML = this.value?this.value:previousTaskContent;
    for(var i = 0;i<taskArr.length;i++) {
      if(taskArr[i].id == id) {
        taskArr[i].content = editInputObj.value;
        break;
      }
    }
    updateTask(taskArr); 
  }
  e.appendChild(editInputObj);
  editInputObj.focus();
}

//change the state of item, depending on whether the item has completed or not
function clickCheckbox(e, id) {
  var taskId = this.id; 
  for(var i=0;i<taskArr.length;i++) {
	if(taskArr[i].id == taskId) {
	  taskArr[i].finish =! taskArr[i].finish;	
	}		 	   
	    updateTask(taskArr);
      renderTasks();  
  }
}

//show filter task lists
function showFilterTaskList() {
  var allTasks = getItemById('all-tasks');
  var activeTasks = getItemById('active-tasks');
  var clearCompleted = getItemById('clear-completed');
  var completedTasks = getItemById('completed-tasks');
  var activeLists = getItemById('active-list');
  var completedList = getItemById('completed-list');

  //filter items
  function filterItems(type) {
    return taskArr.filter(function (item) {
      if (type === 'clearAllCompleted' || type === 'active') {
        return !item.finish; 
      } 
      return item.finish;
    })
  }
  
  var callback = function(type, e) {
    var displayedItems = taskArr;
    if (type !== 'all') {
      displayedItems = filterItems(type);
      if (type === 'clearAllCompleted') {
        taskArr = displayedItems;
      }
    };
    renderTasks(displayedItems);
  };

  listener(allTasks, 'click', callback.bind(this, 'all'));
  listener(activeTasks,'click',callback.bind(this, 'active'));
  listener(completedTasks,'click',callback.bind(this, 'completed'));
  listener(clearCompleted,'click',callback.bind(this, 'clearAllCompleted'));
}
showFilterTaskList();

//add mark color to filter buttons when they are clicked
var sortTask = getItemById('sort-task');
var sortControls = sortTask.getElementsByTagName('a');
for(var i = 0;i<sortControls.length;i++) {
  sortControls[i].index = i;   
  sortControls[i].onclick = function() {
    for(var j = 0;j<sortControls.length;j++) {
      if(j == this.index) {
        sortControls[j].style.color = "#339999";
      }else {
        sortControls[j].style.color = "#ccc";
      }
    }
  }
}

//render all tasks on to-do list
function renderTasks(val) {
  var taskList = getItemById('task-list');
  var taskCount = getItemById('task-count');
  var activeList = '<ul id="active-list">'
  var completedList = '<ul id="completed-list">';
  var taskArr = val || getTask();
  var liContent;                      
  for(var i = 0;i<taskArr.length;i++) {
    liContent = '<li '+'taskId="' + taskArr[i].id + '" '+'class="task"'+'>'
      +'<a '+'class="check"'+'id="'+taskArr[i].id+'"'+'onclick="clickCheckbox.call(this,id);"'+'>'+'O'+'</a>'
      +'<span class="task-content" ondblclick="editTask(this);">'+taskArr[i].content+'</span>'
      +'<a '+'class="del-task"'+'id="'+taskArr[i].id+'"'+'onclick="deleteTask.call(this,id);"'+'>'+'del'+'</a>'
      +'</li>';
    if(!taskArr[i].finish) {
      activeList += liContent;
    }else{
      completedList += liContent;
    }
  }
    activeList += "</ul>";
    completedList += "</ul>";
    taskList.innerHTML = activeList + completedList;
    //show the number of items left
    taskCount.innerHTML = taskArr.length;
}

//handler click
function listener(node, type, callback) {
  node.addEventListener(type, callback, false);
}

//getElementById
function getItemById(id) {
  return document.getElementById(id);
}
