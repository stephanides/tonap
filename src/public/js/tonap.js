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

$(document).ready(function() {
  getProducts();
  revealProducts();
  startCounter();
  scrollPage();
});

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
  $('html, body').animate({scrollTop:$(param).position().top-120}, 'slow');
}

function loadMap() {
  var latlng = {lat: 48.635896, lng: 21.714897};
  var mapOptions = {
    center: new google.maps.LatLng(48.635896, 21.714897),
    zoom: 15,
    mapTypeControl: false,
    fullscreenControl:false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var markerIcon = {
    url: window.location.origin + "/assets/images/icons/logofooter.png", // map-marker.png',
    scaledSize: new google.maps.Size(42, 60),
    labelOrigin: new google.maps.Point(21, 80),
    labelAnchor: new google.maps.Point(0, 0)
  };

  marker = new google.maps.Marker({
    position: latlng,
    animation: google.maps.Animation.DROP,
    icon: markerIcon, //'./dist/img/map-marker.png',
    label: { color: "#0669bb", fontWeight: "bold", fontSize: '14px', text: "Tonap s. r. o." },
    map: map
  });

  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  console.log("MAP LOADED");

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
        clearInterval(intervalId);
        intervalId = null;
      }
    } else {
      if (intervalStarted && intervalId === null) {
        counterInterval();
      }
    }
    if (pY >= 1800) {
      if (map === null) {
        var googleScript = document.createElement("script");
        
        googleScript.onload = function () {
          googleScriptLoaded = true;
        };
        googleScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBGuAMy2poB-W_gNCuKoKejHIh3LeyDZ_E&callback=loadMap";
        
        document.body.append(googleScript);
      }
      if(marker && map && googleScriptLoaded && !markerJumped) {
        marker.setMap(map);
        markerJumped = true;
      }
    }
  });
}

function startCounter() {
  $(".count").each(function () {
    $(this).prop("Counter", 3297585).animate({
      Counter: $(this).text()
    }, {
      duration: 4000,
      easing: 'swing',
      step: function (now) {
        var number = Math.ceil(now);
        var output = number.toLocaleString();

        $(this).text(output);
      }
    });
  });

  setTimeout(counterInterval, 4010);
}

function counterInterval() {
  intervalId = setInterval(function () {
    $(".count").each(function (i, item) {
      var val = parseInt(item.innerHTML.replace(/,/g, ""));
      
      val += 1;
      val = val.toLocaleString();
      item.innerHTML = val;
    });
    
    intervalStarted = true;
  }, 1000);
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
      $("<img class=\"lazyload\" alt=\"Tonap - " + products[i].title + "\">").attr("data-src", products[i].imageFilesData[0].url).appendTo(div);
      $("<p></p>").text(products[i].sterile && products[i].notSterile ? "Sterilné/Nesterilné" : products[i].sterile ? "Sterilné" : "Nesterilné").appendTo(div);
      $("<h6></h6>").text(products[i].title).appendTo(div);
      $("<button></button>").text(orderPage ? "Objednať" : "Detail produktu").attr("onclick", "orderProduct(" + "'" + products[i]._id + "'" + ")").appendTo(div);
      div.appendTo("#productKelimky");
    }
    if(products[i].category == 2){
      var div = $("<div></div>").addClass("col-lg-3 col-md-6 col-12 text-center");
      $("<img class=\"lazyload\" alt=\"Tonap - " + products[i].title + "\">").attr("data-src", products[i].imageFilesData[0].url).appendTo(div);
      $("<p></p>").text(products[i].sterile && products[i].notSterile ? "Sterilné/Nesterilné" : products[i].sterile ? "Sterilné" : "Nesterilné").appendTo(div);
      $("<h6></h6>").text(products[i].title).appendTo(div);
      $("<button></button>").text(orderPage ? "Objednať" : "Detail produktu").attr("onclick", "orderProduct(" + "'" + products[i]._id + "'" + ")").appendTo(div);
      div.appendTo("#productOdberniky");
    }
    if(products[i].category == 3){
      var div = $("<div></div>").addClass("col-lg-3 col-md-6 col-12 text-center");
      $("<img class=\"lazyload\" alt=\"Tonap - " + products[i].title + "\">").attr("data-src", products[i].imageFilesData[0].url).appendTo(div);
      $("<p></p>").text(products[i].sterile && products[i].notSterile ? "Sterilné/Nesterilné" : products[i].sterile ? "Sterilné" : "Nesterilné").appendTo(div);
      $("<h6></h6>").text(products[i].title).appendTo(div);
      $("<button></button>").text(orderPage ? "Objednať" : "Detail produktu").attr("onclick", "orderProduct(" + "'" + products[i]._id + "'" + ")").appendTo(div);
      div.appendTo("#productSkumavky");
    }
  }
}

