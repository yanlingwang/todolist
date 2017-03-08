(function (window) {
  'use strict';

  //add mark color to filter buttons when they are clicked
  window.setFilterBtnColor = function() {
    var filterTask = getItemById('filter-task');
    var filterControls = filterTask.getElementsByTagName('a');
    for(var i = 0; i < filterControls.length; i++) {
      filterControls[i].index = i;   
      filterControls[i].onclick = function() {
        for(var j = 0; j<filterControls.length; j++) {
          if(j == this.index) {
            filterControls[j].style.color = "#339999";
          }else {
            filterControls[j].style.color = "#ccc";
          }
        }
      }
    }
  }

})(window);