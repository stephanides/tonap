// Main javascript file
var map = null;
var marker = null;
var markerJumped = false;
var googleScriptLoaded = false;
var products = [{}];
var intervalId = null;
var intervalStarted = false;
var choosedProduct = {};
var totalProductPrice;
var itemsPrice = 0.00;
var shipingPrice = 0.00;
var paymenthPrice = 0.00;
var fullPrice;
var weight = 0;
var boxCount = 0;
var shippingPricePosteOffice =0;
if(localStorage.getItem("orderObject") != null){
  var getOrderObjectFromStorage = localStorage.getItem("orderObject");
  var orderObject = JSON.parse(getOrderObjectFromStorage);
  getSum();
}
else{
  var orderObject = [];
  getSum();
}


var orderInProgress = {
  title:"",
  price:0,
  count:0,
  id:""
};
var countSelect;
var variantId;
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
  //getSum();
  if (window.location.href.indexOf("online-objednavka") < 0) {
    setTimeout(startCounter, 1000);
  }
  container = $("#pills-tabContent").find(".active");
  itemsHolder = container.find(".productRowContainer");
  itemsWrapper = itemsHolder[0].children[0];
  
  itemsNodes = itemsWrapper.childNodes;
  setTimeout(function () { console.log(itemsNodes);},5000);
 
}

function updateItemsHolder(){
  
/*  setTimeout(function () {
  container = $("#pills-tabContent").find(".active");
  itemsHolder = container.find(".productRowContainer");
  itemsWrapper = itemsHolder[0].children[0];
  itemsCount = itemsWrapper.childElementCount;   // show("slow");  addClass("active");
  itemsNodes = itemsWrapper.childNodes;
  },400)*/
}

function revealProducts() {
  $(".productShowAllContainer > button").on("click", function(e) {
    var showAllProductsBtn = e.currentTarget;
    var btnIcon = $(showAllProductsBtn).find("i");
    var paragraph = $(showAllProductsBtn).parent(".productShowAllContainer").find("p");
    
    setTimeout(function () {
      
      if (btnIcon.hasClass("fa-caret-down")) {
        for(i = 0; i<itemsNodes.length; i++){
          $(itemsNodes[i]).show("slow");
        }
        btnIcon.removeClass("fa-caret-down").addClass("fa-caret-up");
        paragraph.html("Zobraziť menej");
      } else {
        for(i = 0; i<itemsNodes.length; i++){
          if(i < 4){
            $(itemsNodes[i]).show("slow");
          }
          else{
            $(itemsNodes[i]).hide("slow");
          }
        }
        btnIcon.removeClass("fa-caret-up").addClass("fa-caret-down");
        paragraph.html("Zobraziť všetky produkty");
      }
    }, 100);
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
			}
		};
		xobj.send(null);
}

