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
            $("#myModal").modal('show');
            console.log("Hi there, please fill out this form.");
          }
        });
      } else {
        // No user is signed in.
      }
    });

  });

  document.querySelector("#basicInfor").addEventListener('submit', submitForm);

  function submitForm(e) {
    e.preventDefault();

    yearOfBirth = parseInt(getValuebyId("#yearOfBirth"));
    bodyHeight = parseInt(getValuebyId("#bodyHeight"));
    bodyWeight = parseInt(getValuebyId("#bodyWeight"));
    ongoingCondition = getValuebyId("#ongoingCondition");
    familyHistory = getValuebyId("#familyHistory");
    gender = displayRadioValue();

    currentUser.update({
      yearOfBirth: yearOfBirth,
      bodyHeight: bodyHeight,
      bodyWeight: bodyWeight,
      ongoingCondition: ongoingCondition,
      familyHistory: familyHistory,
      gender: gender
    }).then(() => {
      console.log("Document successfully updated!");
      location.reload();
      $("#myModal").modal('hide');

    }).catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });

    //window.location.assign("main.html");

  }

  // close modal
  function closeModal() {
    $("#myModal").modal('hide');
  }

  // display the value of radio butter of gender
  function displayRadioValue() {
    const ele = document.getElementsByName("gender");

    for (i = 0; i < ele.length; i++) {
      if (ele[i].checked) return ele[i].value;
    }
  }

  function getValuebyId(id) {
    return document.querySelector(id).value;
  }

  // add unserGender to userdoc
  function writeGender() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        currentUser = db.collection("users").doc(user.uid);
        currentUser.set({
          gender: displayRadioValue(),
        });
      }
    });
  }

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
          var picUrl = userDoc.data().profilepic  
          console.log(picUrl);
          console.log("122");
        
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
            document.getElementById("user_ongoingCondition").innerText = user_ongoingCodition;
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

  function getBasicInforModal() {
    var currentUser;
    firebase.auth().onAuthStateChanged((user) => {
      // Check if user is signed in:
      if (user) {
        // Do something for the current logged-in user here:
        //console.log(user.uid);
        //go to the correct user document by referencing to the user uid
        currentUser = db.collection("users").doc(user.uid);
        //get the document for current user.
        currentUser.get().then((userDoc) => {
          //get user information from document and stored in variables .
          var user_Name = userDoc.data().name;
          var user_gender = userDoc.data().gender;
          var user_yearOfBirth = userDoc.data().yearOfBirth;
          var user_bodyHeight = userDoc.data().bodyHeight;
          var user_bodyWeight = userDoc.data().bodyWeight;
          var user_ongoingCodition = userDoc.data().ongoingCondition;
          var user_familyHistory = userDoc.data().familyHistory;
          //console.log(user_ongoingCodition);
          // check if documents have that variables, assign the value to span with certain id. 
          //console.log(user_age);
          // if (user_Name != null) {
          //   document.getElementById("name").innerText = user_Name;
          // }
          if (user_gender != null) {
            checkRadioButton(user_gender);
          }
          if (user_yearOfBirth != 0) {
            document.getElementById("yearOfBirth").value = user_yearOfBirth;
          }
          if (user_bodyHeight != 0) {
            document.getElementById("bodyHeight").value = user_bodyHeight;
          }
          if (user_bodyWeight != 0) {
            document.getElementById("bodyWeight").value = user_bodyWeight;
          }
          if (user_ongoingCodition != null) {
            document.getElementById("ongoingCondition").value = user_ongoingCodition;
          }
          if (user_familyHistory != null) {
            document.getElementById("familyHistory").value = user_familyHistory;
          }

          $("#username").text(user_Name); //using jquery
        });
      } else {
        // No user is signed in.
      }
    });
  }
  getBasicInforModal();

  function checkRadioButton(user_gender) {
    let buttons = document.querySelectorAll('input[name = "gender"]')
    console.log(buttons);
    //console.log("123");
    buttons.forEach(element => {
      if (element.value === user_gender) {
        console.log(element);
        element.checked = true
      }

    })
  }

  //  showing profile photo that user upload

  // function showImg() {
  //   const input = document.querySelector("#mypic-input");
  //   const profile = document.querySelector("#mypic-goes-here");

  //   input.addEventListener('change', function (e) {
  //     var blob = URL.createObjectURL(e.target.files[0]);
  //     profile.src = blob;
  //   })
  // }
  // //showImg();

  // function uploadImg() {

  //  //storageRef = storage.ref("images/" + user.uid + ".jpg");
  //   storageRef.put(input).then(function () {
  //     console.log("upload user profile");
  //   })
  //   //get URL of stored file
  //   storageRef.getDownloadURL().then(function (url) {
  //     console.log(url);
  //     currentUser.update({
  //       "profilepic": url
  //     })
  //     currentUser.update({
  //         "profilepic": url
  //       })
  //       .then(function () {
  //         console.log("update userprofile pic to firestore");
  //       })
  //   })
  // }
  //uploadImg();

  firebase.auth().onAuthStateChanged(function(user) {
if (user) {
  // User is signed in.

  //when uers change personal profile
  const input = document.querySelector("#mypic-input");
    const profile = document.querySelector("#mypic-goes-here");
  //when user upload profile pic 
    input.addEventListener('change', function (e) {
      var file = e.target.files[0];
      //get url of that pic locally and assign to profile
      var blob = URL.createObjectURL(file);
      profile.src = blob;
      //upload to filebase storage
      var storageRef = storage.ref("images/" + user.uid + ".jpg");
      storageRef.put(file).then(function(){
        console.log("upload user profile");
      })
      //get the url of the pic in filebase storage and update user document 
      storageRef.getDownloadURL().then(function (url) {
      console.log(url);
  
      currentUser.update({
          "profilepic": url
        })
        .then(function () {
          console.log("update userprofile pic to firestore");
        })
    })

    })
    
    //get URL of stored file
    

  
    } else {
    // No user is signed in.
    }
    });

    // Links to other pages from the menu:
    document.getElementById("resultsBtn").onclick = function () {
      location.href = "testresults.html";
    }
    document.getElementById("profileBtn").onclick = function () {
      location.href = "myProfile.html";
    }
