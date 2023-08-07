window.onload = function() {
    quiz.init();
}

class Quiz {
    questions = [
        {q: "W którym roku jadłem pierwszego Big Maca?", answers: ["2019", "2018", "2008", "2017"], correctAnswer: 1 },
        {q: "Ile mam w bicepsie?", answers: ["23", "2018", "2008", "2017"], correctAnswer: 2 },
        {q: "Kiedy pojedziemy na wakacje?", answers: ["Nigdy", "Teraz", "Za miesiąc", "Październik"], correctAnswer: 3 },
        {q: "W którym roku urodził się twój stary?", answers: ["2019", "2018", "2008", "2017"], correctAnswer: 1 },
    ];



    currentQuestionIndex = -1;
    heading = null;
    questionParagraph = null;
    answer0 = null;
    answer1 = null;
    answer2 = null;
    answer3 = null;
    correctAnswerNum = null;

    userSelectedInput = null;
    userCorrectAnswersNum = 0;
    userBadAsnwersNum = 0;
    saveAnswerBtn = null;
    nextQuestionBtn = null;

    modalWindow = null

    init() {
        this.heading = document.querySelector(".alert-heading");
        this.answer0 = document.querySelector("#answer0");
        this.answer1 = document.querySelector("#answer1");
        this.answer2 = document.querySelector("#answer2");
        this.answer3 = document.querySelector("#answer3");
        this.questionParagraph = document.querySelector("#questionParagraph");
        
        this.saveAnswerBtn = document.querySelector("#saveAnswerBtn");
        this.nextQuestionBtn = document.querySelector("#nextQuestionBtn");

        this.setNextQuestionData();
        
        this.saveAnswerBtn.addEventListener('click', this.checkAnswer)
        this.nextQuestionBtn.addEventListener('click', this.setNextQuestionData)

        this.initModal()
    }

    initModal = () => {
        this.modalWindow = new bootstrap.Modal(document.getElementById("modalWindow"))

        document.getElementById("closeModal").addEventListener('click', this.restartQuiz)
    }

    checkAnswer = () => {
        this.userSelectedInput = document.querySelector("input[type='radio']:checked")
        if(!this.userSelectedInput) return

        const selectedIndex = this.userSelectedInput.getAttribute("data-index")

        if(selectedIndex == this.correctAnswerNum) {
            this.userCorrectAnswersNum++
            this.userSelectedInput.classList.add("is-valid")
        } else {
            this.userBadAsnwersNum++
            this.userSelectedInput.classList.add("is-invalid")
        }

        this.setUserStats()
        this.saveAnswerBtn.classList.add("disabled")
        this.nextQuestionBtn.classList.remove("disabled")
    }

    setUserStats = () => {
        document.getElementById("correctAsnwers").innerHTML = this.userCorrectAnswersNum
        document.getElementById("badAnswers").innerHTML = this.userBadAsnwersNum
    }

    setNextQuestionData = () => {
        this.currentQuestionIndex++;

        if(this.currentQuestionIndex >= this.questions.length) {
            console.log("End quiz");
            this.showModalResults()
            return;
        }

        const question = this.questions[ this.currentQuestionIndex ];
        const qStr = `Question ${this.currentQuestionIndex+1}
                        from ${this.questions.length}: `

        this.heading.innerHTML = qStr + question.q
        this.answer0.innerHTML = question.answers[0]
        this.answer1.innerHTML = question.answers[1]
        this.answer2.innerHTML = question.answers[2]
        this.answer3.innerHTML = question.answers[3]
        this.correctAnswerNum = question.correctAnswer

        document.querySelectorAll("input[type='radio']").forEach((el) => {
            el.classList.remove("is-valid")
            el.classList.remove("is-invalid")
            el.checked = false
        }) 

        this.saveAnswerBtn.classList.remove("disabled")
        this.nextQuestionBtn.classList.add("disabled")
    }

    showModalResults = () => {
        const modalParagraph = document.getElementById("modalResults")

        let information
        if(this.userCorrectAnswersNum >= this.userBadAsnwersNum) {
            information = "Congratulations! Half of answers is correct"
        } else {
            information = "Sorry, less than half is correct. Try later :("
        }

        modalParagraph.innerHTML = information
        this.modalWindow.toggle()
    }

    restartQuiz = () => {
        this.currentQuestionIndex = -1
        this.userCorrectAnswersNum = 0
        this.userBadAsnwersNum = 0

        this.setUserStats()
        this.setNextQuestionData()
    }
}

const quiz = new Quiz()

