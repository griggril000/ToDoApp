/**
 * Created by braydenlemke on 1/2/17.
 */
(function () {

    angular.module("todoApp").component("componentTodo", {
        templateUrl: "component-todo/todo.html",
        controller: todoController
    });

    function todoController(todoService, $scope) {
        var fun = this;
        fun.buttonWords = "Edit Lists";
        fun.information = todoService.theTodos;
        fun.editingLists = false;
        fun.selected = 0;
        fun.init = function() {
            $("#listItem" + fun.selected).addClass("selected");
        };

        fun.select = function(info) {
            $("#listItem" + fun.selected).removeClass("selected");
            fun.selected = info;
            $("#listItem" + info).addClass("selected");
            if(info !== 0) {
                todoService.reapplyClasses((info - 1));
            }
        };

        fun.addList = function(key) {
            var input = $("#createInput").val();
            if(key.keyCode == 13) {
                if(noSpaces(input)) {
                    todoService.addList(input);
                    $("#createInput").val("");
                } else {
                    $("#createInput").val("");
                }
            }
        };

        fun.removingListOptions = function() {
            if(fun.editingLists === false) {
                fun.editingLists = true;
                fun.buttonWords = "Close Editing";
            } else {
                fun.editingLists = false;
                fun.buttonWords = "Edit Lists";
            }
        };

        fun.removeList = function(index) {
            todoService.removeList(index);
            if(fun.selected === (index + 1)) {
                $("#listItem" + fun.selected).removeClass("selected");
                fun.selected--;
                $("#listItem" + fun.selected).addClass("selected");
            }
        };

        fun.addTask = function(key, index) {
            var input = $(".taskInput").val();
            if(key.keyCode === 13) {
                if(noSpaces(input)) {
                    todoService.addTask(input, index);
                    $(".taskInput").val("");
                } else {
                    $(".taskInput").val("");
                }

            }
        };

        fun.markComplete = function(index, parentIndex) {
            if(!(todoService.theTodos[parentIndex].tasksComplete[index])) {
                todoService.markComplete(index, parentIndex);
            } else {
                todoService.unMarkComplete(index, parentIndex);
            }

        };

        fun.deleteTask = function(index, parentIndex) {
            todoService.deleteTask(index, parentIndex);
        };



        function noSpaces(input) {
            for(var i = 0; i < input.length; i++) {
                if(input[i] !== " ") {
                    return true;
                }
            }
            return false;
        }

    }

})();