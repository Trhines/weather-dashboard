//get input from search bar
//store searches in local storage
//populate search histrory, should function as buttons
//dynamic api call based on searches



searchBar = document.getElementById("search")
searchBtn = document.getElementById("searchBtn")


searchBtn.addEventListener('click', (event) =>{
    event.preventDefault()
    input = searchBar.value.trim()
    
    if(input != ""){
        console.log("user is searching for " + input)
        updateHistory(input)
        callApi(input)
    }
    
    else{console.log("no search added"); return}

})


//this code runs every refresh
function onRefresh(){
    if(localStorage.getItem('history')){
        
    }
    else{
    var searches = []
    console.log(JSON.stringify(searches))
    localStorage.setItem('history', JSON.stringify(searches))
    
    }
    let history = localStorage.getItem('history')
    populateList(JSON.parse(history))
    
}


//appnds new search entry to array in local storage
function updateHistory(search){
    console.log("updating search history")
    rawHistory = localStorage.getItem('history')
    parsedHistory = JSON.parse(rawHistory)
    parsedHistory.unshift(search)

    if(parsedHistory.length > 9){
        parsedHistory.pop()
        console.log("Removed last item from search history")
    }

    populateList(parsedHistory)

    localStorage.setItem('history', JSON.stringify(parsedHistory))
}


//creates search history list, first deletes current list, then repopulates from "history" in local.
//deleting avoids having items appear in the wrong order
function populateList(array){
    console.log("populating list")
    list = document.getElementById("searchList")

    while(list.firstChild){
        list.removeChild(list.lastChild)
    }

    array.forEach((element) => {
        let newLi = document.createElement('li')

        newLi.classList.add("list-group-item")
        newLi.classList.add("hover-shadow")
        newLi.textContent = element

        list.appendChild(newLi)

        newLi.addEventListener('click', function(){
            console.log("searching from history")
            console.log(this.textContent)
            callApi(this.textContent)
        })
    })
}


//converts unix to readable date
function getDate(unixTimeStamp){
    console.log("formatting date")
    milliseconds = unixTimeStamp * 1000
    const dateObject = new Date(milliseconds)
    const month = dateObject.toLocaleString("en-US", {month: "numeric"})
    const day = dateObject.toLocaleString("en-US", {day: "numeric"})
    const year = dateObject.toLocaleString("en-US", {year: "numeric"})
    return month+"/"+day+"/"+year
}

function callApi(search){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=imperial&appid=ffbfb6b231b2c20b9f38afc1cec77543`)
        .then(function (response) {
            if (response.status !== 200) {
                alert("error." + response.status);
                location.reload()
            } 
            else {
                return response.json()
            }
        })
        .then(function (data){
            console.log("lat "+data.coord.lat)
            console.log("lon "+data.coord.lon)
            oneCallApi(data.coord.lat, data.coord.lon)
            document.getElementById("name").textContent = data.name
        })
}

function oneCallApi(lat, lon){
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alert&appid=ffbfb6b231b2c20b9f38afc1cec77543`)
        .then(function (response) {
            if (response.status !== 200) {
                alert("error." + response.status);
                location.reload()
            } 
            else {
                return response.json()
            }
            return response.json()
        })
        .then(function (data){
            let uvi = data.current.uvi
            //let uvi = 9
            console.log("secondAPI")
            console.log(data)

            //populates the jumbotron
            document.getElementById("current-date").textContent = " " + getDate(data.current.dt)
            document.getElementById("temp").textContent = "Tepmerature: " + data.current.temp + "\u00B0F"
            document.getElementById("humidity").textContent = "Humidity: " + data.current.humidity + "%"
            document.getElementById("wind").textContent = "Wind Speed: " + data.current.wind_speed + " mph" 
            document.getElementById("uv").textContent = "UV: "
            document.getElementById("uvi").textContent = uvi
            document.getElementById("current-img").src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`
                if(uvi<2){
                  document.getElementById("uvi").classList.add('green')
                  document.getElementById("uvi").classList.remove('yellow')
                  document.getElementById("uvi").classList.remove('red')
                }
                else if(uvi > 2 && uvi < 7){
                  document.getElementById("uvi").classList.add('yellow')
                  document.getElementById("uvi").classList.remove('green')
                  document.getElementById("uvi").classList.remove('red')
                }
                else if(uvi>7){
                  document.getElementById("uvi").classList.add('red')
                  document.getElementById("uvi").classList.remove('yellow')
                  document.getElementById("uvi").classList.remove('green')
                }
    
            
            //populates cards

            document.getElementById("date-1").textContent = getDate(data.daily[1].dt)
            document.getElementById("img-1").src = `http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}.png`
            document.getElementById("temp-1").textContent = "Tepmerature " + data.daily[1].temp.day + "\u00B0F"
            document.getElementById("hu-1").textContent = "Humidity " + data.daily[1].humidity + "%"

            document.getElementById("date-2").textContent = getDate(data.daily[2].dt)
            document.getElementById("img-2").src = `http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}.png`
            document.getElementById("temp-2").textContent = "Tepmerature: " + data.daily[2].temp.day + "\u00B0F"
            document.getElementById("hu-2").textContent = "Humidity: " + data.daily[2].humidity + "%"

            document.getElementById("date-3").textContent = getDate(data.daily[3].dt)
            document.getElementById("img-3").src = `http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}.png`
            document.getElementById("temp-3").textContent = "Tepmerature " + data.daily[3].temp.day + "\u00B0F"
            document.getElementById("hu-3").textContent = "Humidity " + data.daily[3].humidity + "%"

            document.getElementById("date-4").textContent = getDate(data.daily[4].dt)
            document.getElementById("img-4").src = `http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}.png`
            document.getElementById("temp-4").textContent = "Tepmerature " + data.daily[4].temp.day + "\u00B0F"
            document.getElementById("hu-4").textContent = "Humidity " + data.daily[4].humidity + "%"

            document.getElementById("date-5").textContent = getDate(data.daily[5].dt)
            document.getElementById("img-5").src = `http://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}.png`
            document.getElementById("temp-5").textContent = "Tepmerature " + data.daily[5].temp.day + "\u00B0F"
            document.getElementById("hu-5").textContent = "Humidity " + data.daily[5].humidity + "%"


    })

}

    




onRefresh()






