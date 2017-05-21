/**
 * Created by airmac on 5/17/17.
 */

var publicKey = "7ab0d18c65666a41ab7a94dd320ddb14";

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
    document.getElementById('submitHero').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var input = document.getElementById('marvel').value;



        var myURL = "https://gateway.marvel.com/v1/public/characters?name="+input+"&apikey="+publicKey;


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

function printTemp(m){
    document.getElementById('name').textContent = m.data.results["0"].name;
    document.getElementById('bio').textContent = m.data.results["0"].description;
}