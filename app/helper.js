(function (window) {
  'use strict';

  //get element by id
  window.getItemById = function (id) {
    return document.getElementById(id);
  }
  
  //get elements by class name
  window.getItemsByClass = function (className) {
    return document.getElementsByClassName(className);
  }

  //get the attribute of a node's parent 
  window.getParentAttr = function (node, attr) {
    return node.parentNode.getAttribute(attr);
  }

  //addEventListener
  window.listener = function (node, type, callback) {
    node.addEventListener(type, callback, false);
  }

})(window);