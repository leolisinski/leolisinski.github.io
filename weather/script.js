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
                        }
                    else if (WeatherSituationCode === 2) { 
                        WeatherSituation="Lätt molnighet";}
                    else if (WeatherSituationCode === 3) { 
                        WeatherSituation="Halvklart";}
                    else if (WeatherSituationCode === 4) { 
                        document.getElementById("icon4").style.visibility="visible";
                        WeatherSituation="Molnigt";}
                    else if (WeatherSituationCode === 5) { 
                        WeatherSituation="Mycket moln";}
                    else if (WeatherSituationCode === 6) { 
                        WeatherSituation="Mulet";}
                    else if (WeatherSituationCode === 7) { 
                        WeatherSituation="Dimma";}
                    else if (WeatherSituationCode === 8) { 
                        WeatherSituation="Lätt regnskur";}
                    else if (WeatherSituationCode === 9) { 
                        WeatherSituation="Regnskur";}
                    else if (WeatherSituationCode === 10) { 
                        WeatherSituation="Kraftig regnskur";}
                    else if (WeatherSituationCode === 11) { 
                        WeatherSituation="Åskskur";}
                    else if (WeatherSituationCode === 12) { 
                        WeatherSituation="Lätt by av regn och snö";}
                    else if (WeatherSituationCode === 13) { 
                        WeatherSituation="By av regn och snö";}
                    else if (WeatherSituationCode === 14) { 
                        WeatherSituation="Kraftig by av regn och snö";}
                    else if (WeatherSituationCode === 15) { 
                        WeatherSituation="Lätt snöby";}
                    else if (WeatherSituationCode === 16) { 
                        WeatherSituation="Snöby";}
                    else if (WeatherSituationCode === 17) { 
                        WeatherSituation="Kraftig snöby";}
                    else if (WeatherSituationCode === 18) { 
                        WeatherSituation="Lätt regn";}
                    else if (WeatherSituationCode === 19) { 
                        WeatherSituation="Regn";}
                    else if (WeatherSituationCode === 20) { 
                        WeatherSituation="Kraftigt regn";}
                    else if (WeatherSituationCode === 21) { 
                        WeatherSituation="Åska";}
                    else if (WeatherSituationCode === 22) { 
                        WeatherSituation="Lätt snöblandat regn";}
                    else if (WeatherSituationCode === 23) { 
                        WeatherSituation="Snöblandat regn";}
                    else if (WeatherSituationCode === 24) { 
                        WeatherSituation="Kraftigt snöblandat regn";}
                    else if (WeatherSituationCode === 25) { 
                        WeatherSituation="Lätt snöfall";}
                    else if (WeatherSituationCode === 26) { 
                        WeatherSituation="Snöfall";}
                    else if (WeatherSituationCode === 27) { 
                        WeatherSituation="Ymnigt snöfall";}
                    else { 
                        WeatherSituation="Saknar data för sammanfattning";}

                    temperatureDegree.textContent = CurrentTemperatureCelcius;
                    temperatureDescription.textContent = WeatherSituation;

                });

        });
   }

});