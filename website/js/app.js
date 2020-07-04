const API = "151c60f673a9fa35a8ad532267c2e424";

const button = document.getElementById('generate');
const container = document.getElementById('entryHolder');

// fetching the result side div elements
const dateDiv = document.getElementById('date');
const tempDiv = document.getElementById('temp');
const contentDiv = document.getElementById('content');

//Async function to handle client side post method
const postData = async ( url = '', data = {}) => {
      const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data),
    });

      try {
        const newData = await response.json();
        return newData;
      } catch(error) {
        console.log(`Error: ${error}`);
      }
  }

//   asyncfuntion to get the api results and process into json and then store on the server side
const getWeatherData = async (url) => {
    const respond = await fetch(url);
    try {
        const data = await respond.json();
        return data;
    } catch(error) {
        console.log(`Error: ${error}`);
    }
}

// Async function for getting the dat by get method on the /all route and updating the UI elements
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const data = await request.json();
        dateDiv.innerHTML = `<p><strong>Date :</strong> ${data.date}</p>`;
        tempDiv.innerHTML = `<p><strong>Temp:</strong> ${data.temp} &#8451;</p>`;
        contentDiv.innerHTML = `<p><strong>Felt this:</strong> ${data.userFeel}</p>`;
        container.classList.add('active');
    } catch(error) {
        console.log(`Error ${error}`);
        dateDiv.innerHTML = `<p style="color: red;">There was Problem with this Error: ${error}</p>`;
        tempDiv.innerHTML = '';
        contentDiv.innerHTML = '';
    }
}

//   Making the generate button active
button.addEventListener('click', (e) => {
    e.preventDefault();
    const zip = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;

    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API}&units=metric`;

    getWeatherData(url)
    .then((data) => {
        // checking if the status code is good then processing the request otherwise inform the user
        if(data.cod == 200){
            const date = new Date(data.dt * 1000);
            const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
            postData('/addData',{zip: zip,date: formattedDate, temp: data.main.temp, userFeel: feeling});

            // If succed then proceed with updating UI
            updateUI();
        } else {
            dateDiv.innerHTML = `<p style="color: red;">Server responded with ${data.cod}.<br> Stating that: ${data.message}</p>`;
            tempDiv.innerHTML = '';
            contentDiv.innerHTML = '';
        }
    });
});