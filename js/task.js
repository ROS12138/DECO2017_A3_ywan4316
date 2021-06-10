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

    document.getElementById("th").innerHTML += `<th class="border-none text-blue-400">${weekFirstDay.getDate() + "/" + (weekFirstDay.getMonth() + 1) + " " + weekday[weekFirstDay.getDay()]
        }</th >`;
    weekFirstDay.setDate(weekFirstDay.getDate() + 1)

}









