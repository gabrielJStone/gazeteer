// shorthand for jQuery document.ready() function
$(function(){

// PRELOADER
setTimeout(() => {
    $('#preloader').fadeOut('slow', function () { 
        $(this).remove();
    }); 
}, 1000)


// initializes map
let map = L.map('map', {
    zoomControl: false
});

// initializes base map tilelayer
let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// ----------------------------------------------------
// MAP CONTROLS

// ZOOM
let zoomControl = L.control.zoom({ position: 'topleft'});
zoomControl.addTo(map);

// BASE MAP
let baseMaps = {
    "OpenStreetMap": osm,
    "Satellite": satellite
};

// OVERLAY
// city layer
cityLayer = L.markerClusterGroup({
    polygonOptions: {
        color: '#5F9EA0'
    }
});
let cities = [];
let cityMarkers = [];
// airport layer
airportLayer = L.markerClusterGroup({
    polygonOptions: {
        color: '#5F9EA0'
    }
});
let airports = [];
let airportMarkers = [];

let testLayer1 = L.layerGroup();
let testMarker = L.marker([53, -3]);
testMarker.addTo(testLayer1);

let overlayMaps = {
    "Cities": cityLayer,
    "Airports": airportLayer
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

airportLayer.addTo(map);
cityLayer.addTo(map);

// MARKER ICONS
var cityIcon = L.icon({
    iconUrl: './images/city-marker-v2.svg',
    iconSize:     [50, 95], // size of the icon
    iconAnchor:   [28, 101], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var airportIcon = L.icon({
    iconUrl: './images/airport-marker.svg',
    iconSize:     [50, 95], // size of the icon
    iconAnchor:   [28, 101], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// EASY BUTTONS
let darkMode = false;
const darkBtn = L.easyButton( '<i id="darkModeBtn" class="fa-regular fa-moon fa-lg easyBtnFont" title="Dark Mode"></i>', function(btn, map){
    darkMode = (!darkMode);

    const modals = document.querySelectorAll('.modal-content');
    const easyBtns = document.querySelectorAll('.leaflet-touch .leaflet-bar');
    const selector = document.getElementById('countrySelect');
    const overlayControl = document.querySelector('.leaflet-control-layers-toggle');
    const zoomIn = document.querySelectorAll('.leaflet-control-container .leaflet-top .leaflet-control-zoom a.leaflet-control-zoom-in');
    const zoomOut = document.querySelectorAll('.leaflet-control-container .leaflet-top .leaflet-control-zoom a.leaflet-control-zoom-out');
    const zoomBtns = [zoomIn, zoomOut];
    const expandBtn = document.querySelectorAll('.expand-btn');
    const tables = document.querySelectorAll('table');
    if (darkMode) {
            modals.forEach(i => {
                i.classList.add('darkMode');
            })
            easyBtns.forEach(btn => {
                btn.classList.add('darkMode');
            })
            zoomBtns.forEach(btn => {
                btn[0].style.transition = 'color 300ms, background-color 300ms';
                btn[0].style.backgroundColor = 'black';
                btn[0].style.color = 'white';
            })
            btnArr.forEach(btn => {
                btn.button.style.transition = 'color 300ms, background-color 300ms';
                btn.button.style.borderStyle = 'none';
                btn.button.style.backgroundColor = 'black';
                btn.button.style.color = 'white';
            })
            overlayControl.classList.add('darkMode');
            selector.classList.add('darkMode');
            document.body.classList.add('darkMode');
            tables.forEach(table => {
                table.classList.add('table-dark')
            })
            expandBtn.forEach(btn => {
                btn.classList.remove('btn-secondary');
                btn.classList.add('btn-light');
            })
            
    } else {

        document.getElementById('darkModeBtn').className = "fa-regular fa-moon fa-lg easyBtnFont";
        modals.forEach(i => {
            i.classList.remove('darkMode');
        })
        easyBtns.forEach(btn => {
            btn.classList.remove('darkMode');
        })
        zoomBtns.forEach(btn => {
            btn[0].style.backgroundColor = 'white';
            btn[0].style.color = 'black';
        })
        btnArr.forEach(btn => {
            btn.button.style.backgroundColor = 'white';
            btn.button.style.color = 'black';
        })
        overlayControl.classList.remove('darkMode');
        selector.classList.remove('darkMode');
        document.body.classList.remove('darkMode');
        tables.forEach(table => {
            table.classList.remove('table-dark')
        })
        expandBtn.forEach(btn => {
            btn.classList.remove('btn-light');
            btn.classList.add('btn-secondary');
        })
    }
}).setPosition('topleft').addTo(map);

// easy button: toggles modal visibility for current country data
const countryBtn = L.easyButton( '<i class="fa-solid fa-chart-simple fa-lg easyBtnFont" title="Country Data"></i>', function(){
    $('#countryModal').modal('toggle');
    $('#weatherModal').modal('hide');
    $('#currencyModal').modal('hide');
    $('#newsModal').modal('hide');
    $('#timezoneModal').modal('hide');
}).setPosition('topleft').addTo(map);

// easy button: toggles modal visibility for current country weather data
const weatherBtn = L.easyButton( '<i class="fa-solid fa-cloud-sun-rain fa-lg easyBtnFont" title="Weather"></i>', function(){
    $('#weatherModal').modal('toggle');
    $('#countryModal').modal('hide');
    $('#currencyModal').modal('hide');
    $('#newsModal').modal('hide');
    $('#timezoneModal').modal('hide');
}).setPosition('topleft').addTo(map);

// easy button: toggles modal visibility for current country currency data
const currencyBtn = L.easyButton( '<i class="fa-solid fa-landmark fa-lg easyBtnFont" title="Currency Exchange"></i>', function(){
    $('#currencyModal').modal('toggle');
    $('#weatherModal').modal('hide');
    $('#countryModal').modal('hide');
    $('#newsModal').modal('hide');
    $('#timezoneModal').modal('hide');
}).setPosition('topleft').addTo(map);

// easy button: toggles modal visibility for current country news
const newsBtn = L.easyButton( '<i class="fa-solid fa-newspaper fa-lg easyBtnFont" title="News"></i>', function(){
    $('#newsModal').modal('toggle');
    $('#weatherModal').modal('hide');
    $('#currencyModal').modal('hide');
    $('#countryModal').modal('hide');
    $('#timezoneModal').modal('hide');
}).setPosition('topleft').addTo(map);

// easy button: toggles modal visibility for current country news
const timeBtn = L.easyButton( '<i class="fa-solid fa-clock fa-lg easyBtnFont" title="Timezone"></i>', function(){
    $('#timezoneModal').modal('toggle');
    $('#newsModal').modal('hide');
    $('#weatherModal').modal('hide');
    $('#currencyModal').modal('hide');
    $('#countryModal').modal('hide');
}).setPosition('topleft').addTo(map);

let btnArr = [darkBtn, countryBtn, weatherBtn, currencyBtn, newsBtn, timeBtn];

// ----------------------------------------------------

let globalResponse;

let countriesArray = [];
let locationCountry = {};
function populateCountrySelect() {
    return new Promise(function(resolve, reject) {
    $.ajax({
        url: 'php/getCountryList.php',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            let x = document.getElementById("countrySelect");
            for (let i = 0; i < response['countries'].length; i++) {
                let country = {
                    name: response['countries'][i]['name'],
                    code: response['countries'][i]['code']
                }
                countriesArray.push(country);
            }
            
            // custom function to sort countries array alphabetically in ascending order
            function dynamicSort(property) {
                var sortOrder = 1;
            
                if(property[0] === "-") {
                    sortOrder = -1;
                    property = property.substr(1);
                }
            
                return function (a,b) {
                    if(sortOrder == -1){
                        return b[property].localeCompare(a[property]);
                    }else{
                        return a[property].localeCompare(b[property]);
                    }        
                }
            }
            
            countriesArray.sort(dynamicSort("name"));
            countriesArray.forEach(country => {
                let option = document.createElement("option");
                option.text = country.name;
                option.value = country.code;
                x.add(option);
            });            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
    },
    })
})
}

// moves map to country containing your current location
let locationMarker;
let currentLocationLatLng;
function navigateToLocation() {
    return new Promise(function(resolve, reject) {
    map.locate({
        setView: true,
        maxZoom: 120,
        watch: false,
        enableHighAccuracy: true
      }).on("locationfound", e => {
        currentLocationLatLng = {
            lat: e.latlng.lat,
            lng: e.latlng.lng
        }
        
        initializeLocationBorder(currentLocationLatLng)
      }).on("locationerror", error => {
        console.log('Location error:');
        console.log(error);
      });
}
)}

// adds border to country you are currently located in on load
function initializeLocationBorder(currentLocationLatLng) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: 'php/getIsoFromLatLng.php?lat=' + currentLocationLatLng.lat + '&lng=' + currentLocationLatLng.lng,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                globalResponse = response.replace('\r\n', ''); // strips unwanted characters from api call response
                resolve(); // Resolve the promise
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                reject(errorThrown); // Reject the promise
            },
        });
    });
}

