// Randomly generated affirmations
// constant variables, an array, random number generation, DOM manipulation and text.Content all help the random positive affirmations to appear on the webpage each time it is loaded.

const phrases = [
  'I know how to bring direction and order into my life',
  'I choose to be kind to all, including myself',
  'I create an environment that supports my well-being',
  'I love myself first so that I may love others',
  'I let go of any bad thoughts invading my day',
  'you matter - especially on the tough days',
  'you are so much more than just a teacher',
  'being an effective teacher can be challenging',
  'you feel stretched thin because you care',
  'every feeling you have during your day is valid',
  'an empty cup pours nothing',
  'thank you for making a difference',
];

const randomIndex = Math.floor(Math.random() * phrases.length);

const randomPhrase = phrases[randomIndex];

const phraseElement = document.getElementById('randomPhrase');
phraseElement.textContent = randomPhrase;

// Date Countdown
// countdown array, variables initialized (let), update countown function, countdown calc, display countdown, DOM manipulation click listener.

const countdowns = [
  {
    date: new Date('2023-11-13T00:00:00'),
    message: 'Happy Long Weekend'
  },
  {
    date: new Date('2023-12-22T00:00:00'),
    message: 'Happy Holidays'
  },
  {
    date: new Date('2024-03-22T00:00:00'),
    message: 'Happy Easter'
  },
  {
    date: new Date('2024-06-21T15:00:00'),
    message: 'Summer Starts'
  }
];

let currentCountdownIndex = 0;
let countdownStarted = false;

function updateCountdown() {
  const eventDate = countdowns[currentCountdownIndex].date;
  const message = countdowns[currentCountdownIndex].message;

  const currentDate = new Date();
  const timeDifference = Math.floor((eventDate - currentDate) / 1000);

  if (timeDifference > 0) {
    let days = Math.floor(timeDifference / (60 * 60 * 24));
    let hours = Math.floor((timeDifference % (60 * 60 * 24)) / (60 * 60));
    let minutes = Math.floor((timeDifference % (60 * 60)) / 60);
    let seconds = Math.floor(timeDifference % 60);

    const countdownElement = document.getElementById('countdown');
    countdownElement.textContent = `${message} in: ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    countdownElement.classList.add('countdownStyle');

    setTimeout(updateCountdown, 1000);
  } else {
    currentCountdownIndex = (currentCountdownIndex + 1) % countdowns.length;
    updateCountdown();
  }
}

const countdownElement = document.getElementById('countdown');
countdownElement.addEventListener('click', () => {
  if (!countdownStarted) {
    countdownStarted = true;
    updateCountdown();
  }
});



//Customize Planner Name
// Reference a HTML element, create variable for local storage so if user has already entered a name it loads upon page load, then add click event listener to update the name using if else function.

const para = document.getElementById('myGreatDay');

const storedName = localStorage.getItem('userName');
if (storedName) {
  para.textContent = `${storedName}'s Great Day`;
}

para.addEventListener('click', updateName);

function updateName() {
  const name = prompt('Enter your name');
  if (name !== null && name !== '') {
    para.textContent = `${name}'s Great Day`;
    localStorage.setItem('userName', name);
  } else {
    para.textContent = `My Great Day`;
    localStorage.removeItem('userName');
  }
};

// Clickable Sub Plan Div
//DOM manipulation and click event listener to begin the function of opening a link in a new window.

document.getElementById("substituteCard").addEventListener("click", function () {
  window.location.href = "https://colletteap.github.io/gratitude-planner/subplan.html", "_blank";
});


//Give Prompt Options
// Create journal prompts with an array, create function to eventually call the prompts up, create randomized generation of array, function to display journal prompts with DOM manipulation to connect HTML element to function.

function selectJournalPrompt() {
  const prompts = [
    'How am I feeling today?',
    'What do I need today?',
    'What am I grateful for today?',
    'What do I want to accomplish today?',
    'The affirmation that would help me most today is...',
  ];

  const randomIndex = Math.floor(Math.random() * prompts.length);
  return prompts[randomIndex];
}

function displayJournalPrompt() {
  const statementElement = document.getElementById('prompts');
  statementElement.textContent = selectJournalPrompt();
}

// Hide/Show Journal, Monthly Calendar, Core Values and Self Care Divs
// Created an array with each element having an object with two properties, click event listeners added to all html elements in sections array and calls the showDivById function, then showDivById function is defined.


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
    document.getElementById("quote-container").hidden = true;
  });
});


function showDivById(divId) {
  const divToShow = document.getElementById(divId);
  divToShow.classList.remove('hiddenDiv')
  divToShow.scrollIntoView({ behavior: 'smooth' });
}

//Saving to Local Storage
// Define variables, retrieve data if any had been saved and click event listener for saveButton/calling function

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
};

