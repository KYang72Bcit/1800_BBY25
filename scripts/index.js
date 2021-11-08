document.getElementById("hamburgermenu").addEventListener("click", function(){
    var x = document.getElementById("menuLinks");
    if (x.style.display === "grid") {
      x.style.display = "none";
    } else {
      x.style.display = "grid";
    }

    var y = document.getElementById("black");
    if (y.style.display === "block") {
      y.style.display = "none";
    } else {
      y.style.display = "block";
    }

}, false);