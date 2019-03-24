// Main javascript file
var map = null;
var marker = null;
var markerJumped = false;
var googleScriptLoaded = false;
var products = [{}];
var intervalId = null;
var intervalStarted = false;
var choosedProduct = {};
var orderObject = [];
var getOrderObjectFromStorage = localStorage.getItem("orderObject");
var orderObjectFromStorage = JSON.parse(getOrderObjectFromStorage);
var orderInProgress = {
  title:"",
  isSterile:false,
  package:1,
  boxSize:1, 
  boxCount:0,
  id:""
};
var socket = null;
var container;
  var itemsHolder;
  var itemsWrapper;
  var itemsCount;
  var itemsNodes;

// timer variables
var timer = 0;
var start = true;     // flags that you want the countdown to start
var stopIn = 1000;    // how long the timer should run
var stopTime = 0;     // used to hold the stop time
var stop = false;     // flag to indicate that stop time has been reached
var timeTillStop = 0; // holds the display time

/*$(document).ready(function() {
  revealProducts();
  scrollPage();
});*/

window.onload = function () {
  revealProducts();
  scrollPage();
  getProducts();
  if (window.location.href.indexOf("online-objednavka") < 0) {
    setTimeout(startCounter, 1000);
  }
  container = $("#pills-tabContent").find(".active");
  itemsHolder = container.find(".productRowContainer");
  itemsWrapper = itemsHolder[0].children[0];
  console.log(container);
  console.log(itemsHolder);
  itemsCount = itemsWrapper.childElementCount;   // show("slow");  addClass("active");
  itemsNodes = itemsWrapper.childNodes;
  for(i = 0; i<itemsNodes.length; i++){
    if(i < 4){
      $(itemsNodes[i]).show("slow");
    }
    else{
      $(itemsNodes[i]).hide("slow");
    }
  }
}

function updateItemsHolder(){
  
  setTimeout(function () {
  container = $("#pills-tabContent").find(".active");
  itemsHolder = container.find(".productRowContainer");
  itemsWrapper = itemsHolder[0].children[0];
  itemsCount = itemsWrapper.childElementCount;   // show("slow");  addClass("active");
  itemsNodes = itemsWrapper.childNodes;
  },400)
}

function revealProducts() {
  $(".productShowAllContainer > button").on("click", function(e) {
    var showAllProductsBtn = e.currentTarget;
    var btnIcon = $(showAllProductsBtn).find("i");
    var paragraph = $(showAllProductsBtn).parent(".productShowAllContainer").find("p");
    
    setTimeout(function () {
      
      if (btnIcon.hasClass("fa-caret-down")) {
        
        console.log(itemsNodes);
        for(i = 0; i<itemsNodes.length; i++){
          $(itemsNodes[i]).show("slow");
        }
        btnIcon.removeClass("fa-caret-down").addClass("fa-caret-up");
        paragraph.html("Zobraziť menej");
      } else {
       // $("#orderProduct").find(".productRowContainer:nth-child(2), .productRowContainer:nth-child(3)").hide("slow"); // removeClass("active");
        
        for(i = 0; i<itemsNodes.length; i++){
          if(i < 4){
            $(itemsNodes[i]).show("slow");
          }
          else{
            console.log("hidujem");
            $(itemsNodes[i]).hide("slow");
          }
        }
        btnIcon.removeClass("fa-caret-up").addClass("fa-caret-down");
        paragraph.html("Zobraziť všetky produkty");
      }
    }, 10);
  });
}

function goto(param){
  // $('html, body').animate({scrollTop:$(param).position().top-120}, 'slow');
  scrollIt(document.querySelector(param), 600, "easeOutQuad");
}

