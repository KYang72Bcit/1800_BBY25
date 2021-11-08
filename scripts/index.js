document.getElementById("hamburgermenu").addEventListener("click", function(){
    var x = document.getElementById("menuLinks");
    if (x.style.display === "grid") {
      x.style.display = "none";
    } else {
      x.style.display = "grid";
    }

}, false);