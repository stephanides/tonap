// Main javascript file

$(document).ready(function() {
  exampleFunction();
  showAllProducts();
});

function exampleFunction() {
  console.log("App runs.");
}

function showAllProducts(){
  var isopen = false;

  document.getElementById("showProducts").addEventListener("click", function(){
    if(!isopen){
      document.getElementById("showProducts").firstChild.style.transform = "rotate(270deg)";
      document.getElementById("moreProducts").style.maxHeight = 2000 + "px";
      setTimeout(function(){
        document.getElementById("moreProducts").style.overflow = "unset";
      },500);
     // document.getElementById("moreProducts").style.height = "auto";
      //document.getElementById("moreProducts").style.overflow = "unset";
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