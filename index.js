document.addEventListener('DOMContentLoaded', function() {

const navicon = document.querySelector(".navicon");
const header = document.querySelector("header");
const flyLogoContainer = document.querySelector('.fly-logo-container');
const temporaryClass = 'clicked'; // The CSS class you want to add
const duration = 4000; // Duration in milliseconds
let timeoutId; // Variable to store the timeout ID
const speechBalloon = document.querySelector('.speech-balloon');

navicon.addEventListener("click", function() {
  header.classList.toggle("opennav");

});

const menuLinks = document.querySelectorAll('.menu a');
const scrollOffset = 50; // The distance to scroll before the target element

menuLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const targetPosition = targetElement.offsetTop - scrollOffset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});;


// fly's quotes
const flyQuotes = ["I wasn't burned by the electric bulb, but I got burned here...", 
  "Ok, before I read Keynes's quotes I felt a little bit depressed. Now I feel ok...",
  "How many useless facts do I have to learn to totally burn my mind?",
  "Chuck Norris doesn't swat flies. They surrender. Hi, hi, hi.",
  "A fly's ambition... to taste the infinite ramen? Are you sure?",
  "Hey sucker! I don't know the date I was born to know what happened that day...",
  "Ok, Keynes's quotes are great..."
];

let flyQuoteNum = 0;
let startQuotes = false;

function setFlyQuote() {
  if(startQuotes){
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
  }
  
}

setTimeout(()=>{
  startQuotes = true;
  setFlyQuote();
}, 1000);

flyLogoContainer.addEventListener('click', setFlyQuote);
// end fly's quotes


// fly buzz audio
const audioButton = document.getElementById('audio-button');
    const buzzingSound = document.getElementById('buzzingSound');
    let audioPlaying = false;

    function playAudio() {
      buzzingSound.play()
        .then(() => {
          audioPlaying = true;
          audioButton.ariaLabel = 'Stop Audio';
          audioButton.classList.remove('stopped');
        })
        .catch(error => {
          console.error("Error playing audio:", error);
          audioButton.ariaLabel = 'Play Failed';
          audioButton.classList.add('stopped');
        });
    }

    function stopAudio() {
      buzzingSound.pause();
      buzzingSound.currentTime = 0;
      audioPlaying = false;
      audioButton.ariaLabel = 'Play Audio';
      audioButton.classList.add('stopped');
    }

    audioButton.addEventListener('click', function() {
      if (audioPlaying) {
        stopAudio();
      } else {
        playAudio();
      }
    });

    // Initially set the button to the stopped state
    stopAudio();

// end fly buzz audio


const body = document.querySelector('body');
const totop = document.querySelector('.totop');


window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    body.classList.add('scrolled');
    stopAudio();
  } else {
    body.classList.remove('scrolled');
    audioButton.ariaLabel = 'Play Audio';
    audioButton.classList.add('stopped');
  }
  header.classList.remove('opennav');
});

totop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const headers = {
    //'Authorization': 'Bearer your_api_token_here', // Example authorization header
    'Content-Type': 'application/json'        // Example content type header
};

// https://sv443.net/jokeapi/v2/ 

const jokeApiForm = document.getElementById("jokeapi-form")
const jokeApiCategoryElem = document.getElementById("jokeapi-category")
const jokeApiTxtElem = document.querySelector("#jokeapi .txt") 
const jokeApiApiBtn = document.getElementById("jokeapi-btn")

