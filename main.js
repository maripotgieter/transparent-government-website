var statistics = [
    {
        "Number of Democrats": 0,
        "Number of Republicans": 0,
        "Number of Independents": 0,
        "Average 'Votes with party' for Democrats": 0,
        "Average 'Votes with party' for Republicans": 0,
        "Average 'Votes with party' for Independents": 0,
        "Least engaged names": 0,
        "Least engaged number of missed votes": 0,
        "Least engaged percentage missed votes": 0,
        "Most engaged names": 0,
        "Most engaged number of missed votes": 0,
        "Most engaged percentage of missed votes": 0,
        "Least loyal names": 0,
        "Least loyal number of votes": 0,
        "Least loyal percentage party votes": 0,
        "Most loyal names": 0,
        "Most loyal number of votes": 0,
        "Most loyal percentage party votes": 0,


        }
    ];

var d = "D";
var r = "R";
var j = "I";
var data;
var members;
var number;
var myLoader;

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}

if (location.pathname == '/C:/Users/potgi/OneDrive/Documents/Ubiqum/Module%202/task_4_refactor/senate-attendance.html' || location.pathname == '/C:/Users/potgi/OneDrive/Documents/Ubiqum/Module%202/task_4_refactor/senate-party%20loyalty.html') {
    start("https://api.propublica.org/congress/v1/113/senate/members.json");
} else {
    start("https://api.propublica.org/congress/v1/113/house/members.json");
}

function start(url) {

    var fetchConfig =
        fetch(url, {
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
            number = numberMembers();
            var democrats = numberMembers(d);
            var republicans = numberMembers(r);
            var independents = numberMembers(j);
            democratsLengthOfArray = democrats.length;
            republicansLengthOfArray = republicans.length;
            independentsLengthOfArray = independents.length;
            democratsAverageVotes = averageVotes(democrats);
            republicansAverageVotes = averageVotes(republicans);
            independentsAverageVotes = averageVotes(independents);
            numberMembers();
            lowestTenPercentOfVoters();
            highestTenPercentOfVoters();
            
            allMyVariables();
            allMyStatisics();
            functionThatStoresDifferentLocations();
           
            
           


        })
        .catch(function (error) {
            console.log(error);
        })
}

function functionThatStoresDifferentLocations() {

    if (location.pathname == '/C:/Users/potgi/OneDrive/Documents/Ubiqum/Module%202/task_4_refactor/senate-party%20loyalty.html' || location.pathname == '/C:/Users/potgi/OneDrive/Documents/Ubiqum/Module%202/task_4_refactor/house-party-loyalty.html') {
        tableBody_1 = document.getElementById('at-a-glance');
        Row_1 = document.getElementById('party');
        Row_2 = document.getElementById('number');
        Row_3 = document.getElementById('voted');
        Row_4 = document.getElementById('total');
        tableBody_5 = document.getElementById('least-loyal');
        tableBody_6 = document.getElementById('most-loyal');
        tableLeastLoyal();
        tableMostLoyal();
        tableSenateAtAGlance();

    } else if (location.pathname == '/C:/Users/potgi/OneDrive/Documents/Ubiqum/Module%202/task_4_refactor/house-attendance.html' || location.pathname == '/C:/Users/potgi/OneDrive/Documents/Ubiqum/Module%202/task_4_refactor/senate-attendance.html') {
        tableBody_1 = document.getElementById('at-a-glance');
        tableBody_2 = document.getElementById('least-engaged');
        tableBody_3 = document.getElementById('most-engaged');

        Row_1 = document.getElementById('party');
        Row_2 = document.getElementById('number');
        Row_3 = document.getElementById('voted');
        Row_4 = document.getElementById('total');
        tableLeastEngaged();
        tableMostEngaged();
        tableSenateAtAGlance();
    }
}

function allMyVariables() {
    lowestTenPercent = lowestTenPercentOfVoters(); //least loyal votes_with_party_pct
    lowTenName = names(lowestTenPercent);
    highestTenPercent = highestTenPercentOfVoters(); //most loyal votes_with-party_pct
    highTenName = names(highestTenPercent);
    percentagePartyVotes = partyPercentage(lowestTenPercent);
    percentagePartyVotesLoyal = partyPercentage(highestTenPercent);
    lowTotalVotes = totalVotes(lowestTenPercent);
    highTotalVotes = totalVotes(highestTenPercent);
    bottomTenPercent = bottomTenPercentOfMissedVotes(); //least engaged missed_votes_pct [ATTENDANCE]
    bottomTenName = names(bottomTenPercent);
    topTenPercent = topTenPercentOfMissedVotes(); //most engaged
    topTenName = names(topTenPercent);
    lowTenPercent = missedVotesPercentage(bottomTenPercent);
    numMissVotes = missedVotes(bottomTenPercent);
    highMissPercent = missedVotesPercentage(topTenPercent);
    highMissVotes = missedVotes(topTenPercent);

}

