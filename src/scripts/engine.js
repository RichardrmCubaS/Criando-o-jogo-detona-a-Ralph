// Definição do Construtor //
const state = {
    // Vistas associadas com as classes de CSS //
    view: {
        
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        timeleft: document.querySelector("#time-left"),      
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    // Valores associadas com as classes de CSS //    
    values: {
        gameVelocity: 1000,        
        hitPosition: 0,
        result: 0,
        currentTime: 10,        
        lives: 5, 
    },
    // ações associadas com as classes de CSS // 
    action: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),        
    }
}

// Função de Conta Regresiva do tempo do jogo//
function countDown() {
    state.values.currentTime--;
    state.view.timeleft.textContent = state.values.currentTime;

    if (state.values.currentTime < 0) {
        playSound("gameover");
        alert (" --- Game Over!!! --- Seu Resultado Foi => " + state.values.result + " Pontos");        
        state.values.lives--;
        state.view.lives.textContent = state.values.lives;
        clearInterval(state.action.countDownTimerId);
        clearInterval(state.action.timerId);
        alert (" --- Presione [F5] para iniciar um novo jogo --- ");
        playSound("stage");
    }
}

function playSound(audioName) {
    let audio = new Audio(`../src/sounds/${audioName}.mp3`);
    audio.volume = 0.4;
    audio.play();
}

// Função movimento Aleatoria do enemigo//
function randomSquare() {
    state.view.squares.forEach((squares) => {
        squares.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;  
}

// Função de escuta que espera por uma ação//
function addListenerHitBox() {
    state.view.squares.forEach((squares) => {
        squares.addEventListener("mousedown", () => {
            if(squares.id === state.values.hitPosition) {
                state.values.result+=100;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("die");
            }
        });
    });
}

// Função Principal do App//
function main() {
    addListenerHitBox();
}

// Corpo de App //
main();