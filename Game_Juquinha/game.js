// ==========================================
// SELEÇÃO DE ELEMENTOS DO HTML
// ==========================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('scoreDisplay');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreTxt = document.getElementById('finalScore');

// ==========================================
// CARREGAMENTO DE IMAGENS (ASSETS)
// ==========================================
const imgFundo = new Image();
imgFundo.src = 'imagens/caatinga_fundo.png';

const imgCacto = new Image();
imgCacto.src = 'imagens/cacto.png';

const imgPlataforma = new Image();
const imgJuquinha = new Image();

// ==========================================
// VARIÁVEIS GLOBAIS E CONTROLES
// ==========================================
let gameState = 'START';
let score = 0;
let pointsFromEnemies = 0;
let maxDistance = 0;
let cameraX = 0;
let nextChunkX = 0;

const keys = {};

// Tratamento de controles melhorado (Evita tela rolar e bugar p pulo)
window.addEventListener('keydown', e => {
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(e.code)) {
        e.preventDefault(); // Trava o scroll do navegador para não dar conflito
    }
    keys[e.code] = true;
}, { passive: false });

window.addEventListener('keyup', e => {
    keys[e.code] = false;
});

let level = { platforms: [], obstacles: [], enemies: [] };

function isColliding(r1, r2) {
    return r1.x < r2.x + r2.w && r1.x + r1.w > r2.x &&
        r1.y < r2.y + r2.h && r1.y + r1.h > r2.y;
}

// ==========================================
// GERAÇÃO INFINITA DO MAPA
// ==========================================
function generateChunk() {
    level.platforms.push({ x: nextChunkX, y: 440, w: 1000, h: 40 });

    let difficulty = Math.floor(nextChunkX / 1500);
    let maxPlatforms = 2 + Math.random() * 2;
    let maxObstacles = 1 + difficulty + Math.random() * 2;
    let maxEnemies = 1 + difficulty + Math.random();

    for (let i = 0; i < maxPlatforms; i++) {
        let px = nextChunkX + 100 + Math.random() * 800;
        let py = 220 + Math.random() * 120;
        level.platforms.push({ x: px, y: py, w: 150, h: 20 });
    }

    for (let i = 0; i < maxObstacles; i++) {
        let cx = nextChunkX + 200 + Math.random() * 700;
        level.obstacles.push({ x: cx, y: 390, w: 30, h: 50, color: '#1b4d3e' });
    }

    for (let i = 0; i < maxEnemies; i++) {
        let ex = nextChunkX + 300 + Math.random() * 600;
        level.enemies.push({
            x: ex, y: 410, w: 40, h: 30,
            speed: 1 + Math.random() * 1.5,
            dir: Math.random() > 0.5 ? 1 : -1,
            startX: ex - 100, endX: ex + 100,
            color: '#7f8c8d'
        });
    }
    nextChunkX += 1000;
}

// ==========================================
// CLASSE DO JOGADOR
// ==========================================
class Player {
    constructor(id, color, name) {
        this.id = id;
        this.color = color;
        this.name = name;
        this.w = 32;
        this.h = 64;
        this.speed = 4;
        this.jumpPower = -11;
        this.gravity = 0.4;
        this.frameX = 0;
        this.frameCount = 0;

        this.lives = 3;
        this.active = (id === 1); // P1 ativo por padrão
        this.dead = false;
    }

    join(startX) {
        this.active = true;
        this.dead = false;
        this.lives = 3; // Inicia com 3 vidas
        this.x = startX;
        this.y = 100; // Cai do céu
        this.dy = 0;
        this.grounded = false;
        this.h = 64;
    }

    takeDamage() {
        this.lives--; // Perde uma vida
        if (this.lives > 0) {
            // Se ainda tem vidas, cai do céu um pouco a frente
            this.x = cameraX + 200;
            this.y = 100;
            this.dy = 0;
        } else {
            // Se zerou as vidas, morre definitivamente na rodada
            this.dead = true;
        }
    }

