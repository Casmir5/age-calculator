"use strict";

// labels
const labelDay = document.querySelector(".label-day");
const labelMonth = document.querySelector(".label-month");
const labelYear = document.querySelector(".label-year");

// Inputs
const inputDay = document.querySelector("#day");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");

// Errors Elements
const errorDay = document.querySelector(".error-day");
const errorMonth = document.querySelector(".error-month");
const errorYear = document.querySelector(".error-year");

//  User Age Elements
const yearEL = document.querySelector("#year-el");
const monthEL = document.querySelector("#month-el");
const dayEl = document.querySelector("#day-el");
const btn = document.querySelector(".btn");

// Current date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
let year = today.getFullYear();

let hasYearBeenValidated, hasMonthBeenValidated, hasDayBeenValidated;
hasYearBeenValidated = hasMonthBeenValidated = hasDayBeenValidated = false;

//Set Inputs maximum length
const maxInputlength = function () {
  // Input Year maximum length = 4
  inputYear.addEventListener("keyup", function () {
    if (inputYear.value.length > 3) {
      inputYear.value = inputYear.value.slice(0, 4);
    }
  });

  // Input Month maximum length = 2
  inputMonth.addEventListener("keyup", function () {
    if (inputMonth.value.length > 1) {
      inputMonth.value = inputMonth.value.slice(0, 2);
    }
  });

  // Input Month maximum length = 2
  inputDay.addEventListener("keyup", function () {
    if (inputDay.value.length > 1) {
      inputDay.value = inputDay.value.slice(0, 2);
    }
  });
};

maxInputlength();

const validateInputs = function (
  year,
  month,
  day,
  userBirthMonth,
  userBirthYear
) {
  // is year input empty?
  if (userBirthYear === "") {
    console.log("the field(year) is empty");
    labelYear.classList.add("error-text");
    inputYear.classList.add("error");
    errorYear.textContent = "this field is required";

    // is birth year in the future?
  } else if (userBirthYear > year) {
    console.log("egbon from the future , rest!!!");
    labelYear.classList.add("error-text");
    inputYear.classList.add("error");
    errorYear.textContent = "Must be in the past";
    hasYearBeenValidated = false;
  }

  // is the birthyear negative value
  else if (userBirthYear < 1) {
    labelYear.classList.add("error-text");
    inputYear.classList.add("error");
    errorYear.textContent = "Invalid input";
    hasYearBeenValidated = false;
  }

  // is the birthyear correctly formatted
  else if (userBirthYear.length < 4) {
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

  // is month input empty?
  if (month === "") {
    console.log("the field(month) is required");
    labelMonth.classList.add("error-text");
    inputMonth.classList.add("error");
    errorMonth.textContent = "This field is required";
    console.log(month);
  }
  // does birth month exist
  else if (+month > 12 || +month < 1) {
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

  // is input input day empty
  if (day === "") {
    console.log("the field(day) is required");
    labelDay.classList.add("error-text");
    inputDay.classList.add("error");
    errorDay.textContent = "the field is required";
  }

  // does the days correspond the birth month length?
  else if (day > monthLength(userBirthMonth)) {
    labelDay.classList.add("error-text");
    inputDay.classList.add("error");
    errorDay.textContent = "must be a valid day";
    hasDayBeenValidated = false;
  } else {
    labelDay.classList.remove("error-text");
    inputDay.classList.remove("error");
    errorDay.textContent = "";
    hasDayBeenValidated = true;
  }
};

// check the number of days in the inputed Month
const monthLength = function (month) {
  let monthDays;
  if (month === 4 || month === 6 || month === 9 || month === 11) {
    monthDays = 30;
  } else if (month === 2) {
    monthDays = year % 2 === 0 ? 28 : 29;
  } else {
    monthDays = 31;
  }

  return monthDays;
};

btn.addEventListener("click", function () {
  const yearInputValue = inputYear.value;
  const monthInputValue = inputMonth.value;
  const dayInputValue = inputDay.value;

  const userBirthDate = new Date(
    yearInputValue,
    monthInputValue,
    dayInputValue
  );

  const userBirthYear = yearInputValue;
  const userBirthMonth = userBirthDate.getMonth() + 1;
  const userBirthDay = userBirthDate.getDate();

  validateInputs(
    year,
    monthInputValue,
    dayInputValue,
    userBirthMonth,
    userBirthYear
  );

  console.log(hasDayBeenValidated, hasMonthBeenValidated, hasYearBeenValidated);
  // has all inputs been validated?
  if (hasDayBeenValidated && hasMonthBeenValidated && hasYearBeenValidated) {
    // calc user age
    let calcYearDiff = year - userBirthYear;

    // has user done his or her birthay? if not reduce birth age
    if (
      month < userBirthMonth ||
      (month === userBirthMonth && day > userBirthDay)
    ) {
      calcYearDiff += -1;
    }

    console.log(Number(userBirthMonth) === 12);
    // let newYear = Number(userBirthMonth) === 12 ? year + 1 : year;

    // if (Number(userBirthMonth) === 12) {
    //   year + 1;
    // } else {
    //   year = year;
    // }
    console.log(userBirthMonth + "hello");
    const mysmonth = monthLength(userBirthMonth);
    const targetDate = new Date(`${year}-${userBirthMonth}-${userBirthDay}`);
    console.log(`TTTT${targetDate}`);

    calculateDateDifference(today, targetDate, mysmonth, monthInputValue);
    yearEL.textContent = calcYearDiff;
    monthEL.textContent = remainingMonth;
    dayEl.textContent = remainingDays;
  } else {
    console.log("egbon validate your inputs");
  }
});

let remainingDays, remainingMonth;
console.log(remainingDays, remainingMonth);
function calculateDateDifference(
  currentDate,
  targetDate,
  monthLength,
  birthMonth
) {
  // const current =
  //   Number(birthMonth) === 12
  //     ? currentDate.getFullYear() + 1
  //     : currentDate.getFullYear();
  // // Number of milliseconds in a day
  // currentDate.setFullYear(current);
  const oneDay = 24 * 60 * 60 * 1000;
  const timeDiff = Math.abs(targetDate - currentDate);
  console.log(targetDate); // Difference in milliseconds
  const daysDiff = Math.floor(timeDiff / oneDay); // Convert milliseconds to days
  if (daysDiff % monthLength === 0) {
    remainingMonth += daysDiff / monthLength;
    remainingDays = 0;
  } else if (daysDiff % monthLength !== 0) {
    remainingDays = daysDiff % monthLength;
    remainingMonth = Math.trunc(daysDiff / monthLength);
  }
  return daysDiff;
}

console.log(new Date("11-12-20"));
// if(today.getFullYear())

const testMonth = 9;
console.log(testMonth === 12 ? year + 1 : year);
