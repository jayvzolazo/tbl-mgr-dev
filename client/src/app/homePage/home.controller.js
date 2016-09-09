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
            add : function() {},
            edit: function() {}
        };
    }

    HomeController.$inject = [];

    angular
        .module("MyApp")
        .controller("HomeController", HomeController);
})();