function loadMap() {
  var latlng = {lat: 48.726010, lng: 21.289790};
  var mapOptions = {
    center: new google.maps.LatLng(latlng.lat, latlng.lng),
    disableDefaultUI: true,
    zoom: 15,
    mapTypeControl: false,
    fullscreenControl:false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var markerIcon = {
    url: window.location.origin + "/assets/images/icons/logofooter.png",
    scaledSize: new google.maps.Size(42, 60),
    labelOrigin: new google.maps.Point(21, 80),
    labelAnchor: new google.maps.Point(0, 0)
  };

  marker = new google.maps.Marker({
    position: latlng,
    animation: google.maps.Animation.DROP,
    icon: markerIcon,
    label: { color: "#0669bb", fontWeight: "bold", fontSize: '14px', text: "Tonap s. r. o." },
    map: map
  });

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

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
}

function scrollPage() {
  window.addEventListener("scroll", function (e) {
    var pY = window.pageYOffset;

    if (pY >= 580) {
      if (intervalStarted) {
        start = true;
        stop = true;
        stopTime = timer + stopIn;
        timeTillStop = stopTime - timer;
        cancelAnimationFrame(intervalId);
        intervalId = null;
        /*clearInterval(intervalId);
        intervalId = null;*/
      }
    } else {
      if (intervalStarted && intervalId === null) {
        counterInterval();
      }
    }
    if (pY >= 950) {
      if (this.document.getElementById("map")) {
        if (map === null && !googleScriptLoaded) {
          var googleScript = document.createElement("script");
          googleScriptLoaded = true;
          
          googleScript.onload = function () {};
          googleScript.async = true;
          googleScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBGuAMy2poB-W_gNCuKoKejHIh3LeyDZ_E&callback=loadMap";
          
          // document.body.append(googleScript);
          this.document.body.insertBefore(
            googleScript,
            document.body.getElementsByTagName("script")[document.body.getElementsByTagName("script").length - 1]
          );
        }
        if (pY >= 1125) {
          if (marker && map && googleScriptLoaded && !markerJumped) {
            marker.setMap(map);
            markerJumped = true;
          }
        }
      }
    }
  });
}

function startCounter() {
  function animateValue(id, start, end, duration) {
    // assumes integer values for start and end
    
    var obj = document.getElementById(id);
    var range = end - start;
    // no timer shorter than 50ms (not really visible any way)
    var minTimer = 50;
    // calc step time to show all interediate values
    var stepTime = Math.abs(Math.floor(duration / range));
    
    // never go below minTimer
    stepTime = Math.max(stepTime, minTimer);
    
    // get current time and calculate desired end time
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;
  
    function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(end - (remaining * range));
        var number = Math.ceil(value);
        var output = number.toLocaleString("en-EG");
        obj.innerHTML = output;
        if (value == end) {
            clearInterval(timer);
        }
    }
    
    timer = setInterval(run, stepTime);
    run();
  }

  animateValue("count-1", 3297585, 12000000, 4000);
  setTimeout(function () {animateValue("count-2", 3297585, 9000000, 3500);}, 500);
  setTimeout(function () {animateValue("count-3", 3297585, 3300000, 3000);}, 1000);

  setTimeout(counterInterval, 4100);
}

function counterInterval() {

  // main update function
  function update(timer) {
    timer = timer;
    if (start) {
      stopTime = timer + stopIn;
      
      $(".count").each(function (i, item) {
        var val = parseInt(item.innerHTML.replace(/,/g, ""));
        
        val += 1;
        val = val.toLocaleString("en-EG");
        item.innerHTML = val;
      });
      
      intervalStarted = true;

      start = false;
    } else {
      if(timer >= stopTime) {
        stop = true;
      }
    }

    timeTillStop = stopTime - timer;

    if(!stop){
      requestAnimationFrame(update); // continue animation until stop
    } else {
      start = true;
      stop = false;
      stopTime = 0;
      timeTillStop = 0;
      intervalId = requestAnimationFrame(update);
    }
  }
  intervalId = requestAnimationFrame(update);  // start the animation
}

function getProducts(){
  var xobj = new XMLHttpRequest();
		xobj.open("GET", window.location.origin + "/product/", true);
		xobj.onreadystatechange = function () {
			if (xobj.readyState == 4 && xobj.status == "200") {
       var json = JSON.parse(xobj.response);
       products = json.data;
       fillProducts(products);
       getURL();
			}
		};
		xobj.send(null);
}

