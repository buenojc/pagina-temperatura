const appKey = "ADICIONAR APP KEY DO OPEN WHEATER MAP";

async function getLat(cityName) {
  const data = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${appKey}`
  ).then((response) => {
    return response.json();
  });

  return data;
}

async function getTemp(lat, lon) {
  const temp = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appKey}&units=metric`
  ).then((response) => {
    return response.json();
  });

  return temp;
}

window.addEventListener("load", () => {
  const elementTemp = document.getElementById("temperatura");
  const cityNameInput = document.querySelector("input");
  const form = document.querySelector("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = await getLat(cityNameInput.value);
    const temp = await getTemp(data[0].lat, data[0].lon);

    elementTemp.innerHTML = `
                 <p>${temp.main.temp.toFixed()}º</p>
                   <p>${cityNameInput.value}</p>
               `;

    cityNameInput.value = '';
  });
});
