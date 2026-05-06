// ==========================================
// SELEÇÃO DE ELEMENTOS DO HTML
// ==========================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('scoreDisplay');
const gameOverScreen = document.getElementById('gameOverScreen');
const victoryScreen = document.getElementById('victoryScreen');
const finalScoreTxt = document.getElementById('finalScore');
const victoryScoreTxt = document.getElementById('victoryScore');
const bossHealthBar = document.getElementById('bossHealthBar');
const bossHealthFill = document.getElementById('bossHealthFill');

// ==========================================
// CARREGAMENTO DE IMAGENS (ASSETS)
// ==========================================

function carregarImg(src) {
    let img = new Image();
    img.loaded = false;
    img.onload = () => img.loaded = true;
    img.src = src;
    return img;
}

// --- IMAGENS DO MENU ---
const imgMenuFundo = carregarImg('imagens/menu_fundo.png');
const imgMenuLogo = carregarImg('imagens/menu_logo.png');
const imgMenuJogar = carregarImg('imagens/menu_jogar.png');

// --- MUNDO 1 (SECO) ---
const imgFundo1 = carregarImg('imagens/caatinga_fundo.png');
const imgPlataforma1 = carregarImg('imagens/plataforma_1.png');
const imgCacto1 = carregarImg('imagens/cacto_1.png');

// --- MUNDO 2 (CHUVA) ---
const imgFundo2 = carregarImg('imagens/caatinga_chuva_fundo.png');
const imgPlataforma2 = carregarImg('imagens/plataforma_2.png');
const imgCacto2 = carregarImg('imagens/cacto_2.png');

// --- MUNDO 3 (DENSO) ---
const imgFundo3 = carregarImg('imagens/caatinga_densa_fundo.png');
const imgPlataforma3 = carregarImg('imagens/plataforma_3.png');
const imgCacto3 = carregarImg('imagens/cacto_3.png');

// --- JOGADORES (COBRAS NORMAIS) ---
const imgCobra = [];
for (let i = 1; i <= 4; i++) { let img = new Image(); img.src = `imagens/cobra_${i}.png`; imgCobra.push(img); }
const imgCobraP2 = [];
for (let i = 5; i <= 8; i++) { let img = new Image(); img.src = `imagens/cobra_${i}.png`; imgCobraP2.push(img); }

// --- JOGADORES (COBRAS DEITADAS) ---
const imgCobraDeitadaP1 = [];
for (let i = 1; i <= 3; i++) { let img = new Image(); img.src = `imagens/cobra_deitada_${i}.png`; imgCobraDeitadaP1.push(img); }
const imgCobraDeitadaP2 = [];
for (let i = 4; i <= 6; i++) { let img = new Image(); img.src = `imagens/cobra_deitada_${i}.png`; imgCobraDeitadaP2.push(img); }

// --- INIMIGOS NORMAIS ---
const imgRato = [];
for (let i = 1; i <= 4; i++) { let img = new Image(); img.src = `imagens/rato_${i}.png`; imgRato.push(img); }
const imgRatoMorrendo = [];
let imgEsmagado = new Image(); imgEsmagado.src = 'imagens/rato_morrendo_2.png';
let imgMorteNormal = new Image(); imgMorteNormal.src = 'imagens/rato_morrendo_1.png';
imgRatoMorrendo.push(imgEsmagado, imgMorteNormal);

const imgMangusto = [];
for (let i = 1; i <= 4; i++) { let img = new Image(); img.src = `imagens/mangusto_${i}.png`; imgMangusto.push(img); }
const imgMangustoPulo = new Image(); imgMangustoPulo.src = 'imagens/mangusto_pulando.png';
const imgMangustoMorrendo = new Image(); imgMangustoMorrendo.src = 'imagens/mangusto_morrendo.png';

// --- POWER-UPS E PROJÉTEIS ---
const imgPwVelocidade = new Image(); imgPwVelocidade.src = 'imagens/power_up_velocidade.png';
const imgPwPulo = new Image(); imgPwPulo.src = 'imagens/power_up_super_pulo.png';
const imgPwInvencivel = new Image(); imgPwInvencivel.src = 'imagens/power_up_invencibilidade.png';
const imgPwVeneno = new Image(); imgPwVeneno.src = 'imagens/power_up_veneno.png';
const imgPwVida = new Image(); imgPwVida.src = 'imagens/power_up_vida.png';
const imgTiroVeneno = new Image(); imgTiroVeneno.src = 'imagens/veneno_projetil.png';

// --- BOSS 1: CARCARÁ ---
const imgBoss1 = []; for (let i = 1; i <= 4; i++) { let img = new Image(); img.src = `imagens/carcara_${i}.png`; imgBoss1.push(img); }
const imgBoss1Tiro = new Image(); imgBoss1Tiro.src = 'imagens/carcara_projetil.png';
const imgBoss1Sobe = new Image(); imgBoss1Sobe.src = 'imagens/carcara_subindo.png';
const imgBoss1Desce = new Image(); imgBoss1Desce.src = 'imagens/carcara_descendo.png';
const imgBoss1Morte = new Image(); imgBoss1Morte.src = 'imagens/carcara_morrendo.png';
const imgOvo = new Image(); imgOvo.src = 'imagens/ovo_projetil.png';

// --- BOSS 2: TATU-PEIXEIRA ---
const imgTatuParado = new Image(); imgTatuParado.src = 'imagens/tatu_parado.png';
const imgTatuQuicando = new Image(); imgTatuQuicando.src = 'imagens/tatu_quicando.png';
const imgTatuMorrendo = new Image(); imgTatuMorrendo.src = 'imagens/tatu_morrendo.png';
const imgEspinhoProjetil = new Image(); imgEspinhoProjetil.src = 'imagens/espinho_projetil.png';
const imgTatuCansado = []; for (let i = 1; i <= 5; i++) { let img = new Image(); img.src = `imagens/tatu_cansado_${i}.png`; imgTatuCansado.push(img); }

// --- BOSS 3: SUSSUARANA ---
const imgSussuarana = []; for (let i = 1; i <= 4; i++) { let img = new Image(); img.src = `imagens/sussuarana_${i}.png`; imgSussuarana.push(img); }
const imgSussuaranaBote = new Image(); imgSussuaranaBote.src = 'imagens/sussuarana_bote.png';
const imgSussuaranaPuloFundo = new Image(); imgSussuaranaPuloFundo.src = 'imagens/sussuarana_pulo_fundo.png';
const imgSussuaranaEscondida = new Image(); imgSussuaranaEscondida.src = 'imagens/sussuarana_escondida_arbusto.png';
const imgSussuaranaBoteArbusto = new Image(); imgSussuaranaBoteArbusto.src = 'imagens/sussuarana_bote_arbusto.png';
const imgSussuaranaMorrendo = new Image(); imgSussuaranaMorrendo.src = 'imagens/sussuarana_morrendo.png';

