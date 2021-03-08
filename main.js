import { createInterface } from "readline";
const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function startGame() {

  const steps = {
    start: {
      message: `Do you want to play a game? yes/no`,
      yes: "firstStep",
      no: () => {
        console.log("Bye then!");
        readline.close();
      },
    },
    end: {
      message: "Do you want to play again? yes/no",
      yes: "start",
      no: () => {
        console.log("Bye then!");
        readline.close();
      },
    },
    firstStep: {
      message: "Okay, this game consists of several trivia questions that you will have to answer correctly in order to advance, each question will get harder.\nFirst question: Is Earth bigger than Mars? yes/no\n",
      yes: "secondStep",
      no: () => {
        console.log("Bye then!");
        readline.close();
      },
    },
    secondStep: {
      message: "Correct!\nSecond question: Who is the president of the United States? Type 'one' for Joe Biden or 'two' for Donald Trump.\n",
      one: "thirdStep",
      two: () => {
        console.log("Oh incorrect! You lose!");
        readline.close();
      },
    },
    thirdStep: {
      message: "Correct!\nThird question: What is denser oil or water? Type 'one' for oil or 'two' for water.",
      one: "fourthStep",
      two: () => {
        console.log("Oh incorrect! You lose!");
        readline.close();
      }
    },
    fourthStep: {
      message: "Correct\nCongratulations! You have won!",
    },
  };

  let currentStep = "start";

  function logStep() {
    const step = steps[currentStep];

    if (step) {
      readline.question(`${step.message || ""} `, (input) => {
        handleAnswer(input);
      });
    }
  }

  function handleAnswer(answer) {
    let step;

    if (answer === "yes") {
      step = steps[currentStep].yes;
    } else if (answer === "one") {
      step = steps[currentStep].one;
    } else {
      step = steps[currentStep].no;
    }

    if (typeof step === "function") {
      step();
      return;
    }

    if (typeof step === "string") {
      currentStep = step;
    } else {
      currentStep = "end";
    }
    logStep();
  }

  console.clear();
  logStep();
}

startGame();