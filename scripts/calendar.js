// This program renders the calendar upon refreshing the page. It also highlights the dates for upcoming appointments. 
// renderCalendar function is taken from a Youtube tutorial by Code & Create: "Calendar with HTML, CSS, and JavaScript - How to build 
// calendar using HTML, CSS, and JavaScript". URL: https://www.youtube.com/watch?v=o1yMqPyYeAo.

const date = new Date();

//This method renders the calendar by creating separate divs for each day of the month and also calculating what day of the week every
//month starts and ends with. Depending on that, it also calculates how many days from the previous month should be shown on the 
//first line of the calendar and how many days from the following month should be shown on the last line.
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

  //Inserts the name of each month into the calendar
  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  //Inserts today's date into the calendar's header
  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  //creates divs for each day of the previous month that will be shown in the first line of the calendar
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  //creates divs for each day of the current month, and creates a div with a special class for today's date
  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    }
    else {
      days += `<div id="d${i}">${i}</div>`;
    }
  }
  
  //creates divs for each day of the following month that will be shown on the last line of the calendar
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};


//Highlights the dates of all upcoming appointments by pulling the data from the user's firebase document. 
const highlightCalendar = () => {
  $(document).ready(function () {
    firebase.auth().onAuthStateChanged((user) => {
      // Check if user is signed in:
      if (user) {
        console.log("we're gonna fix your calendar for you");
        //go to the correct user document by referencing to the user uid
        var currentUser = db.collection("users").doc(user.uid);
       
        //acquires the document with the screening times
        currentUser.get().then((userDoc) => {
          var screeningDates = userDoc.data().screeningTime;
          // console.log("HELLOOO: " + screeningDates);
          // console.log("length" + screeningDates.length);
          // console.log(typeof screeningDates);
          // var appDate = screeningDates.split("-");
          // console.log("app date: " + appDate);

          //takes each screening date in the database and parses its date into individual parts: year, month and day
          for (let i = 0; i < screeningDates.length; i++) {
            const appDate = screeningDates[i];
            // console.log("appointment: " + appDate);
            appDateString = appDate.split("-");
            for (let j = 0; j < appDateString.length; j++) {
              if (j === 0) {
                var appYear = appDateString[j];
              }
              if (j === 1) {
                var appMonth = parseInt(appDateString[j]);
              }
              if (j === 2) {
                var appDay = parseInt(appDateString[j]);
              }
            }
            // console.log("month is: " + appMonth);
            // console.log("day is: " + appDay);

            const lastDay = new Date(
              date.getFullYear(),
              date.getMonth() + 1,
              0
            ).getDate();

            //adds the class of "futureScreening" to each upcoming appointment date, which allows for highlighting with css.
            for (let k = 1; k <= lastDay; k++) {
              if (k === appDay && appMonth === date.getMonth() + 1) {
                // console.log("HERE" + k.toString());
                // console.log("HERE:" + document.getElementById("d" + k));
                document
                  .getElementById("d" + k)
                  .setAttribute("class", "futureScreening");
              }
            }
          }
        });

        // console.log(checkupDate);
      } else {
        console.log("No user is signed in.");
      }
    });
  });
};

//Allows the user to go back to the previous month and re-renders the calendar, and highlights the dates
document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
  highlightCalendar();
});

//Allows the user to go next to the following month and re-renders the calendar, and highlights the dates
document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
  highlightCalendar();
});

renderCalendar();
highlightCalendar();