// ==========================================
// VARIÁVEIS GLOBAIS E CONTROLES
// ==========================================
let gameState = 'START';
let score = 0; let bonusPoints = 0; let maxDistance = 0;
let cameraX = 0; let nextChunkX = 0; let cameraLocked = false; let currentStage = 1;
let startTime = 0; let totalTimeSeconds = 0;

// Variáveis da Tela de Menu Animada
let startBgX = 0; // Para rolar o fundo
let transitionAlpha = 0;
let playBtnScale = 1;
let mouseX = 0;
let mouseY = 0;
let isClicked = false;

// Rastreador de mouse para o botão Play
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});
canvas.addEventListener('mousedown', () => isClicked = true);
canvas.addEventListener('mouseup', () => isClicked = false);

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const keys = {};

window.addEventListener('keydown', e => {
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'ShiftRight'].includes(e.code)) e.preventDefault();
    keys[e.code] = true;
}, { passive: false });
window.addEventListener('keyup', e => { keys[e.code] = false; });

let level = { platforms: [], obstacles: [], enemies: [], powerUps: [] };
let projectiles = [];

function isColliding(r1, r2) {
    return r1.x < r2.x + r2.w && r1.x + r1.w > r2.x && r1.y < r2.y + r2.h && r1.y + r1.h > r2.y;
}
// ==========================================
// LÓGICA DE SPAWN DINÂMICO DE VIDA
// ==========================================
function calculateLifeSpawnChance(isBossFight = false) {
    let p1 = players[0];
    if (!p1.active || p1.dead) return 0;

    let lives = p1.lives;
    let baseChance = isBossFight ? 0.15 : 0.05;

    if (lives >= 3) return 0.001;
    if (lives === 2) return baseChance * 2;
    if (lives === 1) return baseChance * 4;

    return 0;
}

// ==========================================
// GERAÇÃO INFINITA DO MAPA
// ==========================================
function generateChunk() {
    let currentPlatImg = (currentStage === 3) ? imgPlataforma3 : (currentStage === 2 ? imgPlataforma2 : imgPlataforma1);
    let currentCactoImg = (currentStage === 3) ? imgCacto3 : (currentStage === 2 ? imgCacto2 : imgCacto1);
    let airPlatH = (currentStage === 1) ? 20 : 40;

    level.platforms.push({ x: nextChunkX - 50, y: 550, w: 1200, h: 50, img: currentPlatImg });

    let difficulty = Math.floor(nextChunkX / 1500);
    let maxPlatforms = 1 + Math.random() * 2;
    let maxObstacles = 1 + Math.floor(Math.random() * 2);
    let maxEnemies = Math.floor((1 + difficulty) * 0.8);

    let stepPlataforma = 1000 / (maxPlatforms + 1);
    for (let i = 0; i < maxPlatforms; i++) {
        let px = nextChunkX + (stepPlataforma * (i + 1)) - 50 + (Math.random() * 100);
        let py = (Math.random() > 0.5) ? 300 + Math.random() * 100 : 420 + Math.random() * 60;
        level.platforms.push({ x: px, y: py, w: 150, h: airPlatH, img: currentPlatImg });

        if (Math.random() > 0.5) {
            level.enemies.push({
                type: 'mangusto', x: px + 20, y: py - 40, w: 40, h: 30, speed: 1.5, dir: 1,
                startX: px, endX: px + 150 - 40, color: '#e67e22', state: 'walking',
                frameIndex: 0, frameCount: 0, deathTimer: 0, dy: 0, grounded: false, jumpTimer: 60 + Math.random() * 60
            });
        }
    }

    let stepObstaculo = 1000 / (maxObstacles + 1);
    for (let i = 0; i < maxObstacles; i++) {
        let cx = nextChunkX + (stepObstaculo * (i + 1)) - 20 + (Math.random() * 80);
        level.obstacles.push({ x: cx, y: 500, w: 24, h: 50, img: currentCactoImg });
    }

    let stepInimigo = 1000 / (maxEnemies + 1);
    for (let i = 0; i < maxEnemies; i++) {
        if (Math.random() > 0.5) {
            let ex = nextChunkX + (stepInimigo * (i + 1));
            level.enemies.push({
                type: 'rato', x: ex, y: 520, w: 40, h: 30, speed: 1 + Math.random() * 1.5, dir: Math.random() > 0.5 ? 1 : -1,
                startX: ex - 100, endX: ex + 100, color: '#7f8c8d', state: 'walking', frameIndex: 0, frameCount: 0, deathTimer: 0
            });
        }
    }

    if (Math.random() < 0.4) {
        let types = ['speed', 'jump', 'invincible', 'poison'];
        if (Math.random() < calculateLifeSpawnChance(false)) types.push('life');
        let t = types[Math.floor(Math.random() * types.length)];
        level.powerUps.push({ x: nextChunkX + 400 + Math.random() * 300, y: 400 - Math.random() * 100, w: 48, h: 48, type: t });
    }

    nextChunkX += 1000;
}

// ==========================================
// OBJETO DO BOSS E LÓGICA DE ARENA
// ==========================================
const boss = {
    active: false, type: '', state: 'normal', x: 0, y: 0, w: 96, h: 96,
    hp: 10, maxHp: 10, dy: 2, dx: 0,
    attackTimer: 120, powerUpTimer: 180, phaseTimer: 200, sweepTimer: 0, sweepDir: 1, deathTimer: 0,
    projectiles: [], frameIndex: 0, frameCount: 0, facingLeft: true, bushX: 0, fightStartTime: 0,
    bushAttacks: 0, cooldownTimer: 0 // <--- Novas variáveis para a Sussuarana
};