async function getjokeApi() {

    jokeApiApiBtn.disabled = true;

    let jokeApiCategory = jokeApiCategoryElem.value;

    let apiUrl = `https://v2.jokeapi.dev/joke/${jokeApiCategory}?blacklistFlags=nsfw,religious,racist,sexist`;

    try {
        const response = await fetch(apiUrl, {
          method: 'GET', // Default is GET, but you can specify other methods like POST
          headers: headers
        });

        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if(data.type === "single"){
            jokeApiTxtElem.innerHTML = `<p>${data.joke}</p>`
        }else if(data.type === "twopart"){
            jokeApiTxtElem.innerHTML = `<p>${data.setup}</p><p>${data.delivery}</p>`
        }

    } catch (error) {
        console.error("Error while fetching:", error);
        document.getElementById("jokeapi").remove();
        document.querySelector('a[href="#jokeapi"]').parentElement.remove();
    } finally {
      // Re-enable the button in the 'finally' block to ensure it runs
      // even if the fetch fails.
      jokeApiApiBtn.disabled = false;
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
const geekJokesApiBtn = document.getElementById("geekjokesapi-btn")

async function getGeekJokesApi() {

    geekJokesApiBtn.disabled = true;

    const apiUrl = `https://geek-jokes.sameerkumar.website/api?format=json`;

    try {
        const response = await fetch(apiUrl, {
          method: 'GET', // Default is GET, but you can specify other methods like POST
          headers: headers
        });

        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        geekJokesApiTxtElem.innerHTML = `<p>${data.joke}</p>`


    } catch (error) {
        console.error("Error while fetching:", error);
        document.getElementById("geekjokesapi").remove();
        document.querySelector('a[href="#geekjokesapi"]').parentElement.remove();
    } finally {
      // Re-enable the button in the 'finally' block to ensure it runs
      // even if the fetch fails.
      geekJokesApiBtn.disabled = false;
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
const uselessFactsApiBtn = document.getElementById("uselessfactsapi-btn")

async function getUselessFactsApi() {

    uselessFactsApiBtn.disabled = true;
    const apiUrl = `https://uselessfacts.jsph.pl/api/v2/facts/random`;

    try {
        const response = await fetch(apiUrl, {
          method: 'GET', // Default is GET, but you can specify other methods like POST
          headers: headers
        });

        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        uselessFactsApiTxtElem.innerHTML = `<p>${data.text}</p>`

    } catch (error) {
        console.error("Error while fetching:", error);
        document.getElementById("uselessfactsapi").remove();
        document.querySelector('a[href="#uselessfactsapi"]').parentElement.remove();
    } finally {
      // Re-enable the button in the 'finally' block to ensure it runs
      // even if the fetch fails.
      uselessFactsApiBtn.disabled = false;
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
const kanyeRestApiBtn = document.getElementById("kanyerestapi-btn")

async function getKanyeRestApi() {

    kanyeRestApiBtn.disabled = true;

    const apiUrl = `https://api.kanye.rest`;

    try {

      const response = await fetch(apiUrl, {
        method: 'GET', // Default is GET, but you can specify other methods like POST
        headers: headers
      });

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
    
      kanyeRestApiTxtElem.innerHTML = `<p>${data.quote}</p>`

    } catch (error) {
      console.error("Error while fetching:", error);
      document.getElementById("kanyerestapi").remove();
      document.querySelector('a[href="#kanyerestapi"]').parentElement.remove();
    } finally {
      // Re-enable the button in the 'finally' block to ensure it runs
      // even if the fetch fails.
      kanyeRestApiBtn.disabled = false;
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
const animeChanApiBtn = document.getElementById("animechanapi-btn")

async function getAnimeChanApi() {

    animeChanApiBtn.disabled = true;

    const apiUrl = `https://api.animechan.io/v1/quotes/random`;

    try {
        const response = await fetch(apiUrl, {
          method: 'GET', // Default is GET, but you can specify other methods like POST
          headers: headers
        });

        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
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
        console.error("Error while fetching:", error);
        document.getElementById("animechanapi").remove();
        document.querySelector('a[href="#animechanapi"]').parentElement.remove();
    } finally {
      // Re-enable the button in the 'finally' block to ensure it runs
      // even if the fetch fails.
      animeChanApiBtn.disabled = false;
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
const numbersApiTypeElem = document.getElementById("numbersapi-type")
const numbersApiNumElem = document.getElementById("numbersapi-num")
const numbersApiBtn = document.getElementById("numbersapi-btn")

let formattedDate = "";


const dateInput = document.getElementById("myDate");

// Function to get today's date in YYYY-MM-DD format
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Set the default value of the date input to today's date
dateInput.value = getTodayDate();

dateInput.addEventListener("change", function() {
  const selectedDate = new Date(this.value);
  const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = selectedDate.getDate().toString().padStart(2, '0');
  formattedDate = `${month}/${day}`;
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
    numbersApiBtn.disabled = true;

    let numbersApiType = numbersApiTypeElem.value;
    let numbersApiNum = numbersApiNumElem.value;

    if(numberInputBoolean){
        numbersApi = parseInt(numbersApiNum);
    }else{
        numbersApi = formattedDate;
    }

    const apiUrl = `http://numbersapi.com/${numbersApi}/${numbersApiType}?json`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      numbersApiTxtElem.innerHTML = `
       <p>${data.text}</p>
      `
    } catch (error) {
        console.error("Error while fetching:", error);
        document.getElementById("numbersapi").remove();
        document.querySelector('a[href="#numbersapi"]').parentElement.remove();
    } finally {
      // Re-enable the button in the 'finally' block to ensure it runs
      // even if the fetch fails.
      numbersApiBtn.disabled = false;
    }
}

numbersApiForm.addEventListener('submit', function(e) {
    e.preventDefault()
    getNumbersApi();
})
getNumbersApi();


});