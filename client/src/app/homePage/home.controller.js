(function() {
    "use strict";

    function HomeController() {
        var vm = this;

        vm.message = "message";

        vm.dataObject = [
            { name: "Jayvz", gender: "Male", title: "Web Developer" },
            { name: "Jona", gender: "Female", title: "Web Designer" },
            { name: "Edizon", gender: "Male", title: "Java Developer" },
            { name: "Edison", gender: "Male", title: "Senior Java Developer" },
            { name: "Aspen", gender: "Male", title: "Junior Java Developer" },
            { name: "Zoilo", gender: "Male", title: "Team Lead/Manager" },
            { name: "JC", gender: "Male", title: "Java Developer" }
        ];

        vm.gridConfiguration = {
            model: [{
                heading: "Name",
                paramName: "name",
                isSortable: true,
                isClickable: true
            },{
                heading: "Gender",
                paramName: "gender",
                isSortable: true,
                isClickable: true
            },{
                heading: "Title",
                paramName: "title",
                isSortable: true,
                isClickable: true
            }],
            buttons: ["add", "edit", "remove", "view"]
        };

        vm.events = {
            add: function() {
                console.log("CONTROLLER - ADD");
            },
            edit: function(obj, index) {
                console.log("CONTROLLER - EDIT", obj);
            },
            remove: function(obj, index) {
                console.log("CONTROLLER - REMOVE", obj);
            },
            view: function(obj, index) {
                console.log("CONTROLLER - VIEW", obj);
            },
            sort: function(sortType, sortBy) {
                console.log("SORT TYPE", sortType);
                console.log("SORT BY", sortBy);
            }
        };
    }

    HomeController.$inject = [];

    angular
        .module("MyApp")
        .controller("HomeController", HomeController);
})();