let polygonLayer = L.geoJSON();

// function that adds polygon border to country with associated iso code 
// and then navigates map window to that country
function addCountryBorder(iso_code) {
    $.ajax({
        url: "php/getCountryBorder.php?iso_code=" + iso_code,
        type: "GET",
        dataType: "json",
        success: function (response) {
    
        // creates new L.geoJSON layer using geometry object
            polygonLayer = L.geoJSON(
            {
            type: "Feature",
            properties: {},
            geometry: response,
            },
            {
            style: function () {
                return { color: "aqua", weight: 3 };
            },
            interactive: false
            }
        )
            .bindPopup(function (layer) {
            return layer.feature.properties.response;
            })
            .addTo(map);
    
        // navigates map view to country with polygon border
        map.fitBounds(polygonLayer.getBounds());
        },
        // logs error if present
        error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
        },
    });
}



// updates iso code on country change (select tag)
let countryCode = $('#countrySelect').val();
function findSelectedCountry(param) {
    countryCode = $('#countrySelect').val();
    let currentCountry = document.getElementById("current-country");
        currentCountry.text = param;
        currentCountry.selected = "true";
        return countryCode;
};

$('#countrySelect').on('change', function() {
    findSelectedCountry($('#countrySelect option').filter(':selected').text());
    addCountryBorder(countryCode);
    polygonLayer.remove();
});