    update() {
        if (!this.active || this.dead) return;

        let isCrouching = false, isMovingLeft = false, isMovingRight = false, isJumping = false;

        if (this.id === 1) { // JOGADOR 1
            isCrouching = keys['KeyS'];
            isMovingRight = keys['KeyD'];
            isMovingLeft = keys['KeyA'];
            isJumping = keys['KeyW'] || keys['Space'];
        } else if (this.id === 2) { // JOGADOR 2
            isCrouching = keys['ArrowDown'];
            isMovingRight = keys['ArrowRight'];
            isMovingLeft = keys['ArrowLeft'];
            isJumping = keys['ArrowUp'];
        }

        this.h = isCrouching ? 40 : 64;

        let oldX = this.x;
        if (isMovingRight) this.x += this.speed;
        if (isMovingLeft) this.x -= this.speed;

        // Ficou para trás da câmera = toma dano e renasce na frente
        if (this.x < cameraX - 50) {
            this.takeDamage();
            return;
        }

        for (let p of level.platforms) {
            if (isColliding(this, p)) {
                if (this.x > oldX) this.x = p.x - this.w;
                else if (this.x < oldX) this.x = p.x + p.w;
            }
        }

        if (isJumping && this.grounded) {
            this.dy = this.jumpPower;
            this.grounded = false;
        }

        this.dy += this.gravity;
        this.y += this.dy;
        this.grounded = false;

        for (let p of level.platforms) {
            if (isColliding(this, p)) {
                if (this.dy > 0) {
                    this.y = p.y - this.h;
                    this.dy = 0;
                    this.grounded = true;
                } else if (this.dy < 0) {
                    this.y = p.y + p.h;
                    this.dy = 0;
                }
            }
        }

        // Caiu no buraco = toma dano
        if (this.y > 600) this.takeDamage();
    }

    draw() {
        if (!this.active || this.dead) return;

        let isMovingLeft = (this.id === 1) ? keys['KeyA'] : keys['ArrowLeft'];

        ctx.save();

        // Desenha Nome e Vidas (Corações) em cima da cabeça
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 4;
        let heartString = "❤️".repeat(this.lives); // Cria string de corações
        ctx.fillText(`${this.name} ${heartString}`, this.x - 10, this.y - 10);
        ctx.shadowBlur = 0;

        if (isMovingLeft) {
            ctx.scale(-1, 1);
            if (imgJuquinha.complete && imgJuquinha.naturalHeight !== 0) {
                ctx.drawImage(imgJuquinha, this.frameX * 32, 0, 32, 64, -this.x - this.w, this.y, this.w, this.h);
            } else {
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.x - this.w, this.y, this.w, this.h);
            }
        } else {
            if (imgJuquinha.complete && imgJuquinha.naturalHeight !== 0) {
                ctx.drawImage(imgJuquinha, this.frameX * 32, 0, 32, 64, this.x, this.y, this.w, this.h);
            } else {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.w, this.h);
            }
        }
        ctx.restore();
    }
}

// Criando os jogadores
const players = [
    new Player(1, '#2ecc71', 'P1'), // Verde
    new Player(2, '#3498db', 'P2')  // Azul
];