function startBossFight(type) {
    boss.active = true; boss.type = type; boss.state = 'normal'; cameraLocked = true;
    boss.hp = boss.maxHp; boss.x = cameraX + 850; boss.projectiles = []; boss.frameIndex = 0;
    boss.deathTimer = 0; boss.facingLeft = true; boss.fightStartTime = Date.now();
    boss.bushAttacks = 0; boss.cooldownTimer = 0;

    if (type === 'carcará') {
        boss.y = 100; boss.w = 96; boss.h = 96; boss.dy = 2; boss.phaseTimer = 200; boss.attackTimer = 120; boss.powerUpTimer = 100;
    } else if (type === 'tatu') {
        boss.y = 450; boss.w = 80; boss.h = 80; boss.state = 'quicando'; boss.dx = 9; boss.dy = -9; boss.phaseTimer = 350; boss.powerUpTimer = 150;
    } else if (type === 'sussuarana') {
        boss.y = 550 - 64; boss.w = 96; boss.h = 64; boss.state = 'correndo'; boss.dx = -6; boss.phaseTimer = 180; boss.powerUpTimer = 150;
    }

    bossHealthBar.classList.remove('hidden'); bossHealthFill.style.width = '100%';

    let currentPlatImg = (currentStage === 3) ? imgPlataforma3 : (currentStage === 2 ? imgPlataforma2 : imgPlataforma1);
    let airPlatH = (currentStage === 1) ? 20 : 40;

    level.enemies = []; level.obstacles = []; level.powerUps = [];

    // --- LÓGICA DE ARENA ALTERADA ---
    if (type === 'tatu') {
        // Tatu tem apenas uma plataforma no meio, não muito alta
        level.platforms = [
            { x: cameraX - 200, y: 550, w: 1400, h: 50, img: currentPlatImg },
            { x: cameraX + 425, y: 400, w: 150, h: airPlatH, img: currentPlatImg }
        ];
    } else {
        // Arena normal para os outros bosses
        level.platforms = [
            { x: cameraX - 200, y: 550, w: 1400, h: 50, img: currentPlatImg },
            { x: cameraX + 150, y: 420, w: 150, h: airPlatH, img: currentPlatImg },
            { x: cameraX + 425, y: 300, w: 150, h: airPlatH, img: currentPlatImg },
            { x: cameraX + 700, y: 420, w: 150, h: airPlatH, img: currentPlatImg }
        ];
    }
}

function processarMorteDoBoss() {
    boss.state = 'dying'; boss.deathTimer = 180; boss.dy = (boss.type === 'carcará') ? 1 : 0; boss.projectiles = [];
    let timeTaken = (Date.now() - boss.fightStartTime) / 1000;
    let timeBonus = Math.max(0, Math.floor(300 - (timeTaken * 3)));
    bonusPoints += timeBonus;
}

// ==========================================
// CLASSE DO JOGADOR
// ==========================================
class Player {
    constructor(id, color, name) {
        this.id = id; this.color = color; this.name = name;
        this.w = 20; this.h = 56; this.baseSpeed = 4.5; this.baseJump = -11;
        this.speed = this.baseSpeed; this.jumpPower = this.baseJump; this.gravity = 0.4;
        this.frameIndex = 0; this.frameCount = 0; this.facingLeft = false;
        this.lives = 3; this.active = (id === 1); this.dead = false; this.invulnerable = 0;
        this.powerTimers = { speed: 0, jump: 0, poison: 0 }; this.shootCooldown = 0;
    }

    join(startX) {
        this.active = true; this.dead = false; this.lives = 3;
        this.x = startX; this.y = 100; this.dy = 0; this.grounded = false;
        this.invulnerable = 60; this.powerTimers = { speed: 0, jump: 0, poison: 0 };
    }

    takeDamage(forceDamage = false) {
        if (!forceDamage && this.invulnerable > 0) return;
        this.lives--;
        if (this.lives > 0) { this.dy = 0; this.invulnerable = 120; } else { this.dead = true; }
    }

    collectPowerUp(type) {
        if (type === 'speed') this.powerTimers.speed = 600;
        if (type === 'jump') this.powerTimers.jump = 600;
        if (type === 'invincible') this.invulnerable = 600;
        if (type === 'poison') this.powerTimers.poison = 600;
        if (type === 'life') { if (this.lives < 3) this.lives++; else bonusPoints += 250; }
        bonusPoints += 100;
    }

    update() {
        if (!this.active || this.dead) return;

        if (this.invulnerable > 0) this.invulnerable--;
        if (this.powerTimers.speed > 0) { this.powerTimers.speed--; this.speed = this.baseSpeed * 2; } else { this.speed = this.baseSpeed; }
        if (this.powerTimers.jump > 0) { this.powerTimers.jump--; this.jumpPower = -15; } else { this.jumpPower = this.baseJump; }
        if (this.powerTimers.poison > 0) this.powerTimers.poison--;
        if (this.shootCooldown > 0) this.shootCooldown--;

        let isCrouching = false, isMovingLeft = false, isMovingRight = false, isJumping = false, isShooting = false;

        if (this.id === 1) {
            isCrouching = keys['KeyS']; isMovingRight = keys['KeyD']; isMovingLeft = keys['KeyA'];
            isJumping = keys['KeyW'] || keys['Space']; isShooting = keys['KeyF'];
        } else if (this.id === 2) {
            isCrouching = keys['ArrowDown']; isMovingRight = keys['ArrowRight']; isMovingLeft = keys['ArrowLeft'];
            isJumping = keys['ArrowUp']; isShooting = keys['ShiftRight'];
        }

        if (this.powerTimers.poison > 0 && isShooting && this.shootCooldown <= 0) {
            projectiles.push({ x: this.facingLeft ? this.x - 40 : this.x + this.w, y: this.y + 10, w: 48, h: 48, speedX: this.facingLeft ? -16 : 16, color: '#9b59b6' });
            this.shootCooldown = 20;
        }

        if (isMovingLeft) this.facingLeft = true; if (isMovingRight) this.facingLeft = false;

        if (!this.grounded && !isCrouching) { this.frameIndex = 1; }
        else if (isMovingLeft || isMovingRight || isCrouching) {
            this.frameCount++; let maxFrames = isCrouching ? 3 : 4;
            if (this.frameCount > 8) { this.frameIndex = (this.frameIndex + 1) % maxFrames; this.frameCount = 0; }
        } else { this.frameIndex = 0; this.frameCount = 0; }

        let oldH = this.h; this.h = isCrouching ? 32 : 56;
        if (this.h !== oldH) { this.y += oldH - this.h; }

        let oldX = this.x; if (isMovingRight) this.x += this.speed; if (isMovingLeft) this.x -= this.speed;
        if (this.x < cameraX) { this.x = cameraX; }
        if (cameraLocked && this.x + this.w > cameraX + 1000) { this.x = cameraX + 1000 - this.w; }

        for (let p of level.platforms) {
            if (isColliding(this, p)) {
                if (this.y + oldH > p.y + 10) { if (this.x > oldX) this.x = p.x - this.w; else if (this.x < oldX) this.x = p.x + p.w; }
            }
        }

        if (isJumping && this.grounded) { this.dy = this.jumpPower; this.grounded = false; }
        if (!isJumping && this.dy < -3) { this.dy *= 0.5; }
        this.dy += this.gravity; let oldY = this.y; this.y += this.dy; this.grounded = false;

        for (let p of level.platforms) {
            if (isColliding(this, p)) {
                if (this.dy > 0) { if (oldY + oldH <= p.y + 10) { this.y = p.y - this.h; this.dy = 0; this.grounded = true; } }
                else if (this.dy < 0) { if (oldY >= p.y + p.h - 10) { this.y = p.y + p.h; this.dy = 0; } }
            }
        }
        if (this.y > 700) this.takeDamage(true);
    }

