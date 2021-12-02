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

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

const highlightCalendar = () => {
  $(document).ready(function () {
    firebase.auth().onAuthStateChanged((user) => {
      // Check if user is signed in:
      if (user) {
        // Do something for the current logged-in user here:
        console.log("we're gonna fix your calendar for you");
        //go to the correct user document by referencing to the user uid
        var currentUser = db.collection("users").doc(user.uid);
        // var checkupDate = db.collection("users").doc(user.uid).collection("screenings").doc(dentalchecking);
        // var checkupDates = currentUser.collection("screenings").doc("Dental-Examination");

        currentUser.get().then((userDoc) => {
          var screeningDates = userDoc.data().screeningTime;
          // console.log("HELLOOO: " + screeningDates);
          // console.log("length" + screeningDates.length);
          // console.log(typeof screeningDates);
          // var appDate = screeningDates.split("-");
          // console.log("app date: " + appDate);

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

            for (let k = 1; k <= lastDay; k++) {
              if (k === appDay && appMonth === date.getMonth() + 1) {
                // console.log("HERE" + k.toString());
                // console.log("HERE:" +document.getElementById("d" + k));
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

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
  highlightCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
  highlightCalendar();
});

renderCalendar();
highlightCalendar();
