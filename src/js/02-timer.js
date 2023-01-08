import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';




const btnStart = document.querySelector('[data-start]');
const inputDate = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr(inputDate, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return {
    days,
    hours,
    minutes,
    seconds
  };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

btnStart.addEventListener('click', () => {
  const timer = setInterval(() => {
    const setCount = new Date(inputDate.value) - new Date();
    btnStart.disabled = true;
    if (setCount >= 0) {
      const timeDown = convertMs(setCount);
      days.textContent = addLeadingZero(timeDown.days);
      hours.textContent = addLeadingZero(timeDown.hours);
      minutes.textContent = addLeadingZero(timeDown.minutes);
      seconds.textContent = addLeadingZero(timeDown.seconds);
    } else {
      Notiflix.Notify.success('The countdown is finished');
      clearInterval(timer);
    }
  }, 1000);
});