document.addEventListener('DOMContentLoaded', function () {
    // for headnav
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    
    const searchButton = document.getElementById('searchbt');
    searchButton.addEventListener('click', performSearch);

});
let topicElements = {
    'aim': document.getElementById('aim'),
    'theory': document.getElementById('theory'),
    'procedure': document.getElementById('procedure'),
    'practice': document.getElementById('practice'),
    'code': document.getElementById('code'),
    'result': document.getElementById('result'),
    'quiz': document.getElementById('quiz'),
    'references': document.getElementById('references'),
    'applications': document.getElementById('applications'),
    'tnt': document.getElementById('tnt')
};
let currentTopic = 'aim'; // Default topic


function switchContent(topic) {
    if (topic === currentTopic) {
        return; 
    }
    
    topicElements[currentTopic].style.display = 'none';
    topicElements[topic].style.display = 'block';
    currentTopic = topic;
}

function toggleCode(language) {
    if (language === 'cpp') {
        document.getElementById('cppCode').style.display = 'block';
        document.getElementById('pyCode').style.display = 'none';
    } else if (language === 'python') {
        document.getElementById('cppCode').style.display = 'none';
        document.getElementById('pyCode').style.display = 'block';
    }
}

function copyCode(elementId) {
    var codeBlock = document.getElementById(elementId);
    var code = codeBlock.querySelector('code').innerText;

    navigator.clipboard.writeText(code).then(function () {
        var copyButton = codeBlock.querySelector('.copy-button');
        copyButton.textContent = 'Copied!';
        setTimeout(function () {
            copyButton.textContent = 'Copy';
        }, 2000);
    }, function (err) {
        console.error('Could not copy text: ', err);
    });
}

// // your turn section 
function performSearch() {
    const arrayInput = document.getElementById("arrayInput").value;
    const targetInput = document.getElementById("targetInput").value;

    
    const array = arrayInput.split(",").map(item => item.trim());

    
    const isNumericArray = array.every(item => !isNaN(parseFloat(item)));
    if (!isNumericArray) {
        displayResults(["Input array must contain only numeric or floating-point values."]);
        return;
    }

  
    if (array.length > 15) {
        displayResults(["Input array cannot have more than 15 elements."]);
        return;
    }

    const isAlphanumeric = array.some(item => !/^-?\d*\.?\d+$/.test(item));
    if (isAlphanumeric) {
        displayResults(["Input array must contain only numeric or floating-point values."]);
        return;
    }

    const target = parseFloat(targetInput);

    const isSorted = checkSort(array);

    let searchType;
    if (isSorted) {
        searchType = "Binary Search";
        binarySearchWithSteps(array.map(Number), target);
    } else {
        searchType = "Linear Search";
        linearSearchWithSteps(array.map(Number), target);
    }

    displayResults([`Performing ${searchType}...`]);
}



function checkSort(array) {
    for (let index = 1; index < array.length; index++) {
        if (array[index] < array[index - 1]) {
            return false;
        }
    }
    return true;
}

function displayArray(array, status) {
    const arrayContainer = document.getElementById("arrayContainer");
    arrayContainer.innerHTML = "";

    for (let index = 0; index < array.length; index++) {
        const elementDiv = document.createElement("div");
        elementDiv.textContent = array[index];
        elementDiv.classList.add("array-element", status);
        arrayContainer.appendChild(elementDiv);
    }
}

async function sleep(ms, message) {
    return new Promise(resolve => {
        setTimeout(() => {
            if (message) {
                const resultsContainer = document.getElementById("resultsContainer");
                const stepDiv = document.createElement("div");
                stepDiv.innerHTML = message;
                resultsContainer.appendChild(stepDiv);
            }
            resolve();
        }, ms);
    });
}

async function binarySearchWithSteps(array, target) {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";

    let low = 0;
    let high = array.length - 1;
    let foundIndex = -1;

    for (let iteration = 0; low <= high && foundIndex === -1; iteration++) {
        const midValue = Math.floor((low + high) / 2);
        const stepArray = [...array];
        displayArray(stepArray, "unchecked");

        const stepElement = document.getElementsByClassName("array-element")[midValue];
        stepElement.classList.remove("unchecked");
        stepElement.classList.add("checked");
        const stepStatement = `Iteration ${iteration + 1}: Checking element at index ${midValue}. Array: [${stepArray.join(', ')}]`;

        await sleep(1000, stepStatement);

        if (stepArray[midValue] === target) {
            foundIndex = midValue;
        } else if (stepArray[midValue] < target) {
            const adjustStatement = `Element at index ${midValue} is smaller. Adjusting the search range.`;
            displayArray(stepArray, "checked");
            displayResults([stepStatement, adjustStatement]);
            low = midValue + 1;
        } else {
            const adjustStatement = `Element at index ${midValue} is larger. Adjusting the search range.`;
            displayArray(stepArray, "checked");
            displayResults([stepStatement, adjustStatement]);
            high = midValue - 1;
        }
    }

    if (foundIndex !== -1) {
        const stepArray = [...array];
        const foundElement = document.getElementsByClassName("array-element")[foundIndex];
        foundElement.classList.remove("checked");
        foundElement.classList.add("found", "blink");
        const foundStatement = `Target element found at index ${foundIndex}. Array: [${stepArray.join(', ')}]`;
        displayResults([foundStatement]);
    } else {
        const notFoundStatement = "Target element not found in the array.";
        displayResults([notFoundStatement]);
    }
}

