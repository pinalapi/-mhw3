const apiKey = 'secret'; 

function onResponse(response){
    return response.json();
}

function spotifyPlayer(temperatura){
    let playlistUrl = '';

    if(temperatura > 20){
        playlistUrl = 'https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd';
    }else if(temperatura <= 20 && temperatura > 10){
        playlistUrl = 'https://open.spotify.com/embed/playlist/37i9dQZF1DX0UrRvztWcAU';
    }else{
        playlistUrl = 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M';
    }


    const playerContainer = document.querySelector('#playerContainer');
    const player = document.querySelector('#player')
    playerContainer.classList.remove('hidden');
    player.src = playlistUrl;
}


function onJson(json){
    const temperatura = json.main.temp;
    const descrizione = json.weather[0].description;
    const città = json.name;

    document.querySelector('#weather-info').innerHTML = 'A ' + città + '  ci sono ' + temperatura + '°C con ' + descrizione;

    spotifyPlayer(temperatura);
}


function handler(event){
    event.preventDefault(); 

    const città = document.querySelector('#city-input').value;
    const apiUrl =   'https://api.openweathermap.org/data/2.5/weather?q=' + città + '&appid=' + apiKey + '&units=metric';
    fetch(apiUrl).then(onResponse).then(onJson);
}

document.querySelector('#weather-form').addEventListener('submit', handler);
