let selectors=()=>{
    let appSelectors = {
        mapDisplay: '#mapDisplay',
        ipValue: '#ipValue',
        locationValue: '#locationValue',
        timezoneValue: '#timezoneValue',
        ispValue: '#ispValue',
        searchBar: '#searchBar',
        searchBtn: '.searchBtn'
    }

    return{
        appSelectors
    }
}



let displayMap=(lat, long)=>{

    var container = L.DomUtil.get('mapDisplay');
        if(container != null){
        container._leaflet_id = null;
    }

    let map = L.map('mapDisplay').setView([lat, long], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let myIcon = L.icon({
        iconUrl: "../assets/images/icon-location.svg",
        iconAnchor: [lat, long],
    });

    L.marker([lat, long]).addTo(map);   
}


let getIpDetails=(ip)=>{

    let key = 'at_yD616QsY5LwKtmSTbfr3fiwpFDfDI';

    fetch(`https://geo.ipify.org/api/v1?apiKey=${key}&ipAddress=${ip}`)
    .then(resp=>resp.json())
    .then(data=>{

        document.querySelector(selectors().appSelectors.ipValue).innerText = data.ip;
        document.querySelector(selectors().appSelectors.locationValue).innerText = `${data.location.city}, ${data.location.country}`;
        document.querySelector(selectors().appSelectors.timezoneValue).innerText = `UTC ${data.location.timezone}`;
        document.querySelector(selectors().appSelectors.ispValue).innerText = data.isp;
        displayMap(data.location.lat, data.location.lng)
    })
}

let getUserIpAddress=(()=>{
    fetch("https://api.ipify.org?format=json")
    .then(resp=>resp.json())
    .then(data=>{
        getIpDetails(data.ip)
    })
})()

let eventsHandlers=(()=>{
    let ipInput = document.querySelector(selectors().appSelectors.searchBar)
    let searchBtn = document.querySelector(selectors().appSelectors.searchBtn);

    ipInput.addEventListener('change', ()=>{
        getIpDetails(ipInput.value)
    })

    searchBtn.addEventListener('click', ()=>{
        getIpDetails(ipInput.value)
    })
})()

