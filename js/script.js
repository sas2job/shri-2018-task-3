"use strict";

var headerButton = document.querySelector(".header__button");

var mainPage = document.querySelector("main");

var timeNow = mainPage.querySelector(".diagram__time-now");
var timeLine = mainPage.querySelector(".diagram__time-line");
var rowsWithRooms = mainPage.querySelectorAll(".floor__row");
var room = mainPage.querySelector(".floor__room");
var roomTitles = mainPage.querySelectorAll(".floor__room-title");
var events = mainPage.querySelectorAll(".floor__event");
var eventTooltips = mainPage.querySelectorAll(".tooltip");
var slotsOffTime = mainPage.querySelectorAll(".floor__off-time");
var date = mainPage.querySelector(".date");
var dateActive = date.querySelector(".date__active-date");
var dateCalendar = date.querySelector(".calendar");

var eventPage = document.querySelector(".event");

var eventHeading = eventPage.querySelector(".event__heading");
var inputEventName = eventPage.querySelector(".event__name input");
var buttonResetEventName = inputEventName.nextElementSibling;
var inputEventDate = eventPage.querySelector(".event__date input");
var eventCalendarControl = eventPage.querySelector(".event__calendar-contol");
var eventCalendar = eventPage.querySelector(".calendar");
var inputEventStart = eventPage.querySelector(".event__start input");
var inputEventEnd = eventPage.querySelector(".event__end input");
var inputEventCandidate = eventPage.querySelector(".event__participants input");
var buttonOpenCandidates = eventPage.querySelector(".event__candidates-control");
var buttonResetInputCandidate = inputEventCandidate.nextElementSibling;
var eventCandidatesList = eventPage.querySelector(".event__candidates");
var eventUsersList = eventPage.querySelector(".event__users");
var eventRecommendation = eventPage.querySelector(".event__recommendation");
var eventVariants = eventRecommendation.querySelectorAll(".event__variant");
var eventHelp = eventPage.querySelector(".event__help");
var eventWarning = eventPage.querySelector(".event__warning");
var buttonTopEventClose = eventPage.querySelector(".event__top-close");
var buttonFooterEventClose = eventPage.querySelector(".event__footer-close");
var buttonEventCreate = eventPage.querySelector(".event__create");
var buttonEventSave = eventPage.querySelector(".event__save");
var buttonEventRemove = eventPage.querySelector(".event__remove");

var modal = document.querySelector(".modal");

var modalEventCreate = modal.querySelector(".modal__message--create");
var modalEventRemove = modal.querySelector(".modal__message--remove");
var buttonModalOk = modal.querySelector(".modal__ok");
var buttonModalCancel = modal.querySelector(".modal__candel");
var buttonModalRemove = modal.querySelector(".modal__remove");


var onClick = function (item, func) {
  item.addEventListener("click", function (evt) {
    evt.preventDefault ();
    func ();
  });
};

var eventOpen = function () {
  eventPage.removeAttribute('style');
  eventHeading.innerHTML = "Новая встреча";
  eventHelp.removeAttribute('style');
  eventWarning.style.display = "none";
  buttonEventCreate.removeAttribute('style');
  buttonEventRemove.style.display = "none";
  buttonEventSave.style.display = "none";
  mainPage.style.display = "none";
  headerButton.style.display = "none";
  modal.style.display = "none";
};

var eventEdit = function () {
  eventPage.removeAttribute('style');
  eventHeading.innerHTML = "Редактирование встречи";
  eventHelp.style.display = "none";
  eventWarning.removeAttribute('style');
  buttonEventCreate.style.display = "none";
  buttonEventRemove.removeAttribute('style');
  buttonEventSave.removeAttribute('style');
  mainPage.style.display = "none";
  headerButton.style.display = "none";
  modal.style.display = "none";
}

var eventClose = function () {
  eventPage.style.display = "none";
  mainPage.removeAttribute('style');
  headerButton.removeAttribute('style');
  eventRecommendation.removeAttribute('style');
  eventWarning.removeAttribute('style');
}


// При открытии страницы

eventPage.style.display = "none";


// Отображение текущего времени

var timeOutput = function () {
  var now = new Date ();
  var hour = now.getHours();
  var minute = now.getMinutes()
  var minuteInDay = hour * 60 + minute;
  if (minute < 10) {
    timeNow.innerHTML = hour + ":0" + minute;
  } else {
    timeNow.innerHTML = hour + ":" + minute;
  };
  if (minuteInDay >= 450 && minuteInDay <= 1410) {
    timeNow.style.left = (minuteInDay - 450) * 1.1 + 180 + "px";
    timeLine.style.left = (minuteInDay - 450) * 1.1 + 180 + "px";
  } else if (minuteInDay < 450) {
    timeNow.style.left = "180px";
    timeLine.style.left = "180px";
  } else {
    timeNow.style.left = "100%";
    timeLine.style.left = "100%";
  };
};

timeOutput();

var timeOutputUpdate = setInterval (function () {
  timeOutput();
}, 60000);


// Отображение сегодняшней даты

var dateCurrent = new Date ();

var options = {
  day: 'numeric',
  month: 'short',
};

var dataCurrentText = dateCurrent.toLocaleString("ru", options);
dataCurrentText = dataCurrentText.slice(0, dataCurrentText.length-1);

dateActive.innerHTML = dataCurrentText + " · Сегодня";