// ----------------------------------------------------
// HELPER FUNCTIONS
// -------------------------
// adds comma to thousandth digit in number
function formatNum(num) {
    return num.toLocaleString('en-US');
}
// -------------------------
// native date formatter
const currentDate = new Date();
const year = currentDate.getFullYear().toString().padStart(4, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');

// today's date formatted as 'YYYY-MM-DD'
const today = `${year}-${month}-${day}`;

// current hour
let currentHour = Number(currentDate.getHours().toString().padStart(2, '0'));
if (currentHour == "00") {
    currentHour = 0
}

// tomorrow's date
const tomorrowDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
const tomorrowYear = tomorrowDate.getFullYear().toString().padStart(4, '0');
const tomorrowMonth = (tomorrowDate.getMonth() + 1).toString().padStart(2, '0');
const tomorrowDay = tomorrowDate.getDate().toString().padStart(2, '0');

// day after tomorrow's date
const dayAfterTomorrowDate = new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000);
const dayAfterTomorrowYear = dayAfterTomorrowDate.getFullYear().toString().padStart(4, '0');
const dayAfterTomorrowMonth = (dayAfterTomorrowDate.getMonth() + 1).toString().padStart(2, '0');
const dayAfterTomorrowDay = dayAfterTomorrowDate.getDate().toString().padStart(2, '0');
const dayAfterTomorrow = `${dayAfterTomorrowYear}-${dayAfterTomorrowMonth}-${dayAfterTomorrowDay}`;

// day of the week for tomorrow and the day after
const tomorrowDayOfWeek = tomorrowDate.toLocaleDateString('en-US', { weekday: 'long' });
const dayAfterTomorrowDayOfWeek = dayAfterTomorrowDate.toLocaleDateString('en-US', { weekday: 'long' });


// tomorrow's date formatted as 'YYYY-MM-DD'
const tomorrow = `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`;

function monthName(num) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (num.includes('0')) {
        let tidied = num.replace('0', '')
        return months[tidied.trim() - 1];
    }
    return months[num.trim() - 1];
}

function dayName(num) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days[num.trim() - 1];
}

// ----------------------------------------------------
// API FUNCTIONS -->
// get data for each data type and dynamically modify relevant data ojects

