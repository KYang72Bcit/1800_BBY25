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
        // console.log(user_gender);
        console.log("Click the Update Basic Information button if you would like to make changes.");
      });
    } else {
      // No user is signed in.
    }
  });

});

//This code displays current user information in the forms on the page.
function getBasicInfor() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      // Do something for the current logged-in user here:
      //console.log(user.uid);
      //go to the correct user document by referencing to the user uid
      var currentUser = db.collection("users").doc(user.uid);
      var storageRef = storage.ref("images/" + user.uid + ".jpg");
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get user information from document and stored in variables .
        var user_Name = userDoc.data().name;
        var user_gender = userDoc.data().gender;
        var user_age = 2021 - userDoc.data().yearOfBirth;
        var user_bodyHeight = userDoc.data().bodyHeight;
        var user_bodyWeight = userDoc.data().bodyWeight;
        var user_ongoingCodition = userDoc.data().ongoingCondition;
        var picUrl = userDoc.data().profilepic;
        console.log("pic URL is: " + picUrl);
        document.querySelector("#name").innerHTML = user_Name;
        $("#profile").attr("src", picUrl);

       

        // check if documents have that variables, assign the value to span with certain id.

        if (user_gender != null) {
          document.getElementById("gender").innerText = user_gender;
        }
        if (user_age != 0) {
          document.getElementById("age").innerText = user_age;
        }
        if (user_bodyHeight != 0) {
          document.getElementById("height").innerText = user_bodyHeight;
        }
        if (user_bodyWeight != 0) {
          document.getElementById("weight").innerText = user_bodyWeight;
        }
        if (user_ongoingCodition != null) {
          document.getElementById("user_ongoingCondition").innerText =
            user_ongoingCodition;
        }
        $("#mypic-goes-here").attr("src", picUrl);

        $("#username").text(user_Name); //using jquery
      });
    } else {
      // No user is signed in.
    }
  });
}
getBasicInfor();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.

    //when users change personal profile
    const input = document.querySelector("#mypic-input");
    const profile = document.querySelector("#mypic-goes-here");
    //when user upload profile pic
    input.addEventListener("change", function (e) {
      var file = e.target.files[0];
      //get url of that pic locally and assign to profile
      var blob = URL.createObjectURL(file);
      profile.src = blob;
      //upload to filebase storage
      var storageRef = storage.ref("images/" + user.uid + ".jpg");
      storageRef.put(file).then(function () {
        console.log("upload user profile");
      });
      //get the url of the pic in filebase storage and update user document
      storageRef.getDownloadURL().then(function (url) {
        console.log(url);

        currentUser
          .update({
            profilepic: url,
          })
          .then(function () {
            console.log("update userprofile pic to firestore");
          });
      });
    });
  } else {
    console.log("No user is signed in.");
  }
});
