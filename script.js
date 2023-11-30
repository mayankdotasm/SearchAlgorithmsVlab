function performSearch() {
    const arrayInput = document.getElementById("arrayInput").value;
    const targetInput = document.getElementById("targetInput").value;

    const array = arrayInput.split(",").map(Number);
    const target = parseInt(targetInput);

    const isSorted = checkSort(array);

    let searchType;
    if (isSorted) {
        searchType = "Binary Search";
        binarySearchWithSteps(array, target);
    } else {
        searchType = "Linear Search";
        linearSearchWithSteps(array, target);
    }

    displayResults([`Performing ${searchType}...`]);
}


// const codeBlocks = document.querySelectorAll('pre code');

    


// function switchCodeLanguage(language) {
//     const cppCode = document.getElementById("cppCode");
//     const ccbt = document.getElementById("ccb");
//     const pyCode = document.getElementById("pyCode");
//     const pcbt = document.getElementById("pcb");

//     if (language === "cpp") {
//         cppCode.style.display = "block";
//         ccbt.style.display = "block";

//         pyCode.style.display = "none";
//         pcbt.style.display = "none";


//     } else if (language === "python") {
//         cppCode.style.display = "none";
//         ccbt.style.display = "none";

//         pyCode.style.display = "block";
//         pcbt.style.display = "block";
//     }
// }

// function copyToClipboard(targetId) {
//     const codeToCopy = document.getElementById(targetId).textContent;
//     navigator.clipboard.writeText(codeToCopy).then(function () {
//         alert('Code copied to clipboard!');
//     }).catch(function (err) {
//         console.error('Unable to copy code to clipboard', err);
//     });
// }

    
const changeButton = document.querySelector('#codeChange');
const cppCode = document.getElementById("cppCode");
const ccbt = document.getElementById("ccb");
const pyCode = document.getElementById("pyCode");
const pcbt = document.getElementById("pcb");

changeButton.addEventListener('click', function () {
    

    if (cppCode.style.display === 'block') {
        
        cppCode.style.display = "none";
        ccbt.style.display = "none";

        pyCode.style.display = "block";
        pcbt.style.display = "block";
        changeButton.innerHTML= "<B>   C++ &#8592; <strong id=\"cbtclr\">Python</strong>  </B>"

    } else{
        cppCode.style.display = "block";
        ccbt.style.display = "block";

        pyCode.style.display = "none";
        pcbt.style.display = "none";
          
        changeButton.innerHTML= "<B> <strong id=\"cbtclr\">C++</strong>   &#8594; Python </B>" 
    }
});

// Initialize Clipboard.js for copy buttons
const copyButtons = document.querySelectorAll('.copy-button');
copyButtons.forEach(function (button) {
    new ClipboardJS(button);

    button.addEventListener('click', function () {
        alert('Code copied to clipboard!');
    });
});

    
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
            choices: ["Only on unsorted lists", "Only on lists of integers", "Only on sorted lists", "Only on small lists"],
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
            choices: ["The array is ordered", "Less number of comparison", "less time and space complexity", "Linear search can be used irrespective of whether the array is sorted or not"],
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
