function onPageLoad(){
    console.log("document loaded");
    var url = 'http://127.0.0.1:5000/get_location_names';
    $.get(url,function(data, status){
        console.log("got response for get_location_names request");
        if(data){
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations){
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

function onClickedEstimatePrice(){

}

window.onload = onPageLoad;


function getBathValue() {
    const uiBath = document.getElementsByName("uiBath");
    for (let i = 0; i < uiBath.length; i++) {
        if (uiBath[i].checked) {
            return parseInt(uiBath[i].value);
        }
    }
    return -1; // Invalid
}

function getBHKValue() {
    const uiBHK = document.getElementsByName("uiBHK");
    for (let i = 0; i < uiBHK.length; i++) {
        if (uiBHK[i].checked) {
            return parseInt(uiBHK[i].value);
        }
    }
    return -1; // Invalid
}

function onClickedEstimatePrice() {
    console.log("Estimated price button clicked.")
    const sqft = document.getElementById("uiSqft").value;
    const bhk = getBHKValue();
    const bath = getBathValue();
    const location = document.getElementById("uiLocations").value;
    const estPrice = document.getElementById("uiEstimatedPrice");

    const url = "http://localhost:5000/predict_home_price";

    $.post(url, {
        total_sqft: sqft,
        bhk: bhk,
        bath: bath,
        location: location
    }, function(data, status) {
        estPrice.innerHTML = "<h2>" + data.estimated_price.toFixed(2) + " Lakh</h2>";
    }).fail(function(xhr, status, error) {
        estPrice.innerHTML = "<h2 style='color:red;'>Error fetching price</h2>";
        console.error("Error: ", error);
    });
}