    draw() {
        if (!this.active || this.dead) return;
        ctx.save();
        if (this.invulnerable > 0 && Math.floor(this.invulnerable / 5) % 2 === 0) {
            ctx.globalAlpha = (this.invulnerable > 120) ? 1 : 0.4;
            if (this.invulnerable > 120) { ctx.fillStyle = 'rgba(255, 215, 0, 0.5)'; ctx.beginPath(); ctx.arc(this.x + this.w / 2, this.y + this.h / 2, 40, 0, Math.PI * 2); ctx.fill(); }
        }
        ctx.fillStyle = "white"; ctx.font = "bold 14px Arial"; ctx.shadowColor = "black"; ctx.shadowBlur = 4;
        let info = `${this.name} ${"❤️".repeat(this.lives)}`; ctx.fillText(info, this.x - 10, this.y - 15); ctx.shadowBlur = 0;

        let isCrouching = (this.id === 1) ? keys['KeyS'] : keys['ArrowDown']; let animSet = null;
        if (isCrouching) { animSet = (this.id === 1) ? imgCobraDeitadaP1 : imgCobraDeitadaP2; } else { animSet = (this.id === 1) ? imgCobra : imgCobraP2; }
        let imagemAtual = animSet[this.frameIndex % animSet.length];
        let drawW = isCrouching ? 48 : 32; let drawH = isCrouching ? 32 : 64;
        let drawX = this.x - (isCrouching ? 14 : 6); let drawY = this.y - (isCrouching ? 0 : 8);

        if (this.facingLeft) {
            ctx.translate(drawX + drawW, drawY); ctx.scale(-1, 1);
            if (imagemAtual && imagemAtual.complete && imagemAtual.naturalHeight !== 0) { ctx.drawImage(imagemAtual, 0, 0, drawW, drawH); } else { ctx.fillStyle = this.color; ctx.fillRect(0, 0, this.w, this.h); }
        } else {
            if (imagemAtual && imagemAtual.complete && imagemAtual.naturalHeight !== 0) { ctx.drawImage(imagemAtual, drawX, drawY, drawW, drawH); } else { ctx.fillStyle = this.color; ctx.fillRect(this.x, this.y, this.w, this.h); }
        }
        ctx.restore();
    }
}
const players = [new Player(1, '#2ecc71', 'P1'), new Player(2, '#3498db', 'P2')];

function resetGame() {
    level.platforms = []; level.obstacles = []; level.enemies = []; level.powerUps = []; projectiles = [];
    score = 0; bonusPoints = 0; maxDistance = 0; cameraX = 0; nextChunkX = 0; currentStage = 1;
    startTime = Date.now(); boss.active = false; cameraLocked = false; bossHealthBar.classList.add('hidden');
    players[0].join(100); players[1].active = false;
    generateChunk(); generateChunk();
    gameState = 'PLAYING'; gameOverScreen.classList.add('hidden'); victoryScreen.classList.add('hidden');
}

function drawHUD() {
    let rightOffset = 50;
    players.forEach((p) => {
        if (!p.active || p.dead) return;
        let activePU = [];
        if (p.powerTimers.speed > 0) activePU.push({ img: imgPwVelocidade, time: p.powerTimers.speed });
        if (p.powerTimers.jump > 0) activePU.push({ img: imgPwPulo, time: p.powerTimers.jump });
        if (p.powerTimers.poison > 0) activePU.push({ img: imgPwVeneno, time: p.powerTimers.poison });
        if (p.invulnerable > 120) activePU.push({ img: imgPwInvencivel, time: p.invulnerable });

        activePU.forEach((pu) => {
            let radius = 25; let x = canvas.width - rightOffset; let y = 40;
            ctx.save(); ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
            if (pu.img && pu.img.complete && pu.img.naturalHeight !== 0) { ctx.drawImage(pu.img, x - radius + 5, y - radius + 5, radius * 2 - 10, radius * 2 - 10); }
            let pct = pu.time / 600; ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, radius, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * pct)); ctx.closePath(); ctx.fill();
            ctx.fillStyle = p.color; ctx.font = "bold 14px Arial"; ctx.textAlign = "center"; ctx.shadowColor = "black"; ctx.shadowBlur = 4;
            ctx.fillText(p.name, x, y + radius + 15); ctx.restore();
            rightOffset += 70;
        });
    });
}

let lastRenderTime = 0; const GAME_FPS = 60; const renderInterval = 1000 / GAME_FPS;