// COUNTRY INFO
// empty object for country data to be modified by function
let countryData = {
    countryName: "",
    capital: "",
    language: "",
    population: "",
    area: "",
    continent: "",
    currency: "",
    code: "",
    currencyCodeOnly: "",
    countryCodeOnly: ""
};

// getCountryInfo api call - via getCountryInfo.php
function getCountryInfo() {
    $.ajax({
        url: "php/getCountryInfoAPI.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country: countryCode
        },
        success: function(result) {
            try {
                if ((result.status.name == "ok") && (result['weatherData'] !== null)) {
                    let population = Number(result['countryData'][0]['population']);
                    let area = Number(result['countryData'][0]['areaInSqKm']);
                    let geonameId = result['countryData'][0]['geonameId'];

                    countryData = {
                        countryName: result['countryData'][0]['countryName'],
                        capital: result['countryData'][0]['capital'],
                        population: formatNum(population),
                        area: formatNum(area),
                        continent: result['countryData'][0]['continentName'],
                        currency: result['countryData'][0]['currencyCode'],
                        code: result['countryData'][0]['countryCode'],
                        currencyCodeOnly: result['countryData'][0]['currencyCode'],
                        countryCodeOnly: result['countryData'][0]['countryCode']
                    };
                    
                    const titles = document.querySelectorAll('.title');
                        titles.forEach(title => {
                            title.innerHTML = countryData.countryName;
                        });
                    document.getElementById("countryCapital").innerHTML = countryData.capital;
                    document.getElementById("countryPopulation").innerHTML = countryData.population;
                    document.getElementById("countryArea").innerHTML = countryData.area;
                    document.getElementById("countryContinent").innerHTML = countryData.continent;
                    document.getElementById("countryCurrency").innerHTML = countryData.currency;
                    document.getElementById("countryCode").innerHTML = countryData.code;
                    
                    getCountryFlag();
                    getCitiesData();
                    getAirportsData();
                    getCurrencyData();
                    getNewsData();
                    getWikipediaAPI();
                } 
            } catch(error) {
                console.log(error);
            }
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(`${jqXHR}, ${textStatus}`)
        }
    })
}

// FLAG
// retrieves flag image for selected country
function getCountryFlag() {
    let flag = {
        iso: countryData.countryCodeOnly
    };

    $.ajax({
        url: "php/getCountryFlag.php",
        type: 'GET',
        dataType: 'text',
        data: {
            iso: flag.iso
        },
        success: function(result) {
            const flags = document.querySelectorAll('.flag');
                        flags.forEach(flag => {
                            flag.src = result.toLowerCase();
                        });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(`${jqXHR}, ${textStatus}`)
        }
    })
}

// EXCHANGE RATE
// getCurrencyData api call - via getCurrencyData.php
function getCurrencyData() {
    $.ajax({
        url: "php/getCurrencyData.php",
        type: 'GET',
        dataType: 'json',
        data: {
            base: "USD"
        },
        success: function(result) {

            try {
                if (result.status.name == "ok") {

                    let currency = result['currencyData'][countryData.currencyCodeOnly];
                    let fixedCurrency = currency.toFixed(2);
                    document.getElementById("exchangeRate").innerHTML = countryData.currencyCodeOnly;
                    document.getElementById("foreignCurrency").value = fixedCurrency

                    let base = document.getElementById('baseCurrency');
                    let foreign = document.getElementById('foreignCurrency');
                    $('.currencyInput').on('input', function() {
                        foreign.value = fixedCurrency;
                        foreign.value = base.value * foreign.value;
                        let convertedForeign = Number(foreign.value).toFixed(2);
                        foreign.value = convertedForeign;
                    })
                }
            } catch(error) {
                console.log(error);
            }
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(`${jqXHR}, ${textStatus}`)
        }
    })
}