async function linearSearchWithSteps(array, target) {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";

    let foundIndex = -1;

    for (let index = 0; index < array.length && foundIndex === -1; index++) {
        const stepArray = [...array];
        displayArray(stepArray, "unchecked");

        const stepElement = document.getElementsByClassName("array-element")[index];
        stepElement.classList.remove("unchecked");
        stepElement.classList.add("checked");
        const stepStatement = `Iteration ${index + 1}: Checking element at index ${index}. Array: [${stepArray.join(', ')}]`;

        await sleep(1000, stepStatement);

        if (stepArray[index] === target) {
            foundIndex = index;
        }
    }

    if (foundIndex !== -1) {
        const stepArray = [...array];
        const foundElement = document.getElementsByClassName("array-element")[foundIndex];
        foundElement.classList.remove("checked");
        foundElement.classList.add("found", "blink");
        const foundStatement = `Target element found at index ${foundIndex}. Array: [${stepArray.join(', ')}]`;
        displayResults([foundStatement]);
    } else {
        const notFoundStatement = "Target element not found in the array.";
        displayResults([notFoundStatement]);
    }
}


function displayResults(statements) {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";

    for (let i = 0; i < statements.length; i++) {
        const statementDiv = document.createElement("div");
        statementDiv.innerHTML = statements[i];
        resultsContainer.appendChild(statementDiv);
    }
}

// Quiz script

const questions = [
    {
        question: " Q1) Which of the following is/are valid searching algorithms?",
        choices: ["Linear Search", "Bubble Sort", "Binary Search", "Quick Sort"],
        correctAnswers: [0, 2]
    },
    {
        question: " Q2) What is/are the time complexity of linear search?",
        choices: ["O(log n)", "O(n)", "O(n^2)", "O(1)"],
        correctAnswers: [1]
    },
    {
        question: " Q3) Which searching algorithm is/are efficient for large datasets?",
        choices: ["Binary Search", "Linear Search", "Bubble Sort", "Quick Sort"],
        correctAnswers: [0]
    },
    {
        question: " Q4) What is/are the main advantage of binary search over linear search?",
        choices: ["Binary search is faster for small datasets", "Binary search is faster for unsorted data", "Binary search requires less memory", "Binary search works on linked lists"],
        correctAnswers: [2]
    },
    {
        question: " Q5) When can binary search be applied?",
        choices: ["Only on unsorted lists throughout", "Only to data files", "Only on sorted lists", "Only on small lists"],
        correctAnswers: [2]
    },
    {
        question: " Q6) Which of the following is/are characteristics of a Binary Search algorithm?",
        choices: ["The list must be sorted", "It has a time complexity of O(n)", "It uses divide and conquer strategy", "It can only be used on numerical data"],
        correctAnswers: [0, 2, 3]
    },
    {
        question: " Q7) What is/are the time complexity of binary search in the worst case and average case respectively?",
        choices: ["O(log n) and O(n)", "O(log n) and O(log n)", "O(n) and O(log n)", "O(1) and O(n)"],
        correctAnswers: [1]
    },
    {
        question: " Q8) What are the advantages of Linear Search Over Binary Search?",
        choices: ["Suitable for searching an element in a large list", "Needs less number of comparisons", "Has low time and space complexity", "Used for both sorted and unsorted lists"],
        correctAnswers: [3]
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const nextButton = document.getElementById("next-btn");

function loadQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    choicesElement.innerHTML = '';

    question.choices.forEach((choice, index) => {
        const choiceElement = document.createElement("div");
        choiceElement.className = "choice";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `choice-${index}`;
        checkbox.value = index;

        const label = document.createElement("label");
        label.textContent = `  ${choice}`;
        label.htmlFor = `choice-${index}`;

        choiceElement.appendChild(checkbox);
        choiceElement.appendChild(label);

        choicesElement.appendChild(choiceElement);
    });
}

function checkAnswer() {
    const question = questions[currentQuestion];
    const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedIndexes = Array.from(selectedCheckboxes).map(checkbox => parseInt(checkbox.value));

    const isCorrect = JSON.stringify(selectedIndexes.sort()) === JSON.stringify(question.correctAnswers.sort());

    if (isCorrect) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    choicesElement.innerHTML = '';
    nextButton.style.display = "none";
}

nextButton.addEventListener("click", () => {
    checkAnswer();
});

loadQuestion();


function setEqualWidth() {
    const choices = document.querySelectorAll('.choice');
    let maxWidth = 300;
    choices.forEach(choice => {
        const choiceWidth = choice.getBoundingClientRect().width;
        maxWidth = Math.max(maxWidth, choiceWidth);
    });
    choices.forEach(choice => {
        choice.style.width = maxWidth + 'px';
    });
}


function handleResize() {
    const choices = document.querySelectorAll('.choice');
    if (window.innerWidth >= 768) {
        setEqualWidth(); 
    } else if (window.innerWidth < 768 && window.innerWidth>380 ) {
        choices.forEach(choice => {
            choice.style.width = '500px';
        });
    }else{
        choices.forEach(choice => {
            choice.style.width = '310px';
        });
    }
}


window.addEventListener('load', handleResize);
window.addEventListener('resize', handleResize);
