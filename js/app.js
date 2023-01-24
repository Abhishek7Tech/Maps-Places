"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const axios = require("axios");
const input = document.getElementById("input");
const search = document.getElementById("btn");
const app = document.getElementById("app");
const API_KEY = "0bb3071af71b44aba9d3fb7705126cf7";
search.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Clicked");
    const address = input.value;
    console.log(address, API_KEY);
    //  axios
    //   .get(
    //     `https://api.geoapify.com/v1/geocode/search?text=${encodeURI(
    //       address
    //     )}&format=json&apiKey=${API_KEY}`,
    //     {
    //       headers:{
    //         Accept: "application/json",
    //       }
    //     }
    //   )
    const data = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${address}&format=json&apiKey=${API_KEY}`);
    // .then(response => response.json())
    // .then(result => console.log(result.results[0].bbox))
    // .catch(error => console.log('error', error));
    try {
        const response = await data.json();
        const { lon, lat } = await response.results[0];
        // const map =
        var map = L.map(app).setView([+lat, +lon], 10);
        L.marker([+lat, +lon]).addTo(map);
        var isRetina = L.Browser.retina;
        var baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${API_KEY}`;
        var retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${API_KEY}`;
        // Add map tiles layer. Set 20 as the maximal zoom and provide map data attribution.
        L.tileLayer(isRetina ? retinaUrl : baseUrl, {
            attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" rel="nofollow" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" rel="nofollow" target="_blank">© OpenStreetMap</a> contributors',
            apiKey: API_KEY,
            maxZoom: 20,
            id: "osm-bright",
        }).addTo(map);
        console.log(lon, lat);
    }
    catch (error) {
        console.log("SOMETHING WENT WRONG!!!!", error);
    }
});