// CITIES
// getCitiesData api call - via getCitiesAPI.php
let city = {
    name: "",
    lat: "",
    lng: ""
}
function getCitiesData(callback) {
    $.ajax({
        url: "php/getCitiesAPI.php",
        type: 'GET',
        dataType: 'json',
        data: {
            iso: countryData.countryCodeOnly
        },
        success: function(result) {

            try {
                if ((result.status.name == "ok") && (result['weatherData'] !== null)) {
                    
                    city.name = result['allCities'][0]['name']
                    city.lat = result['allCities'][0]['lat']
                    city.lng = result['allCities'][0]['lng']

                    function removeCityMarkers() {
                        cityMarkers.forEach(city => {
                            city.removeFrom(cityLayer);
                        })
                    }

                    removeCityMarkers();
                    
                    cities = result['allCities'];
                    function placeCityMarkers() {
                        cities.forEach(city => {
                            let cityMarker = L.marker([city.lat, city.lng], {icon: cityIcon}).bindTooltip(city.name, {direction: 'top', sticky: true});
                            cityMarkers.push(cityMarker);
                            cityMarker.addTo(cityLayer);
                        })
                        
                    }

                    placeCityMarkers();
                    if (typeof callback === 'function') {
                        callback();
                    }
                    getWeather();
                    getTimezone();
                    setInterval(() => {
                        getTimezone();
                    }, 60000)

                }
            } catch(error) {
                console.log(error);
            }
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(`${jqXHR}, ${textStatus}`)
        }
    })
}

// WEATHER
// empty object for weather data to be modified by function
let weatherData = {
    temp_day: "",
    clouds: "",
    humidity: "",
    station: "",
};
// getWeather api call - via getWeatherAPI.php
function getWeather() {
    $.ajax({
        url: "php/getWeatherAPI2.php",
        type: 'GET',
        dataType: 'json',
        data: {
            lat: city.lat,
            lng: city.lng
        },
        success: function(result) {

            try {
                if ((result.status.name == "ok") && (result['weatherData'] !== null)) {
                    let hourWeather = result['weatherData']['forecast'][0]['hour'];
                    function detectHour() {
                        for (let i = 0; i < hourWeather.length; i++) {
                            if (i == Number(currentHour)) {
                                return hourWeather[i]
                            }
                        }
                    }

                    weatherData = {
                        temp_day: detectHour()['temp_c'],
                        temp_tomorrow: result['weatherData']['forecast'][1]['day']['avgtemp_c'],
                        temp_dayAfter: result['weatherData']['forecast'][2]['day']['avgtemp_c'],
                        icon: `https:${result['weatherData']['forecast'][0]['hour'][currentHour]['condition']['icon']}`,
                        icon_tomorrow: `https:${result['weatherData']['forecast'][1]['day']['condition']['icon']}`,
                        icon_dayAfter: `https:${result['weatherData']['forecast'][2]['day']['condition']['icon']}`,
                        text: result['weatherData']['forecast'][0]['hour'][currentHour]['condition']['text'],
                        tomorrowDate: tomorrowDayOfWeek,
                        dayAfterDate: dayAfterTomorrowDayOfWeek
                    };

                    function backgroundImage() {
                        let cleaned = weatherData.text.toLowerCase();
                        if ((cleaned.includes("sunny")) || (cleaned.includes("clear"))) {
                            return "url('./images/weather/sunny_unsplash_samschooler.jpeg')";
                        } else if ((cleaned.includes("rain")) || (cleaned.includes("mist")) || (cleaned.includes("fog"))) {
                            return "url('./images/weather/rain_portrait_unsplash_raulangel.jpeg')";
                        } else if (cleaned.includes("cloud")) {
                            return "url('./images/weather/overcast_portrait_unsplash_daoudiaissa.jpeg')";
                        } else if (cleaned.includes("thunder")) {
                            return "url('./images/weather/thunderstorm_unsplash_leviguzman.jpeg')";
                        }
                    }

                    function hoursIcon(i) {
                        return result['weatherData']['forecast'][0]['hour'][i]['condition']['icon'];
                    }

                    document.getElementById("weatherTitle").innerHTML = city.name;
                    // today's weather
                    document.getElementById("todayTemp").innerHTML = `${weatherData.temp_day}&deg;C`;
                    document.getElementById("todayIcon").src = weatherData.icon;
                    document.getElementById("todayText").innerHTML = weatherData.text;
                    // tomorrow's weather
                    document.getElementById("tomorrowTemp").innerHTML = `${weatherData.temp_tomorrow}&deg;C`;
                    document.getElementById("tomorrowIcon").src = weatherData.icon_tomorrow;
                    document.getElementById("tomorrowDate").innerHTML = weatherData.tomorrowDate;
                    // day-after-tomorrow's weather
                    document.getElementById("dayAfterTemp").innerHTML = `${weatherData.temp_dayAfter}&deg;C`;
                    document.getElementById("dayAfterIcon").src = weatherData.icon_dayAfter;
                    document.getElementById("dayAfterDate").innerHTML = weatherData.dayAfterDate;

                    document.getElementById("weatherDiv").style.backgroundImage = backgroundImage();

                    $('#countrySelect').on('change', function() {
                        document.getElementById("weatherDiv").style.backgroundImage = backgroundImage();
                    });

                    function setAttributes(el, attrs) {
                        for(var key in attrs) {
                          el.setAttribute(key, attrs[key]);
                        }
                      }
                    
                    function nextTemp(input, i) {
                        let temp = String(input[i]['temp_c'].toFixed(1));
                        if (!(temp.includes('.'))) {
                            temp = temp + '.0'
                        }
                        return temp;
                    }

                    try {                

                        let j = 1;

                            
                            document.getElementById('nextHour').innerHTML = "";
                            while (hourWeather[currentHour + j]['time'].substring(11, 13) >= 0) {
                                
                                let forecast = document.createElement('div');
                                
                                setAttributes(forecast, {'class': 'col w-25 border p-2 text-start opaque'});
                                forecast.innerHTML = `
                                    <div class="col fw-bold fs-6">${hourWeather[currentHour + j]['time'].substring(11, 16)}</div>
                                    <img class="col img-fluid" src=${hoursIcon(currentHour + j)}></img>
                                    <div class="col fw-bold fs-6">${nextTemp(hourWeather, (currentHour + j))}&deg;C</div>`
                                document.getElementById('nextHour').appendChild(forecast);
                                j++;
                                
                            }
                            
                        
                    } catch (error) {
                            return
                    }
                } 
            } catch(error) {
                console.log(error)
            }
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(`${jqXHR}, ${textStatus}`)
        }
    })
}

