// Main javascript file

$(document).ready(function() {
  exampleFunction();
  getProducts();
});


function exampleFunction() {
  console.log("App runs.");
}

function showAllProducts(){
  var isopen = false;
  if(document.getElementById("showProducts") != null){
  document.getElementById("showProducts").addEventListener("click", function(){
    if(!isopen){
      document.getElementById("showProducts").firstChild.style.transform = "rotate(270deg)";
      document.getElementById("moreProducts").style.maxHeight = 2000 + "px";
      setTimeout(function(){
        document.getElementById("moreProducts").style.overflow = "unset";
      },500);
      isopen = true;
    }
    else{
      document.getElementById("showProducts").firstChild.style.transform = "rotate(90deg)";
      document.getElementById("moreProducts").style.maxHeight = 0 + "px";
      document.getElementById("moreProducts").style.overflow = "hidden";
      isopen = false;
    }
  });
}
}

function loadMap(){
  var mapOptions = {
    center: new google.maps.LatLng(48.635896, 21.714897),
    zoom: 15,
    mapTypeControl: false,
    fullscreenControl:false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  loadJSON(function(response) {
		var loaded_json = JSON.parse(response);
		var styledMapType = new google.maps.StyledMapType(loaded_json, {name: "Map"});

		map.mapTypes.set("styled_map", styledMapType);
		map.setMapTypeId("styled_map");
	});

	function loadJSON(callback) {
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open("GET", window.location.origin + "/assets/js/map.json", true);
		xobj.onreadystatechange = function () {
			if (xobj.readyState == 4 && xobj.status == "200") {
				callback(xobj.responseText);
			}
		};
		xobj.send(null);
	}

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

$('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});
var _baseURL = window.location.protocol + "//" + window.location.host;
function getProducts(){
  console.log("bezim");
  var xobj = new XMLHttpRequest();
		xobj.open("GET", window.location.origin + "/product/", true);
		xobj.onreadystatechange = function () {
			if (xobj.readyState == 4 && xobj.status == "200") {
			 console.log(xobj.response);
			}
		};
		xobj.send(null);
}