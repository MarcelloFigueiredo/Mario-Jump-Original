const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const timerDisplay = document.getElementById('timer'); // O elemento que exibirá o tempo
const gameOverMessage = document.getElementById('game-over-message'); // A mensagem de game over
const restartBtn = document.getElementById('restart-btn'); // O botão de reiniciar

let timer = 0; // Tempo inicial
let gameOver = false; // Variável para verificar se o jogo acabou

// Função para incrementar o tempo
const startTimer = () => {
    if (!gameOver) {
        setInterval(() => {
            if (!gameOver) {
                timer++;
                timerDisplay.textContent = `Tempo: ${timer}`; // Atualiza o display do tempo
            }
        }, 1000); // Incrementa o tempo a cada 1 segundo
    }
};

// Função de pulo
const jump = () => {
    if (!gameOver) { // Só permite pular se o jogo não acabou
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
};

// Função de reiniciar o jogo
const restartGame = () => {
    location.reload(); // Recarrega a página, reiniciando o jogo
};

// Loop do jogo
const loop = setInterval(() => {

    console.log('loop')

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    console.log(marioPosition);
    
    // Verifica se a posição do tubo e do Mario está dentro de um intervalo específico 
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80 && !gameOver) {

       pipe.style.animation = 'none'; // Interrompe a animação do tubo
       pipe.style.left = `${pipePosition}px`; 

       mario.style.animation = 'none';
       mario.style.bottom = `${marioPosition}px`; // Define a posição do Mario no eixo Y 

       mario.src = './images/game-over.png'; // Altera a imagem do Mario para indicar que o jogo acabou
       mario.style.width = '75px';
       mario.style.marginleft = '50px';

       clearInterval(loop); // Para o loop do jogo

       gameOver = true; // Marca o jogo como terminado

       // Exibe a mensagem de game over com o tempo
       gameOverMessage.style.display = 'block'; // Torna a mensagem visível
       gameOverMessage.textContent = `Seu tempo foi de ${timer} segundos!`; // Mostra o tempo final
       gameOverMessage.classList.add('show'); // Adiciona a classe de animação

       // Exibe o botão de reiniciar
       restartBtn.style.display = 'inline-block';
    }

}, 10);

// Inicia o cronômetro quando o jogo começa
startTimer();

// Inicia o pulo quando uma tecla é pressionada
document.addEventListener('keydown', jump);

// Adiciona o evento de clique para o botão de reiniciar
restartBtn.addEventListener('click', restartGame);


