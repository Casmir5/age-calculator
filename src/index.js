"use strict";

const labelDay = document.querySelector(".label-day");
const labelMonth = document.querySelector(".label-month");
const labelYear = document.querySelector(".label-year");

const inputDay = document.querySelector("#day");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");

const yearEL = document.querySelector("#year-el");
const monthEL = document.querySelector("#month-el");
const dayEl = document.querySelector("#day-el");
const btn = document.querySelector(".btn");

const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const errorDay = document.querySelector(".error-day");
const errorMonth = document.querySelector(".error-month");
const errorYear = document.querySelector(".error-year");

const yearValue = inputYear.value;
const monthValue = inputMonth.value;
const dayValue = inputDay.value;
console.log(inputYear, inputMonth, inputDay, yearEL, monthEL, dayEl, btn);

const maxInputlength = function () {
  inputYear.addEventListener("keyup", function (e) {
    if (inputYear.value.length > 3) {
      // alert("length is");
      inputYear.value = inputYear.value.slice(0, 4);
    }
  });

  inputMonth.addEventListener("keyup", function (e) {
    if (inputMonth.value.length > 1) {
      // alert("length is");
      inputMonth.value = inputMonth.value.slice(0, 2);
    }
  });

  inputDay.addEventListener("keyup", function (e) {
    if (inputDay.value.length > 1) {
      // alert("length is");
      inputDay.value = inputDay.value.slice(0, 2);
    }
  });
};

maxInputlength();

let hasYearBeenValidated, hasMonthBeenValidated, hasDayBeenValidated;
hasYearBeenValidated = hasMonthBeenValidated = hasDayBeenValidated = false;

const validateInputs = function (
  year,
  month,
  day,
  userBirthMonth,
  userBirthYear
) {
  console.log(`current year :${year}, user Birth Year ${userBirthYear}`);
  // if ((year, month, day, userBirthMonth, userBirthYear)) {
  // validate input year
  if (userBirthYear === "") {
    console.log("the field(year) is empty");
    labelYear.classList.add("error-text");
    inputYear.classList.add("error");
    errorYear.textContent = "the field is required";
    // hasYearBeenValidated = false;
  } else if (userBirthYear > year) {
    console.log("egbon from the future , rest!!!");
    labelYear.classList.add("error-text");
    inputYear.classList.add("error");
    errorYear.textContent = "Must be in the past";
    hasYearBeenValidated = false;
  } else if (userBirthYear < 1) {
    labelYear.classList.add("error-text");
    inputYear.classList.add("error");
    errorYear.textContent = "Invalid input";
    hasYearBeenValidated = false;
  } else if (userBirthYear.length < 4) {
    labelYear.classList.add("error-text");
    inputYear.classList.add("error");
    errorYear.textContent = "Invalid input format";
    hasYearBeenValidated = false;
  } else {
    labelYear.classList.remove("error-text");
    inputYear.classList.remove("error");
    errorYear.textContent = "";
    hasYearBeenValidated = true;
  }
  // validate input month
  if (month === "") {
    console.log("the field(month) is required");
    labelMonth.classList.add("error-text");
    inputMonth.classList.add("error");
    errorMonth.textContent = "This field is required";
    console.log(month);
  } else if (+month > 12 || +month < 1) {
    // console.log(month);
    labelMonth.classList.add("error-text");
    inputMonth.classList.add("error");
    errorMonth.textContent = "Must be a valid month";
    hasMonthBeenValidated = false;
  } else {
    labelMonth.classList.remove("error-text");
    inputMonth.classList.remove("error");
    errorMonth.textContent = "";
    hasMonthBeenValidated = true;
  }

  // validate input day
  if (day === "") {
    console.log("the field(day) is required");
    labelDay.classList.add("error-text");
    inputDay.classList.add("error");
    errorDay.textContent = "the field is required";
  } else if (day > numberOfDaysInMonth(userBirthMonth)) {
    labelDay.classList.add("error-text");
    inputDay.classList.add("error");
    errorDay.textContent = "must be a valid day";
    hasDayBeenValidated = false;
  } else {
    labelDay.classList.remove("error-text");
    inputDay.classList.remove("error");
    errorDay.textContent = "";
    // hasDayBeenValidated = false;
    hasDayBeenValidated = true;
  }
};
// };

