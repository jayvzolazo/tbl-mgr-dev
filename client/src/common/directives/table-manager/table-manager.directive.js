(function() {
    "use strict";

    function Controller($scope, $filter, CONST_BUTTONS) {
        var vm = this;

        vm.rows = [];
        vm.hasButtons = (angular.isDefined(vm.directiveConfig.buttons) && vm.directiveConfig.buttons.length > 0) ? true : false;
        vm.buttons = {
            add: false,
            edit: false,
            remove: false,
            view: false
        };

        vm.sortType = true;
        vm.sortBy = null;

        vm.ADD = CONST_BUTTONS.ADD;
        vm.EDIT = CONST_BUTTONS.EDIT;
        vm.REMOVE = CONST_BUTTONS.REMOVE;
        vm.VIEW = CONST_BUTTONS.VIEW;

        function getValue(object, paramName, filter) {
            var result = object;
            if (paramName !== "this") {
                var keyChain = paramName.split(".");
                for (var i = 0; i < keyChain.length; i++) {
                    result = result[keyChain[i]];
                    if (!result) {
                        return result;
                    }
                }
            }

            if (filter) { result = filter(result); }

            return result;
        }

        function buildRows() {
            if (!vm.objectList) {
                console.log("object is null or undefined");
                return;
            }

            // building rows starts here
            var rows = [];
            var modelList = vm.objectList;
            var paramName = null;
            var filter = null;
            var modelConfig = vm.directiveConfig.model;

            for (var x = 0; x < modelList.length; x++) {
                rows.push([]);
            }

            // build the data and filter (if available)
            for (var i = 0; i < modelConfig.length; i++) {
                paramName = modelConfig[i].paramName;
                filter = null;
                if (modelConfig[i].filter) {
                    filter = $filter(modelConfig[i].filter);
                }

                for (var j = 0; j < modelList.length; j++) {
                    rows[j].push( getValue(modelList[j], paramName, filter) );
                }
            }

            // check and generate buttons
            if (vm.hasButtons) {
                var buttons = vm.directiveConfig.buttons;
                for (var b = 0; b < vm.directiveConfig.buttons.length; b++) {
                    vm.buttons[buttons[b]] = true;
                }
            }

            return rows;
        }

        $scope.$watchCollection("vm.objectList", function() {
            vm.rows = buildRows();
        });

        // table events
        vm.EVENT = {
            add: function() {
                console.log("ADD");
                vm.directiveEvents.add();
            },
            edit: function(index) {
                console.log("EDIT", vm.objectList[index]);
                vm.directiveEvents.edit(vm.objectList[index], index);
            },
            remove: function(index) {
                console.log("REMOVE", vm.objectList[index]);
                vm.directiveEvents.remove(vm.objectList[index], index);
            },
            view: function(index) {
                console.log("VIEW", vm.objectList[index]);
                vm.directiveEvents.view(vm.objectList[index], index);
            },
            sort: function(sortType, sortBy, isSortable) {
                if (!isSortable) { return; }

                if (sortBy === vm.sortBy) {
                    vm.sortType = !sortType;
                }
                else {
                    vm.sortBy = sortBy;
                    vm.sortType = false;
                }

                var parentParam = null;

                parentParam = sortBy.split(".")[0];

                vm.directiveEvents.sort(vm.sortType, parentParam);
            }
        };

        vm.isColumnClickable = function(index) {
            var model = vm.directiveConfig.model[index];
            
            return (angular.isDefined(model) && typeof model === 'boolean') ? model.isColumnClickable : false;
        };
    }

    Controller.$inject = ["$scope", "$filter", "CONST_BUTTONS"];

    function tableManager() {
        return {
            restrict: "E",
            repalce: true,
            templateUrl: "directives/table-manager/table-grid.tpl.html",
            controller: Controller,
            controllerAs: "vm",
            bindToController: true,
            scope: {
                objectList: "=",
                directiveConfig: "=",
                directiveEvents: "="
            }
        };
    }

    angular
        .module("MyApp")
        .constant("CONST_BUTTONS", {
            "ADD": "add",
            "EDIT": "edit",
            "REMOVE": "remove",
            "VIEW": "view"
        })
        .directive("tableManager", tableManager);
})();