function fillProducts(products){
  var orderPage = window.location.pathname.indexOf("online-objednavka") > -1 ? true : false;

  for (var i = 0; i < products.length; i++) {
    var minPriceArray = [];
    var minPrice = 0;
    for(var x=0; x<products[i].variant.length;x++){
      minPriceArray.push(Number(products[i].variant[x].priceMin));
    }
    minPrice = Math.min.apply(null, minPriceArray);
    if(products[i].category == 1){
      var div = $("<div></div>").addClass("col-lg-3 col-md-6 col-12 text-center cursor-pointer");
      div.attr("onclick", "orderProduct(" + "'" + products[i]._id + "'" + ")")
      var prodHeaderContainer = $("<div class=\"prod-header\"></div>").append("<h6 class=\"font-weight-bold\">" + products[i].title + "</h6>");
      $("<img class=\"lazyload\" alt=\"Tonap - " + products[i].title + "\">").attr("data-src", products[i].imageFilesData[0].url).appendTo(div);
      prodHeaderContainer.appendTo(div);
      $("<strong></strong").text(minPrice + " €").appendTo($("<p class='productPrice'></p>").text("od ").appendTo(div));
      div.appendTo("#productKelimky");
    }
    if(products[i].category == 2){
      var div = $("<div></div>").addClass("col-lg-3 col-md-6 col-12 text-center cursor-pointer");
      div.attr("onclick", "orderProduct(" + "'" + products[i]._id + "'" + ")")
      var prodHeaderContainer = $("<div class=\"prod-header\"></div>").append("<h6 class=\"font-weight-bold\">" + products[i].title + "</h6>");
      $("<img class=\"lazyload\" alt=\"Tonap - " + products[i].title + "\">").attr("data-src", products[i].imageFilesData[0].url).appendTo(div);
      prodHeaderContainer.appendTo(div);
      $("<strong></strong").text(minPrice + " €").appendTo($("<p class='productPrice'></p>").text("od ").appendTo(div));
      $("<p></p>").text("Cena / TODO").appendTo(div);
      div.appendTo("#productOdberniky");
    }
    if(products[i].category == 3){
      var div = $("<div></div>").addClass("col-lg-3 col-md-6 col-12 text-center cursor-pointer");
      div.attr("onclick", "orderProduct(" + "'" + products[i]._id + "'" + ")")
      var prodHeaderContainer = $("<div class=\"prod-header\"></div>").append("<h6 class=\"font-weight-bold\">" + products[i].title + "</h6>");
      $("<img class=\"lazyload\" alt=\"Tonap - " + products[i].title + "\">").attr("data-src", products[i].imageFilesData[0].url).appendTo(div);
      prodHeaderContainer.appendTo(div);
      $("<strong></strong").text(minPrice + " €").appendTo($("<p class='productPrice'></p>").text("od ").appendTo(div));
      $("<p></p>").text("Cena / TODO").appendTo(div);
      div.appendTo("#productSkumavky");
    }
  }
  for(i = 0; i<itemsNodes.length; i++){
    if(i < 4){
      $(itemsNodes[i]).show("slow");
    }
    else{
      $(itemsNodes[i]).hide("slow");
    }
  }
}

function orderProduct(id){
  var itemSelect = document.getElementById("variantsSelect");
  for(var i=0; i<products.length;i++){
    if(products[i]._id == id){
      if(document.location.href.indexOf('online-objednavka') < 0) {
        document.getElementById("navigationOrder").innerHTML = "Pridať do košíka";
        choosedProduct = products[i];
        itemSelect.innerHTML = "";
        document.getElementById("productModalMainImage").setAttribute("src",choosedProduct.imageFilesData[0].url);
        document.getElementById("mainTitle").innerHTML = choosedProduct.title;
        document.getElementById("productDescription").innerHTML = choosedProduct.description;
        document.getElementById("productHeight").innerHTML = "Výška: " + choosedProduct.height + " mm";
        document.getElementById("productDepth").innerHTML = "Priemer: " + choosedProduct.gauge + " mm";
        document.getElementById("productVolume").innerHTML = "Objem: " + choosedProduct.volume + " ml";
        document.getElementById("productWeight").innerHTML = "Váha: " + choosedProduct.weight + " g";
        document.getElementById("navigationOrder").setAttribute("onclick", "fillOrder(" + "'" + products[i]._id + "'" + ")");
        
        for (var j = 0; j < products[i].variant.length; j++) {
          var option = document.createElement("option");
          option.value = products[i].variant[j].title;
          option.text = products[i].variant[j].title;
          itemSelect.appendChild(option);
        }
        document.getElementById("actualPrice").innerHTML = choosedProduct.variant[0].priceMax + " € ";
        document.getElementById("midPrice").innerHTML = choosedProduct.variant[0].priceMed + " €";
        document.getElementById("lowPrice").innerHTML = choosedProduct.variant[0].priceMin + " €";
        refreshOrder();
        getProductSum();
        document.getElementById("totalProductPrice").innerHTML = "Cena spolu: " + totalProductPrice + " € ";
        
        $("#productModal").modal();
      } else {
        choosedProduct = products[i];
        itemSelect.innerHTML = "";
        document.getElementById("productModalMainImage").setAttribute("src",choosedProduct.imageFilesData[0].url);
        document.getElementById("mainTitle").innerHTML = choosedProduct.title;
        document.getElementById("productDescription").innerHTML = choosedProduct.description;
        document.getElementById("productHeight").innerHTML = "Výška: " + choosedProduct.height + " mm";
        document.getElementById("productDepth").innerHTML = "Priemer: " + choosedProduct.gauge + " mm";
        document.getElementById("productVolume").innerHTML = "Objem: " + choosedProduct.volume + " ml";
        document.getElementById("productWeight").innerHTML = "Váha: " + choosedProduct.weight + " g";
        for (var j = 0; j < products[i].variant.length; j++) {
          var option = document.createElement("option");
          option.value = products[i].variant[j].title;
          option.text = products[i].variant[j].title;
          itemSelect.appendChild(option);
        }
        document.getElementById("actualPrice").innerHTML = choosedProduct.variant[0].priceMax + " € ";
        document.getElementById("midPrice").innerHTML = choosedProduct.variant[0].priceMed + " €";
        document.getElementById("lowPrice").innerHTML = choosedProduct.variant[0].priceMin + " €";
        refreshOrder();
        getProductSum();
        document.getElementById("totalProductPrice").innerHTML = "Cena spolu: " + totalProductPrice + " € ";
        document.getElementById("editOrder").setAttribute("onclick", "fillOrder(" + "'" + products[i]._id + "'" + ")");
        $("#productModal").modal();
      }
    }
  }
}