// validateInput(2023);

const numberOfDaysInMonth = function (month) {
  let maxDaysinMonth;
  if (month === 4 || month === 6 || month === 9 || month === 11) {
    maxDaysinMonth = 30;
  } else if (month === 2) {
    maxDaysinMonth = year % 2 === 0 ? 28 : 29;
  } else {
    maxDaysinMonth = 31;
  }

  return maxDaysinMonth;
};

// console.log("helloo" + validateInputs(2023, 12, 20, 13));
console.log(numberOfDaysInMonth(2));
if (2 < numberOfDaysInMonth(5)) {
  console.log("perfecteto");
} else {
  console.log("error");
}

btn.addEventListener("click", function () {
  const yearValue = inputYear.value;
  const monthValue = inputMonth.value;
  const dayValue = inputDay.value;

  const userBirthDate = new Date(
    inputYear.value,
    inputMonth.value,
    inputDay.value
  );

  const userBirthYear = yearValue;
  const userBirthMonth = userBirthDate.getMonth();
  const userBirthDay = userBirthDate.getDate();

  validateInputs(year, monthValue, dayValue, userBirthMonth, userBirthYear);
  console.log(+monthValue);
  // console.log(+monthValue > 12 || +monthValue < 1);
  // console.log(monthValue > 12 || monthValue < 1);
  console.log(hasDayBeenValidated, hasMonthBeenValidated, hasYearBeenValidated);
  if (hasDayBeenValidated && hasMonthBeenValidated && hasYearBeenValidated) {
    let yearDiff = year - userBirthYear;
    let monthDiff = month - userBirthMonth;
    let dayDiff = day + userBirthDay;

    if (monthDiff < 0) {
      monthDiff = monthDiff + 12;
    }
    if (
      month < userBirthMonth ||
      (month === userBirthMonth && day > userBirthDay)
    ) {
      yearDiff += -1;
    }
    const targetDate = new Date(`${year}-${userBirthMonth}-${userBirthDay}`);
    calculateDateDifference(today, targetDate);
    yearEL.textContent = yearDiff;
    monthEL.textContent = remainingMonth;
    dayEl.textContent = remainingDays;
  } else {
    console.log("i cant help you");
  }
});
console.log();

// let calcTime = 24 * 60 * 60 * 1000;
// const daysSpent = Math.abs(new Date("2023-09-21") - today);
// const player = Math.floor(daysSpent / calcTime);
// let mymonth, mydays;
// console.log(player);

// if (player % 30 === 0) {
//   mymonth += player / 30;
//   mydays = 0;
// } else if (player % 30 !== 0) {
//   mydays = player % 30;
//   mymonth = Math.trunc(player / 30);
// }

let remainingDays, remainingMonth;
console.log(remainingDays, remainingMonth);
function calculateDateDifference(today, targetDate) {
  const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  const timeDiff = Math.abs(targetDate - today); // Difference in milliseconds
  const daysDiff = Math.floor(timeDiff / oneDay); // Convert milliseconds to days
  if (daysDiff % 30 === 0) {
    remainingMonth += daysDiff / 30;
    remainingDays = 0;
  } else if (daysDiff % 30 !== 0) {
    remainingDays = daysDiff % 30;
    remainingMonth = Math.trunc(daysDiff / 30);
  }
  return daysDiff;
}

const mytarget = new Date(`${2023}-${9}-${28}`);
const todays = new Date(); // Current date
const targetDate = new Date("2023-09-28");
// Target date: September 28, 2023
const difference = calculateDateDifference(todays, targetDate);
console.log(remainingDays, remainingMonth);

console.log(
  `The difference between today and September 28 is ${difference} days.`
);
