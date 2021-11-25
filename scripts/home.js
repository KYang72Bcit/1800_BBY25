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
          var screeninglist = userDoc.data().screeninglist;
          var picUrl = userDoc.data().profilepic;
        //console.log("pic URL is: " + picUrl);
        //document.querySelector("#name").innerHTML = user_Name;
       
        $("#userImg").attr("src", picUrl);
          if(screeninglist != null){
            currentScreen = currentUser.collection("screenings");
           
            const upcomingScreenings = document.getElementById("upcomingScreenings");
            const checking = document.querySelector('#checking_go_here');
            let ListTemplate = document.getElementById("ListTemplate");
            upcomingScreenings.innerHTML = "<h2 class='display-6'>Upcoming Screenings: </h2>";
            screeninglist.forEach(async screen=>{
              var newcard = ListTemplate.content.cloneNode(true);
              console.log(screen);
              const screeningPackage = currentScreen.doc(screen);
              switch (screen) {
                case "dental-checking":
                  screen = "Dental Checkup:"
                  break;
                case "Blood-Grouping-and-Rh-Factor":
                  screen = "Blood Test:"
                  break;
              }
              // Need to add div card with screen as text...
              newcard.querySelector('.screening').innerHTML = screen;
              
              async function getTime(){
                
                return screeningPackage.get().then((screeningTime)=> {
                  
                  const time = screeningTime.data().date;
  
                  return time;   
                })
              }
              
              const time = await getTime();
              console.log(time);
              newcard.querySelector('#date').innerHTML = time;
              checking.appendChild(newcard);

            })
          }
          
          var user_gender = userDoc.data().gender;
          
          // check if documents have that variables, assign the value to span with certain id. 
          console.log(user_gender);
          if (user_gender == null) {
            console.log("gender hasn't been set yet");
            $("#myModal").modal('show');
            console.log("Hi there, please fill out this form.");
          }

          if(screeninglist == null){
            document.getElementById("getRecommendations").innerHTML = "<h1 class='display-6'>Check Your Recommended Screenings: </h2> <br><button class='btn btn-info' id='gotoRecommended' style='padding: 20px'>Let's go!</button>";
          } 

          if(screeninglist == null) {
            document.getElementById("gotoRecommended").onclick = function () {
            location.href = "MyScreenings.html";
            }
          }
          
        });

      } else {
        // No user is signed in.
      }
    });

});

