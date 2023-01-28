// "use strict";

var sta = 0;
var input = document.getElementById("input"), // دکمه ورودی/خروجی
  number = document.querySelectorAll(".number"), // دکمه های عددی
  operator = document.querySelectorAll(".operator"), // دکمه های اپراتور
  result = document.getElementById("result"), // دکمه مساوی
  clear = document.getElementById("clear"), // دکمه پاک کردن
  clearAll = document.getElementById("clearAll"), // دکمه پاک کردن کلی
  resultDisplayed = false; // وضعیت نمایش خروجی

// اضافه کردن کنترل کننده های کلیک به دکمه های اعداد
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function (e) {
    // ذخیره رشته ورودی فعلی و آخرین کاراکتر آن در متغیرها - بعداً استفاده می شود
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // اگر نتیجه نمایش داده نشد، فقط به اضافه کردن ادامه دهید
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (
      (resultDisplayed === true && lastChar === "+") ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      // اگر نتیجه در حال حاضر نمایش داده شود و کاربر یک اپراتور را فشار داده باشد
      // برای عملیات بعدی باید به رشته اضافه کنیم
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // اگر نتیجه در حال حاضر نمایش داده شود و کاربر یک عدد را فشار داده باشد
      // ما باید رشته ورودی را پاک کنیم و ورودی جدید را برای شروع عملیات جدید اضافه کنیم
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// اضافه کردن کنترل کننده های کلیک به دکمه های اعداد
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function (e) {
    // ذخیره رشته ورودی فعلی و آخرین کاراکتر آن در متغیرها - بعداً استفاده می شود
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];
    // اگر آخرین کاراکتر وارد شده یک اپراتور است، آن را با علامت فعلی جایگزین کنید
    if (
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      var newString =
        currentString.substring(0, currentString.length - 1) +
        e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      // اگر اولین کلید فشار داده شده یک اپراتور است، کاری انجام ندهید
      console.log("enter a number first");
    } else {
      // در غیر این صورت فقط اپراتور فشرده شده را به ورودی اضافه کنید
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// با کلیک بر روی دکمه مساوی
result.addEventListener("click", function () {
  var inputString = input.innerHTML;

  // تشکیل آرایه ای از اعداد به عنوان مثال برای رشته بالا این خواهد بود: اعداد = ["10"، "26"، "33", "56"، "34"، "23"]
  var numbers = inputString.split(/\+|\-|\×|\÷/g);

  // تشکیل آرایه ای از عملگرها برای رشته بالا، عملگرها = ["+"، "+"، "-"، "*"، "/"]
  // ابتدا تمام اعداد و نقطه ها را با رشته خالی جایگزین می کنیم و سپس تقسیم می کنیم
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  // اکنون در حال حلقه زدن از طریق آرایه و انجام یک عملیات در یک زمان هستیم.
  // ابتدا تقسیم، سپس ضرب، سپس تفریق و سپس جمع
  // همانطور که حرکت می کنیم، اعداد اصلی و آرایه عملگرها را تغییر می دهیم
  // عنصر نهایی باقی مانده در آرایه خروجی خواهد بود

  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    // استفاده از parseFloat ضروری است، در غیر این صورت منجر به الحاق رشته می شود :)
    numbers.splice(
      add,
      2,
      parseFloat(numbers[add]) + parseFloat(numbers[add + 1])
    );
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // نمایش خروجی

  resultDisplayed = true; // در صورت نمایش نتیجه، پرچم چرخاندن
});

// پاک کردن ورودی
clear.addEventListener("click", function () {
  input.innerHTML = "";
});
// پاک کردن ورودی کلی
clearAll.addEventListener("click", function () {
  let mathOperation = input.innerHTML;
  input.innerHTML = mathOperation.substring(0, mathOperation.length - 1);
});