function allMyStatisics() {
    statistics[0]["Number of Democrats"] = democratsLengthOfArray;
    statistics[0]["Number of Republicans"] = republicansLengthOfArray;
    statistics[0]["Number of Independents"] = independentsLengthOfArray;
    statistics[0]["Average 'Votes with party' for Democrats"] = democratsAverageVotes;
    statistics[0]["Average 'Votes with party' for Republicans"] = republicansAverageVotes;
    statistics[0]["Average 'Votes with party' for Independents"] = independentsAverageVotes;
    statistics[0]["Least engaged names"] = bottomTenName;
    statistics[0]["Least engaged percentage missed votes"] = lowTenPercent;
    statistics[0]["Least engaged number of missed votes"] = numMissVotes;
    statistics[0]["Most engaged names"] = topTenName;
    statistics[0]["Most engaged number of missed votes"] = highMissVotes
    statistics[0]["Most engaged percentage of missed votes"] = highMissPercent;
    statistics[0]["Least loyal names"] = lowTenName;
    statistics[0]["Least loyal number of votes"] = lowTotalVotes;
    statistics[0]["Least loyal percentage party votes"] = percentagePartyVotes;
    statistics[0]["Most loyal names"] = highTenName;
    statistics[0]["Most loyal percentage party votes"] = percentagePartyVotesLoyal;
    statistics[0]["Most loyal number of votes"] = highTotalVotes;

}

function numberMembers(letter) {
    var empty = [];
    for (i = 0; i < members.length; i++) {
        if (members[i].party == letter) {
            empty.push(members[i]);
        }
    }
    return empty;
}

function averageVotes(party) {
    var sum = 0;
    for (i = 0; i < party.length; i++) {
        sum += party[i].votes_with_party_pct;
    }
    var average = Math.round(sum / party.length * 100) / 100;
    if (party.length == 0) {
        return 0;
    } else {
        return average;
    }
}

function lowestTenPercentOfVoters() { //least loyal
    var votes = [];
    var lowestTenPercent = [];
    members.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });
    for (i = 0; i < members.length; i++) {
        votes.push(members[i]);
    }
    for (i = 0; i < votes.length; i++) {
        if (i < ((votes.length) * 0.1)) {
            lowestTenPercent.push(votes[i]);
        } else if (votes[i] == votes[i - 1]) {
            lowestTenPercent.push(votes[i]);
        } else {
            break;
        }
    }
    return lowestTenPercent;
}

function highestTenPercentOfVoters() { //most loyal
    var votes = [];
    var highestTenPercent = [];
    members.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    });
    for (i = 0; i < members.length; i++) {
        votes.push(members[i]);
    }

    for (i = 0; i < votes.length; i++) {
        if (i < ((votes.length) * 0.1)) {
            highestTenPercent.push(votes[i]);
        } else if (votes[i] == votes[i - 1]) {
            highestTenPercent.push(votes[i]);
        } else {
            break;
        }
    }
    return highestTenPercent;
}

function bottomTenPercentOfMissedVotes() { //least engaged
    var votes = [];
    var lowestTenPercent = [];
    members.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct;
    });
    for (i = 0; i < members.length; i++) {
        votes.push(members[i]);
    }

    for (i = 0; i < votes.length; i++) {
        if (i < ((votes.length) * 0.1)) {
            lowestTenPercent.push(votes[i]);
        } else if (votes[i] == votes[i - 1]) {
            lowestTenPercent.push(votes[i]);
        } else {
            break;
        }
    }
    return lowestTenPercent;
}

function topTenPercentOfMissedVotes() { //most engaged
    var votes = [];
    var highestTenPercent = [];
    members.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct;
    });
    for (i = 0; i < members.length; i++) {
        votes.push(members[i]);
    }
    for (i = 0; i < votes.length; i++) {
        if (i < ((votes.length) * 0.1)) {
            highestTenPercent.push(votes[i]);
        } else if (votes[i] == votes[i - 1]) {
            highestTenPercent.push(votes[i]);
        } else {
            break;
        }
    }
    return highestTenPercent;
}

function names(nameArray) {
    var name = [];
    for (i = 0; i < nameArray.length; i++) {
        if (nameArray[i].middle_name == null || "") {
            name.push(nameArray[i].first_name + " " + nameArray[i].last_name);
        } else {
            name.push(nameArray[i].first_name + " " + nameArray[i].middle_name + " " + nameArray[i].last_name);
        }
    }
    return name;
}

