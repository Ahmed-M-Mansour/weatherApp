//Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=206f9197b0601deb5e4191bab2527655&units=imperial';
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', getWeatherAppData);
/* Function called by event listener */
function getWeatherAppData(e) 
{
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  if (zipCode === '' || isNaN(zipCode)) 
  {
    alert('please enter valid zip code')
  } else {
    getdata(baseURL, zipCode, apiKey).then(function (data) 
    {
      if (data) 
      {
        postData('/postRoute', 
        {
          temp: data.main.temp,
          feelings: feelings,
          date: newDate
        })
        updateUI()
      }
    })
  }
}
/* Function to GET Web API Data*/
const getdata = async (baseURL, zip, apiKey) => 
{
  console.log(baseURL + zip + apiKey)
  const response = await fetch(baseURL + zip + apiKey);
  const data = await response.json();
  if (data.cod != 200)
   {
    alert(`sorry ${data.message}`);
    date.innerHTML = `Date :`
    temp.innerHTML = `Temp:`
    content.innerHTML = `Content: `
  } else 
  {
    try 
    {
      return data
    } catch (error) 
    {
      console.log('Error in getdata function', error);
    }
  }
}
/* Function to POST data */
const postData = async (url = '', data = {}) => 
{
  const response = await fetch(url,
     {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });
  try 
  {
    const newPData = await response.json();
    return newPData;
  } catch (error) 
  {
    console.log("error in postdata function", error);
  }
}
/* Function to GET Project Data */
const updateUI = async () => 
{
  const res = await fetch('/getRoute');
  try 
  {
    const allD = await res.json();
    date.innerHTML = ` Date: ${allD.date}`;
    temp.innerHTML = `Temp: ${allD.temp}`;
    content.innerHTML = `Content: ${allD.feelings}`
  } catch (error)
  {
    console.log("error in update ui function", error);
  }
}
