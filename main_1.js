var newTable = document.getElementById('senate-data');
var tableBody = document.getElementById('table-body');
var independent = document.getElementById("independent");
var democrat = document.getElementById("democrat");
var republican = document.getElementById("republican");
var select = document.getElementById("state-filter");
//var button = document.getElementById('button');
var data;
var members;
var myLoader;

if (location.pathname == '/C:/Users/potgi/OneDrive/Documents/Ubiqum/Module%202/task_4_refactor/house-data.html') {
    startHouse();
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}

function startHouse() {

    var fetchConfig =
        fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
            method: "GET",
            headers: new Headers({
                "X-API-Key": 'adZUIoKPgkk0ecKXE0ztm9ErLNJgARlsKHBhTBYa'
            })
        }).then(function (response) {
            if (response.ok)
                return response.json();
        }).then(function (json) {

            data = json;
            console.log("data", data);
            showPage();

            members = data.results["0"].members;
            var i;
            var j;
            var filteredArray = filterData();
            var optionsStates = duplicatesFind();

            addTable(filteredArray);
            duplicatesFind();
            
//            button.addEventListener("click", function () {
//                buttonToToggle();
//            });


            independent.addEventListener("click", function () {
                addTable(filterData());
            });
            democrat.addEventListener("click", function () {

                addTable(filterData());
            });
            republican.addEventListener("click", function () {

                addTable(filterData());
            });
            select.addEventListener('change', function () {

                addTable(filterData());
            });

        })
        .catch(function (error) {
            console.log(error);
        })
}

function buttonToToggle() {

    var x = document.getElementById('panel');
    var button = document.getElementById('button');
    if (button.value == "Read More") {
//        x.style.display = 'block';
        button.value = 'Read Less';
    } else {
        x.style.display == 'none';
        button.value = 'Read More';
    }
};

function addTable(members) {
    tableBody.innerHTML = "";
    for (i = 0; i < members.length; i++) {

        var newRow = document.createElement("tr");
        var name;
        if (members[i].middle_name == null || "") {
            name = members[i].first_name + " " + members[i].last_name;
        } else {
            name = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name;
        }

        var link = name.link(members[i].url);
        var polParty = members[i].party;
        var states = members[i].state;
        var years = members[i].seniority;
        var percentage = members[i].votes_with_party_pct;

        newRow.insertCell().innerHTML = link;
        newRow.insertCell().innerHTML = polParty;
        newRow.insertCell().innerHTML = states;
        newRow.insertCell().innerHTML = years;
        newRow.insertCell().innerHTML = percentage + ' %';

        tableBody.appendChild(newRow);
    }

}


function filterData() {
    var filteredData = [];
    for (i = 0; i < members.length; i++) {
        document.getElementById('alert').style.display = "none";
        if (select.value == members[i].state || select.value == 'all') {
            if (independent.checked == true && members[i].party == "I") {
                filteredData.push(members[i]);
            }
            if (democrat.checked == true && members[i].party == "D") {
                filteredData.push(members[i]);
            }
            if (republican.checked == true && members[i].party == "R") {
                filteredData.push(members[i]);
            } else if (independent.checked == false && democrat.checked == false && republican.checked == false) {
                document.getElementById('alert').style.display = 'block';
            }


        }
    }
    return filteredData;
}

function filterStates() {
    var filteredStates = [];

    for (h = 0; h < members.length; h++) {
        filteredStates.push(members[h].state);
    }
    console.log(filteredStates);
    return filteredStates.sort();
}

function duplicatesFind() {
    var filteredStates = filterStates();
    var newStates = [];
    for (i = 0; i < filteredStates.length; i++) {
        for (j = i + 1; j < filteredStates.length; j++) {
            if (filteredStates[i] == filteredStates[j] && !newStates.includes(filteredStates[i])) {

                newStates.push(filteredStates[j]);

                var opt = filteredStates[j];
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
            }
        }
    }
    console.log(newStates);

}

function appendDropdown() {

    for (var i = 0; i < optionsStates.length; i++) {
        var opt = optionsStates[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}
