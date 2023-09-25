// Randomly generated affirmations

const phrases = [
  'I know how to bring direction and order into my life',
  'I choose to be kind to all, including myself',
  'I create an environment that supports my well-being',
  'I love myself first so that I may love others',
  'I am loved',
];

const randomIndex = Math.floor(Math.random() * phrases.length);

const randomPhrase = phrases[randomIndex];

const phraseElement = document.getElementById('randomPhrase');
phraseElement.textContent = randomPhrase;

// Summer Countdown

const button = document.getElementById('summerCountdown');

button.addEventListener('click', summerCountdown);

function summerCountdown() {

  // Set date countdown is to end

  const eventDate = new Date('2024-06-21T15:00:00');

  // Get current date and time

  const currentDate = new Date();

  // Calculate time difference in seconds

  const timeDifference = Math.floor((eventDate - currentDate) / 1000);
  if (timeDifference > 0) {

    // Calculate days, hours, minutes, and seconds

    let days = Math.floor(timeDifference / (60 * 60 * 24));
    let hours = Math.floor((timeDifference % (60 * 60 * 24)) / (60 * 60));
    let minutes = Math.floor((timeDifference % (60 * 60)) / 60);
    let seconds = Math.floor(timeDifference % 60);

    // Display countdown

    const countdownElement = document.getElementById('summerCountdown');
    countdownElement.textContent = `Summer starts in: ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    countdownElement.classList.add('summerCountdownStyle');

    // Update countdown every second

    setTimeout(summerCountdown, 1000);
  } else {

    // If event has already occurred

    const countdownElement = document.getElementById('summerCountdown');
    countdownElement.textContent = 'Enjoy summer break!';
    countdownElement.classList.add('summerCountdownStyle');
  }
}

//Customize Planner Name

const para = document.getElementById('myGreatDay');

para.addEventListener('click', updateName);

function updateName() {
  const name = prompt('Enter your name');
  para.textContent = `${name}'s Great Day`;
}

// Clickable Sub Plan Div

document.getElementById("substituteCard").addEventListener("click", function () {
  window.location.href = "./subplan.html", "_blank";
});


//Give Prompt Options

function selectJournalPrompt() {
  var prompts = [
    'How am I feeling today?',
    'What do I need today?',
    'What am I grateful for today?',
    'What do I want to accomplish today?',
    'The affirmation that would help me most today is...',
  ];

  var randomIndex = Math.floor(Math.random() * prompts.length);
  return prompts[randomIndex];
}

function displayJournalPrompt() {
  var statementElement = document.getElementById('prompts');
  statementElement.textContent = selectJournalPrompt();
}

// Hide/Show Journal and Core Values Div

const sections = [
  { id: "mainJournal", showDiv: "myJournal" },
  { id: "calendar", showDiv: "monthlyCalendarDiv" },
  { id: "coreValuesCard", showDiv: "myCoreValues" },
  { id: "selfCareCard", showDiv: "selfCareContainerDiv" }
];

sections.forEach(section => {
  document.getElementById(section.id).addEventListener("click", () => {
    sections.forEach(otherSection => {
      document.getElementById(otherSection.showDiv).hidden = otherSection.showDiv !== section.showDiv;
    });
    showDivById(section.showDiv);
  });
});


function showDivById(divId) {
  const divToShow = document.getElementById(divId);
  divToShow.classList.remove('hiddenDiv')
  divToShow.scrollIntoView({ behavior: 'smooth' });
}


//Saving to Local Storage

const dataInput = document.getElementById('input');
const saveButton = document.getElementById('saveButton');

dataInput.value = localStorage.getItem('savedData');
saveButton.addEventListener('click', saveData);

// Function to save input data to local storage

function saveData() {

  // Get the input value

  const data = dataInput.value;

  // Save the data to local storage

  localStorage.setItem('savedData', data);
}

// Core Value List

document.addEventListener('DOMContentLoaded', function () {
  const wordBank = document.querySelectorAll('.word');
  const selectedWords = document.querySelector('.selectedWords');
  let order = 1;
  let wordCount = 0;

  // Load data from local storage
  const storedData = JSON.parse(localStorage.getItem('selectedWordsData') || '[]');
  storedData.forEach(function (data) {
    const selectedWord = document.createElement('div');
    selectedWord.textContent = data.content;
    selectedWord.classList.add('word');
    selectedWord.classList.add('hoverDelete');
    selectedWord.style.order = data.order;
    selectedWords.appendChild(selectedWord);
    wordCount++;
  });

  wordBank.forEach(function (word) {
    word.addEventListener('click', function () {
      if (wordCount < 6) {
        const selectedWord = document.createElement('div');
        selectedWord.textContent = word.textContent;
        selectedWord.classList.add('word');
        selectedWord.classList.add('hoverDelete');
        selectedWord.style.order = order;
        selectedWords.appendChild(selectedWord);

        // Save data to local storage
        const data = {
          content: word.textContent,
          order: order
        };
        storedData.push(data);
        localStorage.setItem('selectedWordsData', JSON.stringify(storedData));

        order++;
        wordCount++;

        selectedWord.addEventListener('click', function () {
          const selectedWord = document.createElement('div');
          selectedWords.removeChild(selectedWord);
         wordCount--;
       });
      }
    });
  });
});

// Monthly Calendar

const monthYearElement = document.getElementById("monthYear");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const daysContainer = document.getElementById("daysOfMonth");

const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function updateCalendar() {
  monthYearElement.textContent = new Date(currentYear, currentMonth).toLocaleDateString('en-CA', { month: 'long', year: 'numeric' });

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  daysContainer.innerHTML = '';

  for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyDay = document.createElement("div");
    daysContainer.appendChild(emptyDay);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = day;

    const toDoContainer = document.createElement("div");
    toDoContainer.classList.add("calendarToDoContainer");

    const toDoInput = document.createElement("textarea");
    toDoInput.classList.add("calendarToDoInput");
    toDoInput.placeholder = "Enter to-do items...";
    toDoInput.value = localStorage.getItem(`toDo-${currentYear}-${currentMonth}-${day}`) || '';
    toDoInput.addEventListener("input", function () {
      localStorage.setItem(`toDo-${currentYear}-${currentMonth}-${day}`, toDoInput.value);
    });

    const specialEventsContainer = document.createElement("div");
    specialEventsContainer.classList.add("calendarSpecialEventsContainer");

    const specialEventsInput = document.createElement("textarea");
    specialEventsInput.classList.add("calendarSpecialEventsInput");
    specialEventsInput.placeholder = "Enter special events...";
    specialEventsInput.value = localStorage.getItem(`specialEvents-${currentYear}-${currentMonth}-${day}`) || '';
    specialEventsInput.addEventListener("input", function () {
      localStorage.setItem(`specialEvents-${currentYear}-${currentMonth}-${day}`, specialEventsInput.value);
    })

    const notesContainer = document.createElement("div");
    notesContainer.classList.add("calendarNotesContainer");

    const notesInput = document.createElement("textarea");
    notesInput.classList.add("calendarNotesInput");
    notesInput.placeholder = "Enter notes...";
    notesInput.value = localStorage.getItem(`notes-${currentYear}-${currentMonth}-${day}`) || '';
    notesInput.addEventListener("input", function () {
      localStorage.setItem(`notes-${currentYear}-${currentMonth}-${day}`, notesInput.value);
    })

    toDoContainer.appendChild(toDoInput);
    specialEventsContainer.appendChild(specialEventsInput);
    notesContainer.appendChild(notesInput)
    dayElement.appendChild(toDoContainer);
    dayElement.appendChild(specialEventsContainer);
    dayElement.appendChild(notesContainer);

    daysContainer.appendChild(dayElement);
  }
}