function fillOrder(id){
  var actualProductFromDatabase;
  for (var i = 0; i < products.length; i++) {
    if(id === products[i]._id){
      actualProductFromDatabase = products[i];
    }
  }
  orderInProgress.title = document.getElementById("mainTitle").innerHTML;
  orderInProgress.id = id;
  orderInProgress.image = document.getElementById("productModalMainImage").src;
  orderInProgress.count = Number(document.getElementById("countSelect").value);
  orderInProgress.variant = document.getElementById("variantsSelect").selectedIndex;
  orderInProgress.variantName = document.getElementById("variantsSelect").options[document.getElementById("variantsSelect").selectedIndex].value;
  orderInProgress.weight = actualProductFromDatabase.weight;
  orderInProgress.sackCount = actualProductFromDatabase.variant[document.getElementById("variantsSelect").selectedIndex].sackCount;
  orderInProgress.boxCount = actualProductFromDatabase.variant[document.getElementById("variantsSelect").selectedIndex].boxCount;
  var price = document.getElementById("actualPrice").innerHTML;
  orderInProgress.price = Number(price.replace(/€/,""));
  orderInProgress.totalPrice = orderInProgress.count * orderInProgress.price;
  orderObject.push(orderInProgress);
  localStorage.setItem("orderObject", JSON.stringify(orderObject));
  orderInProgress = {};
  if(Number(document.getElementById("countSelect").value) >= 200){
    $("#productModal").modal("toggle");
  }
 
  getSum();
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

    var lastCell = document.createElement("td");
    lastCell.className = "text-center";

    var pricePerItem;

    row = $("<tr></tr>");
    var tableImage = $("<td class=\"border-left-0 border-right-0\"></td>").appendTo(row);
    $("<img>").attr("src",orderObject[i].image).appendTo(tableImage);
    $("<td class='font-weight-bold border-left-0'></td>").html(orderObject[i].title).appendTo(row);
    $("<td class='font-weight-bold'></td>").html(orderObject[i].variantName).appendTo(row);
    $("<td class='font-weight-bold' style='color:#4187cc;'></td>").html(orderObject[i].price + " €").appendTo(row);
    $("<td class=\"border-left-0\"></td>").html("<span class=\"font-weight-bold\">" + orderObject[i].count + " ks.</span>").appendTo(row);
    $("<td class='font-weight-bold' style='color:#4187cc;'></td>").html((orderObject[i].totalPrice) + " €").appendTo(row);
    $(lastCell).addClass("border-right-0")
    $(lastCell).append(btnEdit);
    $(lastCell).append(btnDel).appendTo(row);
    row.appendTo(document.getElementById("detailOrder"));
  }
  getSum();
  countPostPrice();
}

function editOrder(param){
  orderProduct(orderObject[param].id);
  document.getElementById("editOrder").innerHTML = "Zmeniť objednávku";
  document.getElementById("editOrder").setAttribute("onclick", "updateOrder(" + param + ")");
}

