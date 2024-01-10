const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const text = document.querySelector('.score')

let score = 0;
let isPipePassed = false; // Adicionada variável para controlar se o pipe já foi passado
let time = 1.5

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        // Mario atingiu o pipe

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './Images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);
    } else if (pipePosition <= 0 && !isPipePassed) {
        // Mario passou pelo pipe com sucesso
        score++;
        isPipePassed = true; // Marcar o pipe como passado para evitar incremento múltiplo
        console.log('Score: ', score);
        text.textContent = `Pontuação: ${score}`;
        time = time - 0.01
        pipe.style.animation = `pipe-animation ${time}s infinite linear`;
        
        console.log(time)
    } else if (pipePosition > 0) {
        isPipePassed = false; // Resetar a marcação quando o pipe sair da tela
    }

}, 10);

document.addEventListener('keydown', jump);