updateCalendar();

prevMonthButton.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  updateCalendar();
});

nextMonthButton.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateCalendar();
});


// Local Storage, Updating and Blur event listener for To Do's

const topToDoDiv = document.getElementById("toDoUpdate");
const todoTextareas = document.querySelectorAll(".calendarToDoInput");

const recentTodoTexts = JSON.parse(localStorage.getItem("recentTodoTexts")) || [];

topToDoDiv.textContent = recentTodoTexts.join("\n");

todoTextareas.forEach((calendarToDoInput, _index) => {
  calendarToDoInput.addEventListener("blur", function () {
    document.getElementById("toDoSnippet").hidden = false;
    const todoText = calendarToDoInput.value;

    recentTodoTexts.unshift(todoText);

    if (recentTodoTexts.length > 8) {
      recentTodoTexts.pop();
    }

    topToDoDiv.textContent = recentTodoTexts.join("\n");

    localStorage.setItem("recentTodoTexts", JSON.stringify(recentTodoTexts));
  });
});

// Local Storage, Updating and Blur event listener for Special Days

const topSpecialDaysDiv = document.getElementById("specialDaysUpdate");
const specialDaysTextareas = document.querySelectorAll(".calendarSpecialEventsInput");

const recentSpecialDaysTexts = JSON.parse(localStorage.getItem("recentSpecialDaysTexts")) || [];

topSpecialDaysDiv.textContent = recentSpecialDaysTexts.join("\n");

specialDaysTextareas.forEach((calendarSpecialEventsInput, _index) => {
  calendarSpecialEventsInput.addEventListener("blur", function () {
    document.getElementById("specialDaysSnippet").hidden = false;
    const specialDaysText = calendarSpecialEventsInput.value;

    recentSpecialDaysTexts.unshift(specialDaysText);

    if (recentSpecialDaysTexts.length > 8) {
      recentSpecialDaysTexts.pop();
    }

    topSpecialDaysDiv.textContent = recentSpecialDaysTexts.join("\n");

    localStorage.setItem("recentSpecialDaysTexts", JSON.stringify(recentSpecialDaysTexts));
  });
});

