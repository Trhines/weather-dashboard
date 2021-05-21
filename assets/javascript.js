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

    if(parsedHistory.length > 10){
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
            document.getElementById("name").textContent = data.name
            document.getElementById("temp").textContent = "Tepmerature: " + data.main.temp + "\u00B0F"
            document.getElementById("humidity").textContent = "Humidity: " + data.main.humidity + "%"
            document.getElementById("wind").textContent = "Wind Speed: " + data.wind.speed + " mph"   
        })

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=imperial&appid=ffbfb6b231b2c20b9f38afc1cec77543`)
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
            //running a for loop through this data melted my laptop, but hard coding didnt. ¯\_(ツ)_/¯
            console.log("second API")
            //`http://openweathermap.org/img/w/${data.list[2].weather[0].icon}.png`
            console.log(data.list[2].dt_txt)
            console.log(data.list[2].main.temp)
            console.log(data.list[2].main.humidity)

            console.log(data.list[8].dt_txt)
            console.log(data.list[8].main.temp)
            console.log(data.list[8].main.humidity)

            console.log(data.list[16].dt_txt)
            console.log(data.list[16].main.temp)
            console.log(data.list[16].main.humidity)

            console.log(data.list[2].dt_txt)
            console.log(data.list[2].main.temp)
            console.log(data.list[2].main.humidity)

            console.log(data.list[2].dt_txt)
            console.log(data.list[2].main.temp)
            console.log(data.list[2].main.humidity)    
        })
}

function dipslayInfo(){

}

onRefresh()
