let vardPlanet = "Mercury"; 
const knapp = document.querySelectorAll('.planet-btn');
const vänster_bild = document.querySelector('#pl img'); 
const manadval = document.getElementById('ms'); 

knapp.forEach(function(button){ 
    button.addEventListener('click', function(){ 

        const klick = button.querySelector('img'); 
        vänster_bild.src = klick.src; 
        vänster_bild.alt = klick.alt; 

        vardPlanet = klick.alt; 

        if (klick.alt === 'Saturn'){ 
            vänster_bild.classList.add('saturn-img'); 
            vänster_bild.classList.remove('saturn-img');
        }

        loadDoc(klick.alt); 
    });
});

manadval.addEventListener('change', function(){ 
    const manad = manadval.value; 
    const bildpath = "images/planets/" + vardPlanet.toLowerCase() + manad + ".png"; 

    document.querySelector('#chosen-month img').src = bildpath; 
    document.querySelector('#chosen-month img').alt = vardPlanet + " månad " + manad; 
});

function loadDoc(planetNamn) { 

    var xhttp = new XMLHttpRequest(); 

    xhttp.onreadystatechange = function (){ 
        if (xhttp.readyState === 4 && xhttp.status === 200){ 
            myFunction(this.responseXML, planetNamn); 
        }
    };

    xhttp.open("GET", "planeter.xml", true); 
    xhttp.send(); 
}

function myFunction(xmlDoc, planetNamn) { 

    var planets = xmlDoc.getElementsByTagName("planet"); 

    for (let i = 0; i < planets.length; i++){ 

        var name = planets[i].getElementsByTagName("name")[0].textContent;
        if (name === planetNamn){ 

            var p = planets[i].getElementsByTagName("p")[0].textContent;
            var distans = planets[i].getElementsByTagName("distans")[0].textContent; 
            var diameter = planets[i].getElementsByTagName("diameter")[0].textContent; 
            var moon = planets[i].getElementsByTagName("moon")[0].textContent; 
            var dayLength = planets[i].getElementsByTagName("dayLength")[0].textContent; 
            var temp = planets[i].getElementsByTagName("temp")[0].textContent; 

            document.getElementById("info").innerHTML = `
                <h2> ${name}</h2>
                <p>${p}</p>
                <p>Distans: ${distans}</p>
                <p>Diameter: ${diameter}</p>
                <p>Månar: ${moon}</p>
                <p>Dygnslängd: ${dayLength}</p>
                <p>Temperatur: ${temp}</p>
            `;
        }
    }
}

vänster_bild.src = "images/space/mercury.jpg"; 
vänster_bild.alt = "Mercury"; 
loadDoc("Mercury"); 