// TIMEZONE
// empty object for timezone data to be modified by function
let timezone = {
    time: "",
    offset: "",
    date: "",
    sunrise: "",
    sunset: "",
};
// getTimezone api call - via getTimezoneAPI.php
function getTimezone() {
    $.ajax({
        url: "php/getTimezoneAPI.php",
        type: 'GET',
        dataType: 'json',
        data: {
            lat: city.lat,
            lng: city.lng
        },
        success: function(result) {
            const date = result['timezone']['time'];

            try {
                if ((result.status.name == "ok") && (result['timezone'] !== null)) {
                    timezone = {
                        time: result['timezone']['time'].substring(11, 16),
                        offset: result['timezone']['gmtOffset'],
                        date: date.substring(8, 10) + '-' + monthName(date.substring(5, 7)) + '-' + date.substring(0, 4),
                        sunrise: result['timezone']['sunrise'].substring(11, 16),
                        sunset: result['timezone']['sunset'].substring(11, 16)
                    };
                    document.getElementById('timezoneDiv').style.display = 'block';
                    document.getElementById("timezoneTitle").innerHTML = city.name;
                    document.getElementById("timezoneDate").innerHTML = timezone.date;
                    document.getElementById("timezoneTime").innerHTML = timezone.time;
                    document.getElementById("timezoneSunrise").innerHTML = timezone.sunrise;
                    document.getElementById("timezoneSunset").innerHTML = timezone.sunset;
                    document.getElementById("timezoneOffset").innerHTML = timezone.offset;
                    document.getElementById("timezoneError").style.display = 'none';
                    
                    
                } else {
                    document.getElementById('timezoneDiv').style.display = 'none';
                    document.getElementById("timezoneError").innerHTML = "Sorry, we can't get the timezone for this country right now.";
                    document.getElementById("timezoneError").style.display = 'block';
                }
            } catch(error) {
                console.log(error)
            }
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(`${jqXHR}, ${textStatus}`)
        }
    })
}

