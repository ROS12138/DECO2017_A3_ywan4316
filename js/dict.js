function getInfo(e) {
    var keycode = e.which
    if (keycode !== 13) {
        return;
    }
    var word = document.getElementById("word").value;
    const options = {
        method: 'GET',
        url: 'https://wordsapiv1.p.rapidapi.com/words/' + word,
        headers: {
            'x-rapidapi-key': '5cf24835c2mshfacb5c8fa22a71ap1c51dfjsn740f538978c8',
            'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        var dom = document.getElementById("word-info");
        dom.className = "flex flex-col bg-blue-400 h-full mx-4 mt-8 min-h-full px-2 py-2 border-4 border-blue-300 rounded-2xl";
        dom.innerHTML = "<p class='text-4xl text-white font-sans font-semibold underline mb-2'>" + response.data.word + "</p>"
        for (let index = 0; index < response.data.results.length; index++) {
            if (index == 8) {
                break;
            }
            dom.innerHTML += "<p class='text-xl text-white font-sans font-semibold'> " + (index + 1) + ". " + response.data.results[index].partOfSpeech + ": " + response.data.results[index].definition + "</p>";


        }
    }).catch(function (error) {
        console.error(error);
    });
}