/**
 * Created by airmac on 5/9/17.
 */

document.addEventListener('DOMContentLoaded', bindInfo);

function bindInfo() {
    document.getElementById('submitInfo').addEventListener('click', function (event) {
        var req = new XMLHttpRequest();
        var myURL = "http://httpbin.org/post";

        var payload = {
            name: null,
            age: null,
            major: null
        };

        payload.name = document.getElementById('userName').value;
        payload.age = document.getElementById('userAge').value;
        payload.major = document.getElementById('major').value;


        req.open("POST", myURL, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function () {
            if (req.status >= 200 && req.status < 400) {
                var myInfo = JSON.parse(req.responseText);
                console.log(myInfo.json);
                printInfo(myInfo.json);

            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });

        req.send(JSON.stringify(payload));
        event.preventDefault();
    });
}

function printInfo(i){
    document.getElementsByClassName('userName')[0].innerText = i.name;
    document.getElementsByClassName('userAge')[0].innerText= i.age;
    document.getElementsByClassName('major')[0].innerText = i.major;
}