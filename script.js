window.onload = function() {
    quiz.init();
}

class Quiz {
    questions = [
        {q: "W którym roku jem?", answers: ["2019", "2018", "2008", "2017"], correctAnswer: 1 },
        {q: "W którym roku zjadłem robaka?", answers: ["2019", "2018", "2008", "2017"], correctAnswer: 2 },
        {q: "W którym roku zjadłem?", answers: ["2019", "2018", "2008", "2017"], correctAnswer: 3 },
        {q: "W którym roku?", answers: ["2019", "2018", "2008", "2017"], correctAnswer: 1 },
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
    userBadAsnwersNUm = 0;
    saveAnswerBtn = null;
    nextQuestionBtn = null;

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
    }

    checkAnswer = () => {
        
    }

    setNextQuestionData = () => {
        this.currentQuestionIndex++;

        if(this.currentQuestionIndex >= this.questions.length) {
            console.log("End quiz");
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
    }
}

const quiz = new Quiz()

