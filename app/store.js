(function(window) {
  'use strict';
  
  //get all tasks
  window.getTask = function() {
    if (localStorage.task) {
      return JSON.parse(localStorage.task);
    } else {
      return [];
    } 
  }

  //update task
  window.updateTask = function(tasks) {
    localStorage.task = JSON.stringify(tasks);
  }

})(window);