function orderProduct(id){
  document.getElementById("navigationOrder").innerHTML = "Pridať objednávku";

  for(var i=0; i<products.length;i++){
    if(products[i]._id == id){
      if(document.location.href.indexOf('online-objednavka') === -1){
        choosedProduct = products[i];
        document.getElementById("productModalMainImage").setAttribute("src",choosedProduct.imageFilesData[0].url);
        document.getElementById("mainTitle").innerHTML = choosedProduct.title;
        document.getElementById("isSterilized").innerHTML = choosedProduct.sterile && choosedProduct.notSterile ? "Sterilné/Nesterilné" : choosedProduct.sterile ? "Sterilné" : "Nesterilné";
        document.getElementById("productDescription").innerHTML = choosedProduct.description;
        document.getElementById("productHeight").innerHTML = "Výška: " + choosedProduct.length + " mm";
        document.getElementById("productDepth").innerHTML = "Priemer: " + choosedProduct.depth + " mm";
        document.getElementById("productVolume").innerHTML = "Objem: " + choosedProduct.volume + " ml";
        document.getElementById("productWeight").innerHTML = "Váha: " + choosedProduct.weight + " g";
        document.getElementById("navigationOrder").setAttribute("onclick", "goToOrder(" + "'" + products[i]._id + "'" + ")");
        $("#productModal").modal();
      }
      else if(document.location.href.indexOf('online-objednavka') > -1){
        choosedProduct = products[i];
        document.getElementById("orderModalMainImage").setAttribute("src",choosedProduct.imageFilesData[0].url);
        document.getElementById("orderMainTitle").innerHTML = choosedProduct.title;
        document.getElementById("isOrderSterilized").innerHTML = choosedProduct.sterile && choosedProduct.notSterile ? "Sterilné/Nesterilné" : choosedProduct.sterile ? "Sterilné" : "Nesterilné";
        
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

  for(var i=0; i < orderObject.length;i++){
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
    // $("<td class='edit' onclick=editOrder("+ i +") colspan=\"2\"></td>").html("Upravit").appendTo(row);
    //$("<td class='edit' onclick=deleteOrder("+ i +")></td>").html("Odstrániť").appendTo(row);
    // $("<td class='delete'></td>").html(btnDel).appendTo(row);
    row.appendTo(document.getElementById("detailOrder"));
  }
}

function editOrder(param){
  console.log(orderObject[param]);
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
  console.log(orderObject);
}

function deleteOrder(param){
  for(var j=orderObject.length; j > 0;j--){
    document.getElementById("detailOrder").deleteRow(j-1);
  }

  orderObject.splice(param,1);
 
  for(var i=0; i < orderObject.length;i++){
    var btnDel = document.createElement("a");
    btnDel.className = "btn-danger rounded-circle";
    btnDel.innerHTML = "&times;";

    btnDel.setAttribute("onclick", "deleteOrder(" + (i) + ");");
    row = $("<tr></tr>");
    $("<td></td>").html(orderObject[i].title).appendTo(row);
    $("<td></td>").html(orderObject[i].boxCount).appendTo(row);
    $("<td class='edit' onclick=editOrder("+ i +")></td>").html("Upravit").appendTo(row);
    $("<td class='delete'></td>").html(btnDel).appendTo(row);
    row.appendTo(document.getElementById("detailOrder"));
  }
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
