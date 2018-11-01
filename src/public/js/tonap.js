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
var orderInProgress = {
  title:"",
  isSterile:false,
  package:1,
  boxSize:1, 
  boxCount:0,
  id:""
};
var socket = null;

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
  setTimeout(startCounter, 1000);
}

function revealProducts() {
  $(".productShowAllContainer > button").on("click", function(e) {
    var showAllProductsBtn = e.currentTarget;
    var btnIcon = $(showAllProductsBtn).find("i");
    var paragraph = $(showAllProductsBtn).parent(".productShowAllContainer").find("p");
    
    setTimeout(function () {
      if (btnIcon.hasClass("fa-caret-down")) {
        $("#orderProduct").find(".productRowContainer:nth-child(2), .productRowContainer:nth-child(3)").show("slow"); // addClass("active");
        btnIcon.removeClass("fa-caret-down").addClass("fa-caret-up");
        paragraph.html("Zobraziť menej");
      } else {
        $("#orderProduct").find(".productRowContainer:nth-child(2), .productRowContainer:nth-child(3)").hide("slow"); // removeClass("active");
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
  var latlng = {lat: 48.635896, lng: 21.714897};
  var mapOptions = {
    center: new google.maps.LatLng(48.635896, 21.714897),
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
  /*$(".count").each(function () {
    $(this).prop("Counter", 3297585).animate({
      Counter: $(this).text()
    }, {
      duration: 4000,
      easing: 'swing',
      step: function (now) {
        var number = Math.ceil(now);
        var output = number.toLocaleString("en-EG");

        $(this).text(output);
      }
    });
  });*/

  setTimeout(counterInterval, 4100);
}

function counterInterval() {
  /*intervalId = setInterval(function () {
    $(".count").each(function (i, item) {
      var val = parseInt(item.innerHTML.replace(/,/g, ""));
      
      val += 1;
      val = val.toLocaleString("en-EG");
      item.innerHTML = val;
    });
    
    intervalStarted = true;
  }, 1000);*/

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
      var div = $("<div></div>").addClass("col-lg-3 col-md-6 col-12 text-center");
      var prodHeaderContainer = $("<div class=\"prod-header\"></div>").append("<h6 class=\"font-weight-bold\">" + products[i].title + "</h6>");
      
      $("<img class=\"lazyload\" alt=\"Tonap - " + products[i].title + "\">").attr("data-src", products[i].imageFilesData[0].url).appendTo(div);
      $("<p></p>").text(products[i].sterile && products[i].notSterile ? "Sterilné/Nesterilné" : products[i].sterile ? "Sterilné" : "Nesterilné").appendTo(div);
      prodHeaderContainer.appendTo(div);
      // $("<h6 class=\"font-weight-bold\"></h6>").text(products[i].title).appendTo("<div class=\"prod-header\"></div>").appendTo(div);
      $("<button></button>").text(orderPage ? "Objednať" : "Detail produktu").attr("onclick", "orderProduct(" + "'" + products[i]._id + "'" + ")").appendTo(div);
      div.appendTo("#productKelimky");
    }
    if(products[i].category == 2){
      var div = $("<div></div>").addClass("col-lg-3 col-md-6 col-12 text-center");
      var prodHeaderContainer = $("<div class=\"prod-header\"></div>").append("<h6 class=\"font-weight-bold\">" + products[i].title + "</h6>");
      
      $("<img class=\"lazyload\" alt=\"Tonap - " + products[i].title + "\">").attr("data-src", products[i].imageFilesData[0].url).appendTo(div);
      $("<p></p>").text(products[i].sterile && products[i].notSterile ? "Sterilné/Nesterilné" : products[i].sterile ? "Sterilné" : "Nesterilné").appendTo(div);
      prodHeaderContainer.appendTo(div);
      // $("<h6 class=\"font-weight-bold\"></h6>").text(products[i].title).appendTo("<div class=\"prod-header\"></div>").appendTo(div);
      $("<button></button>").text(orderPage ? "Objednať" : "Detail produktu").attr("onclick", "orderProduct(" + "'" + products[i]._id + "'" + ")").appendTo(div);
      div.appendTo("#productOdberniky");
    }
    if(products[i].category == 3){
      var div = $("<div></div>").addClass("col-lg-3 col-md-6 col-12 text-center");
      var prodHeaderContainer = $("<div class=\"prod-header\"></div>").append("<h6 class=\"font-weight-bold\">" + products[i].title + "</h6>");
      
      $("<img class=\"lazyload\" alt=\"Tonap - " + products[i].title + "\">").attr("data-src", products[i].imageFilesData[0].url).appendTo(div);
      $("<p></p>").text(products[i].sterile && products[i].notSterile ? "Sterilné/Nesterilné" : products[i].sterile ? "Sterilné" : "Nesterilné").appendTo(div);
      prodHeaderContainer.appendTo(div);
      // $("<h6 class=\"font-weight-bold\"></h6>").text(products[i].title).appendTo("<div class=\"prod-header\"></div>").appendTo(div);
      $("<button></button>").text(orderPage ? "Objednať" : "Detail produktu").attr("onclick", "orderProduct(" + "'" + products[i]._id + "'" + ")").appendTo(div);
      div.appendTo("#productSkumavky");
    }
  }
}

function orderProduct(id){
  document.getElementById("navigationOrder").innerHTML = window.location.href.indexOf("online-objednavka") > -1 ? "Pridať do objednávky" : "Prejsť do objednávky"; // "Pridať objednávku";

  for(var i=0; i<products.length;i++){
    if(products[i]._id == id){
      if(document.location.href.indexOf('online-objednavka') < 0) {
        choosedProduct = products[i];
        document.getElementById("productModalMainImage").setAttribute("src",choosedProduct.imageFilesData[0].url);
        document.getElementById("mainTitle").innerHTML = choosedProduct.title;
        document.getElementById("isSterilized").innerHTML = choosedProduct.sterile && choosedProduct.notSterile ? "Sterilné/Nesterilné" : choosedProduct.sterile ? "Sterilné" : "Nesterilné";
        document.getElementById("productDescription").innerHTML = choosedProduct.description;
        document.getElementById("productHeight").innerHTML = "Výška: " + choosedProduct.height + " mm";
        document.getElementById("productDepth").innerHTML = "Priemer: " + choosedProduct.gauge + " mm";
        document.getElementById("productVolume").innerHTML = "Objem: " + choosedProduct.volume + " ml";
        document.getElementById("productWeight").innerHTML = "Váha: " + choosedProduct.weight + " g";
        document.getElementById("navigationOrder").setAttribute("onclick", "goToOrder(" + "'" + products[i]._id + "'" + ")");
        $("#productModal").modal();
      } else {
        choosedProduct = products[i];
        document.getElementById("orderModalMainImage").setAttribute("src", choosedProduct.imageFilesData[0].url);
        document.getElementById("orderMainTitle").innerHTML = choosedProduct.title;
        document.getElementById("isOrderSterilized").innerHTML = choosedProduct.sterile && choosedProduct.notSterile ? "Sterilné/Nesterilné" : choosedProduct.sterile ? "Sterilné" : "Nesterilné";
        
        if((choosedProduct.sterile && !choosedProduct.notSterile) || (choosedProduct.notSterile && choosedProduct.sterile)){
          document.getElementById("sterilizovany").checked = true;
          chooseSterility(0);
        } else if(!choosedProduct.sterile && choosedProduct.notSterile ){
          document.getElementById("nesterilizovany").checked = true;
          chooseSterility(1);
        } /*else if(choosedProduct.sterile && choosedProduct.notSterile ){
          document.getElementById("sterilizovany").checked = true;
          chooseSterility(0);
        }*/

        choosedProduct.sterile ? document.getElementById("modalSterilne").style.display = "inline-flex" : document.getElementById("modalSterilne").style.display = "none";
        choosedProduct.notSterile ? document.getElementById("modalNesterilne").style.display = "inline-flex" : document.getElementById("modalNesterilne").style.display = "none";
        document.getElementById("navigationOrder").setAttribute("onclick", "fillOrder(" + "'" + products[i]._id + "'" + ")");
        $("#orderModal").modal();
      }
    }
  }
}

function chooseSterility(e){
  if(e === 0){
    document.getElementById("nonPackageType").style.display = "none";
    document.getElementById("nonPackage").style.display = "none";
    document.getElementById("modalPackageType1").style.display = "inline-block";
    document.getElementById("modalPackageType2").style.display = "inline-block";
    document.getElementById("modalPackage1").style.display = "inline-block";
    document.getElementById("modalPackage2").style.display = "inline-block";
    if(choosedProduct != null){
      document.getElementById("balenie1").value = choosedProduct.sterileProductMinCount;
      document.getElementById("labelBalenie1").innerHTML = "Po " + choosedProduct.sterileProductMinCount + "ks";
      document.getElementById("balenie2").value = choosedProduct.sterileProductMaxCount;
      document.getElementById("labelBalenie2").innerHTML = "Po " + choosedProduct.sterileProductMaxCount + "ks";
      document.getElementById("krabica1").value = choosedProduct.sterileProductMinPackageCount;
      document.getElementById("package1").innerHTML = "Po " + choosedProduct.sterileProductMinPackageCount + "ks";
      document.getElementById("krabica2").value = choosedProduct.sterileProductMaxPackageCount;
      document.getElementById("package2").innerHTML = "Po " + choosedProduct.sterileProductMaxPackageCount + "ks";
    }
  }
  if(e === 1){
    document.getElementById("nonPackageType").style.display = "none";
    document.getElementById("nonPackage").style.display = "none";
    document.getElementById("modalPackageType1").style.display = "inline-block";
    document.getElementById("modalPackageType2").style.display = "inline-block";
    document.getElementById("modalPackage1").style.display = "inline-block";
    document.getElementById("modalPackage2").style.display = "inline-block";

    if(choosedProduct != null){
      document.getElementById("balenie1").value = choosedProduct.notSterileProductMinCount;
      document.getElementById("labelBalenie1").innerHTML = "Po " + choosedProduct.notSterileProductMinCount + "ks";
      document.getElementById("balenie2").value = choosedProduct.notSterileProductMaxCount;
      document.getElementById("labelBalenie2").innerHTML = "Po " + choosedProduct.notSterileProductMaxCount + "ks";
      document.getElementById("krabica1").value = choosedProduct.notSterileProductMinPackageCount;
      document.getElementById("package1").innerHTML = "Po " + choosedProduct.notSterileProductMinPackageCount + "ks";
      document.getElementById("krabica2").value = choosedProduct.notSterileProductMaxPackageCount;
      document.getElementById("package2").innerHTML = "Po " + choosedProduct.notSterileProductMaxPackageCount + "ks";
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
  if (document.location.href.indexOf('id=') === -1){ 
    return;
  }

  var URL = window.location.href;
  var id = URL.substring(URL.lastIndexOf('=') + 1);

  for(var i=0; i<products.length;i++){
    if(products[i]._id == id){
      choosedProduct = products[i];
      document.getElementById("orderModalMainImage").setAttribute("src",choosedProduct.imageFilesData[0].url);
      document.getElementById("orderMainTitle").innerHTML = choosedProduct.title;
      document.getElementById("isOrderSterilized").innerHTML = choosedProduct.sterile && choosedProduct.notSterile ? "Sterilné/Nesterilné" : choosedProduct.sterile ? "Sterilné" : "Nesterilné";
      choosedProduct.sterile ? document.getElementById("modalSterilne").style.display = "inline-flex" : document.getElementById("modalSterilne").style.display = "none";
      choosedProduct.notSterile ? document.getElementById("modalNesterilne").style.display = "inline-flex" : document.getElementById("modalNesterilne").style.display = "none";
      document.getElementById("navigationOrder").setAttribute("onclick", "fillOrder(" + "'" + products[i]._id + "'" + ")");
      if(choosedProduct.sterile && !choosedProduct.notSterile ){
        document.getElementById("sterilizovany").checked = true;
        chooseSterility(0);
      }
      else if(!choosedProduct.sterile && choosedProduct.notSterile ){
        document.getElementById("nesterilizovany").checked = true;
        chooseSterility(1);
      }
      else if(choosedProduct.sterile && choosedProduct.notSterile ){
        document.getElementById("sterilizovany").checked = true;
        chooseSterility(0);
      }
      $("#orderModal").modal();
    }
  }
}

function fillOrder(id){
  orderInProgress.title = document.getElementById("orderMainTitle").innerHTML;
  if(document.getElementById('sterilizovany').checked){
    orderInProgress.isSterile = true;
  }
  if(document.getElementById('nesterilizovany').checked){
    orderInProgress.isSterile = false;
  }
  orderInProgress.package =  $("input:radio[name='Balenie']:checked").val();
  orderInProgress.boxSize =  $("input:radio[name='Krabica']:checked").val();
  orderInProgress.boxCount = document.getElementById("modalPackageCount").value;
  orderInProgress.id = id;
  orderObject.push(orderInProgress);
  orderInProgress = {};
  updateDetail();
  $("#orderModal").modal("toggle");
}

function updateDetail(){
  var row;
  document.getElementById("detailOrder").innerHTML = '';

  for(var i = 0; i < orderObject.length; i++) {
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

    var sterility = orderObject[i].isSterile ? "Sterilný" : "Nesterilný";
    var lastCell = document.createElement("td");
    lastCell.className = "text-center";

    row = $("<tr></tr>");
    $("<td></td>").html(orderObject[i].title).appendTo(row);
    $("<td class=\"border-right-0\"></td>").html(sterility).appendTo(row);
    $("<td class=\"border-left-0\"></td>").html("<span class=\"font-weight-bold\">" + orderObject[i].boxCount + " ks.</span>").appendTo(row);
    $(lastCell).append(btnEdit);
    $(lastCell).append(btnDel).appendTo(row);
    row.appendTo(document.getElementById("detailOrder"));
  }
}

function editOrder(param){
  orderProduct(orderObject[param].id);
  document.getElementById("modalPackageCount").value = orderObject[param].value;
  document.getElementById("navigationOrder").innerHTML = "Zmeniť objednávku";
  document.getElementById("navigationOrder").setAttribute("onclick", "updateOrder(" + param + ")");
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
  orderObject.splice(param, 1);

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