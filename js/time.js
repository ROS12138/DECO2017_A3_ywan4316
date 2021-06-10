var sumStudySeconds = 0;

function clock() {
    var studyHours = Math.floor(sumStudySeconds / 3600);
    var studyMinutes = sumStudySeconds > 3600 ? Math.floor(sumStudySeconds % 3600 / 60) : Math.floor(sumStudySeconds / 60);
    var studySeconds = sumStudySeconds >= 60 ? sumStudySeconds % 60 : sumStudySeconds;

    document.getElementById("time").innerHTML = `You have studied: ${studyHours}hours ${studyMinutes}minutes ${studySeconds}seconds. `;
    sumStudySeconds += 1;
}



setInterval(clock, 1000);