// ==========================================
// FUNÇÕES DO JOGO
// ==========================================
function resetGame() {
    level.platforms = [];
    level.obstacles = [];
    level.enemies = [];

    score = 0;
    pointsFromEnemies = 0;
    maxDistance = 0;
    cameraX = 0;
    nextChunkX = 0;

    // P1 entra no jogo, P2 fica aguardando ENTER
    players[0].join(100);
    players[1].active = false;

    generateChunk();
    generateChunk();

    gameState = 'PLAYING';
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === 'START') {
        if (keys['KeyW'] || keys['Space']) resetGame();
    }

    if (gameState === 'PLAYING') {

        // --- JOGADOR 2 ENTRA NO MEIO DA PARTIDA ---
        if (keys['Enter'] && !players[1].active) {
            players[1].join(cameraX + 200);
        }

        // Geração do mapa
        if (cameraX + 1200 > nextChunkX) generateChunk();

        // Limpeza de memória
        level.platforms = level.platforms.filter(p => p.x + p.w > cameraX - 800);
        level.obstacles = level.obstacles.filter(o => o.x + o.w > cameraX - 800);
        level.enemies = level.enemies.filter(e => e.x + e.w > cameraX - 800);

        // Verifica se ainda tem alguém vivo (Se os dois morrerem de vez, GAME OVER)
        let alivePlayers = players.filter(p => p.active && !p.dead);

        if (alivePlayers.length === 0) {
            gameState = 'GAMEOVER';
        } else {
            // A câmera foca no jogador mais avançado
            let leadX = Math.max(...alivePlayers.map(p => p.x));
            if (leadX > cameraX + 400) cameraX = leadX - 400;
            if (leadX > maxDistance) maxDistance = leadX;
        }

        score = Math.floor(maxDistance / 10) + pointsFromEnemies;

        ctx.save();

        // Renderiza Fundo
        if (imgFundo.complete && imgFundo.naturalHeight !== 0) {
            let bgX = (cameraX * 0.2) % canvas.width;
            ctx.drawImage(imgFundo, -bgX, 0, canvas.width, canvas.height);
            ctx.drawImage(imgFundo, -bgX + canvas.width, 0, canvas.width, canvas.height);
        } else {
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.translate(-cameraX, 0);

        // Renderiza Plataformas
        for (let p of level.platforms) {
            if (imgPlataforma.complete && imgPlataforma.naturalHeight !== 0) {
                ctx.drawImage(imgPlataforma, p.x, p.y, p.w, p.h);
            } else {
                ctx.fillStyle = '#d2b48c';
                ctx.fillRect(p.x, p.y, p.w, p.h);
            }
        }

        players.forEach(p => p.update());

        // Colisões com Obstáculos
        for (let o of level.obstacles) {
            if (imgCacto.complete && imgCacto.naturalHeight !== 0) {
                ctx.drawImage(imgCacto, o.x, o.y, o.w, o.h);
            } else {
                ctx.fillStyle = o.color;
                ctx.fillRect(o.x, o.y, o.w, o.h);
            }
            players.forEach(p => {
                if (p.active && !p.dead && isColliding(p, o)) {
                    p.takeDamage(); // Perde vida se bater no cacto
                }
            });
        }

        // Colisões e movimento dos inimigos
        for (let i = level.enemies.length - 1; i >= 0; i--) {
            let r = level.enemies[i];
            r.x += r.speed * r.dir;
            if (r.x > r.endX || r.x < r.startX) r.dir *= -1;

            ctx.fillStyle = r.color;
            ctx.beginPath();
            ctx.roundRect(r.x, r.y, r.w, r.h, 15);
            ctx.fill();

            players.forEach(p => {
                if (p.active && !p.dead && isColliding(p, r)) {
                    if (p.dy > 0 && p.y + p.h < r.y + 20) {
                        // Pulou na cabeça = Esmaga
                        p.dy = -8;
                        level.enemies.splice(i, 1);
                        pointsFromEnemies += 50;
                    } else {
                        // Bateu de frente = Perde vida
                        p.takeDamage();
                    }
                }
            });
        }

        players.forEach(p => p.draw());
        ctx.restore();

        scoreDisplay.innerText = `PONTOS: ${score}`;
    }

    if (gameState === 'GAMEOVER') {
        gameOverScreen.classList.remove('hidden');
        finalScoreTxt.innerText = `Vocês alcançaram ${Math.floor(maxDistance / 10)}m e fizeram ${score} pontos!`;
        if (keys['KeyW'] || keys['Space']) resetGame();
    }

    requestAnimationFrame(gameLoop);
}

// Inicia o jogo
gameLoop();