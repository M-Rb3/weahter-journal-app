/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
let APIkey = '994462fe818ec2383a1f5e5da2a2455b'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// getting Data from the web API
const btn = document.getElementById('generate');
btn.addEventListener('click', performAction)

function performAction(e){
  const zipcode = document.getElementById('zip').value
  const feelings = document.getElementById('feelings').value
  getData(baseURL+zipcode+`&appid=${APIkey}&units=metric`)
  .then(function(data){
    // add data to the server side end-point
    console.log(data)
    try {
      postData('/addInfo',{date:newDate, temp:data.main.temp, feelings:feelings} )
    } catch (e) {
      alert('please make sure you enterd a correct zip code.')
    }

    updateUI()
  }
)}

const getData = async (URL)=>{
  const res = await fetch(URL)
  try {
    const data = await res.json();
    console.log(data)
    return data
  } catch(error){
    console.log('error',error);
  }
}

const postData = async ( url = '', data = {})=>{
    console.log(data);
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
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

// updating UI with the new info
const updateUI = async () => {
  const request = await fetch('all')
  try{
    const allData = await request.json()
    console.log(allData);

    document.getElementById('date').innerHTML += allData['date']
    document.getElementById('temp').innerHTML += allData['temp']
    document.getElementById('content').innerHTML = allData['feelings']

  }catch(error){
    console.log('error',error)
    alert('please make sure you enterd a correct zip code.')
  }
}
