/**
 * Created by airmac on 5/8/17.
 */

var apiKey = ',us&appid=8117032b43375b398485e40333d6f5ae';

document.addEventListener('DOMContentLoaded', bindButtons);
var input;


function bindButtons() {
    document.getElementById('submitWeather').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var zipCode = document.getElementById('zip').value;
        var userCity = document.getElementById('city').value;

        if(userCity === ''){
            input = "zip=" + zipCode;
        } else {
            input = "q=" + userCity;
        }

        var myURL = "http://api.openweathermap.org/data/2.5/weather?" + input + apiKey + '&units=imperial';

        req.open("GET", myURL, true);
        req.addEventListener('load', function() {
            if(req.status >= 200 && req.status < 400) {
                var myTemp = JSON.parse(req.responseText);
                console.log(myTemp);
                printTemp(myTemp);
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });

        req.send(null);
        event.preventDefault();
    });


}

function printTemp(t) {
    document.getElementById('cityName').textContent = t.name;
    document.getElementById('temp').textContent = t.main.temp;
    document.getElementById('humid').textContent = t.main.humidity;
}


