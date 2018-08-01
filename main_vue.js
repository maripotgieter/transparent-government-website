var main = new Vue({
    el: '#main',
    data: {
        members: [],
        states: [],
        allMembers: [],
        seen: true,

    },
    created: function () {
        this.getData();


    },
    methods: {
        getData: function () {
            var fetchConfig =
                fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
                    method: "GET",
                    headers: new Headers({
                        "X-API-Key": 'adZUIoKPgkk0ecKXE0ztm9ErLNJgARlsKHBhTBYa'
                    })
                }).then(function (response) {
                    if (response.ok)
                        return response.json();
                }).then(function (json) {

                    var data = json;
                    console.log("data", data);
                    main.members = data.results["0"].members;
                    main.allMembers = main.members;
                    main.filterStates();
                    console.log(main.allMembers);
                    main.seen = false;
                   

                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        filter: function () {

            select = document.getElementById("state-filter");
            independent = document.getElementById("independent");
            democrat = document.getElementById("democrat");
            republican = document.getElementById("republican");
            alert = document.getElementById("alert");

            var members = main.allMembers;
            main.members = [];
            document.getElementById('alert').style.display = "none";
            for (i = 0; i < members.length; i++) {
                if (select.value == members[i].state || select.value == 'all') {
                    if (independent.checked == true && members[i].party == "I") {
                        main.members.push(members[i]);
                    }
                    if (democrat.checked == true && members[i].party == "D") {
                        main.members.push(members[i]);
                    }
                    if (republican.checked == true && members[i].party == "R") {
                        main.members.push(members[i]);

                    } else if (independent.checked == false && democrat.checked == false && republican.checked == false) {
                        document.getElementById('alert').style.display = 'block';
                    }
                }
            }

        },
        filterStates: function () {

            var members = this.allMembers;
            this.states = [];
            for (h = 0; h < members.length; h++) {
                if (!this.states.includes(members[h].state)) {
                    main.states.push(members[h].state);
                }

            }
            main.states.sort();
        },
       
    }
})