function gameLoop() {
    requestAnimationFrame(gameLoop);
    let now = performance.now(); let elapsed = now - lastRenderTime;
    if (elapsed < renderInterval) return;
    lastRenderTime = now - (elapsed % renderInterval);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === 'GAMEOVER' || gameState === 'VICTORY') {
        if (keys['KeyW'] || keys['Space']) resetGame();
    }

    if (gameState === 'START') {
        startBgX += 0.5;
        if (imgMenuFundo && imgMenuFundo.loaded) {
            let bgX = startBgX % canvas.width;
            ctx.drawImage(imgMenuFundo, -bgX, 0, canvas.width, canvas.height);
            ctx.drawImage(imgMenuFundo, -bgX + canvas.width, 0, canvas.width, canvas.height);
        } else {
            ctx.fillStyle = '#87CEEB'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        if (imgMenuLogo && imgMenuLogo.loaded) { ctx.drawImage(imgMenuLogo, canvas.width / 2 - 300, 50, 600, 200); }

        let btnW = 200; let btnH = 80; let btnX = canvas.width / 2 - btnW / 2; let btnY = 380;
        let hovering = (mouseX >= btnX && mouseX <= btnX + btnW && mouseY >= btnY && mouseY <= btnY + btnH);

        if (hovering) {
            canvas.style.cursor = 'pointer';
            if (isClicked) { gameState = 'TRANSITION'; isClicked = false; }
        } else { canvas.style.cursor = 'default'; }

        if (keys['KeyW'] || keys['Space'] || keys['Enter']) { gameState = 'TRANSITION'; }

        ctx.save(); ctx.translate(canvas.width / 2, btnY + btnH / 2);
        let pulse = 1 + Math.sin(now / 400) * 0.03;
        if (hovering) { ctx.scale(1.1, 1.1); } else { ctx.scale(pulse, pulse); }
        if (imgMenuJogar && imgMenuJogar.loaded) { ctx.drawImage(imgMenuJogar, -btnW / 2, -btnH / 2, btnW, btnH); } else { ctx.fillStyle = '#8e44ad'; ctx.fillRect(-btnW / 2, -btnH / 2, btnW, btnH); }
        ctx.restore();
    }

    if (gameState === 'TRANSITION') {
        canvas.style.cursor = 'default';
        startBgX += 0.5;
        if (imgMenuFundo && imgMenuFundo.loaded) {
            let bgX = startBgX % canvas.width;
            ctx.drawImage(imgMenuFundo, -bgX, 0, canvas.width, canvas.height);
            ctx.drawImage(imgMenuFundo, -bgX + canvas.width, 0, canvas.width, canvas.height);
        }
        if (imgMenuLogo && imgMenuLogo.loaded) { ctx.drawImage(imgMenuLogo, canvas.width / 2 - 300, 50, 600, 200); }
        playBtnScale += 0.15;
        ctx.save(); ctx.translate(canvas.width / 2, 380 + 40); ctx.scale(playBtnScale, playBtnScale);
        if (imgMenuJogar && imgMenuJogar.loaded) { ctx.drawImage(imgMenuJogar, -100, -40, 200, 80); }
        ctx.restore();
        transitionAlpha += 0.03; ctx.fillStyle = `rgba(0, 0, 0, ${transitionAlpha})`; ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (transitionAlpha >= 1) { transitionAlpha = 0; playBtnScale = 1; resetGame(); }
    }

    if (gameState === 'PLAYING') {
        totalTimeSeconds = Math.floor((Date.now() - startTime) / 1000);
        if (keys['Enter'] && !players[1].active) players[1].join(cameraX + 200);

        if (!boss.active && !cameraLocked) {
            if (score >= 1000 && currentStage === 1) { startBossFight('carcará'); }
            else if (score >= 2000 && currentStage === 2) { startBossFight('tatu'); }
            else if (score >= 3000 && currentStage === 3) { startBossFight('sussuarana'); }
        }

        if (!cameraLocked && cameraX + 1200 > nextChunkX) generateChunk();

        level.platforms = level.platforms.filter(p => p.x + p.w > cameraX - 1000);
        level.obstacles = level.obstacles.filter(o => o.x + o.w > cameraX - 1000);
        level.enemies = level.enemies.filter(e => e.x + e.w > cameraX - 1000);
        level.powerUps = level.powerUps.filter(pu => pu.x + pu.w > cameraX - 1000);
        projectiles = projectiles.filter(pj => pj.x > cameraX - 50 && pj.x < cameraX + 1050);

        let alivePlayers = players.filter(p => p.active && !p.dead);
        if (alivePlayers.length === 0) { gameState = 'GAMEOVER'; bossHealthBar.classList.add('hidden'); }
        else if (!cameraLocked) { let leadX = Math.max(...alivePlayers.map(p => p.x)); if (leadX > cameraX + 500) cameraX = leadX - 500; if (leadX > maxDistance) maxDistance = leadX; }

        score = Math.floor(maxDistance / 10) + bonusPoints;

        ctx.save();
        let currentBgImg = (currentStage === 3) ? imgFundo3 : (currentStage === 2 ? imgFundo2 : imgFundo1);

        if (currentBgImg && currentBgImg.loaded) {
            let bgX = (cameraX * 0.2) % canvas.width;
            ctx.drawImage(currentBgImg, -bgX, 0, canvas.width, canvas.height);
            ctx.drawImage(currentBgImg, -bgX + canvas.width, 0, canvas.width, canvas.height);
        } else { ctx.fillStyle = (currentStage === 3) ? '#4b6e4f' : '#87CEEB'; ctx.fillRect(0, 0, canvas.width, canvas.height); }

        ctx.translate(-cameraX, 0);

        for (let p of level.platforms) {
            if (p.img && p.img.loaded) { let pat = ctx.createPattern(p.img, 'repeat'); ctx.fillStyle = pat; ctx.save(); ctx.translate(p.x, p.y); ctx.fillRect(0, 0, p.w, p.h); ctx.restore(); }
            else { ctx.fillStyle = (currentStage === 3) ? '#9ebd9e' : '#d2b48c'; ctx.fillRect(p.x, p.y, p.w, p.h); }
        }

        if (boss.active) {
            boss.powerUpTimer--;
            if (boss.powerUpTimer <= 0 && boss.state !== 'dying') {
                if (Math.random() < calculateLifeSpawnChance(true)) { level.powerUps.push({ x: cameraX + 100 + Math.random() * 800, y: 150 + Math.random() * 300, w: 48, h: 48, type: 'life' }); }
                else if (boss.type === 'carcará') { level.powerUps.push({ x: cameraX + 100 + Math.random() * 800, y: 150 + Math.random() * 300, w: 48, h: 48, type: 'poison' }); }
                boss.powerUpTimer = 180;
            }

            if (boss.type === 'carcará') {
                if (boss.state === 'dying') { boss.y += boss.dy; if (boss.y > 450) boss.y = 450; }
                else {
                    if (boss.hp <= boss.maxHp / 2 && boss.state === 'normal' && boss.phaseTimer <= 0) boss.state = 'subindo';
                    if (boss.state === 'normal') {
                        boss.y += boss.dy; if (boss.y < 30 || boss.y > 400) boss.dy *= -1;
                        boss.frameCount++; if (boss.frameCount > 6) { boss.frameIndex = (boss.frameIndex + 1) % 4; boss.frameCount = 0; }
                        boss.phaseTimer--; boss.attackTimer--;
                        if (boss.attackTimer <= 0) { boss.projectiles.push({ x: boss.x, y: boss.y + 60, w: 60, h: 40, dx: -6, dy: 0, type: 'shoot' }); boss.attackTimer = 80; }
                    } else if (boss.state === 'subindo') {
                        boss.x -= 3; boss.y -= 3; if (boss.y <= 30) { boss.state = 'varrendo'; boss.sweepDir = 1; boss.sweepTimer = 300; }
                    } else if (boss.state === 'varrendo') {
                        boss.x += 5 * boss.sweepDir; if (boss.x > cameraX + 850) boss.sweepDir = -1; if (boss.x < cameraX + 50) boss.sweepDir = 1;
                        boss.frameCount++; if (boss.frameCount > 6) { boss.frameIndex = (boss.frameIndex + 1) % 4; boss.frameCount = 0; }
                        boss.sweepTimer--; if (boss.sweepTimer % 30 === 0) { boss.projectiles.push({ x: boss.x + boss.w / 2, y: boss.y + boss.h, w: 40, h: 50, dx: 0, dy: 5, type: 'egg' }); }
                        if (boss.sweepTimer <= 0 && boss.x > cameraX + 700) boss.state = 'descendo';
                    } else if (boss.state === 'descendo') { boss.x += 3; boss.y += 3; if (boss.y >= 100) { boss.state = 'normal'; boss.phaseTimer = 250; } }
                }
            }

            // --- LÓGICA DO TATU ATUALIZADA (50% de foco no player) ---
            else if (boss.type === 'tatu') {
                if (boss.state !== 'dying') {
                    if (boss.state === 'quicando') {
                        boss.x += boss.dx; boss.y += boss.dy; let hitWall = false;
                        if (boss.x < cameraX) { boss.x = cameraX; hitWall = true; }
                        if (boss.x + boss.w > cameraX + 1000) { boss.x = cameraX + 1000 - boss.w; hitWall = true; }
                        if (boss.y < 0) { boss.y = 0; hitWall = true; }
                        if (boss.y + boss.h > 550) { boss.y = 550 - boss.h; hitWall = true; }

                        if (hitWall) {
                            // Padrão: inverter velocidade
                            if (boss.x <= cameraX || boss.x + boss.w >= cameraX + 1000) boss.dx *= -1;
                            if (boss.y <= 0 || boss.y + boss.h >= 550) boss.dy *= -1;

                            // Nova Regra: 50% de focar no player ao bater em qualquer parede
                            if (Math.random() < 0.5) {
                                let alvo = players.find(p => p.active && !p.dead) || players[0];
                                let dxJogador = alvo.x - (boss.x + boss.w / 2);
                                let dyJogador = alvo.y - (boss.y + boss.h / 2);
                                let dist = Math.sqrt(dxJogador * dxJogador + dyJogador * dyJogador);
                                if (dist > 0) {
                                    let velocidade = 13;
                                    boss.dx = (dxJogador / dist) * velocidade;
                                    boss.dy = (dyJogador / dist) * velocidade;

                                    // Evita que ele raspe no chão/teto sem quicar de fato
                                    if (boss.y >= 550 - boss.h && boss.dy > -2) boss.dy = -9;
                                    if (boss.y <= 0 && boss.dy < 2) boss.dy = 9;
                                    if (boss.x <= cameraX && boss.dx < 2) boss.dx = 9;
                                    if (boss.x + boss.w >= cameraX + 1000 && boss.dx > -2) boss.dx = -9;
                                }
                            }
                            this.onTatuHitWall();
                        }

                        boss.phaseTimer--;
                        if (boss.phaseTimer <= 0 && boss.y >= 550 - boss.h - 15) { boss.state = 'cansado'; boss.frameIndex = 0; boss.frameCount = 0; boss.phaseTimer = 240; boss.dx = 0; boss.dy = 0; boss.y = 550 - boss.h; }
                    } else if (boss.state === 'cansado') {
                        boss.frameCount++; if (boss.frameCount > 10) { boss.frameIndex++; if (boss.frameIndex >= 5) boss.frameIndex = 0; boss.frameCount = 0; }
                        boss.phaseTimer--;
                        if (boss.phaseTimer <= 0) {
                            boss.state = 'quicando';
                            boss.phaseTimer = 350;

                            // Na hora de voltar a quicar, 50% de focar no player também
                            let alvo = players.find(p => p.active && !p.dead) || players[0];
                            if (Math.random() < 0.5) {
                                let dxJogador = alvo.x - boss.x;
                                let dyJogador = alvo.y - boss.y;
                                let dist = Math.sqrt(dxJogador * dxJogador + dyJogador * dyJogador);
                                boss.dx = (dxJogador / dist) * 12;
                                boss.dy = -10; // pra sair do chão com força
                            } else {
                                boss.dx = 9 * (Math.random() > 0.5 ? 1 : -1);
                                boss.dy = -10;
                            }
                        }
                    }
                }
                this.onTatuHitWall = function () {
                    if (boss.type === 'tatu' && boss.hp <= boss.maxHp / 2 && boss.state === 'quicando') {
                        let numEspinhos = 3 + Math.floor(Math.random() * 2);
                        for (let j = 0; j < numEspinhos; j++) { boss.projectiles.push({ x: boss.x + boss.w / 2, y: boss.y + boss.h / 2, w: 36, h: 48, dx: (Math.random() - 0.5) * 16, dy: -8 - Math.random() * 8, type: 'espinho' }); }
                    }
                }
            }

            // --- LÓGICA DA SUSSUARANA ATUALIZADA (3 Botes e 7s de Cooldown) ---
            else if (boss.type === 'sussuarana') {
                if (boss.state !== 'dying') {

                    if (boss.cooldownTimer > 0) {
                        boss.cooldownTimer--; // Abate os 7 segundos na fase 1
                    }

                    // HP < 50%, cooldown zerado, e ainda não está nas fases do arbusto
                    if (boss.hp <= boss.maxHp / 2 && boss.cooldownTimer <= 0 && !['pulo_fundo', 'escondida', 'bote_arbusto', 'retornando'].includes(boss.state)) {
                        boss.state = 'pulo_fundo'; boss.phaseTimer = 60; boss.dx = 0; boss.dy = 0;
                    }

                    if (boss.state === 'correndo') {
                        boss.x += boss.dx; if (boss.x < cameraX) { boss.x = cameraX; boss.dx *= -1; boss.facingLeft = false; } if (boss.x + boss.w > cameraX + 1000) { boss.x = cameraX + 1000 - boss.w; boss.dx *= -1; boss.facingLeft = true; }
                        boss.frameCount++; if (boss.frameCount > 5) { boss.frameIndex = (boss.frameIndex + 1) % 4; boss.frameCount = 0; }
                        boss.phaseTimer--; if (boss.phaseTimer <= 0) { boss.state = 'preparando_bote'; boss.phaseTimer = 30; boss.dx = 0; }
                    }
                    else if (boss.state === 'preparando_bote') { boss.phaseTimer--; if (boss.phaseTimer <= 0) { boss.state = 'bote'; boss.phaseTimer = 40; boss.dx = boss.facingLeft ? -15 : 15; } }
                    else if (boss.state === 'bote') { boss.x += boss.dx; if (boss.x < cameraX || boss.x + boss.w > cameraX + 1000) { boss.dx *= -1; boss.facingLeft = !boss.facingLeft; } boss.phaseTimer--; if (boss.phaseTimer <= 0) { boss.state = 'correndo'; boss.dx = boss.facingLeft ? -6 : 6; boss.phaseTimer = 180; } }

                    // Lógica do Arbusto
                    else if (boss.state === 'pulo_fundo') { boss.phaseTimer--; if (boss.phaseTimer <= 0) { boss.state = 'escondida'; boss.phaseTimer = 120; boss.bushX = cameraX + 100 + Math.random() * 800; } }
                    else if (boss.state === 'escondida') { boss.phaseTimer--; if (boss.phaseTimer <= 0) { boss.state = 'bote_arbusto'; boss.phaseTimer = 60; boss.x = boss.bushX; boss.y = 550 - boss.h; boss.dy = -12; let alvo = players.find(p => p.active && !p.dead) || players[0]; boss.dx = (alvo.x - boss.x) * 0.05; boss.facingLeft = (boss.dx < 0); } }
                    else if (boss.state === 'bote_arbusto') { boss.x += boss.dx; boss.y += boss.dy; boss.dy += 0.5; if (boss.y >= 550 - boss.h) { boss.y = 550 - boss.h; boss.state = 'retornando'; boss.phaseTimer = 30; boss.dx = 0; boss.dy = 0; } }
                    else if (boss.state === 'retornando') {
                        boss.phaseTimer--;
                        if (boss.phaseTimer <= 0) {
                            boss.bushAttacks++;
                            if (boss.bushAttacks >= 3) {
                                // Deu 3 botes, força a voltar pra fase 1 e bloqueia o mato por 7s
                                boss.bushAttacks = 0;
                                boss.cooldownTimer = 420; // 7 segundos * 60 FPS
                                boss.state = 'correndo';
                                boss.dx = boss.facingLeft ? -6 : 6;
                                boss.phaseTimer = 180;
                            } else {
                                // Ainda não deu 3 botes, volta pro mato
                                boss.state = 'pulo_fundo'; boss.phaseTimer = 40;
                            }
                        }
                    }
                }
            }

            if (boss.state === 'dying') {
                boss.deathTimer--;
                if (boss.deathTimer <= 0) {
                    boss.active = false; bossHealthBar.classList.add('hidden');
                    if (boss.type === 'carcará') { currentStage = 2; cameraLocked = false; players.forEach(p => { if (p.active && !p.dead) p.lives = Math.min(3, p.lives + 1); }); nextChunkX = cameraX + 1200; }
                    else if (boss.type === 'tatu') { currentStage = 3; cameraLocked = false; players.forEach(p => { if (p.active && !p.dead) p.lives = Math.min(3, p.lives + 1); }); nextChunkX = cameraX + 1200; }
                    else if (boss.type === 'sussuarana') { gameState = 'VICTORY'; }
                }
            }

            players.forEach(p => {
                if (p.active && !p.dead && isColliding(p, boss) && boss.state !== 'escondida' && boss.state !== 'pulo_fundo') {
                    let canDamageBoss = false;
                    if (boss.type === 'carcará' && p.dy > 0 && p.y + p.h < boss.y + 60) canDamageBoss = true;
                    if (boss.type === 'tatu' && boss.state === 'cansado' && p.dy > 0 && p.y + p.h < boss.y + 30) canDamageBoss = true;
                    if (boss.type === 'sussuarana' && p.dy > 0 && p.y + p.h < boss.y + 40 && !['bote', 'bote_arbusto'].includes(boss.state)) canDamageBoss = true;

                    if (canDamageBoss) { p.dy = -15; if (boss.state !== 'dying') { boss.hp--; bossHealthFill.style.width = `${(boss.hp / boss.maxHp) * 100}%`; if (boss.hp <= 0) { processarMorteDoBoss(); } } }
                    else { if (boss.type === 'tatu' && boss.state === 'cansado') { if (p.x < boss.x) p.x -= 5; else p.x += 5; } else { p.takeDamage(); } }
                }
            });

            for (let i = boss.projectiles.length - 1; i >= 0; i--) {
                let bp = boss.projectiles[i]; bp.x += bp.dx; bp.y += bp.dy; if (bp.type === 'espinho') bp.dy += 0.4;
                let imgProj = null; if (bp.type === 'egg') imgProj = imgOvo; else if (bp.type === 'shoot') imgProj = imgBoss1Tiro; else if (bp.type === 'espinho') imgProj = imgEspinhoProjetil;
                if (imgProj && imgProj.complete && imgProj.naturalHeight !== 0) { ctx.drawImage(imgProj, bp.x, bp.y, bp.w, bp.h); } else { ctx.fillStyle = bp.type === 'espinho' ? 'gray' : 'orange'; ctx.fillRect(bp.x, bp.y, bp.w, bp.h); }
                players.forEach(p => { if (p.active && !p.dead && isColliding(p, bp)) { p.takeDamage(); boss.projectiles.splice(i, 1); } });
                if (bp.y > 700 || bp.x < cameraX - 100 || bp.x > cameraX + 1100) boss.projectiles.splice(i, 1);
            }

            let bossImgAtual = null;
            if (boss.type === 'carcará') { if (boss.state === 'dying') bossImgAtual = imgBoss1Morte; else if (boss.state === 'subindo') bossImgAtual = imgBoss1Sobe; else if (boss.state === 'descendo') bossImgAtual = imgBoss1Desce; else bossImgAtual = imgBoss1[boss.frameIndex]; }
            else if (boss.type === 'tatu') { if (boss.state === 'dying') bossImgAtual = imgTatuMorrendo; else if (boss.state === 'quicando') bossImgAtual = imgTatuQuicando; else if (boss.state === 'cansado') bossImgAtual = imgTatuCansado[boss.frameIndex]; else bossImgAtual = imgTatuParado; }
            else if (boss.type === 'sussuarana') { if (boss.state === 'dying') bossImgAtual = imgSussuaranaMorrendo; else if (boss.state === 'bote' || boss.state === 'preparando_bote') bossImgAtual = imgSussuaranaBote; else if (boss.state === 'pulo_fundo') bossImgAtual = imgSussuaranaPuloFundo; else if (boss.state === 'bote_arbusto') bossImgAtual = imgSussuaranaBoteArbusto; else if (boss.state === 'escondida') bossImgAtual = imgSussuaranaEscondida; else bossImgAtual = imgSussuarana[boss.frameIndex]; }

            if (boss.type === 'sussuarana' && boss.state === 'escondida') {
                let shakeX = (Math.random() - 0.5) * 6; if (imgSussuaranaEscondida && imgSussuaranaEscondida.complete) { ctx.drawImage(imgSussuaranaEscondida, boss.bushX + shakeX, 550 - boss.h, boss.w, boss.h); } else { ctx.fillStyle = 'darkgreen'; ctx.fillRect(boss.bushX + shakeX, 550 - boss.h, boss.w, boss.h); }
            } else if (bossImgAtual && bossImgAtual.complete && bossImgAtual.naturalHeight !== 0) {
                if (boss.type === 'sussuarana' && boss.facingLeft) { ctx.save(); ctx.translate(boss.x + boss.w, boss.y); ctx.scale(-1, 1); ctx.drawImage(bossImgAtual, 0, 0, boss.w, boss.h); ctx.restore(); } else { ctx.drawImage(bossImgAtual, boss.x, boss.y, boss.w, boss.h); }
            } else { ctx.fillStyle = (boss.state === 'dying') ? 'gray' : 'darkred'; ctx.fillRect(boss.x, boss.y, boss.w, boss.h); }
        }

        for (let i = level.powerUps.length - 1; i >= 0; i--) {
            let pu = level.powerUps[i]; let imgPu = null; if (pu.type === 'speed') imgPu = imgPwVelocidade; if (pu.type === 'jump') imgPu = imgPwPulo; if (pu.type === 'invincible') imgPu = imgPwInvencivel; if (pu.type === 'poison') imgPu = imgPwVeneno; if (pu.type === 'life') imgPu = imgPwVida;
            let floatY = pu.y + Math.sin(now / 200) * 5;
            if (imgPu && imgPu.complete && imgPu.naturalHeight !== 0) { ctx.drawImage(imgPu, pu.x, floatY, pu.w, pu.h); } else { ctx.fillStyle = (pu.type === 'life') ? 'red' : 'gold'; ctx.beginPath(); ctx.arc(pu.x + 24, floatY + 24, 20, 0, Math.PI * 2); ctx.fill(); }
            players.forEach(p => { if (p.active && !p.dead && isColliding(p, { x: pu.x, y: floatY, w: pu.w, h: pu.h })) { p.collectPowerUp(pu.type); level.powerUps.splice(i, 1); } });
        }

        players.forEach(p => p.update());

        for (let i = projectiles.length - 1; i >= 0; i--) {
            let pj = projectiles[i]; pj.x += pj.speedX;
            if (imgTiroVeneno.complete && imgTiroVeneno.naturalHeight !== 0) { ctx.drawImage(imgTiroVeneno, pj.x, pj.y, pj.w, pj.h); } else { ctx.fillStyle = pj.color; ctx.fillRect(pj.x, pj.y, pj.w, pj.h); }
            let hitSomething = false;
            if (boss.active && boss.state !== 'dying' && boss.state !== 'escondida' && boss.state !== 'pulo_fundo' && isColliding(pj, boss)) {
                let canHit = true; if (boss.type === 'tatu' && boss.state !== 'cansado') canHit = false;
                if (canHit) { boss.hp--; bossHealthFill.style.width = `${(boss.hp / boss.maxHp) * 100}%`; if (boss.hp <= 0 && boss.state !== 'dying') { processarMorteDoBoss(); } hitSomething = PJ_HIT_BOSS; } else if (boss.type === 'tatu' && boss.state === 'quicando') { pj.speedX *= -1; pj.y -= 5; pj.color = 'white'; }
            }
            if (hitSomething === PJ_HIT_BOSS) hitSomething = true;
            if (!hitSomething) { for (let e = level.enemies.length - 1; e >= 0; e--) { let enemy = level.enemies[e]; if (enemy.state !== 'dying' && isColliding(pj, enemy)) { enemy.state = 'dying'; enemy.deathTimer = 20; bonusPoints += 50; hitSomething = true; break; } } }
            if (!hitSomething) { for (let o = level.obstacles.length - 1; o >= 0; o--) { if (isColliding(pj, level.obstacles[o])) { level.obstacles.splice(o, 1); hitSomething = true; break; } } }
            if (hitSomething) projectiles.splice(i, 1);
        }

        for (let o of level.obstacles) {
            if (o.img && o.img.loaded) { ctx.drawImage(o.img, o.x - 3, o.y - 5, 30, 55); } else { ctx.fillStyle = o.color || '#1b4d3e'; ctx.fillRect(o.x, o.y, o.w, o.h); }
            players.forEach(p => { if (p.active && !p.dead && isColliding(p, o)) p.takeDamage(); });
        }

        for (let i = level.enemies.length - 1; i >= 0; i--) {
            let r = level.enemies[i];
            if (r.state === 'dying') {
                r.deathTimer--; let frameMorte = null;
                if (r.type === 'mangusto') { frameMorte = imgMangustoMorrendo; } else { frameMorte = (r.deathTimer > 10) ? imgRatoMorrendo[0] : imgRatoMorrendo[1]; }
                if (frameMorte && frameMorte.complete) { ctx.save(); if (r.dir === -1) { ctx.scale(-1, 1); ctx.drawImage(frameMorte, -r.x - r.w, r.y, r.w, r.h); } else { ctx.drawImage(frameMorte, r.x, r.y, r.w, r.h); } ctx.restore(); }
                if (r.deathTimer <= 0) level.enemies.splice(i, 1); continue;
            }

            if (r.type === 'mangusto') {
                r.dy += 0.5; r.y += r.dy; let onPlatform = false;
                for (let p of level.platforms) { if (r.x < p.x + p.w && r.x + r.w > p.x && r.y + r.h >= p.y && r.y + r.h <= p.y + 20 && r.dy >= 0) { r.y = p.y - r.h; r.dy = 0; r.grounded = true; onPlatform = true; } }
                if (!onPlatform) r.grounded = false; r.jumpTimer--; if (r.grounded && r.jumpTimer <= 0) { r.dy = -7; r.jumpTimer = 60 + Math.random() * 60; }
            }

            r.x += r.speed * r.dir; if (r.x > r.endX || r.x < r.startX) r.dir *= -1;
            r.frameCount++; if (r.frameCount > 8) { r.frameIndex = (r.frameIndex + 1) % 4; r.frameCount = 0; }
            let imgAtual = null; if (r.type === 'mangusto') { if (!r.grounded && imgMangustoPulo.complete && imgMangustoPulo.naturalHeight !== 0) { imgAtual = imgMangustoPulo; } else { imgAtual = imgMangusto[r.frameIndex]; } } else { imgAtual = imgRato[r.frameIndex]; }

            ctx.save();
            if (r.dir === -1) { ctx.scale(-1, 1); if (imgAtual && imgAtual.complete) ctx.drawImage(imgAtual, -r.x - r.w, r.y, r.w, r.h); } else { if (imgAtual && imgAtual.complete) ctx.drawImage(imgAtual, r.x, r.y, r.w, r.h); else { ctx.fillStyle = r.color; ctx.fillRect(r.x, r.y, r.w, r.h); } }
            ctx.restore();

            players.forEach(p => { if (p.active && !p.dead && isColliding(p, r)) { if (p.dy > 0 && p.y + p.h < r.y + 20) { p.dy = -10; r.state = 'dying'; r.deathTimer = 20; bonusPoints += 50; } else { p.takeDamage(); } } });
        }

        players.forEach(p => p.draw()); ctx.restore(); drawHUD();

        // --- ORDEM DO TEXTO ATUALIZADA ---
        scoreDisplay.innerText = `PONTOS: ${score} | TEMPO: ${formatTime(totalTimeSeconds)} | MUNDO ${currentStage}`;
    }

    if (gameState === 'GAMEOVER') { gameOverScreen.classList.remove('hidden'); finalScoreTxt.innerHTML = `Vocês fizeram ${score} pontos!<br>Tempo Jogado: ${formatTime(totalTimeSeconds)}`; }
    if (gameState === 'VICTORY') { victoryScreen.classList.remove('hidden'); victoryScoreTxt.innerHTML = `Pontuação Final: ${score + 2000} (Bônus de Campanha!)<br>Tempo Jogado: ${formatTime(totalTimeSeconds)}`; }
}

const PJ_HIT_BOSS = 999;
requestAnimationFrame(gameLoop);