// weather.js

console.log("hello World!");

const locInput = document.querySelector("#location");
const locButton = document.querySelector("#location_search");
const gifImage = document.querySelector("img");
const weatherContent = document.querySelector('.weather');

// Weather retrieval
function populatePage () {
    let location = locInput.value;
    let weatherData;
    let wObj;
    if (location == '') {
        location = 'Nashville';
    };

    async function getWeather () {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=2U6UFQEAFWM3KRVUQ5RQHBW8W&include=days,hours,alerts,current,stats`);
        try {
            // store weather data as variable
            weatherData = await response.json();
            const rightNow = weatherData.currentConditions;

            wObj = {
                time: rightNow.datetime,
                temp: rightNow.temp,
                feels: rightNow.feelslike,
                cloud: rightNow.cloudcover,
                env: rightNow.conditions,
                rise: rightNow.sunrise,
                set: rightNow.sunset,
            };

            // Once the weather is returned, we can get a gif based on the weather conditions.
            let term = wObj.env;
            if (term == '') {
                term = 'sexy';
            };
        
            // GIF retrieval
            async function getGif () {
                const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=yMEyfQq5SRG8vHM876IXfMTyM32aReRq&s=${term}`, {mode: 'cors'});
                try {
                    const gifData = await response.json();
                    gifImage.src = gifData.data.images.original.url;
                } catch (error) {
                    console.log(error);
                };
            };

            getGif();
        } catch (error) {
            console.log(error);
        }
    };

    getWeather();

    


};

locButton.addEventListener('click', () => {
    populatePage();
});