(function(window) {
  'use strict';

  //render all tasks on to-do list
  window.renderTasks = function (val) {
    var taskList = getItemById('task-list');
    var taskCount = getItemById('task-count');
    var activeList = '<ul id="active-list">'
    var completedList = '<ul id="completed-list">';
    var taskArr = val || getTask();
    var liContent;

    for(var i = 0; i<taskArr.length; i++) {
      liContent = 
        '<li '+'taskId="' + taskArr[i].id + '" '+'class="task"'+'>'
        +'<a '+'class="check"'+'>'+'O'+'</a>'
        +'<span class="task-content">'+taskArr[i].content+'</span>'
        +'<a '+'class="del-task"'+'>'+'del'+'</a>'
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

})(window);