// Core Value List

document.addEventListener('DOMContentLoaded', function () {
  const wordBank = document.querySelectorAll('.word');
  const selectedWords = document.querySelector('.selectedWords');
  let order = 1;
  let wordCount = 0;

  // Load data from local storage
  let storedData = JSON.parse(localStorage.getItem('selectedWordsData') || '[]');
  storedData.forEach(function (data) {
    if (wordCount < 6) {
    const selectedWord = document.createElement('div');
    selectedWord.textContent = data.content;
    selectedWord.classList.add('word');
    selectedWord.classList.add('hoverDelete');
    selectedWord.style.order = data.order;
    selectedWords.appendChild(selectedWord);
    wordCount++;
    }
  });

// Define a set to keep track of selected words
  const selectedWordsSet = new Set();
  
  wordBank.forEach(function (word) {
    word.addEventListener('click', function () {
      if (wordCount < 6) {
        //Check is the word has already been selected
        if (!selectedWordsSet.has(word.textContent)) {
        const selectedWord = document.createElement('div');
        selectedWord.textContent = word.textContent;
        selectedWord.classList.add('word');
        selectedWord.classList.add('hoverDelete');
        selectedWord.style.order = order;
        selectedWords.appendChild(selectedWord);

        // Add the word to the selected words set
          selectedWordsSet.add(word.textContent);

        // Save data to local storage
        const data = {
          content: word.textContent,
          order: order
        };
        storedData.push(data);
        localStorage.setItem('selectedWordsData', JSON.stringify(storedData));

        order++;
        wordCount++;
        }
      }
    });
  });

  selectedWords.addEventListener('click', function (event) {
    if (event.target.classList.contains('hoverDelete')) {
      event.target.remove();
      wordCount--;
      order--;

      storedData = storedData.filter(data => data.order !==Number(event.target.style.order));
      localStorage.setItem('selectedWordsData', JSON.stringify(storedData));
    }});
  });

// Monthly Calendar
// Assign variables to HTML elements

const monthYearElement = document.getElementById("monthYear");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const daysContainer = document.getElementById("daysOfMonth");

//Assign variable for the current date, current month and current year

const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

//This function updates the calendar to the current date in a readable format

function updateCalendar() {
  monthYearElement.textContent = new Date(currentYear, currentMonth).toLocaleDateString('en-CA', { month: 'long', year: 'numeric' });

//These variables represent the day of the week the first day of the months falls on and how many days are in the current month

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
 
  //Clearing previous content
  
  daysContainer.innerHTML = '';

//This loop creates empty day elements and appends them to the calendar before the first day of the month

  for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyDay = document.createElement("div");
    daysContainer.appendChild(emptyDay);
  }

//This loop creates day elements for each day in the month and creates a CSS class called day 

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = day;

//This element is created to hold input from the to-do items and given its own CSS class

    const toDoContainer = document.createElement("div");
    toDoContainer.classList.add("calendarToDoContainer");

//A textarea is created for to-do input, given its own class, a placeholder and initial value is retrieved from local storage based on current year, month and day

    const toDoInput = document.createElement("textarea");
    toDoInput.classList.add("calendarToDoInput");
    toDoInput.placeholder = "Enter to-do items...";
    toDoInput.value = localStorage.getItem(`toDo-${currentYear}-${currentMonth}-${day}`) || '';
    
//This function limits the input into to-do element to 20 values and updates local storage and calls it with an input event listener

    function limittdInput(event) {
        const tdinput = event.target;
        if (tdinput.value.length > 20) {
            tdinput.value = tdinput.value.slice(0, 20) + '...';
        }
        localStorage.setItem(`toDo-${currentYear}-${currentMonth}-${day}`, tdinput.value);
    }
    
    toDoInput.addEventListener("input", limittdInput);    

    const specialEventsContainer = document.createElement("div");
    specialEventsContainer.classList.add("calendarSpecialEventsContainer");

    const specialEventsInput = document.createElement("textarea");
    specialEventsInput.classList.add("calendarSpecialEventsInput");
    specialEventsInput.placeholder = "Enter special events...";
    specialEventsInput.value = localStorage.getItem(`specialEvents-${currentYear}-${currentMonth}-${day}`) || '';
    
    function limitInput(event) {
        const input = event.target;
        if (input.value.length > 20) {
            input.value = input.value.slice(0, 20) + '...';
        }
        localStorage.setItem(`specialEvents-${currentYear}-${currentMonth}-${day}`, input.value);
    }
    
    specialEventsInput.addEventListener("input", limitInput);

    const notesContainer = document.createElement("div");
    notesContainer.classList.add("calendarNotesContainer");

    const notesInput = document.createElement("textarea");
    notesInput.classList.add("calendarNotesInput");
    notesInput.placeholder = "Enter notes...";
    notesInput.value = localStorage.getItem(`notes-${currentYear}-${currentMonth}-${day}`) || '';
    notesInput.addEventListener("input", function () {
      localStorage.setItem(`notes-${currentYear}-${currentMonth}-${day}`, notesInput.value);
    })

