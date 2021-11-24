$(document).ready(function () {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      // Do something for the current logged-in user here:
      console.log("Checking if user is new:");
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);

      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get user information from document and stored in variables .

        var user_gender = userDoc.data().gender;
        // check if documents have that variables, assign the value to span with certain id.
        console.log(user_gender);
        if (user_gender == null) {
          console.log("gender hasn't been set yet");
          $("#myModal").modal("show");
          console.log("Hi there, please fill out this form.");
        }
      });

      //$("#calendar-goes-here").load( "./templates/calendar.html" );
      
        //  $("#calendar-goes-here").load("./templates/calendar.html");
        //   console.log("Here")
        fetch("./templates/calendar.html")
          .then(response => {
            return response.text()
          })
          .then(data => {
            document.querySelector("#calendar-goes-here").innerHTML = data;
          });

    } else {
      // No user is signed in.
    }
  });
});

//$("#calendar-goes-here").load( "./templates/calendar.html" );
// $(function () {
//   $("#calendar-goes-here").load("./templates/calendar.html");
// });
// document.getElementById("calendar-goes-here").innerHTML = "./templates/calendar.html";
// document.getElementById('calendar-goes-here').src = './templates/calendar.html';
