const date = new Date();

const renderCalendar = () => {

const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate() + 1;

const firstDayIndex = date.getDay();
// console.log(firstDayIndex);

const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

const monthDays = document.querySelector(".days");

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

document.querySelector(".date p").innerHTML = date.toDateString();

let days = "";

for(let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x}</div>`;
}

for (let i = 1; i <= lastDay; i++) {
    if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
        days += `<div class="today">${i}</div>`;
    } else {
        days += `<div>${i}</div>`;
    }
    
}

for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`
    monthDays.innerHTML = days;
}
}

if (document.querySelector('.prev') !== null ) {

    document.querySelector('.prev').addEventListener('click', () => {
        date.setMonth(date.getMonth() - 1)
        renderCalendar();
    })
}

if (document.querySelector('.next') !== null ) {

    document.querySelector('.next').addEventListener('click', () => {
        date.setMonth(date.getMonth() + 1)
        renderCalendar();
    })
}
// const month = date.getMonth();
renderCalendar();
