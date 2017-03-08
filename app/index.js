import './stylesheets/main.css';

(function (window) {
  'use strict';

  //display tasks
  renderTasks();
  showFilterTaskList();
  setFilterBtnColor();
  addEvents();

  function addEvents() {
    addDelEvent();
    addEditEvent();
    addCheckboxEvent();
    addKeyDownEvent();
  }

  //get tasks
  var taskArr = getTask();

  function addKeyDownEvent() {
    listener(getItemById("add-task-input"), 'keydown', handleKeyDownEvent());
  }

  //handle key down event
  function handleKeyDownEvent() {
    return function(e) {
      // key "enter"
      if(e.keyCode == 13) {
        if(this.value == "") {
          return;
        }
        var content = this.value;
        this.value = "";
        var taskObj = {};
        taskObj.finish = false;
        taskObj.content = content;
        addTask(taskObj);
        renderTasks();
        addEvents();
      }
    }
  }

  //add a new task 
  function addTask (taskObj) {
    if(taskArr.length === 0) {
      taskObj.id = 0;
    }else {
      taskObj.id = taskArr[taskArr.length-1].id + 1;
    }
    taskArr.push(taskObj);
    updateTask(taskArr);
  }

  //add event to delete buttons
  function addDelEvent() {
    var delBtns = getItemsByClass("del-task");
    for(var i = 0; i < delBtns.length; i++) {
      delBtns[i].onclick = removeTask();
    }
  }

  //remove task
  function removeTask() {
    return function (e) {
      this.id = getParentAttr(e.target, "taskId");
      for(var i = 0; i < taskArr.length; i++) {
        if(this.id == taskArr[i].id) {
          taskArr.splice(i,1);
          break;
        }
      }
      updateTask(taskArr);
      renderTasks();
      addEvents();
    }
  }

  //add event to edit content
  function addEditEvent() {
    var editContents = getItemsByClass("task-content");
    for(var i = 0; i < editContents.length; i++) {
      editContents[i].ondblclick = editTask();
    }
  }

  //edit task
  function editTask() {
    return function (e) {
      var preContent = e.target.innerHTML;
      var addInputBox = document.createElement('input');
      addInputBox.type = "text";
      addInputBox.value = preContent;
      var id = getParentAttr(e.target, "taskId");
      addInputBox.onblur = function() {
        e.target.innerHTML = this.value ? this.value : preContent;
        for(var i = 0; i<taskArr.length; i++) {
          if(taskArr[i].id == id) {
            taskArr[i].content = addInputBox.value;
            break;
          }
        }
        updateTask(taskArr); 
      }
      e.target.appendChild(addInputBox);
      addInputBox.focus();
    }
  }

  //add event to checkbox
  function addCheckboxEvent() {
    var checkBoxBtn = getItemsByClass("check");
    for (var i = 0; i < checkBoxBtn.length; i++) {
      checkBoxBtn[i].onclick = toggleState();
    }
  }

  //change the state of item
  function toggleState() {
    return function (e) {
      var id = e.target.parentNode.getAttribute("taskId");
      for(var i = 0; i < taskArr.length; i++) {
        if(taskArr[i].id == id) {
          taskArr[i].finish =! taskArr[i].finish;
        }
        updateTask(taskArr);
        renderTasks();
        addEvents();
      }
    }
  }

  //show filter task lists
  function showFilterTaskList() {
    var allTasks = getItemById('all-tasks');
    var activeTasks = getItemById('active-tasks');
    var clearCompleted = getItemById('clear-completed');
    var completedTasks = getItemById('completed-tasks');

    //filter items
    function filterItems (type) {
      return taskArr.filter(function (item) {
        if (type === 'clearAllCompleted' || type === 'active') {
          return !item.finish; 
        } 
        return item.finish;
      })
    }
    
    var callback = function (type) {
      var displayedItems = taskArr;
      if (type !== 'all') {
        displayedItems = filterItems(type);
        if (type === 'clearAllCompleted') {
          taskArr = displayedItems;
        }
      };
      updateTask(taskArr);
      renderTasks(displayedItems);
      addEvents();
    };

    listener(allTasks, 'click', callback.bind(this, 'all'));
    listener(activeTasks,'click',callback.bind(this, 'active'));
    listener(completedTasks,'click',callback.bind(this, 'completed'));
    listener(clearCompleted,'click',callback.bind(this, 'clearAllCompleted'));
  }

})(window);