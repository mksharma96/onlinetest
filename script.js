const quesElement = document.querySelector('.ques-div');
const onlyAnsElement = document.querySelector('.onlyAns-div');
const nextBtnElement = document.querySelector('.next');
const prevBtnElement = document.querySelector('.prev');
const clearBtnElement = document.querySelector('.clear');
const sidebarButtons = document.querySelectorAll('.nav-div .btn');
const timerDiv = document.querySelector('.timer-div');
const submitDiv = document.querySelector('.submit-div');
let submitBtnElement = document.querySelector('.submit-btn');

let i = 0;
let selectedAnswers = [];

function setSidebarButtonsDisabled(state) {
    sidebarButtons.forEach(btn => btn.disabled = state);
}

function setRadioButtonsDisabled(state) {
    const inputs = onlyAnsElement.querySelectorAll('input[type="radio"]');
    inputs.forEach(input => input.disabled = state);
}

const dataObject = {
    question1: 'Question 1: What is the capital of India?',
    option1: ['Mosco', 'Washington Dc', 'New Delhi', 'Paris'],
    question2: 'Question 2: What is the color of the sun?',
    option2: ['Yellow', 'White', 'Red', 'Orange'],
    question3: 'Question 3: Where is the Statue of Unity situated?',
    option3: ['Uttar Pradesh', 'Bihar', 'Maharashtra', 'Gujarat'],
    question4: 'Question 4: Who was the first president of India?',
    option4: ['Dr Rajendra Prasad', 'Jawaharlal Nehru', 'Jay Prakash Narayan', 'Mahatma Gandhi'],
    question5: 'Question 5: What is the capital of France?',
    option5: ['Berlin', 'Madrid', 'Rome', 'Paris'],
    question6: 'Question 6: Which planet is known as the Red Planet?',
    option6: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    question7: 'Question 7: Who wrote the national anthem of India?',
    option7: ['Bankim Chandra', 'Tagore', 'Sarojini Naidu', 'Tilak'],
    question8: 'Question 8: What is the largest mammal?',
    option8: ['Elephant', 'Giraffe', 'Blue Whale', 'Rhino'],
    question9: 'Question 9: What is the boiling point of water?',
    option9: ['50°C', '100°C', '150°C', '90°C'],
    question10: 'Question 10: Which gas do plants absorb?',
    option10: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
    question11: 'Question 11: Who invented the telephone?',
    option11: ['Edison', 'Tesla', 'Bell', 'Einstein'],
    question12: 'Question 12: What is the national bird of India?',
    option12: ['Sparrow', 'Peacock', 'Eagle', 'Parrot'],
    question13: 'Question 13: Which is the smallest continent?',
    option13: ['Asia', 'Europe', 'Australia', 'Africa'],
    question14: 'Question 14: What is the chemical symbol for water?',
    option14: ['O2', 'H2O', 'CO2', 'NaCl'],
    question15: 'Question 15: Who is known as the Father of the Nation in India?',
    option15: ['Nehru', 'Subhash Chandra Bose', 'Bhagat Singh', 'Gandhi'],
    question16: 'Question 16: What is the square root of 64?',
    option16: ['6', '8', '10', '12'],
    question17: 'Question 17: Which animal is known as the Ship of the Desert?',
    option17: ['Camel', 'Horse', 'Elephant', 'Donkey'],
    question18: 'Question 18: What is the capital of Japan?',
    option18: ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya'],
    question19: 'Question 19: How many legs does a spider have?',
    option19: ['6', '8', '10', '12'],
    question20: 'Question 20: What is the hardest substance on Earth?',
    option20: ['Gold', 'Iron', 'Diamond', 'Platinum'],
    question21: 'Question 21: Who painted the Mona Lisa?',
    option21: ['Van Gogh', 'Picasso', 'Da Vinci', 'Rembrandt'],
    question22: 'Question 22: What is the fastest land animal?',
    option22: ['Lion', 'Cheetah', 'Tiger', 'Leopard'],
    question23: 'Question 23: Which is the largest ocean?',
    option23: ['Atlantic', 'Pacific', 'Indian', 'Arctic'],
    question24: 'Question 24: What currency is used in the USA?',
    option24: ['Rupee', 'Euro', 'Dollar', 'Pound'],
    question25: 'Question 25: What is the main source of energy for Earth?',
    option25: ['Wind', 'Sun', 'Coal', 'Oil'],
    question26: 'Question 26: What is the capital of Australia?',
    option26: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
    question27: 'Question 27: Which planet has rings?',
    option27: ['Earth', 'Mars', 'Saturn', 'Venus'],
    question28: 'Question 28: What is the national flower of India?',
    option28: ['Rose', 'Sunflower', 'Lotus', 'Lily'],
    question29: 'Question 29: Who discovered gravity?',
    option29: ['Newton', 'Galileo', 'Einstein', 'Darwin'],
    question30: 'Question 30: What organ pumps blood through the body?',
    option30: ['Lungs', 'Liver', 'Heart', 'Kidneys'],
    correctAnswers: [
        'ans3', 'ans1', 'ans4', 'ans1', 'ans4',
        'ans2', 'ans2', 'ans3', 'ans2', 'ans2',
        'ans3', 'ans2', 'ans3', 'ans2', 'ans4',
        'ans2', 'ans1', 'ans1', 'ans2', 'ans3',
        'ans3', 'ans2', 'ans2', 'ans3', 'ans2',
        'ans3', 'ans3', 'ans3', 'ans1', 'ans3'
    ]
};