function fillProducts(products){
  var orderPage = window.location.pathname.indexOf("online-objednavka") > -1 ? true : false;

  for (var i = 0; i < products.length; i++) {
    if(products[i].category == 1){
      var div = $("<div></div>").addClass("col-lg-3 col-md-6 col-12 text-center cursor-pointer");
      div.attr("onclick", "orderProduct(" + "'" + products[i]._id + "'" + ")")
      var prodHeaderContainer = $("<div class=\"prod-header\"></div>").append("<h6 class=\"font-weight-bold\">" + products[i].title + "</h6>");
      
      $("<img class=\"lazyload\" alt=\"Tonap - " + products[i].title + "\">").attr("data-src", products[i].imageFilesData[0].url).appendTo(div);
      //$("<p></p>").text(products[i].sterile && products[i].notSterile ? "Sterilné/Nesterilné" : products[i].sterile ? "Sterilné" : "Nesterilné").appendTo(div);
      prodHeaderContainer.appendTo(div);
      $("<p></p>").text("Cena / TODO").appendTo(div);
      // $("<h6 class=\"font-weight-bold\"></h6>").text(products[i].title).appendTo("<div class=\"prod-header\"></div>").appendTo(div);
      //$("<button></button>").text(orderPage ? "Objednať" : "Detail produktu").attr("onclick", "orderProduct(" + "'" + products[i]._id + "'" + ")").appendTo(div);
      div.appendTo("#productKelimky");
    }
    if(products[i].category == 2){
      var div = $("<div></div>").addClass("col-lg-3 col-md-6 col-12 text-center cursor-pointer");
      div.attr("onclick", "orderProduct(" + "'" + products[i]._id + "'" + ")")
      var prodHeaderContainer = $("<div class=\"prod-header\"></div>").append("<h6 class=\"font-weight-bold\">" + products[i].title + "</h6>");
      
      $("<img class=\"lazyload\" alt=\"Tonap - " + products[i].title + "\">").attr("data-src", products[i].imageFilesData[0].url).appendTo(div);
      //$("<p></p>").text(products[i].sterile && products[i].notSterile ? "Sterilné/Nesterilné" : products[i].sterile ? "Sterilné" : "Nesterilné").appendTo(div);
      prodHeaderContainer.appendTo(div);
      $("<p></p>").text("Cena / TODO").appendTo(div);
      // $("<h6 class=\"font-weight-bold\"></h6>").text(products[i].title).appendTo("<div class=\"prod-header\"></div>").appendTo(div);
      //$("<button></button>").text(orderPage ? "Objednať" : "Detail produktu").attr("onclick", "orderProduct(" + "'" + products[i]._id + "'" + ")").appendTo(div);
      div.appendTo("#productOdberniky");
    }
    if(products[i].category == 3){
      var div = $("<div></div>").addClass("col-lg-3 col-md-6 col-12 text-center cursor-pointer");
      div.attr("onclick", "orderProduct(" + "'" + products[i]._id + "'" + ")")
      var prodHeaderContainer = $("<div class=\"prod-header\"></div>").append("<h6 class=\"font-weight-bold\">" + products[i].title + "</h6>");
      
      $("<img class=\"lazyload\" alt=\"Tonap - " + products[i].title + "\">").attr("data-src", products[i].imageFilesData[0].url).appendTo(div);
      //$("<p></p>").text(products[i].sterile && products[i].notSterile ? "Sterilné/Nesterilné" : products[i].sterile ? "Sterilné" : "Nesterilné").appendTo(div);
      prodHeaderContainer.appendTo(div);
      $("<p></p>").text("Cena / TODO").appendTo(div);
      // $("<h6 class=\"font-weight-bold\"></h6>").text(products[i].title).appendTo("<div class=\"prod-header\"></div>").appendTo(div);
      //$("<button></button>").text(orderPage ? "Objednať" : "Detail produktu").attr("onclick", "orderProduct(" + "'" + products[i]._id + "'" + ")").appendTo(div);
      div.appendTo("#productSkumavky");
    }
  }
}

