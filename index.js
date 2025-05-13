document.addEventListener('DOMContentLoaded', function() {

const navicon = document.querySelector(".navicon");
const header = document.querySelector("header");

navicon.addEventListener("click", function() {
  header.classList.toggle("opennav");
});

const flyLogoContainer = document.querySelector('.fly-logo-container');

const temporaryClass = 'clicked'; // The CSS class you want to add
const duration = 4000; // Duration in milliseconds
let timeoutId; // Variable to store the timeout ID
const speechBalloon = document.querySelector('.speech-balloon');


const flyQuotes = ["I wasn't burned by the electric bulb, but I got burned here...", 
  "Ok, before I read Keynes's quotes I felt a little bit depressed. Now I feel ok...",
  "How many useless facts do I have to learn to totally burn my mind?",
  "Chuck Norris doesn't swat flies. They surrender. Hi, hi, hi.",
  "A fly's ambition... to taste the infinite ramen? Are you sure?",
  "Hey sucker! I don't know the date I was born to know what happened that day...",
  "Ok, Keynes's quotes are great..."
];

let flyQuoteNum = 0;

flyLogoContainer.addEventListener('click', () => {

  speechBalloon.innerHTML = `<p>${flyQuotes[flyQuoteNum]}</p>`;


  // Clear any existing timeout to handle multiple quick clicks
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  // Add the class
  flyLogoContainer.classList.add(temporaryClass);

  // Set a timeout to remove the class after the specified duration
  timeoutId = setTimeout(() => {
    flyLogoContainer.classList.remove(temporaryClass);
    timeoutId = null; // Reset the timeout ID
  }, duration);

  flyQuoteNum++;

  if(flyQuoteNum >= flyQuotes.length){
    flyQuoteNum = 0;
  } 

});

const body = document.querySelector('body');
const totop = document.querySelector('.totop');


window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    body.classList.add('scrolled');
  } else {
    body.classList.remove('scrolled');
  }
});

totop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const headers = {
    //'Authorization': 'Bearer your_api_token_here', // Example authorization header
    'Content-Type': 'application/json'        // Example content type header
};

