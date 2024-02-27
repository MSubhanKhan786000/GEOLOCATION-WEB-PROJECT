const btn = document.getElementById("btn");
const country_container = document.getElementById("country-container");
const map = document.getElementById("map");

//     & callback = FUNCTION_NAME

//ecc03723016cf23de952d46e32721fa5

function geo() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      map.innerHTML = `<iframe
        src="https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed"
        width="100%"
        height="100%"
        frameborder="0"
        style="border:0"
        allowfullscreen
      ></iframe>;
      `;
      getLocation(lat, lng);
    });
  }
}

const getLocation = async (lat, lng) => {
  try {
    const response = await fetch(
      `http://api.positionstack.com/v1/reverse?access_key=d72c6b9912f63eb9912d54fefcf89c7d&query=${lat},${lng}`
    );
    const data = response.json();
    const country = data.data[0];
    country_container.innerHTML = `<div class="content">
    <h2>Continent</h2>
    <p id="city">${country.continent}</p>
  </div>
  <div class="region">
    <h2>Region</h2>
    <p>${country.region}</p>
  </div>
  <div class="street">
    <h2>${country.street}</h2>
    <p></p>
  </div>
  <div class="region">
    <h2>Region</h2>
    <p>${country.region}</p>
  </div>
  <div class="Address">
    <h2>${country.label}</h2>
    <p></p>
  </div>`;

    console.log(data);
  } catch (error) {
    console.log("Error fetching api");
  }
};
//add eventListener
btn.addEventListener("click", geo);