function orderProduct(id){
  

  for(var i=0; i<products.length;i++){
    if(products[i]._id == id){
      if(document.location.href.indexOf('online-objednavka') < 0) {
        document.getElementById("navigationOrder").innerHTML = "Pridať do košíka";
        choosedProduct = products[i];
        console.log(choosedProduct);
        document.getElementById("productModalMainImage").setAttribute("src",choosedProduct.imageFilesData[0].url);
        document.getElementById("mainTitle").innerHTML = choosedProduct.title;
        //document.getElementById("isSterilized").innerHTML = choosedProduct.sterile && choosedProduct.notSterile ? "Sterilné/Nesterilné" : choosedProduct.sterile ? "Sterilné" : "Nesterilné";
        document.getElementById("productDescription").innerHTML = choosedProduct.description;
        document.getElementById("productHeight").innerHTML = "Výška: " + choosedProduct.height + " mm";
        document.getElementById("productDepth").innerHTML = "Priemer: " + choosedProduct.gauge + " mm";
        document.getElementById("productVolume").innerHTML = "Objem: " + choosedProduct.volume + " ml";
        document.getElementById("productWeight").innerHTML = "Váha: " + choosedProduct.weight + " g";
        document.getElementById("navigationOrder").setAttribute("onclick", "fillOrder(" + "'" + products[i]._id + "'" + ")");
        $("#productModal").modal();
      } else {
        choosedProduct = products[i];
        console.log(choosedProduct);
        document.getElementById("productModalMainImage").setAttribute("src",choosedProduct.imageFilesData[0].url);
        document.getElementById("mainTitle").innerHTML = choosedProduct.title;
        //document.getElementById("isSterilized").innerHTML = choosedProduct.sterile && choosedProduct.notSterile ? "Sterilné/Nesterilné" : choosedProduct.sterile ? "Sterilné" : "Nesterilné";
        document.getElementById("productDescription").innerHTML = choosedProduct.description;
        document.getElementById("productHeight").innerHTML = "Výška: " + choosedProduct.height + " mm";
        document.getElementById("productDepth").innerHTML = "Priemer: " + choosedProduct.gauge + " mm";
        document.getElementById("productVolume").innerHTML = "Objem: " + choosedProduct.volume + " ml";
        document.getElementById("productWeight").innerHTML = "Váha: " + choosedProduct.weight + " g";
        document.getElementById("editOrder").setAttribute("onclick", "fillOrder(" + "'" + products[i]._id + "'" + ")");
        $("#productModal").modal();
      }
    }
  }
}

function showProduct(){
  if($("#orderselect").val()=="kelimky"){
    $("#productKelimky").show();
    $('#productKelimky').css('display', 'flex');
  }
  else{$("#productKelimky").hide();}
  if($("#orderselect").val()=="odberniky"){
    $("#productOdberniky").show();
    $('#productOdberniky').css('display', 'flex');
  }
  else{$("#productOdberniky").hide();}
  if($("#orderselect").val()=="skumavky"){
    $("#productSkumavky").show();
    $('#productSkumavky').css('display', 'flex');
  }
  else{$("#productSkumavky").hide();}
}

function showProductMainpage(){
  if($("#mainselect").val()=="kelimky"){
    $("#productKelimky").show();
    $('#productKelimky').css('display', 'flex');
  }
  else{$("#productKelimky").hide();}
  if($("#mainselect").val()=="odberniky"){
    $("#productOdberniky").show();
    $('#productOdberniky').css('display', 'flex');
  }
  else{$("#productOdberniky").hide();}
  if($("#mainselect").val()=="skumavky"){
    $("#productSkumavky").show();
    $('#productSkumavky').css('display', 'flex');
  }
  else{$("#productSkumavky").hide();}
}

function goToOrder(id){
  window.location = '/online-objednavka?id=' + id;
}

function getURL(){

}

function fillOrder(id){
  orderInProgress.title = document.getElementById("mainTitle").innerHTML;
  orderInProgress.id = id;
  orderInProgress.image = document.getElementById("productModalMainImage").src;
  orderObject.push(orderInProgress);
  console.log(orderObject);
  localStorage.setItem("orderObject", JSON.stringify(orderObject));
  console.log(localStorage.getItem("orderObject"));
  orderInProgress = {};
  $("#productModal").modal("toggle");
}

function updateDetail(){
  
  console.log(orderObjectFromStorage);
  var row;
  document.getElementById("detailOrder").innerHTML = '';
  console.log(orderObjectFromStorage);
  for(var i = 0; i < orderObjectFromStorage.length; i++) {
    var btnDel = document.createElement("button");
    var btnEdit = document.createElement("button");
    var iconDel = document.createElement("i");
    var iconEdit = document.createElement("i"); 

    iconDel.className = "fas fa-trash ml-3" // "fas fa-trash";
    iconEdit.className = "fas fa-pen";
    btnDel.type = "button";
    btnDel.appendChild(iconDel);
    btnDel.setAttribute("onclick", "deleteOrder(" + i + ");");
    btnEdit.type = "button";
    btnEdit.appendChild(iconEdit);
    btnEdit.setAttribute("onclick", "editOrder(" + i + ");");

    var lastCell = document.createElement("td");
    lastCell.className = "text-center";

    row = $("<tr></tr>");
    var tableImage = $("<td class=\"border-left-0\"></td>").appendTo(row);;
    $("<img>").attr("src",orderObjectFromStorage[i].image).appendTo(tableImage);
    $("<td></td>").html(orderObjectFromStorage[i].title).appendTo(row);
    $("<td></td>").html("Varianta").appendTo(row);
    $("<td></td>").html("0,00 €").appendTo(row);
    $("<td class=\"border-left-0\"></td>").html("<span class=\"font-weight-bold\">" + orderObjectFromStorage[i].boxCount + " ks.</span>").appendTo(row);
    $("<td></td>").html("0,00 €").appendTo(row);
    $(lastCell).addClass("border-right-0")
    $(lastCell).append(btnEdit);
    $(lastCell).append(btnDel).appendTo(row);
    row.appendTo(document.getElementById("detailOrder"));
  }
}

