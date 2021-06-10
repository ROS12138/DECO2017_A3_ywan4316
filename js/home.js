// inner variables
var canvas, ctx;
var clockRadius = 250;
var clockImage;

// draw functions :
function clear() { // clear canvas function
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

var sumSeconds = -1
function drawScene() { // main drawScene function
    clear(); // clear canvas

    var hours = Math.floor(sumSeconds / 3600);
    var minutes = sumSeconds > 3600 ? Math.floor(sumSeconds % 3600 / 60) : Math.floor(sumSeconds / 60);
    var seconds = sumSeconds >= 60 ? sumSeconds % 60 : sumSeconds;


    hours = hours > 12 ? hours - 12 : hours;
    var hour = hours + minutes / 60;
    var minute = minutes + seconds / 60;

    document.getElementById("clock-time").innerHTML = `${hours < 10 ? '0' + hours : hours} : ${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}`;
    sumSeconds += 1;


    // save current context
    ctx.save();

    // draw clock image (as background)
    ctx.drawImage(clockImage, 0, 0, 300, 300);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.beginPath();



    // draw hour
    ctx.save();
    var theta = (hour - 3) * 2 * Math.PI / 12;
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.moveTo(-15, -5);
    ctx.lineTo(-15, 5);
    ctx.lineTo(clockRadius * 0.2, 1);
    ctx.lineTo(clockRadius * 0.2, -1);
    ctx.fill();
    ctx.restore();

    // draw minute
    ctx.save();
    var theta = (minute - 15) * 2 * Math.PI / 60;
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.moveTo(-15, -4);
    ctx.lineTo(-15, 4);
    ctx.lineTo(clockRadius * 0.4, 1);
    ctx.lineTo(clockRadius * 0.4, -1);
    ctx.fill();
    ctx.restore();

    // draw second
    ctx.save();
    var theta = (seconds - 15) * 2 * Math.PI / 60;
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.moveTo(-15, -3);
    ctx.lineTo(-15, 3);
    ctx.lineTo(clockRadius * 0.6, 1);
    ctx.lineTo(clockRadius * 0.6, -1);
    ctx.fillStyle = '#0f0';
    ctx.fill();
    ctx.restore();



    ctx.restore();
}

// initialization

canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
ctx.fillStyle = "blue";

// var width = canvas.width;
// var height = canvas.height;

clockImage = new Image();
clockImage.src = './img/clock.png';

let isCounting = false;
let intervalID = undefined;

function clockStart() {
    if (isCounting) {
        return;
    }
    isCounting = true;
    intervalID = setInterval(drawScene, 1000);
}

function clockStop() {
    isCounting = false;
    clearInterval(intervalID);
}

function clockReset() {
    isCounting = false;
    clearInterval(intervalID);
    sumSeconds = 0;
    drawScene();

}

var dom2 = document.getElementById("table-body");
for (var i = 0; i < 8; i++) {
    var children = document.createElement("tr");
    var tdHtml = `<td class='break-all border-none text-blue-400 font-semibold border-blue-400 w-1/5 md:w-2/5 px-2 py-1'>${i * 2 + 8}:00~<br>${i * 2 + 10}:00</td>`;
    if (i % 3 == 1) {
        var task = `<div class='border-4 border-red-600 rounded-2xl'><div class='font-sans font-semibold text-white text-lg text-center tracking-tighter bg-blue-400 rounded-xl px-2 py-2'>Deco 2018 A2</div></div>`
    } else if (i % 3 == 2) {
        var task = `<div class='border-4 border-yellow-200 rounded-2xl'><div class='font-sans font-semibold text-white text-lg text-center tracking-tighter bg-blue-400 rounded-xl px-2 py-2'>Deco 2018 A2</div></div>`
    } else {
        var task = `<div class='border-4 border-green-400 rounded-2xl'><div class='font-sans font-semibold text-white text-lg text-center tracking-tighter bg-blue-400 rounded-xl px-2 py-2'>Deco 2018 A2</div></div>`
    }
    tdHtml += "<td class='break-all border border-blue-400 w-full'>" + task + "</td>";

    children.innerHTML = tdHtml;
    children.className = "h-10"
    dom2.append(children);


}

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

ajaxRequest('get', 'json/task.json', function (data) {
    taskList = data.list
    getList();

});


function getList() {
    taskList.forEach((element, index) => {
        if (element.isComp) {
            document.getElementById("task-unfinish-list").innerHTML += "<div class='flex flex-row py-1'><li class='text-green-600 font-semibold text-xl'>- " + element.title + "<br>Complete: " + element.time + "</li><div class='flex-grow'></div><a onclick='changeComp(" + index + ")' class='self-center text-green-600 text-4xl'>√</a></div>"
        }
        else {
            document.getElementById("task-unfinish-list").innerHTML += "<div class='flex flex-row py-1'><li class='text-white font-semibold text-xl'>- " + element.title + "<br>Estimate: " + element.time + "</li><div class='flex-grow'></div><a onclick='changeComp(" + index + ")' class='self-center text-white text-4xl'>√</a></div>"
        }
    });
}

function changeComp(index) {

    taskList[index].isComp = !taskList[index].isComp;
    document.getElementById("task-unfinish-list").innerHTML = "";
    getList();
}

clockReset();