function updateOrder(param){
  orderObject[param].title = document.getElementById("mainTitle").innerHTML;
  orderObject[param].count = Number(document.getElementById("countSelect").value);
  var price = document.getElementById("actualPrice").innerHTML;
  orderObject[param].price = Number(price.replace(/€/,""));
  orderObject[param].variant = document.getElementById("variantsSelect").selectedIndex;
  orderObject[param].variantName = document.getElementById("variantsSelect").options[document.getElementById("variantsSelect").selectedIndex].value;
  updateDetail();
  $("#productModal").modal('toggle');
  localStorage.setItem("orderObject", JSON.stringify(orderObject));
}

function deleteOrder(param){
  orderObject.splice(param, 1);
  localStorage.setItem("orderObject", JSON.stringify(orderObject));
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
  getWeight();
  getBoxes();
  addShippingMethod("geis");
  countPostPrice();
}

function refreshOrder(){
  countSelect = document.getElementById("countSelect").value;
  variantId = document.getElementById("variantsSelect").selectedIndex;
  var actualPrice = document.getElementById("actualPrice");
  var midPrice = document.getElementById("midPrice");
  var lowPrice = document.getElementById("lowPrice");
  if(countSelect < 2000){
    actualPrice.innerHTML = choosedProduct.variant[variantId].priceMax + " € ";
    midPrice.innerHTML = choosedProduct.variant[variantId].priceMed + " €";
    lowPrice.innerHTML = choosedProduct.variant[variantId].priceMin + " €";
  }
  if(countSelect >= 2000 && countSelect < 4000){
    actualPrice.innerHTML = choosedProduct.variant[variantId].priceMed + " € ";
    midPrice.innerHTML = choosedProduct.variant[variantId].priceMed + " €";
    lowPrice.innerHTML = choosedProduct.variant[variantId].priceMin + " €";
  }
  else if(countSelect >= 4000){
    actualPrice.innerHTML = choosedProduct.variant[variantId].priceMin + " € ";
    midPrice.innerHTML = choosedProduct.variant[variantId].priceMed + " €";
    lowPrice.innerHTML = choosedProduct.variant[variantId].priceMin + " €";
  }
  getProductSum();
  document.getElementById("totalProductPrice").innerHTML = "Cena spolu: " + totalProductPrice + " € ";
  getSum();
}

function getSum(){
  var sum = 0.00;
  for(var i = 0; i < orderObject.length; i++){
    sum += Number(parseFloat(orderObject[i].price * orderObject[i].count).toFixed(2)); 
  }
  itemsPrice = sum;
  if(document.getElementById("cartPrice")!= null){
    document.getElementById("cartPrice").innerHTML = sum + " €";
  }
  if(document.getElementById("medzisucet")!= null){
    document.getElementById("medzisucet").innerHTML = sum + " €";
  }
  if(document.getElementById("fullPrice")!= null){
    document.getElementById("fullPrice").innerHTML = itemsPrice + shipingPrice + paymenthPrice + " €"
  }
  // get weight of order
  for(var i = 0; i < orderObject.length; i++){

  }
}

function getProductSum(){
  var actualPrice = document.getElementById("actualPrice").innerHTML;
   totalProductPrice = countSelect * Number(actualPrice.replace(/€/,""));
}

function getShippingPrice(){
  var shippingMethod = $('input[name=radioName]:checked', '#myForm').val();
  var paymentMethod = $('input[name=radioName]:checked', '#myForm').val();
}
function enableOtherAdress(){
  var checkbox = document.getElementById("otherAdress");
  var otherAdress = document.getElementById("otherAdressHolder");
  if(checkbox.checked){
    otherAdress.style.display = "block";
  }
  else
    otherAdress.style.display = "none";
}

function stateUpdate(){
  addShippingMethod("geis");
  document.getElementById("geisOption").checked = true;
  addPaymentPrice();
  if(document.getElementById("stateSelect").selectedIndex != 0){
    document.getElementById("postaOption").disabled = true;
    document.getElementById("osobnyOdberOption").disabled = true;
  }
  else{
    document.getElementById("postaOption").disabled = false;
    document.getElementById("osobnyOdberOption").disabled = false;
  }
}

