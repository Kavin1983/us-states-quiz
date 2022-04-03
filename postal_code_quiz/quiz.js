const btnNext = document.querySelector('.next');
const img = document.querySelector('.img');
const correctText = document.querySelector('.correct-number');
const input = document.querySelector(".pc_input");
const stateNum = document.querySelector('.state-number');
const postal_codes = {
"Alabama": "AL",
"Alaska": "AK",
"Arizona": "AZ",
"Arkansas": "AR",
"California": "CA",
"Colorado": "CO",
"Connecticut": "CT",
"Delaware": "DE",
"Florida": "FL",
"Georgia": "GA",
"Hawaii": "HI",
"Idaho": "ID",
"Illinois": "IL",
"Indiana": "IN",
"Iowa": "IA",
"Kansas": "KS",
"Kentucky": "KY",
"Louisiana": "LA",
"Maine": "ME",
"Maryland": "MD",
"Massachusetts": "MA",
"Michigan": "MI",
"Minnesota": "MN",
"Mississippi": "MS",
"Missouri": "MO",
"Montana": "MT",
"Nebraska": "NE",
"Nevada": "NV",
"New Hampshire": "NH",
"New Jersey": "NJ",
"New Mexico": "NM",
"New York": "NY",
"North Carolina": "NC",
"North Dakota": "ND",
"Ohio": "OH",
"Oklahoma": "OK",
"Oregon": "OR",
"Pennsylvania": "PA",
"Rhode Island": "RI",
"South Carolina": "SC",
"South Dakota": "SD",
"Tennessee": "TN",
"Texas": "TX",
"Utah": "UT",
"Vermont": "VT",
"Virginia": "VA",
"Washington": "WA",
"West Virginia": "WV",
"Wisconsin": "WI",
"Wyoming": "WY",
}

let time = 480;
const entries = Object.entries(postal_codes)
let curStateIndex = 0;
let correct = 0;
let incorrect = 50 - correct;
let incorrectArr = [];

// TIMER

function displayTime () {
    if (time === 0 || curStateIndex === 50) {
        const timeTaken = 480 - time;
        curStateIndex = 50;
        clear()
        handleBtnNext(timeTaken)
        console.log(time)
        let timeText = document.querySelector('.time');
        const newTime = 480 - time;
        const minutes = String(Math.trunc(newTime / 60)).padStart(2, '0');
        const seconds = String(newTime % 60).padStart(2, '0');
        timeText.textContent = `${minutes}:${seconds}`
    }
    
    if (time > 0 && curStateIndex < 50) {
        let timeText = document.querySelector('.time');
        time--;
        const minutes = String(Math.trunc(time / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        timeText.textContent = `${minutes}:${seconds}`
    }
}

let timeInterval = setInterval(displayTime, 1000);


function clear () {
    clearInterval(timeInterval)
}


const handleIncorrectInput = function (input) {
    const incorrectState = curStateIndex < 50  ? entries[curStateIndex] : entries[curStateIndex - 1]
    console.log(incorrectState)
    incorrectArr.push(
        {
            state: incorrectState[0],
            postalCode: incorrectState[1],
            input,
        }
    )
}

const handleCorrectInput = function () {
    correct++
}

const handleNextState = function (e) {
    if (curStateIndex < 49) {
        e.preventDefault()
        curStateIndex++
        img.alt = entries[curStateIndex][0];
        img.src = `images/${entries[curStateIndex][0]}.png`;
        input.value = "";
        correctText.textContent = correct;
        stateNum.textContent = `${curStateIndex + 1}.`;
    } else {
        curStateIndex++
    }
}

btnNext.addEventListener("click",(e) => {
    handleBtnNext(e)
})

const handleBtnNext = function (e, timeTaken = '') {
    if (curStateIndex < 50) {
        e.preventDefault()
        const inputValue = input.value;
        const lowercaseAnswer = entries[curStateIndex][1].toLowerCase()
        console.log(lowercaseAnswer, inputValue)

        if (inputValue.toUpperCase() === entries[curStateIndex][1]) {
            console.log('right')
            handleCorrectInput()
        }
        if (inputValue.toUpperCase() !== entries[curStateIndex][1]) {
            console.log('wrong')
            handleIncorrectInput(inputValue)
        }
        handleNextState(e)
    } 

    
    if (curStateIndex === 50) {


        const incorrectList = incorrectArr.map((state) => {
            return `<li><span class="state-name">${state.state}</span> &rarr; <span class="state-answer">${state.postalCode} </span><span class="user-answer">You Answered: '${state.input}'<span></li>`
        })

        let string = ''
        incorrectList.forEach(state => string += state)
        if (string === '') {
            string = "All the answered questions were correct"
        }

        let color = incorrectList.length < 5 ? 'green' : 'yellow'

        if (incorrectList.length > 15) {
            color = 'red'
        }

        const html = `
        <div class="correct ${color}">
        <span class="time">${timeTaken}</span>
        <p>You got...</p>
        <div class="score">
        <span class="correct-final">${correct}</span> / <span outof-final>50</span>
        </div>
        </div>
        <div class="incorrect-states">
        ${string !== 'All the answered questions were correct' ? '<p>You need to practise...</p>' : ''}
        <ul>
        ${
            string
        }
        </ul>
        </div>
        <div class="btn-container">
        <button class="reset">Reset</button>
        </div>`

        document.querySelector('main').innerHTML = html;
        const btnReset = document.querySelector('.reset');

        btnReset.addEventListener('click', (e) => {
            e.preventDefault()
            resetPage()
        })
    }


    if (curStateIndex === 49) {
        btnNext.textContent = "finish";
        e.preventDefault()
    }

}

const resetPage = function () {
    
//     const html = `
//     <div class="score-box">
//     <span class="state-number">1.</span>
//     <span class="correct">0</span> / <span>50</span>
//     <div class="time">
//     </div>
// </div>
// <div class="img-box">
//     <img class="img" src="images/Alabama.png" alt="Alabama">
// </div>
// <form class="form">
//     <input type="text" placeholder="Enter Postal Code" class="pc_input"/>
//     <button class="next" type="submit">Next</button>
// </form>`
//     document.querySelector('main').innerHTML = html
    window.location = ''
    time = 480;
    curStateIndex = 0;
    correct = 0;
    incorrectArr = [];
    timeInterval = setInterval(displayTime, 1000);
    console.log(curStateIndex)
}