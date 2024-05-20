let btn = document.querySelector('button')
let input = document.querySelector('input')
let city = document.querySelector('.city')
let temp = document.querySelector('.temp')
let desc = document.querySelector('.desc')
let weather = document.querySelector('.weather__out')



btn.addEventListener('click',(e)=>{
    e.preventDefault()
    weather.innerHTML=''
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=5867d88ceb8b86174a687db068ee442a`)
    .then((res)=>res.json())
    .then((data)=>{
        let weather__back = data.weather[0].main
        console.log(weather__back);
        if(weather__back === 'Rain'){
         weather.style.background = "url('https://www.freevector.com/uploads/vector/preview/7040/FreeVector-Rain-Background.jpg')center/cover"
        }
        else if(weather__back === "Clouds"){
         weather.style.background = "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc5NHa-XQheD3lZJeKYUY30XRP4_4H4MhHkDPeMios5A&s)center/cover"
        }
        else{
            let back = data.weather[0].icon.slice(2)
       if(back ==='n'){
        weather.style.background = "url('https://img.freepik.com/free-vector/gradient-sunrise-starry-night-background_23-2148273605.jpg?size=626&ext=jpg&ga=GA1.1.1369675164.1715472000&semt=ais_user')center/cover"
       }
       else if(back === 'd'){
        weather.style.background = 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLh0woKe1gRMnVFJ7dSPbprmQ9hhFzVdvBNg&s")center/cover'
       }
        }

    const NowTimeTamp = data.dt 
    const NowTimeMin = Math.round(NowTimeTamp/60)%60
    const NowTimeHours = Math.round((NowTimeTamp/3600)%24)
    let GTM = data.timezone/3600
    let nowGTM = (NowTimeHours + GTM)%24
    console.log(NowTimeHours);
    if(nowGTM < 0){
        nowGTM += 24
    }
    if(nowGTM < 10){
        nowGTM = `0${nowGTM}`
    }
    if(NowTimeMin < 10){
        NowTimeMin.textContent = `0+nowTime`
    }
    let nowTime = `${nowGTM}:${NowTimeMin}`
    // console.log(nowTime);

    //voshod
    const sunriseTimeTamp = data.sys.sunrise
    const sunriseMin = Math.floor(sunriseTimeTamp/60)%60
    const sunriseHours = Math.floor((sunriseTimeTamp/3600)%24)

    
    let sunriseHoursGTM = (sunriseHours + GTM)%24
    if(sunriseHoursGTM < 0){
        sunriseHoursGTM += 24
    }
    if(sunriseHoursGTM < 10){
        sunriseHoursGTM = `0${sunriseHoursGTM}`
    }
    if(sunriseMin < 10){
        sunriseMin = `0${sunriseMin}`
    }
    let sunriseTime = `${sunriseHoursGTM}:${sunriseMin}`

    //zakat
    const sunsetTimeTamp = data.sys.sunset
    const sunsetMin = Math.floor(sunsetTimeTamp/60)%60
    const sunsetHours = Math.floor((sunsetTimeTamp/3600)%24)

    let sunsetHoursGTM = (sunsetHours + GTM)%24
    if(sunsetHoursGTM < 0){
        sunriseHoursGTM += 24
    }
    if(sunriseHoursGTM < 10){
        sunriseHoursGTM = `0${sunsetHoursGTM}`
    }
    if(sunsetMin < 10){
        sunsetMin = `0${sunsetMin}`
    }
    let sunsetTime = `${sunsetHoursGTM}:${sunsetMin}`
    console.log(sunriseTime);
    console.log(sunsetTime);
    console.log(data);

        weather.innerHTML = `
        <div class="weather__top">
        <div class="weather__left">
            <h3>Current</h3>
            <h3 class="city">${data.name}</h3>
        </div>
        <div>
        <h2 class="temp">${Math.round(data.main.temp - 273.15)} °C</h2>
        <p></p>
        </div>
    </div>
    <div class="weather__icon">
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
    </div>
    <h1 class="desc">${data.weather[0].description}</h1>
    <div class="weather__bottom">
        <div class="weather__card">
            <p>Feels like:${Math.round(data.main.feels_like -273.15)}°C</p>
            
        </div>
        <div class="weather__card">
            <p>High:${Math.round(data.main.temp_max - 273.15)} °C</p>
            <p>Low:${Math.round(data.main.temp_min - 273.15)} °C</p>
        </div>
        <div class="weather__card">
            <p>Wind:${data.wind.speed}</p>
            <p>Time:${nowTime}</p>
        </div>
        <div class="weather__card">
            <p>Sunrise:${sunriseTime}</p>
            <p>Sunset:${sunsetTime}</p>
        </div>
    </div>
        `

    })
})
