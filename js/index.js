function ajaxRequest(type, url, callback) {

    var
        type = type,
        url = url,
        callback = callback;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(type, url, true);
    xmlhttp.send(null);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                callback(json_encode(xmlhttp.responseText))
            }
        }
    };
}

function json_encode(str) {
    json = JSON.parse(str);
    return json;
}
var taskList;
var courseList;
ajaxRequest('get', 'json/task.json', function (data) {

    taskList = data.list
    getTaskList();

});



function getTaskList() {
    taskList.forEach((element, index) => {

        document.getElementById("task-unfinish-list").innerHTML += "<div class='flex flex-row py-1'><li class='text-white font-semibold text-xl'>- " + element.title + "<br>Estimate: " + element.time + "</li><div class='flex-grow'></div></div>"

    });
}

var dom = document.getElementById("table-body");
for (var i = 0; i < 8; i++) {
    var children = document.createElement("tr");
    var tdHtml = `<td class='break-all border-none w-40 text-blue-400 border-blue-400'>${i + 7}:00~${i + 8}:00</td>`;

    for (let index = 0; index < 7; index++) {
        tdHtml += "<td id='course" + i + "-" + index + "' class='break-all w-60 h-30 border text-blue-400 border-blue-400'></td>"

    }
    children.innerHTML = tdHtml;
    children.className = "h-10"
    dom.append(children);


}

ajaxRequest('get', 'json/course.json', function (data) {

    courseList = data.list
    getCourseList();

});

function getCourseList() {
    var insertHtml;

    courseList.forEach((element, index) => {
        if (element.alarm) {
            insertHtml = "<div class='flex flex-row py-1'><div class='text-red-600 font-semibold text-sm'>" + element.title + "</div><svg t='1622411316181' class='icon h-12 w-12' viewBox='0 0 1057 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2351' width='128' height='128'><path d='M528.833766 989.973944a440.366485 440.366485 0 1 1 440.366484-440.366485 440.724652 440.724652 0 0 1-440.366484 440.366485z m0-773.103748a332.916346 332.916346 0 1 0 332.916346 332.737263 333.09543 333.09543 0 0 0-332.916346-332.737263z' p-id='2352' fill='#d81e06'></path><path d='M53.725069 361.569716a53.725069 53.725069 0 0 1-53.725069-53.725069V179.083564A179.083564 179.083564 0 0 1 179.083564 0h128.582a53.725069 53.725069 0 0 1 0 107.450139H179.083564a71.633426 71.633426 0 0 0-71.633425 71.633425v128.582a53.725069 53.725069 0 0 1-53.72507 53.904152zM1004.121545 361.569716a53.725069 53.725069 0 0 1-53.725069-53.725069V179.083564a71.633426 71.633426 0 0 0-71.633426-71.633425h-128.761083a53.725069 53.725069 0 0 1 0-107.450139h128.582a179.083564 179.083564 0 0 1 179.083564 179.083564v128.582a53.725069 53.725069 0 0 1-53.545986 53.904152z' p-id='2353' fill='#d81e06'></path><path d='M704.693826 603.332528H475.108696V373.926482a53.725069 53.725069 0 1 1 107.450139 0v121.955908h122.134991a53.725069 53.725069 0 1 1 0 107.450138z' p-id='2354' fill='#d81e06'></path><path d='M152.937364 1023.999821a53.725069 53.725069 0 0 1-37.965716-15.759354 53.725069 53.725069 0 0 1 0-75.931431l125.358495-125.358495a53.725069 53.725069 0 0 1 76.110515 75.931431l-125.358495 125.358495a53.725069 53.725069 0 0 1-38.144799 15.759354zM915.475181 1023.999821A53.725069 53.725069 0 0 1 877.509465 1008.240467l-125.358495-125.358495a53.725069 53.725069 0 0 1 75.573264-77.005932l125.358495 125.358495a53.725069 53.725069 0 0 1-37.965715 91.690785z' p-id='2355' fill='#d81e06'></path></svg></div>";
        } else {
            insertHtml = "<div onclick='addAlarm(" + index + ")' class='flex flex-row py-1'><div class='text-blue-400 font-semibold text-sm'>" + element.title + "</div></div>";
        }


        document.getElementById(`course${element.time}-${element.day}`).innerHTML = insertHtml;

    });
}

function addAlarm(index) {
    courseList[index].alarm = true;
    var alarmTime = prompt('Remind me at:');
    if (alarmTime != null && alarmTime != "") {
        var alarmDate = prompt('What date:');
    }
    if (alarmDate != null && alarmDate != "") {
        getCourseList();

    }


}

var now = new Date();
var weekFirstDay = new Date(now - (now.getDay() - 1) * 86400000);
var firstMonth = Number(weekFirstDay.getMonth()) + 1;
var weekLastDay = new Date((weekFirstDay / 1000 + 6 * 86400) * 1000);
var lastMonth = Number(weekLastDay.getMonth()) + 1;
var currentWeek = firstMonth + '-' + weekFirstDay.getDate() + '~' + lastMonth + '-' + weekLastDay.getDate();
console.log(currentWeek);

document.getElementById("week-date").innerHTML = currentWeek;

function getWeek(dt) {
    let d1 = new Date(dt);
    let d2 = new Date(dt);
    d2.setMonth(0);
    d2.setDate(1);
    let rq = d1 - d2;
    let days = Math.ceil(rq / (24 * 60 * 60 * 1000));
    let num = Math.ceil(days / 7);
    return num + 1;
}
var weekindex = getWeek(weekLastDay.getFullYear() + '-' + lastMonth + '-' + weekLastDay.getDate());

document.getElementById("week-index").innerHTML = "Week " + weekindex;

document.getElementById("th").innerHTML += `<th class="border-none text-blue-400"></th>`;
var weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thur";
weekday[5] = "Fri";
weekday[6] = "Sat";

for (let index = 0; index < 7; index++) {

    document.getElementById("th").innerHTML += `<th class="border-none text-blue-400">${weekFirstDay.getDate() + "/" + weekFirstDay.getMonth() + " " + weekday[weekFirstDay.getDay()]
        }</th >`;
    weekFirstDay.setDate(weekFirstDay.getDate() + 1)

}