function missedVotesPercentage(array) {
    var missPct = [];
    for (i = 0; i < array.length; i++) {
        missPct.push(array[i].missed_votes_pct);
    }
    return missPct;
}

function missedVotes(array) {
    var empty = [];
    for (i = 0; i < array.length; i++) {
        empty.push(array[i].missed_votes);
    }
    return empty;
}

function partyPercentage(array) {
    var empty = [];
    for (i = 0; i < array.length; i++) {
        empty.push(array[i].votes_with_party_pct);
    }
    return empty;
}

function totalVotes(array) {
    var empty = [];
    for (i = 0; i < array.length; i++) {
        empty.push(array[i].total_votes);
    }
    return empty;

}

function tableLeastEngaged() {
    tableBody_2.innerHTML = "";
    for (i = 0; i < bottomTenPercent.length; i++) {
        var newRow = document.createElement("tr");
        var name = statistics[0]["Most engaged names"][i];
        newRow.insertCell().innerHTML = name.link(topTenPercent[i].url);
        newRow.insertCell().innerHTML = statistics[0]["Most engaged number of missed votes"][i];
        newRow.insertCell().innerHTML = statistics[0]["Most engaged percentage of missed votes"][i] + " %";

        tableBody_2.appendChild(newRow);
    }

}

function tableMostEngaged() {
    tableBody_3.innerHTML = "";
    for (i = 0; i < topTenPercent.length; i++) {
        var newRow = document.createElement("tr");
        var name = statistics[0]["Least engaged names"][i];
        newRow.insertCell().innerHTML = name.link(bottomTenPercent[i].url);;
        newRow.insertCell().innerHTML = statistics[0]["Least engaged number of missed votes"][i];
        newRow.insertCell().innerHTML = statistics[0]["Least engaged percentage missed votes"][i] + " %";

        tableBody_3.appendChild(newRow);
    }

}

function tableLeastLoyal() {
    tableBody_5.innerHTML = "";
    for (i = 0; i < lowestTenPercent.length; i++) {
        var newRow = document.createElement("tr");
        var name = statistics[0]["Least loyal names"][i];
        newRow.insertCell().innerHTML = name.link(lowestTenPercent[i].url);
        newRow.insertCell().innerHTML = statistics[0]["Least loyal number of votes"][i];
        newRow.insertCell().innerHTML = statistics[0]["Least loyal percentage party votes"][i] + " %";
        tableBody_5.appendChild(newRow);
    }

}

function tableMostLoyal() {
    tableBody_6.innerHTML = "";
    for (i = 0; i < highestTenPercent.length; i++) {
        var newRow = document.createElement("tr");
        var name = statistics[0]["Most loyal names"][i];
        newRow.insertCell().innerHTML = name.link(highestTenPercent[i].url);
        newRow.insertCell().innerHTML = statistics[0]["Most loyal number of votes"][i];
        newRow.insertCell().innerHTML = statistics[0]["Most loyal percentage party votes"][i] + " %";
        tableBody_6.appendChild(newRow);
    }

}

function tableSenateAtAGlance() {

    Row_1.insertCell().innerHTML = "Republicans";
    Row_1.insertCell().innerHTML = statistics[0]["Number of Republicans"];
    Row_1.insertCell().innerHTML = statistics[0]["Average 'Votes with party' for Republicans"] + " %";
    tableBody_1.appendChild(Row_1);

    Row_2.insertCell().innerHTML = "Democrats";
    Row_2.insertCell().innerHTML = statistics[0]["Number of Democrats"];
    Row_2.insertCell().innerHTML = statistics[0]["Average 'Votes with party' for Democrats"] + "  %";
    tableBody_1.appendChild(Row_2);

    Row_3.insertCell().innerHTML = "Independents";
    Row_3.insertCell().innerHTML = statistics[0]["Number of Independents"];
    Row_3.insertCell().innerHTML = statistics[0]["Average 'Votes with party' for Independents"] + " %";
    tableBody_1.appendChild(Row_3);

    Row_4.insertCell().innerHTML = "Total";
    Row_4.insertCell().innerHTML = members.length;
    Row_4.insertCell().innerHTML = Math.round(((statistics[0]["Average 'Votes with party' for Independents"] + statistics[0]["Average 'Votes with party' for Republicans"] + statistics[0]["Average 'Votes with party' for Democrats"]) / 3) * 100) / 100 + " %";
    tableBody_1.appendChild(Row_4);

}