//Appending elements to containers

    toDoContainer.appendChild(toDoInput);
    specialEventsContainer.appendChild(specialEventsInput);
    notesContainer.appendChild(notesInput)

//Appending containers to day elements

    dayElement.appendChild(toDoContainer);
    dayElement.appendChild(specialEventsContainer);
    dayElement.appendChild(notesContainer);

//Appending day element to calendar container

    daysContainer.appendChild(dayElement);
  };
};


updateCalendar();

//Click event listener to move the months back when previous month button is clicked

prevMonthButton.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  updateCalendar();
});

//Click event listener to move the months ahead when next month button is clicked

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

function updateToDoList() {
  topToDoDiv.innerHTML = `<ul>${recentTodoTexts.map(text => `<li>${text}</li>`).join('')}</ul>`;
}

updateToDoList();

todoTextareas.forEach((calendarToDoInput, _index) => {
  calendarToDoInput.addEventListener("blur", function () {
    document.getElementById("toDoSnippet").hidden = false;
   
    const todoText = calendarToDoInput.value.trim();

    if (todoText !== "") {
      recentTodoTexts.unshift(todoText);


    if (recentTodoTexts.length > 6) {
      recentTodoTexts.pop();
    }

    updateToDoList();

    localStorage.setItem("recentTodoTexts", JSON.stringify(recentTodoTexts));

  }
  });
});

// Local Storage, Updating and Blur event listener for Special Days
// Variables assigned for HTML elements specialDaysUpdate on Special Days card, calendarSpecial EventsInput in calendar array.

const topSpecialDaysDiv = document.getElementById("specialDaysUpdate");
const specialDaysTextareas = document.querySelectorAll(".calendarSpecialEventsInput");

//Parse stringified data into useable javascript objects

const recentSpecialDaysTexts = JSON.parse(localStorage.getItem("recentSpecialDaysTexts")) || [];

//Function to create a list from the stored data above into the topSpecialDaysDiv

function updateSpecialDaysList() {
  topSpecialDaysDiv.innerHTML = `<ul>${recentSpecialDaysTexts.map(text => `<li>${text}</li>`).join('')}</ul>`;
  
  const specialDaysDiv = document.querySelector('.specialDaysInfo');
  
}

//Calls function

updateSpecialDaysList();

//Blur event listener added to each textarea element on the class specialDaysTextareas which is in an array so that the specialDaysSnippet is shown, and if the textarea is not an empty string, text is added to the special days update bby calling the function again, no more than 6 textarea elements 

specialDaysTextareas.forEach((calendarSpecialEventsInput, _index) => {
  calendarSpecialEventsInput.addEventListener("blur", function () {

    document.getElementById("specialDaysSnippet").hidden = false;
    
    const specialDaysText = calendarSpecialEventsInput.value.trim();

    if (specialDaysText !== "") {
      recentSpecialDaysTexts.unshift(specialDaysText);

    if (recentSpecialDaysTexts.length > 6) {
      recentSpecialDaysTexts.pop();
    }
//
    updateSpecialDaysList();

    //Store the list array in local storage by turning it into a string

    localStorage.setItem("recentSpecialDaysTexts", JSON.stringify(recentSpecialDaysTexts));
    }
  });
  
});

// Showing and Hiding Info Message on Special Days
//Assign variables for both sections of specialDaysUpdate and specialDaysInfo then an if then else statement checks to see if there is text inside the specialDaysUpdate, if so, specialDaysInfo is set to 'none' display and specialDaysUpdate is set to 'block' so it is shown.

let specialDaysUpdate = document.getElementById('specialDaysUpdate');
let specialDaysInfo = document.getElementById('specialDaysInfo');

if (specialDaysUpdate.textContent.trim() !== "") {

  specialDaysInfo.style.display = 'none';
} else {
 
  specialDaysInfo.style.display = 'block';
}

//Showing and Hiding Info Message on To Do
//Assign variables for both sections of toDoUpdate and toDoInfo then an if then else statement checks to see if there is text inside the toDoUpdate, if so, toDoInfo is set to 'none' display and toDoUpdate is set to 'block' so it is shown.

let toDoUpdate = document.getElementById('toDoUpdate');
let toDoInfo = document.getElementById('toDoInfo');


if (toDoUpdate.textContent.trim() !== "") {

  toDoInfo.style.display = 'none';
} else {

  toDoInfo.style.display = 'block';
}