function addShippingMethod(arg){
  var state = document.getElementById("stateSelect").selectedIndex;
  var geisPrice = document.getElementById("geisPrice");
  //0 - Slovensko / 1- Česko / 2-Madarsko / 3-Polsko
  if(arg == "geis"){
    switch(state){
      case 0:
        shipingPrice = 3.90;
        geisPrice.innerHTML = "3.90 €";
        break;
      case 1:
        shipingPrice = 6.90;
        geisPrice.innerHTML = "6.90 €";
        break;
      case 2:
        shipingPrice = 11.90;
        geisPrice.innerHTML = "11.90 €";
        break;
      case 3:
        shipingPrice = 8.90;
        geisPrice.innerHTML = "8.90 €";
        break;
    }
  }
  if(arg == "posta"){
    countPostPrice();
  }
  if(arg == "osobne"){
    shipingPrice = 0.00;
  }
  getSum();
}

function addPaymentPrice(arg){
  if(arg == "dobierka"){
    paymenthPrice = 1.50;
  }
  if(arg == "osobne"){
    paymenthPrice = 0.00;
  }
  getSum();
}

function getWeight(){
  weight = 0;
  for(var i=0; i<orderObject.length; i++){
    weight += orderObject[i].count * Number(orderObject[i].weight);
  }
}

function getBoxes(){
  boxCount = 0;
  for(var i=0; i<orderObject.length; i++){
    boxCount += orderObject[i].count / Number(orderObject[i].boxCount);
  }
  boxCount = Math.ceil(boxCount);
}

function countPostPrice(){
  
  if(window.location.href.indexOf("online-objednavka") > -1){
    
    console.log("online-objednavka");
    getWeight();
    console.log(weight);
    postPrice = document.getElementById("postPrice");
    if(weight < 1000){
      shippingPricePosteOffice = 7.20;
      postPrice.innerHTML = "7.20 €";
    }
    if(weight > 1000 && weight <= 3000){
      shippingPricePosteOffice = 7.80;
      postPrice.innerHTML = "7.80 €";
    }else
    if(weight> 3001 && weight <= 5000){
      shippingPricePosteOffice = 8.40;
      postPrice.innerHTML = "8.40 €";
    }
    if(weight> 5001 && weight <= 10000){
      shippingPricePosteOffice = 9.00;
      postPrice.innerHTML = "9.00 €";
    }
    if(weight> 10001 && weight <= 15000){
      shippingPricePosteOffice = 9.90;
      postPrice.innerHTML = "9.90 €";
    }
    if(weight> 15001 && weight <= 20000){
      shippingPricePosteOffice = 10.80;
      postPrice.innerHTML = "10.80 €";
    }
    if(weight> 20001 && weight <= 25000){
      shippingPricePosteOffice = 11.70;
      postPrice.innerHTML = "11.70 €";
    }
    if(weight > 25001 && weight <= 30000){
      shippingPricePosteOffice = 12.80;
      postPrice.innerHTML = "12.80 €";
    }
    if(weight > 30001 && weight <= 40000){
      shippingPricePosteOffice = 17.40;
      postPrice.innerHTML = "17.40 €";
    }
    if(weight> 40001 && weight <= 50000){
      shippingPricePosteOffice = 21.60;
      postPrice.innerHTML = "21.60 €";
    }
    if(weight > 50001 && weight<= 75000){
      shippingPricePosteOffice = 26.20;
      postPrice.innerHTML = "26.20 €";
    }
    if(weight> 75001 && weight <= 100000){
      shippingPricePosteOffice = 32.00;
      postPrice.innerHTML = "32.00 €";
    }
    if(weight > 100001 && weight <= 125000){
      shippingPricePosteOffice = 40.50;
      postPrice.innerHTML = "40.50 €";
    }
    if(weight > 125001 && weight <= 150000){
      shippingPricePosteOffice = 47.50;
      postPrice.innerHTML = "47.50 €";
    }
    if(weight > 150001 && weight <= 200000){
      shippingPricePosteOffice = 57.50;
      postPrice.innerHTML = "57.50 €";
    }
    if(weight >200001 && weight <= 250000){
      shippingPricePosteOffice = 69.00;
      postPrice.innerHTML = "69.00 €";
    }
    if(weight >= 300000){
      shippingPricePosteOffice = 80.50;
      postPrice.innerHTML = "80.50 €";
    }
    if(document.getElementById("postaOption").checked){
      shipingPrice = shippingPricePosteOffice;
      getSum();
    }
  }
}

function postChecked(){
  shipingPrice = shippingPricePosteOffice;
  getSum();
}