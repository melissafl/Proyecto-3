const loaderContainer = document.querySelector(".loader-container");
const canvasChart = document.getElementById("myChart").getContext("2d");
const dateInterval = document.getElementById("dateInterval");
let myChart = null;
let dateStart = "2022-01-01";
let moneyData = {};

function showLoader() {
  loaderContainer.style.display = "flex";
}

function hideLoader() {
  loaderContainer.style.display = "none";
}

function renderChart() {
  myChart = new Chart(canvasChart, {
    type: "bar",
    data: {
      labels: Object.keys(moneyData.rates),
      datasets: [
        {
          label: "Valor del Dolar",
          data: Object.values(moneyData.rates),
          backgroundColor: [
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
          ],
          borderColor: [
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
            "#0252e3",
            "#48f4fd",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
}

function filterRates() {
  Object.keys(moneyData.rates).forEach((rate) => {
    if (moneyData.rates[rate] > 23) {
      delete moneyData.rates[rate];
    }
  });
}

async function getMoney() {
  showLoader();

  const response = await axios.get(
    `https://api.frankfurter.app/${dateStart}?base=USD`
  );

  moneyData = response.data;

  filterRates();
  renderChart();
  hideLoader();
}

dateInterval.addEventListener("change", function (event) {
  dateStart = event.target.value;
  myChart.destroy();
  getMoney();
});

// rutina principal
getMoney();
