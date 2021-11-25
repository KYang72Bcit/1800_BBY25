
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

  $(document).ready(function () {

    firebase.auth().onAuthStateChanged((user) => {
      // Check if user is signed in:
      if (user) {
        // Do something for the current logged-in user here:
        console.log("we're gonna fix your calendar for you");
        //go to the correct user document by referencing to the user uid
        var currentUser = db.collection("users").doc(user.uid);
        // var checkupDate = db.collection("users").doc(user.uid).collection("screenings").doc(dentalchecking);
        var checkupDates = currentUser.collection("screenings").doc("dental-checking");
        
  
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
});
});
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
