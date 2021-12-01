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
          if(screeninglist != null){
            currentScreen = currentUser.collection("screenings");
           
            const upcomingScreenings = document.getElementById("upcomingScreenings");
            const checking = document.querySelector('#checking_go_here');
            let ListTemplate = document.getElementById("ListTemplate");
            upcomingScreenings.innerHTML = "<h2 class='display-5'>Upcoming Screenings: </h2>";
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
              
              newcard.querySelector('.date').innerHTML = time;
              checking.appendChild(newcard);


              const date = new Date();
              const renderCalendar = () => {
                date.setDate(1);
              
                // console.log(date.getDay());
              
              
                const monthDays = document.querySelector(".days");
              
                const lastDay = new Date(
                  date.getFullYear(),
                  date.getMonth() + 1,
                  0
                ).getDate();
              
                const prevLastDay = new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  0
                ).getDate();
              
                const firstDayIndex = date.getDay();
              
                const lastDayIndex = new Date(
                  date.getFullYear(),
                  date.getMonth() + 1,
                  0
                ).getDay();
              
                const nextDays = 7 - lastDayIndex - 1;
              
                const months = [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ];
              
                document.querySelector(".date h1").innerHTML = months[date.getMonth()];
              
                document.querySelector(".date p").innerHTML = new Date().toDateString();
              
                let days = "";
              
                for (let x = firstDayIndex; x > 0; x--) {
                  days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
                }
              
                
              
                const renderCalendar = () => {
                    // Check if user is signed in:
                    if (user) {
                      //go to the correct user document by referencing to the user uid
                      var currentUser = db.collection("users").doc(user.uid);
                      // var checkupDate = db.collection("users").doc(user.uid).collection("screenings").doc(dentalchecking);
                      var checkupDates = currentUser.collection("screenings").doc("Dental-Examination");
                      
                
                      checkupDates.get().then((userDoc) => {
                        //get user information from document and stored in variables .
                        var upcomingAppointment = userDoc.data().date;
                        const myDate = upcomingAppointment.split("-");
                        console.log(upcomingAppointment);
                        for (let i = 0; i < myDate.length; i++) {
                          if (i === 0) {
                            var appYear = myDate[i];
                          }
                          if (i === 1) {
                            var appMonth = parseInt(myDate[i]);
                          }
                          if (i === 2) {
                            var appDay = parseInt(myDate[i]);
                          }
                        }
                      console.log("date is: " + appDay);
                for (let i = 1; i <= lastDay; i++) {
                  if (
                    i === new Date().getDate() &&
                    date.getMonth() === new Date().getMonth()
                  ) {
                    days += `<div class="today">${i}</div>`;
                  } else if (
                    i === appDay && appMonth === date.getMonth() + 1
                  ) {
                    days += `<div class="futureScreening">${i}</div>`;
                  } else {
                    days += `<div>${i}</div>`;
                  }
                }
              
                for (let j = 1; j <= nextDays; j++) {
                  days += `<div class="next-date">${j}</div>`;
                  monthDays.innerHTML = days;
                }
              });
                      
              // console.log(checkupDate);
              } else {
              console.log("No user is signed in.");
              }
            }
            renderCalendar();
            
              };






            

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
            document.getElementById("getRecommendations").innerHTML = "<h1 class='display-5'>Get Recommended Screenings: </h2> <br><button class='btn btn-primary' id='gotoRecommended'>Let's go!</button>";
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







document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});