// Появление плавающего тултипа с названием переговорки

var roomOnScroll = function (items) {
  if (window.pageXOffset > room.offsetWidth) {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.add("floor__room-title--tooltip");
      items[i].style.left = window.pageXOffset + 12 + "px";
    };
  } else {
    for (var j = 0; j < roomTitles.length; j++) {
      if (items[j].classList.contains("floor__room-title--tooltip")) {
        items[j].classList.remove("floor__room-title--tooltip");
      };
    };
  };
};

window.addEventListener("scroll", function () {
  roomOnScroll(roomTitles);
});


// Открытие и закрытите календаря на главной странице

dateActive.addEventListener("click", function () {
  dateCalendar.classList.toggle("date__calendar--shown");
});

dateCalendar.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("calendar__day-number")) {
    setTimeout(function () {
      dateCalendar.classList.remove("date__calendar--shown");
    }, 350);
  }
});


// Открытие и закрытите календаря на странице встречи

eventCalendarControl.addEventListener("click", function () {
  eventCalendar.classList.toggle("event__calendar--shown");
});

eventCalendar.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("calendar__day-number")) {
    evt.preventDefault ();
    setTimeout (function () {
      eventCalendar.classList.remove("event__calendar--shown");
    }, 350);
  }
});


// Открытие страницы с созданием встречи при клике на кнопку в шапке

headerButton.addEventListener("click", function (evt) {
  evt.preventDefault ();
  eventOpen ();
  buttonResetEventName.style.display = "none";
  inputEventDate.value = "";
  inputEventStart.value = "";
  inputEventEnd.value = "";
  eventUsersList.innerHTML = "";
  eventRecommendation.innerHTML = "";
});


// Открытие страницы с созданием встречи при клике на свободном слоте

var eventOpeninRoom = function (item) {
  item.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("floor__plus")) {
      evt.preventDefault();
      eventOpen ();
    };
  });
};

for (var i = 0; i < rowsWithRooms.length; i++) {
  eventOpeninRoom (rowsWithRooms[i]);
};


// Появление тултипа с информацией о встрече и переход на страницу встречи

var tooltipOnClick = function (item) {
  item.addEventListener("click", function (evt) {
    evt.preventDefault ();
    item.classList.toggle("floor__event--active");
    setTimeout (function () {
    if (item.classList.contains("floor__event--active")) {
      item.classList.remove("floor__event--active");
    }
    }, 30000);
    if (evt.target.classList.contains("tooltip__edit")) {
      eventEdit ();
    };
  });
};

for (var i = 0; i < events.length; i++) {
  var eventLeft = events[i].offsetWidth / 2 - eventTooltips[i].offsetWidth / 2;
  eventTooltips[i].style.marginLeft = eventLeft + "px";
  tooltipOnClick (events[i]);
};


// Открытие и закрытие списка возможных участников на странице всречи

inputEventCandidate.addEventListener("focus", function () {
  eventCandidatesList.classList.add("event__candidates--shown");
  buttonOpenCandidates.removeAttribute('style');
});

inputEventCandidate.addEventListener("blur", function () {
  if (eventCandidatesList.classList.contains("event__candidates--shown")) {
    eventCandidatesList.classList.remove("event__candidates--shown");
    buttonOpenCandidates.style.display = "none";
  };
  if (inputEventCandidate.value) {
    buttonResetInputCandidate.removeAttribute('style');
  } else {
    buttonResetInputCandidate.style.display = "none";
  };
});

buttonOpenCandidates.addEventListener("click", function () {
  if (eventCandidatesList.classList.contains("event__candidates--shown")) {
    eventCandidatesList.classList.remove("event__candidates--shown");
  };
});


// Появление кнопки сброса при вводе темы встречи

inputEventName.addEventListener("input", function () {
  if (inputEventName.value) {
    buttonResetEventName.removeAttribute('style');
  } else {
    buttonResetEventName.style.display = "none";
  };
});


// Выбор переговорки из предложенных

var variantOnClick = function (item) {
  item.addEventListener("click", function (evt) {
    evt.preventDefault ();
    var input = item.querySelector("input");
    if (!input.checked) {
      eventRecommendation.dataset.heading = "Ваша переговорка";
      input.checked = true;
      item.classList.add("event__variant--active");
      for (var i = 0; i < eventVariants.length; i++) {
        if (!eventVariants[i].classList.contains("event__variant--active")) {
          eventVariants[i].style.display = "none";
        };
      };
    } else {
      eventRecommendation.dataset.heading = "Рекомендованные переговорки";
      input.checked = false;
      for (var i = 0; i < eventVariants.length; i++) {
        eventVariants[i].removeAttribute('style');
        eventVariants[i].classList.remove("event__variant--active");
      };
    };
  });
};

for (var i = 0; i < eventVariants.length; i++) {
  variantOnClick(eventVariants[i]);
};


// Закрытие страницы встречи без сохранения

buttonTopEventClose.addEventListener("click", function () {
  eventClose ();
});

buttonFooterEventClose.addEventListener("click", function () {
  eventClose ();
});


// Закрытие страницы встречи c появлением модального окна

modal.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("modal__remove")) {
    eventPage.submit();
    eventClose ();
    modal.style.display = "none";
  } else if (evt.target.classList.contains("modal__button")) {
    modal.style.display = "none";
  };
});