if (sessionStorage.getItem('quizAnswers')) {
    selectedAnswers = JSON.parse(sessionStorage.getItem('quizAnswers'));
}

const totalQuestions = 30;
const TOTAL_TIME = 30 * 60;
let timerInterval;
let endTimestamp = Number(sessionStorage.getItem('quizEndTime'));

if (endTimestamp) {
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}

function updateTimer() {
    const now = Date.now();
    let timeLeft = Math.floor((endTimestamp - now) / 1000);
    if (timeLeft < 0) timeLeft = 0;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDiv.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeLeft === 0) {
        clearInterval(timerInterval);
        alert("Time's up! Auto-submitting your answers.");
        if (submitBtnElement) submitBtnElement.click();
        sessionStorage.removeItem('quizEndTime');
    }
}

nextBtnElement.onclick = () => { if (i < 29) { i++; renderData(i); } };
prevBtnElement.onclick = () => { if (i > 0) { i--; renderData(i); } };
clearBtnElement.onclick = () => {
    selectedAnswers[i] = undefined;
    sessionStorage.setItem('quizAnswers', JSON.stringify(selectedAnswers));
    renderData(i);
    updateSidebarColor();
};

function updateSidebarColor() {
    sidebarButtons.forEach((btn, index) => {
        if (selectedAnswers[index]) {
            btn.style.backgroundColor = '#4CAF50';
            btn.style.color = 'white';
        } else {
            btn.style.backgroundColor = '';
            btn.style.color = '';
        }
    });
}

function renderData(index) {
    if (index < 0 || index > 29) return;
    quesElement.textContent = dataObject[`question${index + 1}`];

    onlyAnsElement.innerHTML = `
        <input class="inputBtn" type="radio" name="answer" value="ans1">1. ${dataObject[`option${index + 1}`][0]}<br>
        <input class="inputBtn" type="radio" name="answer" value="ans2">2. ${dataObject[`option${index + 1}`][1]}<br>
        <input class="inputBtn" type="radio" name="answer" value="ans3">3. ${dataObject[`option${index + 1}`][2]}<br>
        <input class="inputBtn" type="radio" name="answer" value="ans4">4. ${dataObject[`option${index + 1}`][3]}`;

    if (selectedAnswers[index]) {
        const selected = onlyAnsElement.querySelector(`input[value="${selectedAnswers[index]}"]`);
        if (selected) selected.checked = true;
    }

    document.querySelectorAll('.inputBtn').forEach(input => {
        input.addEventListener('change', () => {
            if (input.checked) {
                selectedAnswers[index] = input.value;
                sessionStorage.setItem('quizAnswers', JSON.stringify(selectedAnswers));
                updateSidebarColor();
            }
        });
    });

    updateSidebarColor();
    setRadioButtonsDisabled(nextBtnElement.disabled);
}

sidebarButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        i = index;
        renderData(i);
    });
});

function handleSubmit() {
    submitBtnElement.addEventListener('click', () => {
        const confirmSubmit = confirm("Are you sure you want to submit the quiz?");
        if (!confirmSubmit) return;

        let totalAttempted = 0;
        let totalCorrect = 0;

        selectedAnswers.forEach((ans, index) => {
            if (ans !== undefined) {
                totalAttempted++;
                if (ans === dataObject.correctAnswers[index]) totalCorrect++;
            }
        });

        nextBtnElement.disabled = true;
        prevBtnElement.disabled = true;
        clearBtnElement.disabled = true;
        setSidebarButtonsDisabled(true);
        setRadioButtonsDisabled(true);

        submitDiv.innerHTML = `
            <div class="result-box" style="margin-top: 10px; padding: 10px; background: #f0f0f0; border-radius: 8px;">
                <p><strong>Total Questions:</strong> ${totalQuestions}</p>
                <p><strong>Attempted:</strong> ${totalAttempted}</p>
                <p><strong>Correct:</strong> ${totalCorrect}</p>
                <button class="start-again-btn" style="margin-top: 10px; padding: 6px 12px; background-color: #4CAF50; color: white; border: none; border-radius: 4px;">Start Again</button>
            </div>`;

        clearInterval(timerInterval);
        sessionStorage.removeItem('quizAnswers');
        sessionStorage.removeItem('quizEndTime');

        document.querySelector('.start-again-btn').addEventListener('click', () => {
            i = 0;
            selectedAnswers = [];
            sessionStorage.removeItem('quizAnswers');
            sessionStorage.removeItem('quizEndTime');
            renderData(i);
            updateSidebarColor();

            const newEndTime = Date.now() + TOTAL_TIME * 1000;
            sessionStorage.setItem('quizEndTime', newEndTime);
            endTimestamp = newEndTime;
            timerInterval = setInterval(updateTimer, 1000);
            updateTimer();

            submitDiv.innerHTML = `<button class="submit-btn">submit</button>`;
            submitBtnElement = document.querySelector('.submit-btn');

            nextBtnElement.disabled = false;
            prevBtnElement.disabled = false;
            clearBtnElement.disabled = false;
            setSidebarButtonsDisabled(false);
            setRadioButtonsDisabled(false);
            handleSubmit();
        });
    });
}

if (!sessionStorage.getItem('quizAnswers') || !sessionStorage.getItem('quizEndTime')) {
    nextBtnElement.disabled = true;
    prevBtnElement.disabled = true;
    clearBtnElement.disabled = true;
    setSidebarButtonsDisabled(true);
    setRadioButtonsDisabled(true);

    submitDiv.innerHTML = `<button class="start-btn" style="padding: 8px 16px; font-size: 16px;">Start Quiz</button>`;

    document.querySelector('.start-btn').addEventListener('click', () => {
        const newEndTime = Date.now() + TOTAL_TIME * 1000;
        sessionStorage.setItem('quizEndTime', newEndTime);
        sessionStorage.setItem('quizAnswers', JSON.stringify([]));
        endTimestamp = newEndTime;
        selectedAnswers = [];

        nextBtnElement.disabled = false;
        prevBtnElement.disabled = false;
        clearBtnElement.disabled = false;
        setSidebarButtonsDisabled(false);
        setRadioButtonsDisabled(false);

        timerInterval = setInterval(updateTimer, 1000);
        updateTimer();

        renderData(i);
        submitDiv.innerHTML = `<button class="submit-btn">submit</button>`;
        submitBtnElement = document.querySelector('.submit-btn');
        handleSubmit();
    });
} else {
    renderData(i);
    submitDiv.innerHTML = `<button class="submit-btn">submit</button>`;
    submitBtnElement = document.querySelector('.submit-btn');
    handleSubmit();
}
