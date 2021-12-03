//This program provides general functionality to the Basic Information Modal. 

document.querySelector("#basicInfor").addEventListener('submit', submitForm);

//Allows submission of the form and writes/updates the values on the database.
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

// closes modal
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

// add userGender to userdoc
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

// This code displays current user information in the modal. 
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

//generates the radio buttons for sex selections in the form
function checkRadioButton(user_gender) {
  let buttons = document.querySelectorAll('input[name = "gender"]')
  // console.log(buttons);
  buttons.forEach(element => {
    if (element.value === user_gender) {
      // console.log(element);
      element.checked = true
    }
  });
}

