//These are the homepage scripts, customized for its users. This program greets the users, prompts them for their basic information
//if they are new users, and populates the card either inviting the users to check out their recommended screenings, or to display
//all the previously selected screenings and their dates. 

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

        //displays currently selected screenings
          if(screeninglist != null){
            currentScreen = currentUser.collection("screenings");
           
            const upcomingScreenings = document.getElementById("upcomingScreenings");
            const checking = document.querySelector('#checking_go_here');
            let ListTemplate = document.getElementById("ListTemplate");
            upcomingScreenings.innerHTML = "<h2 class='display-6 cardHeader'>Upcoming Screenings: </h2>";
            screeninglist.forEach(async screen=>{
              var newcard = ListTemplate.content.cloneNode(true);
              console.log(screen);

              //Slight formatting for the wording of different screenings
              const screeningPackage = currentScreen.doc(screen);
              switch (screen) {
                case "Dental-Examination":
                  screen = "Dental Examination:"
                  break;
                case "Complete-Blood-Count":
                    screen = "Complete Blood Count:"
                    break;
                case "Comprehensive-Metabolic-Panel":
                    screen = "Comprehensive Metabolic Panel:"
                    break;
                case "Random-Blood-Sugar":
                    screen = "Random Blood Sugar:"
                    break;
                case "Thyroid-Panel":
                    screen = "Thyroid Panel:"
                    break;
                case "Pap-Smear":
                    screen = "Pap Smear:"
                    break;
                case "Ultrasound-Abdomen-and-Pelvis":
                    screen = "Abdomen and Pelvis Ultrasound:"
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
          
          //checks if this is a new user by looking at the value for their sex/gender. If it's null, prompts them with the basic 
          //information form 
          console.log(user_gender);
          if (user_gender == null) {
            console.log("gender hasn't been set yet");
            $("#myModal").modal('show');
            console.log("Hi there, please fill out this form.");
          }

          //checks if the user previously selected any screenings, and if not, invites them to MyScreenings page to receive their
          //recommendations
          if(screeninglist == null){
            document.getElementById("getRecommendations").innerHTML = "<h2 class='display-6 cardHeader'>Check Your Recommended Screenings: </h2> <br><button class='btn btn-info' id='gotoRecommended' style='padding: 20px'>Let's go!</button>";
          } 

          //button to redirect the user to myscreenings.html
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