// AIRPORTS
// getAirportsData api call - via getAirportAPI.php
function getAirportsData() {
    $.ajax({
        url: "php/getAirportAPI.php",
        type: 'GET',
        dataType: 'json',
        data: {
            iso: countryData.countryCodeOnly
        },
        success: function(result) {

            try {
                if (result.status.name == "ok") {
                    removeAirportMarkers();
                    airports = result['airports'];
                    function placeAirportMarkers() {
                        airports.forEach(airport => {
                            let airportMarker = L.marker([airport.lat, airport.lng], {icon: airportIcon}).bindTooltip(airport.name, {direction: 'top', sticky: true});
                            airportMarkers.push(airportMarker);
                            airportMarker.addTo(airportLayer);
                        })
                    }

                    function removeAirportMarkers() {
                        airportMarkers.forEach(airport => {
                            airport.removeFrom(airportLayer);
                        })
                    }

                    placeAirportMarkers();

                } 
            } catch(error) {
                console.log(error);
            }
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(`${jqXHR}, ${textStatus}`)
        }
    })
}

// NEWS
// getNewsData api call - via getNewsAPI.php
function getNewsData() {
    $.ajax({
        url: "php/getNewsAPI.php",
        type: 'GET',
        dataType: 'json',
        data: {
            iso: countryData.countryCodeOnly.toLowerCase()
        },
        success: function(result) {
            try {
                let scroll = document.getElementById('scrollDiv');
                let error = document.getElementById('errorDiv');
                if (!(result['articles'])) {
                    scroll.style.display = 'none';
                    error.style.display = 'block';
                } else {
                    scroll.style.display = 'block';
                    error.style.display = 'none';
                
                    let articleNum = 0;
                    let idNum = 1;
                    let maxArticles = 3;
                    function generateArticle(i, j) {
                            
                            // title
                            let title = result['articles'][i]['title'];
                            title ? document.getElementById(`title${j}`).innerHTML = title : document.getElementById(`title${j}`).innerHTML = "Title not available";
                            // media
                            let media = result['articles'][i]['media'];
                            media ? document.getElementById(`media${j}`).src = media : document.getElementById(`media${j}`).src = "Image not available";
                            // author
                            let author = result['articles'][i]['author'];
                            author ? document.getElementById(`author${j}`).innerHTML = `By ${author}` : document.getElementById(`author${j}`).innerHTML = "Author not available";
                            // date
                            let date = result['articles'][i]['published_date'];
                            date ? document.getElementById(`date${j}`).innerHTML = date : document.getElementById(`date${j}`).innerHTML = "Date not available";
                            // excerpt
                            let excerpt = result['articles'][i]['excerpt'] 
                            excerpt ? document.getElementById(`excerpt${j}`).innerHTML = excerpt : document.getElementById(`excerpt${j}`).innerHTML = "Description not available";
                            // summary
                            let summary = result['articles'][i]['summary'];
                            summary ? document.getElementById(`summary${j}`).innerHTML = summary : document.getElementById(`summary${j}`).innerHTML = "Summary not available";
                            // link to full article
                            let link = result['articles'][i]['link'];
                            link ? document.getElementById(`link${j}`).href = link : document.getElementById(`link${j}`).innerHTML = "Link not available";
                        }
                        
                        // generates an additional article until articleNum is equal to maxNumber (3 or less)
                        // limits visible articles to minimum number of articles available from api result
                        async function generate() {
                            let news1 = document.getElementById('newsDiv1');
                            let news2 = document.getElementById('newsDiv2');
                            let news3 = document.getElementById('newsDiv3');
                            let error = document.getElementById('errorDiv');
                            let articleLen = result['articles'].length;
                            
                            error.style.display = 'none';
                            news1.style.display = 'block';
                            news2.style.display = 'block';
                            news3.style.display = 'block';

                            if (articleLen == 1) {
                                maxArticles = 1;
                                news2.style.display = 'none';
                                news3.style.display = 'none';
                            } else if (articleLen == 2) {
                                maxArticles = 2;
                                news3.style.display = 'none';
                            } else if (articleLen == 3) {
                                maxArticles = 3;
                            } else if (articleLen < 1) {
                                news1.style.display = 'none';
                                news2.style.display = 'none';
                                news3.style.display = 'none';
                                error.style.display = 'block';
                            }

                            while (articleNum < maxArticles) {
                                await generateArticle(articleNum, idNum);
                                articleNum++;
                                idNum++;
                            }
                    }
                    generate();

                    // changes layout of news when expand-collapse button is clicked
                    let toggle1 = true;
                    let toggle2 = true;
                    let toggle3 = true;
                    function changeNewsLayout(i, j) {
                        const collapseBtn = document.getElementById(`collapseBtn${i}`)
                        const captions = document.getElementById(`heading${i}`)
                        const section = document.getElementById(`section${i}`)
                        const media = document.getElementById(`media${i}`)
                        const fig = document.getElementById(`fig${i}`)
                        const title = document.getElementById(`title${i}`)
                        if (j) {
                            collapseBtn.innerText = 'Collapse'
                            captions.style.display = 'flex';
                            section.style.flexDirection = 'column';
                            section.style.flexWrap = 'wrap';
                            media.style.marginLeft = '0';
                            media.style.width = '100%';
                            fig.classList.add('col-10');
                            title.classList.add('col-12');
                            fig.classList.remove('col-6');
                            title.classList.remove('col-6');
                        } else {
                            collapseBtn.innerText = 'Read more'
                            captions.style.display = 'none';
                            section.style.flexDirection = 'row';
                            section.style.flexWrap = 'nowrap';
                            media.style.marginLeft = '1vw';
                            media.style.width = '100%';
                            fig.classList.add('col-6');
                            title.classList.add('col-6');
                            fig.classList.remove('col-10');
                            title.classList.remove('col-12');
                        }
                    }
                    
                    $('#collapseBtn1').on('click', function() {
                        changeNewsLayout(1, toggle1);
                        toggle1 = !toggle1;
                    })
                    $('#collapseBtn2').on('click', function() {
                        changeNewsLayout(2, toggle2);
                        toggle2 = !toggle2;
                    })
                    $('#collapseBtn3').on('click', function() {
                        changeNewsLayout(3, toggle3);
                        toggle3 = !toggle3
                    })

                }

                $('#scrollDiv').on('change', function() {
                   generate();             
                });

            } catch (error) {
                console.log(error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(`${jqXHR}, ${textStatus}`)
        }
    })
}
                    
// WIKIPEDIA
// getWikipediaData api call - via getWikipediaAPI.php
function getWikipediaAPI() {
    $.ajax({
        url: "php/getWikipediaAPI.php",
        type: 'GET',
        dataType: 'json',
        data: {
            countryName: countryData.countryName
        },
        success: function(result) {
            try {
                
                // wiki text
                let summary = document.getElementById('summary');
                summary.innerHTML = result['summary'][0];

                // wiki link
                let linkDOM = document.getElementById('wikiLink');
                let link = result['url'];
                linkDOM.setAttribute('href', `${link}`);
                linkDOM.textContent = 'Read more on Wikipedia';

            } catch (error) {
                console.log(error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(`${jqXHR}, ${textStatus}`)
        }
    })
}


// INITIAL LOAD
// -----------------------------------
populateCountrySelect()
navigateToLocation()

// time needed to let other functions load country object 
// data before triggering country select tag

locationCountry = countriesArray.find(country => country.code == globalResponse);
let countryName;
try {
    countryName = locationCountry.name
    $('#current-country')
                    .val(globalResponse)
                    .text(countryName)
                    .trigger('change');   
} catch (error) {
        let loadNum = 0;
        let loadInterval = setInterval(() => {
            if (locationCountry == undefined) {
                locationCountry = countriesArray.find(country => country.code == globalResponse);
                loadNum++
                if (loadNum > 400) {
                    $('#current-country')
                        .val('GB')
                        .text('United Kingdom')
                        .trigger('change');
                        if ($('#preloader').length) {
                            $('#preloader').delay(1000).fadeOut('slow', function () { 
                                $(this).remove();
                            }); 
                        }
                        alert("Location not received. Please refresh browser and select 'Allow location' to get best user experience.");
                    clearInterval(loadInterval)
                }
            } else {
                countryName = locationCountry.name
                $('#current-country')
                    .val(globalResponse)
                    .text(countryName)
                    .trigger('change');
                clearInterval(loadInterval)
            }
        }, 10)
}

// function that contains all function calls for specific country related data
// getCountryInfo()

// -----------------------------------

// reload on country change
// when countries change, it triggers the getCountryInfo function
$('#countrySelect').on('change', function() {
    getCountryInfo();
});

// end of document.ready() jQuery function
});
