window.addEventListener('load', () => {
   let long;
   let lat;
   let temperatureDescription = document.querySelector('.temperature-description');
   let temperatureDegree = document.querySelector('.temperature-degree');



   if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = Math.round(position.coords.longitude);
            lat = Math.round(position.coords.latitude);

            const api = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${long}/lat/${lat}/data.json`
            
            fetch(api)
                .then(respons => {
                    return respons.json();
                })
                .then(data => {
                    const CurrentWeather = data.timeSeries[0].parameters;
                    const CurrentTemperatureCelcius = CurrentWeather[11].values[0];
                    const WeatherSituationCode = CurrentWeather[18].values[0];
                    let WeatherSituation = null;
                    let Icon = null;
                    
                    if (WeatherSituationCode === 1) { 
                        WeatherSituation="Klart";
                        document.getElementById("icon1").style.visibility="visible";}
                    else if (WeatherSituationCode === 2) { 
                        WeatherSituation="Lätt molnighet";
                        document.getElementById("icon2").style.visibility="visible";}
                    else if (WeatherSituationCode === 3) { 
                        WeatherSituation="Halvklart";
                        document.getElementById("icon3").style.visibility="visible";}
                    else if (WeatherSituationCode === 4) { 
                        WeatherSituation="Molnigt";
                        document.getElementById("icon4").style.visibility="visible";}
                    else if (WeatherSituationCode === 5) { 
                        WeatherSituation="Mycket moln";
                        document.getElementById("icon5").style.visibility="visible";}
                    else if (WeatherSituationCode === 6) { 
                        WeatherSituation="Mulet";
                        document.getElementById("icon6").style.visibility="visible";}
                    else if (WeatherSituationCode === 7) { 
                        WeatherSituation="Dimma";
                        document.getElementById("icon7").style.visibility="visible";}
                    else if (WeatherSituationCode === 8) { 
                        WeatherSituation="Lätt regnskur";
                        document.getElementById("icon8").style.visibility="visible";}
                    else if (WeatherSituationCode === 9) { 
                        WeatherSituation="Regnskur";
                        document.getElementById("icon9").style.visibility="visible";}
                    else if (WeatherSituationCode === 10) { 
                        WeatherSituation="Kraftig regnskur";
                        document.getElementById("icon10").style.visibility="visible";}
                    else if (WeatherSituationCode === 11) { 
                        WeatherSituation="Åskskur";
                        document.getElementById("icon11").style.visibility="visible";}
                    else if (WeatherSituationCode === 12) { 
                        WeatherSituation="Lätt by av regn och snö";
                        document.getElementById("icon12").style.visibility="visible";}
                    else if (WeatherSituationCode === 13) { 
                        WeatherSituation="By av regn och snö";
                        document.getElementById("icon13").style.visibility="visible";}
                    else if (WeatherSituationCode === 14) { 
                        WeatherSituation="Kraftig by av regn och snö";
                        document.getElementById("icon14").style.visibility="visible";}
                    else if (WeatherSituationCode === 15) { 
                        WeatherSituation="Lätt snöby";
                        document.getElementById("icon15").style.visibility="visible";}
                    else if (WeatherSituationCode === 16) { 
                        WeatherSituation="Snöby";
                        document.getElementById("icon16").style.visibility="visible";}
                    else if (WeatherSituationCode === 17) { 
                        WeatherSituation="Kraftig snöby";
                        document.getElementById("icon17").style.visibility="visible";}
                    else if (WeatherSituationCode === 18) { 
                        WeatherSituation="Lätt regn";
                        document.getElementById("icon18").style.visibility="visible";}
                    else if (WeatherSituationCode === 19) { 
                        WeatherSituation="Regn";
                        document.getElementById("icon19").style.visibility="visible";}
                    else if (WeatherSituationCode === 20) { 
                        WeatherSituation="Kraftigt regn";
                        document.getElementById("icon20").style.visibility="visible";}
                    else if (WeatherSituationCode === 21) { 
                        WeatherSituation="Åska";
                        document.getElementById("icon21").style.visibility="visible";}
                    else if (WeatherSituationCode === 22) { 
                        WeatherSituation="Lätt snöblandat regn";
                        document.getElementById("icon22").style.visibility="visible";}
                    else if (WeatherSituationCode === 23) { 
                        WeatherSituation="Snöblandat regn";
                        document.getElementById("icon23").style.visibility="visible";}
                    else if (WeatherSituationCode === 24) { 
                        WeatherSituation="Kraftigt snöblandat regn";
                        document.getElementById("icon24").style.visibility="visible";}
                    else if (WeatherSituationCode === 25) { 
                        WeatherSituation="Lätt snöfall";
                        document.getElementById("icon25").style.visibility="visible";}
                    else if (WeatherSituationCode === 26) { 
                        WeatherSituation="Snöfall";
                        document.getElementById("icon26").style.visibility="visible";}
                    else if (WeatherSituationCode === 27) { 
                        WeatherSituation="Ymnigt snöfall";
                        document.getElementById("icon27").style.visibility="visible";}
                    else { 
                        WeatherSituation="Saknar data för sammanfattning";}

                    temperatureDegree.textContent = CurrentTemperatureCelcius;
                    temperatureDescription.textContent = WeatherSituation;

                });

        });
   }

});