const wrapper = document.querySelector('.wrapper');
inputPart = wrapper.querySelector('.input-part');
infoTxt = wrapper.querySelector('.info-txt');
inputField = wrapper.querySelector('input');
locationBtn = inputPart.querySelector('Button');
wIcon = document.querySelector(".weather-part img");
arrowBack = document.querySelector('header i')

let apiKey = '140c6bfe7764bd65f42c300f362fa385'; //OpenWeather API

let apiURL;


inputField.addEventListener('keyup', function (e) {
      //if user pressed Enter and input field is not empty
      if (e.key == 'Enter' && inputField.value != "") {
            requestApi(inputField.value);
      }
});

//location
locationBtn.addEventListener('click', function () {
      if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
      } else {
            alert("Your brwoser does not support Geolocation api");
      }
});

function onSuccess(position) {
      console.log(position);
      const { latitude, longitude } = position.coords; //getting lat and lon
      apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      fetchData(apiURL);
}

function onError(error) {
      // console.log(error);
      infoTxt.innerText = error.message;
      infoTxt.classList.add("error");
}


function requestApi(city) {
      apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      fetchData(apiURL);
}

function fetchData(api) {
      infoTxt.innerText = "Getting Details Wait...";
      infoTxt.classList.add("pending");
      fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
      //   console.log(info);
      infoTxt.classList.replace("pending", "error");
      if (info.cod == "404") {
            infoTxt.innerText = `${inputField.value} is not valid`;
      } else {
           //lets get required property from the infor

           const city = info.name;
           const country = info.sys.country;
           const {description, id} = info.weather[0];
           const {feels_like, humidity, temp} = info.main;

            //setup icon image based on id
           if(id == 800){
            wIcon.src = 'Icons/clear.svg';
           } else if(id >= 200 && id <=232){
            wIcon.src = 'Icons/storm.svg';
           }else if(id >= 600 && id <=622){
            wIcon.src = 'Icons/snow.svg';
           }else if(id >= 700 && id <=781){
            wIcon.src = 'Icons/haze.svg';
           }else if(id >= 801 && id <=804){
            wIcon.src = 'Icons/cloud.svg';
           } else if((id >= 300 && id <=321) || (id >= 500 && id <=531)){
            wIcon.src = 'Icons/rain.svg';
           }

           //let pass this value to particular html element

           wrapper.querySelector('.temp .numb').innerText = Math.floor(temp);
           wrapper.querySelector('.weather').innerText = description;
           wrapper.querySelector('.location span').innerText = `${city}, ${country}`;
           wrapper.querySelector('.temp .numb-2').innerText = Math.floor(feels_like);
           wrapper.querySelector('.humidity span').innerText = `${humidity}%`;

            infoTxt.classList.remove("pending", "error");
            wrapper.classList.add('active');
      }
}

//arrowback 

arrowBack.addEventListener('click',(e) => {
   wrapper.classList.remove('active');
});