/*

// https://sv443.net/jokeapi/v2/ 

const jokeApiForm = document.getElementById("jokeapi-form")
const jokeApiCategoryElem = document.getElementById("jokeapi-category")
const jokeApiTxtElem = document.querySelector("#jokeapi .txt") 

async function getjokeApi() {

    let jokeApiCategory = jokeApiCategoryElem.value;

    let apiUrl = `https://v2.jokeapi.dev/joke/${jokeApiCategory}?blacklistFlags=nsfw,religious,racist,sexist`;

    try {
        const response = await fetch(apiUrl, {
          method: 'GET', // Default is GET, but you can specify other methods like POST
          headers: headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if(data.type === "single"){
            jokeApiTxtElem.innerHTML = `<p>${data.joke}</p>`
        }else if(data.type === "twopart"){
            jokeApiTxtElem.innerHTML = `<p>${data.setup}</p><p>${data.delivery}</p>`
        }

    } catch (error) {
        console.error("Error fetching or processing user data:", error);
        document.getElementById("jokeapi").remove();
    }
}

jokeApiForm.addEventListener('submit', function(e) {
    e.preventDefault()
    getjokeApi();
})
getjokeApi();


//  https://geek-jokes.sameerkumar.website/

const geekJokesApiForm = document.getElementById("geekjokesapi-form")
const geekJokesApiTxtElem = document.querySelector("#geekjokesapi .txt") 

async function getGeekJokesApi() {

    const apiUrl = `https://geek-jokes.sameerkumar.website/api?format=json`;

    try {
        const response = await fetch(apiUrl, {
          method: 'GET', // Default is GET, but you can specify other methods like POST
          headers: headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        geekJokesApiTxtElem.innerHTML = `<p>${data.joke}</p>`


    } catch (error) {
        console.error("Error fetching or processing user data:", error);
        document.getElementById("geekjokesapi").remove();
    }
}

geekJokesApiForm.addEventListener('submit', function(e) {
    e.preventDefault()
    getGeekJokesApi();
})
getGeekJokesApi();




// https://uselessfacts.jsph.pl

const uselessFactsApiForm = document.getElementById("uselessfactsapi-form")
const uselessFactsApiTxtElem = document.querySelector("#uselessfactsapi .txt") 

async function getUselessFactsApi() {

    const apiUrl = `https://uselessfacts.jsph.pl/api/v2/facts/random`;

    try {
        const response = await fetch(apiUrl, {
          method: 'GET', // Default is GET, but you can specify other methods like POST
          headers: headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        uselessFactsApiTxtElem.innerHTML = `<p>${data.text}</p>`


    } catch (error) {
        console.error("Error fetching or processing user data:", error);
        document.getElementById("uselessfactsapi").remove();
    }
}

uselessFactsApiForm.addEventListener('submit', function(e) {
    e.preventDefault()
    getUselessFactsApi();
})
getUselessFactsApi();



// https://kanye.rest/

const kanyeRestApiForm = document.getElementById("kanyerestapi-form")
const kanyeRestApiTxtElem = document.querySelector("#kanyerestapi .txt") 

async function getKanyeRestApi() {

    const apiUrl = `https://api.kanye.rest`;

    try {
        const response = await fetch(apiUrl, {
          method: 'GET', // Default is GET, but you can specify other methods like POST
          headers: headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

       kanyeRestApiTxtElem.innerHTML = `<p>${data.quote}</p>`


    } catch (error) {
        console.error("Error fetching or processing user data:", error);
        document.getElementById("kanyerestapi").remove();
    }
}

kanyeRestApiForm.addEventListener('submit', function(e) {
    e.preventDefault()
    getKanyeRestApi();
})
getKanyeRestApi();


// https://animechan.io/

const animeChanApiForm = document.getElementById("animechanapi-form")
const animeChanApiTxtElem = document.querySelector("#animechanapi .txt") 

async function getAnimeChanApi() {

    const apiUrl = `https://api.animechan.io/v1/quotes/random`;

    try {
        const response = await fetch(apiUrl, {
          method: 'GET', // Default is GET, but you can specify other methods like POST
          headers: headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        animeChanApiTxtElem.innerHTML = `
        <p>${data.data.content}</p>
        <div class="extra">
          <p><strong>Chatacter:</strong> ${data.data.character.name}</p>
          <p><strong>Anime:</strong> ${data.data.anime.name}</p>
        </div>
       `
    } catch (error) {
        console.error("Error fetching or processing user data:", error);
        document.getElementById("animechanapi").remove();
    }
}

animeChanApiForm.addEventListener('submit', function(e) {
    e.preventDefault()
    getAnimeChanApi();
})
getAnimeChanApi();



// https://stoic.tekloon.net/stoic-quote

const numbersApiForm = document.getElementById("numbersapi-form")
const numbersApiTxtElem = document.querySelector("#numbersapi .txt") 
const numbersApiTypeElem = document.getElementById("numberapi-type")
const numbersApiNumElem = document.getElementById("numberapi-num")
const numbersApiBtnElem = document.getElementById("numbersapi-btn")

const monthDayInput = document.getElementById('monthDay');
const validationError = document.getElementById('validationError');

monthDayInput.addEventListener('input', function() {
  const inputValue = this.value;
  const regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])$/;
  if (!regex.test(inputValue)) {
    validationError.textContent = 'Invalid format. Please use mm/dd.';
    numbersApiBtnElem.disabled = true;
    return;
  }
  const parts = inputValue.split('/');
  const month = parseInt(parts[0]);
  const day = parseInt(parts[1]);
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    validationError.textContent = 'Invalid month or day.';
    numbersApiBtnElem.disabled = true;
    return;
  }
  // Basic leap year check for February (you might want a more robust check)
  if (month === 2 && day > 29) {
    validationError.textContent = 'Invalid day for February.';
    numbersApiBtnElem.disabled = true;
    return;
  }
  if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) {
    validationError.textContent = 'Invalid day for this month.';
    numbersApiBtnElem.disabled = true;
    return;
  }
  validationError.textContent = ''; // Clear error message if valid
  numbersApiBtnElem.disabled = false;
});

const numberInputWrap = document.getElementById('input-number-wrap');
const dateInputWrap = document.getElementById('input-date-wrap');

let numberInputBoolean = true;
let numbersApi;

// Function to handle the visibility of input fields
function toggleInputFields() {
  const selectedType = numbersApiTypeElem.value;
  if (selectedType === 'date') {
    numberInputWrap.style.display = 'none';
    dateInputWrap.style.display = 'block';
    numberInputBoolean = false;
  } else {
    numberInputWrap.style.display = 'block';
    dateInputWrap.style.display = 'none';
    numberInputBoolean = true;
  }
}
// Call the function on initial load to set the initial visibility
toggleInputFields();
// Call the function whenever the select value changes
numbersApiTypeElem.addEventListener('change', toggleInputFields);


async function getNumbersApi() {
    let numbersApiType = numbersApiTypeElem.value;
    let numbersApiNum = numbersApiNumElem.value;

    if(numberInputBoolean){
        numbersApi = parseInt(numbersApiNum);
    }else{
        numbersApi = monthDayInput.value;
    }

    const apiUrl = `http://numbersapi.com/${numbersApi}/${numbersApiType}?json`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

       numbersApiTxtElem.innerHTML = `
        <p>${data.text}</p>
       `
    } catch (error) {
        console.error("Error fetching or processing user data:", error);
        document.getElementById("numbersapi").remove();
    }
}

numbersApiForm.addEventListener('submit', function(e) {
    e.preventDefault()
    getNumbersApi();
})
getNumbersApi();
*/
});