function editOrder(param){
  orderProduct(orderObjectFromStorage[param].id);
  document.getElementById("editOrder").innerHTML = "Zmeniť objednávku";
  document.getElementById("editOrder").setAttribute("onclick", "updateOrder(" + param + ")");
}

function updateOrder(param){
  orderObject[param].title = document.getElementById("orderMainTitle").innerHTML;
  if(document.getElementById('sterilizovany').checked){
    orderObject[param].isSterile = true;
  }
  if(document.getElementById('nesterilizovany').checked){
    orderObject[param].isSterile = false;
  }
  orderObject[param].package =  $("input:radio[name='Balenie']:checked").val();
  orderObject[param].boxSize =  $("input:radio[name='Krabica']:checked").val();
  orderObject[param].boxCount = document.getElementById("modalPackageCount").value;
  updateDetail();
  $("#orderModal").modal('toggle');
}

function deleteOrder(param){
  orderObjectFromStorage.splice(param, 1);

  updateDetail();
}

if(typeof io === "function") {
	socket = io();
}

function sendOrder(){
  event.preventDefault(); 

  var billingA = {};
  billingA.city = document.getElementById("companyCity").value;
  billingA.psc = document.getElementById("companyPSC").value;
  billingA.street = document.getElementById("companyAdress").value;

  var deliveryA = {};
  deliveryA.city = document.getElementById("deliveryCity").value;
  deliveryA.psc = document.getElementById("deliveryPSC").value;
  deliveryA.street = document.getElementById("deliveryAdress").value;

  var informationObject = {};
  
  informationObject.billingAddress = billingA;
  informationObject.company = document.getElementById("company").value;
  informationObject.deliveryAddress = deliveryA;
  informationObject.name = document.getElementById("name").value;
  informationObject.email = document.getElementById("email").value;
  informationObject.phone = document.getElementById("phone").value;
  informationObject.ico = document.getElementById("ico").value;
  informationObject.message = document.getElementById("message").value;
  informationObject.products = orderObject;
  var dataToSend = JSON.stringify(informationObject);

  $.ajax({
    type: "POST",
    url: window.location.origin + "/order",
    data: dataToSend,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(msg) {
      socket.emit("order created");
      $(document.getElementById("successOrder")).modal("show");
    },
   });
}

function sendEmail(){
  var contactObject = {};
  event.preventDefault(); 
  contactObject.name = document.getElementById("contactName").value;
  contactObject.email = document.getElementById("contactEmail").value;
  contactObject.subject = document.getElementById("contactSubject").value;
  contactObject.message = document.getElementById("contactMessage").value;
  jsonData = JSON.stringify(contactObject);

  $.ajax({
    type: "POST",
    url: window.location.origin + "/email/send",
    data: jsonData,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(msg) {
      $(document.getElementById("successEmail")).modal("show");
    }
   });
}

function scrollIt(destination, duration, easing, callback) {
  var easings = {
    easeOutQuad: function (t) {
      return t * (2 - t);
    }
  };

  var start = window.pageYOffset;
  var startTime = "now" in window.performance ? performance.now() : new Date().getTime();

  var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName("body")[0].clientHeight;
  var destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop - 90;
  var destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if ("requestAnimationFrame" in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    var now = "now" in window.performance ? performance.now() : new Date().getTime();
    var time = Math.min(1, ((now - startTime) / duration));
    var timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}

if (window.location.href.indexOf("online-objednavka") > 1) {
  updateDetail();
  console.log("online-objednavka");
}