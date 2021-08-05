const btn = document.getElementById("btn");
const query = document.getElementById("input");

const ipaddress = document.getElementById("ipaddress");
const locationA = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

var mymap;
function showMap(){
    mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ29sZHlraW5nMTkwNyIsImEiOiJja3J0OGE4b3MwenUyMm5xY3ZodTdxNWV6In0.XE1Rqpr4LYSp4zEJLXaf2w', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZ29sZHlraW5nMTkwNyIsImEiOiJja3J0OGE4b3MwenUyMm5xY3ZodTdxNWV6In0.XE1Rqpr4LYSp4zEJLXaf2w'
    }).addTo(mymap);
}

showMap()


async function getIp(query){
    try {
        const response = await fetch(
            `https://geo.ipify.org/api/v1?apiKey=at_8lUskAd1KkHuUnESEJcBKl9louKGt&ipAddress=${query}`
        );
        const result = await response.json();
        showResult(result);
    } catch (error) {
        console.log(error)
    }
}
btn.addEventListener('click', () => {
    let ip = query.value;
    getIp(ip);
})

function showResult(result){



    const el = `
        <!-- Flex Item #1  -->
        <div class="flex flex-col">
            <h3 class="text-xs mb-2 uppercase">IP Address</h3>
            <span class="text-2xl" id="ipaddress">${result.ip}</span>
        </div>
        <!-- Flex Item #2  -->
        <div class="flex flex-col">
            <h3 class="text-xs mb-2 uppercase">Location</h3>
            <span class="text-2xl" id="location">${result.location.region}</span>
        </div>
        <!-- Flex Item #3  -->
        <div class="flex flex-col">
            <h3 class="text-xs mb-2 uppercase">Timezone</h3>
            <span class="text-2xl" id="timezone">UTC ${result.location.timezone}</span>
        </div>
        <!-- Flex Item #4  -->
        <div class="flex flex-col">
            <h3 class="text-xs mb-2 uppercase">ISP</h3>
            <span class="text-2xl capitalize" >${result.isp}</span>
        </div>`

    const parent = document.getElementById("parent");
    parent.classList.remove("hidden");
    parent.innerHTML = el;

    // ipaddress.innerText = result.ip;
    // locationA.innerText = result.location.region;
    // timezone.innerText = `UTC ${result.location.timezone}`;
    // isp.innerText = result.isp;
    L.marker([result.location.lat, result.location.lng]).addTo(mymap);
    mymap.setView([result.location.lat, result.location.lng], 13);
}
