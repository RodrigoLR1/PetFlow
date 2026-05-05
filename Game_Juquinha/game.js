// ==========================================
// SELEÇÃO DE ELEMENTOS DO HTML
// ==========================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('scoreDisplay');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const victoryScreen = document.getElementById('victoryScreen');
const finalScoreTxt = document.getElementById('finalScore');
const victoryScoreTxt = document.getElementById('victoryScore');
const bossHealthBar = document.getElementById('bossHealthBar');
const bossHealthFill = document.getElementById('bossHealthFill');

// ==========================================
// CARREGAMENTO DE IMAGENS (ASSETS)
// ==========================================
const imgFundo = new Image(); imgFundo.src = 'imagens/caatinga_fundo.png';
const imgCacto = new Image(); imgCacto.src = 'imagens/cacto.png';
const imgPlataforma = new Image(); imgPlataforma.src = 'imagens/plataforma_1.png';

const imgCobra = [];
for (let i = 1; i <= 4; i++) {
    let img = new Image(); img.src = `imagens/cobra_${i}.png`; imgCobra.push(img);
}

const imgCobraP2 = [];
for (let i = 5; i <= 8; i++) {
    let img = new Image(); img.src = `imagens/cobra_${i}.png`; imgCobraP2.push(img);
}

const imgRato = [];
for (let i = 1; i <= 4; i++) {
    let img = new Image(); img.src = `imagens/rato_${i}.png`; imgRato.push(img);
}
const imgRatoMorrendo = [];
let imgEsmagado = new Image(); imgEsmagado.src = 'imagens/rato_morrendo_2.png';
let imgMorteNormal = new Image(); imgMorteNormal.src = 'imagens/rato_morrendo_1.png';
imgRatoMorrendo.push(imgEsmagado, imgMorteNormal);

const imgMangusto = [];
for (let i = 1; i <= 4; i++) {
    let img = new Image(); img.src = `imagens/mangusto_${i}.png`; imgMangusto.push(img);
}
const imgMangustoPulo = new Image(); imgMangustoPulo.src = 'imagens/mangusto_pulando.png';
// CORREÇÃO AQUI: imgMangustoMangusto -> imgMangustoMorrendo
const imgMangustoMorrendo = new Image(); imgMangustoMorrendo.src = 'imagens/mangusto_morrendo.png';

const imgPwVelocidade = new Image(); imgPwVelocidade.src = 'imagens/power_up_velocidade.png';
const imgPwPulo = new Image(); imgPwPulo.src = 'imagens/power_up_super_pulo.png';
const imgPwInvencivel = new Image(); imgPwInvencivel.src = 'imagens/power_up_invencibilidade.png';
const imgPwVeneno = new Image(); imgPwVeneno.src = 'imagens/power_up_veneno.png';
const imgTiroVeneno = new Image(); imgTiroVeneno.src = 'imagens/veneno_projetil.png';

const imgBoss = [];
for (let i = 1; i <= 4; i++) {
    let img = new Image(); img.src = `imagens/carcara_${i}.png`; imgBoss.push(img);
}
const imgBossTiro = new Image(); imgBossTiro.src = 'imagens/carcara_projetil.png';
const imgBossSobe = new Image(); imgBossSobe.src = 'imagens/carcara_subindo.png';
const imgBossDesce = new Image(); imgBossDesce.src = 'imagens/carcara_descendo.png';
const imgBossMorte = new Image(); imgBossMorte.src = 'imagens/carcara_morrendo.png';
const imgOvo = new Image(); imgOvo.src = 'imagens/ovo_projetil.png';

// ==========================================
// VARIÁVEIS GLOBAIS E CONTROLES
// ==========================================
let gameState = 'START';
let score = 0;
let pointsFromEnemies = 0;
let maxDistance = 0;
let cameraX = 0;
let nextChunkX = 0;
let cameraLocked = false;

const keys = {};

window.addEventListener('keydown', e => {
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'ShiftRight'].includes(e.code)) {
        e.preventDefault();
    }
    keys[e.code] = true;
}, { passive: false });
window.addEventListener('keyup', e => { keys[e.code] = false; });

let level = { platforms: [], obstacles: [], enemies: [], powerUps: [] };
let projectiles = [];

function isColliding(r1, r2) {
    return r1.x < r2.x + r2.w && r1.x + r1.w > r2.x &&
        r1.y < r2.y + r2.h && r1.y + r1.h > r2.y;
}

// ==========================================
// GERAÇÃO INFINITA DO MAPA
// ==========================================
function generateChunk() {
    level.platforms.push({ x: nextChunkX - 50, y: 550, w: 1200, h: 50 });

    let difficulty = Math.floor(nextChunkX / 1500);
    let maxPlatforms = 1 + Math.random() * 2;
    let maxObstacles = 1 + difficulty;
    let maxEnemies = Math.floor((1 + difficulty) * 0.8);

    let stepPlataforma = 1000 / (maxPlatforms + 1);
    for (let i = 0; i < maxPlatforms; i++) {
        let px = nextChunkX + (stepPlataforma * (i + 1)) - 50 + (Math.random() * 100);

        let py;
        if (Math.random() > 0.5) {
            py = 300 + Math.random() * 100; // Plataformas altas
        } else {
            py = 420 + Math.random() * 60;  // Plataformas baixas
        }

        level.platforms.push({ x: px, y: py, w: 150, h: 20 });

        if (Math.random() > 0.5) {
            level.enemies.push({
                type: 'mangusto', x: px + 20, y: py - 40, w: 40, h: 30,
                speed: 1.5, dir: 1,
                startX: px, endX: px + 150 - 40,
                color: '#e67e22', state: 'walking',
                frameIndex: 0, frameCount: 0, deathTimer: 0,
                dy: 0, grounded: false, jumpTimer: 60 + Math.random() * 60
            });
        }
    }

    let stepObstaculo = 1000 / (maxObstacles + 1);
    for (let i = 0; i < maxObstacles; i++) {
        let cx = nextChunkX + (stepObstaculo * (i + 1)) - 20 + (Math.random() * 80);
        level.obstacles.push({ x: cx, y: 500, w: 24, h: 50, color: '#1b4d3e' });
    }

    let stepInimigo = 1000 / (maxEnemies + 1);
    for (let i = 0; i < maxEnemies; i++) {
        if (Math.random() > 0.5) {
            let ex = nextChunkX + (stepInimigo * (i + 1));
            level.enemies.push({
                type: 'rato', x: ex, y: 520, w: 40, h: 30,
                speed: 1 + Math.random() * 1.5, dir: Math.random() > 0.5 ? 1 : -1,
                startX: ex - 100, endX: ex + 100,
                color: '#7f8c8d', state: 'walking', frameIndex: 0, frameCount: 0, deathTimer: 0
            });
        }
    }

    if (Math.random() < 0.4) {
        let types = ['speed', 'jump', 'invincible', 'poison'];
        let t = types[Math.floor(Math.random() * types.length)];
        level.powerUps.push({
            x: nextChunkX + 400 + Math.random() * 300,
            y: 400 - Math.random() * 100,
            w: 48, h: 48, type: t
        });
    }

    nextChunkX += 1000;
}

// ==========================================
// OBJETO DO BOSS E SUA ARENA EXCLUSIVA
// ==========================================
const boss = {
    active: false,
    state: 'normal',
    x: 0, y: 0, w: 96, h: 96,
    hp: 10, maxHp: 10,
    dy: 2,
    attackTimer: 120,
    powerUpTimer: 180,
    phaseTimer: 200,
    sweepTimer: 0,
    sweepDir: 1,
    deathTimer: 0,
    projectiles: [],
    frameIndex: 0,
    frameCount: 0
};

function startBossFight() {
    boss.active = true;
    boss.state = 'normal';
    cameraLocked = true;
    boss.hp = boss.maxHp;
    boss.x = cameraX + 850;
    boss.y = 100;
    boss.projectiles = [];
    boss.frameIndex = 0;
    boss.phaseTimer = 200;
    boss.deathTimer = 0;
    boss.powerUpTimer = 100;

    bossHealthBar.classList.remove('hidden');
    bossHealthFill.style.width = '100%';

    level.enemies = [];
    level.obstacles = [];
    level.powerUps = [];
    level.platforms = [
        { x: cameraX - 200, y: 550, w: 1400, h: 50 },
        { x: cameraX + 150, y: 420, w: 150, h: 20 },
        { x: cameraX + 425, y: 300, w: 150, h: 20 },
        { x: cameraX + 700, y: 420, w: 150, h: 20 }
    ];
}

// ==========================================
// CLASSE DO JOGADOR
// ==========================================
class Player {
    constructor(id, color, name) {
        this.id = id; this.color = color; this.name = name;
        this.w = 20; this.h = 56;
        this.baseSpeed = 4.5; this.baseJump = -11;
        this.speed = this.baseSpeed; this.jumpPower = this.baseJump;
        this.gravity = 0.4;
        this.frameIndex = 0; this.frameCount = 0; this.facingLeft = false;
        this.lives = 3; this.active = (id === 1); this.dead = false;
        this.invulnerable = 0;
        this.powerTimers = { speed: 0, jump: 0, poison: 0 };
        this.shootCooldown = 0;
    }

    join(startX) {
        this.active = true; this.dead = false; this.lives = 3;
        this.x = startX; this.y = 100; this.dy = 0; this.grounded = false;
        this.invulnerable = 60;
        this.powerTimers = { speed: 0, jump: 0, poison: 0 };
    }

    // ==========================================
    // FIX: LEVAR DANO SEM TELEPORTAR
    // ==========================================
    takeDamage(forceDamage = false) {
        if (!forceDamage && this.invulnerable > 0) return;

        this.lives--;

        if (this.lives > 0) {
            // REMOVIDO: O reposicionamento foi deletado.
            this.dy = 0; // Para qualquer movimento vertical
            this.invulnerable = 120; // 2 segundos de invulnerabilidade
        } else {
            this.dead = true;
        }
    }

    collectPowerUp(type) {
        if (type === 'speed') this.powerTimers.speed = 600;
        if (type === 'jump') this.powerTimers.jump = 600;
        if (type === 'invincible') this.invulnerable = 600;
        if (type === 'poison') this.powerTimers.poison = 600;
        score += 100;
    }

    update() {
        if (!this.active || this.dead) return;

        if (this.invulnerable > 0) this.invulnerable--;

        if (this.powerTimers.speed > 0) {
            this.powerTimers.speed--; this.speed = this.baseSpeed * 2;
        } else { this.speed = this.baseSpeed; }

        if (this.powerTimers.jump > 0) {
            this.powerTimers.jump--; this.jumpPower = -16;
        } else { this.jumpPower = this.baseJump; }

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
            projectiles.push({
                x: this.facingLeft ? this.x - 40 : this.x + this.w,
                y: this.y + 10,
                w: 48, h: 48,
                speedX: this.facingLeft ? -16 : 16,
                color: '#9b59b6'
            });
            this.shootCooldown = 20;
        }

        if (isMovingLeft) this.facingLeft = true;
        if (isMovingRight) this.facingLeft = false;

        if (!this.grounded) { this.frameIndex = 1; }
        else if (isMovingLeft || isMovingRight) {
            this.frameCount++;
            if (this.frameCount > 8) { this.frameIndex = (this.frameIndex + 1) % 4; this.frameCount = 0; }
        } else { this.frameIndex = 0; this.frameCount = 0; }

        let oldH = this.h;
        this.h = isCrouching ? 32 : 56;

        if (this.h !== oldH) {
            this.y += oldH - this.h;
        }

        // --- MOVIMENTO HORIZONTAL E COLISÃO (REFATORADO) ---
        let oldX = this.x;
        if (isMovingRight) this.x += this.speed;
        if (isMovingLeft) this.x -= this.speed;

        if (this.x < cameraX) { this.x = cameraX; }
        if (cameraLocked && this.x + this.w > cameraX + 1000) { this.x = cameraX + 1000 - this.w; }

        // Colisão Lateral com Plataformas
        for (let p of level.platforms) {
            if (isColliding(this, p)) {
                if (this.y + oldH > p.y + 10) {
                    if (this.x > oldX) this.x = p.x - this.w;
                    else if (this.x < oldX) this.x = p.x + p.w;
                }
            }
        }

        // --- MOVIMENTO VERTICAL ---
        if (isJumping && this.grounded) { this.dy = this.jumpPower; this.grounded = false; }
        this.dy += this.gravity;

        let oldY = this.y;
        this.y += this.dy;

        this.grounded = false;

        // --- COLISÃO VERTICAL COM PLATAFORMAS (FIX) ---
        for (let p of level.platforms) {
            if (isColliding(this, p)) {
                if (this.dy > 0) {
                    if (oldY + oldH <= p.y + 10) {
                        this.y = p.y - this.h;
                        this.dy = 0;
                        this.grounded = true;
                    }
                }
                // ==========================================
                // FIX: ATRAVESSAR PLATAFORMAS E CORNER BUG
                // ==========================================
                else if (this.dy < 0) {
                    if (oldY >= p.y + p.h - 10) {
                        this.y = p.y + p.h; // Reposiciona para baixo
                        this.dy = 0; // Zera a velocidade de subida
                    }
                }
            }
        }

        if (this.y > 700) this.takeDamage(true); // Dano por queda
    }

    draw() {
        if (!this.active || this.dead) return;

        ctx.save();

        if (this.invulnerable > 0 && Math.floor(this.invulnerable / 5) % 2 === 0) {
            ctx.globalAlpha = (this.invulnerable > 120) ? 1 : 0.4;
            if (this.invulnerable > 120) {
                ctx.fillStyle = 'rgba(255, 215, 0, 0.5)';
                ctx.beginPath(); ctx.arc(this.x + this.w / 2, this.y + this.h / 2, 40, 0, Math.PI * 2); ctx.fill();
            }
        }

        ctx.fillStyle = "white"; ctx.font = "bold 14px Arial";
        ctx.shadowColor = "black"; ctx.shadowBlur = 4;
        let info = `${this.name} ${"❤️".repeat(this.lives)}`;
        ctx.fillText(info, this.x - 10, this.y - 15);
        ctx.shadowBlur = 0;

        let imagemAtual = (this.id === 1) ? imgCobra[this.frameIndex] : imgCobraP2[this.frameIndex];

        let drawW = 32; let drawH = (this.h === 32) ? 40 : 64;
        let drawX = this.x - 6; let drawY = this.y - 8;

        if (this.facingLeft) {
            ctx.scale(-1, 1);
            if (imagemAtual && imagemAtual.complete && imagemAtual.naturalHeight !== 0) {
                ctx.drawImage(imagemAtual, -drawX - drawW, drawY, drawW, drawH);
            } else {
                ctx.fillStyle = this.color; ctx.fillRect(-this.x - this.w, this.y, this.w, this.h);
            }
        } else {
            if (imagemAtual && imagemAtual.complete && imagemAtual.naturalHeight !== 0) {
                ctx.drawImage(imagemAtual, drawX, drawY, drawW, drawH);
            } else {
                ctx.fillStyle = this.color; ctx.fillRect(this.x, this.y, this.w, this.h);
            }
        }
        ctx.restore();
    }
}

const players = [new Player(1, '#2ecc71', 'P1'), new Player(2, '#3498db', 'P2')];

function resetGame() {
    level.platforms = []; level.obstacles = []; level.enemies = []; level.powerUps = [];
    projectiles = [];
    score = 0; pointsFromEnemies = 0; maxDistance = 0; cameraX = 0; nextChunkX = 0;

    boss.active = false; cameraLocked = false;
    bossHealthBar.classList.add('hidden');

    players[0].join(100); players[1].active = false;
    generateChunk(); generateChunk();

    gameState = 'PLAYING';
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    victoryScreen.classList.add('hidden');
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
            let radius = 25;
            let x = canvas.width - rightOffset; let y = 40;

            ctx.save();
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();

            if (pu.img && pu.img.complete && pu.img.naturalHeight !== 0) {
                ctx.drawImage(pu.img, x - radius + 5, y - radius + 5, radius * 2 - 10, radius * 2 - 10);
            }

            let pct = pu.time / 600;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath(); ctx.moveTo(x, y);
            ctx.arc(x, y, radius, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * pct));
            ctx.closePath(); ctx.fill();

            ctx.fillStyle = p.color; ctx.font = "bold 14px Arial";
            ctx.textAlign = "center"; ctx.shadowColor = "black"; ctx.shadowBlur = 4;
            ctx.fillText(p.name, x, y + radius + 15);
            ctx.restore();

            rightOffset += 70;
        });
    });
}

let lastRenderTime = 0;
const GAME_FPS = 60;
const renderInterval = 1000 / GAME_FPS;

function gameLoop() {
    requestAnimationFrame(gameLoop);
    let now = performance.now();
    let elapsed = now - lastRenderTime;
    if (elapsed < renderInterval) return;
    lastRenderTime = now - (elapsed % renderInterval);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === 'START' || gameState === 'GAMEOVER' || gameState === 'VICTORY') {
        if (keys['KeyW'] || keys['Space']) resetGame();
    }

    if (gameState === 'PLAYING') {
        if (keys['Enter'] && !players[1].active) players[1].join(cameraX + 200);

        if (score >= 1000 && !boss.active) startBossFight();

        if (!cameraLocked && cameraX + 1200 > nextChunkX) generateChunk();

        level.platforms = level.platforms.filter(p => p.x + p.w > cameraX - 1000);
        level.obstacles = level.obstacles.filter(o => o.x + o.w > cameraX - 1000);
        level.enemies = level.enemies.filter(e => e.x + e.w > cameraX - 1000);
        level.powerUps = level.powerUps.filter(pu => pu.x + pu.w > cameraX - 1000);
        projectiles = projectiles.filter(pj => pj.x > cameraX - 50 && pj.x < cameraX + 1050);

        let alivePlayers = players.filter(p => p.active && !p.dead);
        if (alivePlayers.length === 0) {
            gameState = 'GAMEOVER';
            bossHealthBar.classList.add('hidden');
        } else if (!cameraLocked) {
            let leadX = Math.max(...alivePlayers.map(p => p.x));
            if (leadX > cameraX + 500) cameraX = leadX - 500;
            if (leadX > maxDistance) maxDistance = leadX;
        }

        if (!boss.active) score = Math.floor(maxDistance / 10) + pointsFromEnemies;

        ctx.save();

        if (imgFundo.complete && imgFundo.naturalHeight !== 0) {
            let bgX = (cameraX * 0.2) % canvas.width;
            ctx.drawImage(imgFundo, -bgX, 0, canvas.width, canvas.height);
            ctx.drawImage(imgFundo, -bgX + canvas.width, 0, canvas.width, canvas.height);
        } else { ctx.fillStyle = '#87CEEB'; ctx.fillRect(0, 0, canvas.width, canvas.height); }

        ctx.translate(-cameraX, 0);

        for (let p of level.platforms) {
            if (imgPlataforma.complete && imgPlataforma.naturalHeight !== 0) {
                let pat = ctx.createPattern(imgPlataforma, 'repeat');
                ctx.fillStyle = pat; ctx.save(); ctx.translate(p.x, p.y);
                ctx.fillRect(0, 0, p.w, p.h); ctx.restore();
            } else { ctx.fillStyle = '#d2b48c'; ctx.fillRect(p.x, p.y, p.w, p.h); }
        }

        // ==========================================
        // LÓGICA DO BOSS E SISTEMA DE VENENO
        // ==========================================
        if (boss.active) {
            if (boss.state === 'dying') {
                boss.y += boss.dy;
                if (boss.y > 450) { boss.y = 450; }

                boss.deathTimer--;
                if (boss.deathTimer <= 0) {
                    boss.active = false;
                    gameState = 'VICTORY';
                    bossHealthBar.classList.add('hidden');
                }

            } else {
                if (boss.hp <= boss.maxHp / 2 && boss.state === 'normal' && boss.phaseTimer <= 0) {
                    boss.state = 'subindo';
                }

                if (boss.state === 'normal') {
                    boss.y += boss.dy;
                    if (boss.y < 30 || boss.y > 400) boss.dy *= -1;

                    boss.frameCount++;
                    if (boss.frameCount > 6) { boss.frameIndex = (boss.frameIndex + 1) % 4; boss.frameCount = 0; }

                    boss.phaseTimer--;
                    boss.attackTimer--;

                    if (boss.attackTimer <= 0) {
                        boss.projectiles.push({
                            x: boss.x, y: boss.y + 60,
                            w: 60, h: 40,
                            dx: -6, dy: 0, type: 'shoot'
                        });
                        boss.attackTimer = 80;
                    }

                } else if (boss.state === 'subindo') {
                    boss.x -= 3;
                    boss.y -= 3;
                    if (boss.y <= 30) {
                        boss.state = 'varrendo';
                        boss.sweepDir = 1;
                        boss.sweepTimer = 300;
                    }

                } else if (boss.state === 'varrendo') {
                    boss.x += 5 * boss.sweepDir;
                    if (boss.x > cameraX + 850) boss.sweepDir = -1;
                    if (boss.x < cameraX + 50) boss.sweepDir = 1;

                    boss.frameCount++;
                    if (boss.frameCount > 6) { boss.frameIndex = (boss.frameIndex + 1) % 4; boss.frameCount = 0; }

                    boss.sweepTimer--;
                    if (boss.sweepTimer % 30 === 0) {
                        boss.projectiles.push({
                            x: boss.x + boss.w / 2, y: boss.y + boss.h,
                            w: 40, h: 50,
                            dx: 0, dy: 5, type: 'egg'
                        });
                    }

                    if (boss.sweepTimer <= 0 && boss.x > cameraX + 700) {
                        boss.state = 'descendo';
                    }

                } else if (boss.state === 'descendo') {
                    boss.x += 3;
                    boss.y += 3;
                    if (boss.y >= 100) {
                        boss.state = 'normal';
                        boss.phaseTimer = 250;
                    }
                }

                // LIMITE DE 3 VENENOS NA ARENA AO MESMO TEMPO
                boss.powerUpTimer--;
                if (boss.powerUpTimer <= 0) {
                    let poisonCount = level.powerUps.filter(p => p.type === 'poison').length;

                    if (poisonCount < 3) {
                        level.powerUps.push({
                            x: cameraX + 50 + Math.random() * 850,
                            y: 150 + Math.random() * 350,
                            w: 48, h: 48, type: 'poison'
                        });
                    }
                    boss.powerUpTimer = 180;
                }

                players.forEach(p => {
                    if (p.active && !p.dead && isColliding(p, boss)) {
                        if (p.dy > 0 && p.y + p.h < boss.y + 60) {
                            p.dy = -15;
                            boss.hp--;
                            bossHealthFill.style.width = `${(boss.hp / boss.maxHp) * 100}%`;
                            if (boss.hp <= 0 && boss.state !== 'dying') {
                                boss.state = 'dying';
                                boss.deathTimer = 300;
                                boss.dy = 1;
                                boss.projectiles = [];
                            }
                        } else { p.takeDamage(); }
                    }
                });
            }

            for (let i = boss.projectiles.length - 1; i >= 0; i--) {
                let bp = boss.projectiles[i];
                bp.x += bp.dx; bp.y += bp.dy;

                if (bp.type === 'egg' && imgOvo.complete && imgOvo.naturalHeight !== 0) {
                    ctx.drawImage(imgOvo, bp.x, bp.y, bp.w, bp.h);
                } else if (imgBossTiro.complete && imgBossTiro.naturalHeight !== 0) {
                    ctx.drawImage(imgBossTiro, bp.x, bp.y, bp.w, bp.h);
                } else {
                    ctx.fillStyle = bp.type === 'egg' ? 'white' : 'orange';
                    ctx.fillRect(bp.x, bp.y, bp.w, bp.h);
                }

                players.forEach(p => {
                    if (p.active && !p.dead && isColliding(p, bp)) { p.takeDamage(); boss.projectiles.splice(i, 1); }
                });
                if (bp.y > 700 || bp.x < cameraX - 100) boss.projectiles.splice(i, 1);
            }

            let bossImgAtual = imgBoss[boss.frameIndex];
            if (boss.state === 'dying' && imgBossMorte.complete && imgBossMorte.naturalHeight !== 0) {
                bossImgAtual = imgBossMorte;
            } else if (boss.state === 'subindo' && imgBossSobe.complete && imgBossSobe.naturalHeight !== 0) {
                bossImgAtual = imgBossSobe;
            } else if (boss.state === 'descendo' && imgBossDesce.complete && imgBossDesce.naturalHeight !== 0) {
                bossImgAtual = imgBossDesce;
            }

            if (bossImgAtual && bossImgAtual.complete && bossImgAtual.naturalHeight !== 0) {
                ctx.drawImage(bossImgAtual, boss.x, boss.y, boss.w, boss.h);
            } else {
                ctx.fillStyle = (boss.state === 'dying') ? 'gray' : 'darkred';
                ctx.fillRect(boss.x, boss.y, boss.w, boss.h);
            }
        }

        // --- POWER-UPS ---
        for (let i = level.powerUps.length - 1; i >= 0; i--) {
            let pu = level.powerUps[i];
            let imgPu = null;
            if (pu.type === 'speed') imgPu = imgPwVelocidade;
            if (pu.type === 'jump') imgPu = imgPwPulo;
            if (pu.type === 'invincible') imgPu = imgPwInvencivel;
            if (pu.type === 'poison') imgPu = imgPwVeneno;

            let floatY = pu.y + Math.sin(now / 200) * 5;

            if (imgPu && imgPu.complete && imgPu.naturalHeight !== 0) {
                ctx.drawImage(imgPu, pu.x, floatY, pu.w, pu.h);
            } else {
                ctx.fillStyle = (pu.type === 'speed') ? 'yellow' : (pu.type === 'jump') ? 'cyan' : (pu.type === 'poison') ? 'purple' : 'gold';
                ctx.beginPath(); ctx.arc(pu.x + 24, floatY + 24, 20, 0, Math.PI * 2); ctx.fill();
            }

            players.forEach(p => {
                if (p.active && !p.dead && isColliding(p, { x: pu.x, y: floatY, w: pu.w, h: pu.h })) {
                    p.collectPowerUp(pu.type); level.powerUps.splice(i, 1);
                }
            });
        }

        players.forEach(p => p.update());

        // --- TIROS DE VENENO (JOGADOR) ---
        for (let i = projectiles.length - 1; i >= 0; i--) {
            let pj = projectiles[i];
            pj.x += pj.speedX;

            if (imgTiroVeneno.complete && imgTiroVeneno.naturalHeight !== 0) {
                ctx.drawImage(imgTiroVeneno, pj.x, pj.y, pj.w, pj.h);
            } else {
                ctx.fillStyle = pj.color; ctx.fillRect(pj.x, pj.y, pj.w, pj.h);
            }

            let hitSomething = false;
            if (boss.active && boss.state !== 'dying' && isColliding(pj, boss)) {
                boss.hp--;
                bossHealthFill.style.width = `${(boss.hp / boss.maxHp) * 100}%`;
                if (boss.hp <= 0 && boss.state !== 'dying') {
                    boss.state = 'dying';
                    boss.deathTimer = 300;
                    boss.dy = 1;
                    boss.projectiles = [];
                }
                hitSomething = true;
            }

            if (!hitSomething) {
                for (let e = level.enemies.length - 1; e >= 0; e--) {
                    let enemy = level.enemies[e];
                    if (enemy.state !== 'dying' && isColliding(pj, enemy)) {
                        enemy.state = 'dying'; enemy.deathTimer = 20;
                        pointsFromEnemies += 50; hitSomething = true; break;
                    }
                }
            }

            if (!hitSomething) {
                for (let o = level.obstacles.length - 1; o >= 0; o--) {
                    if (isColliding(pj, level.obstacles[o])) {
                        level.obstacles.splice(o, 1); hitSomething = true; break;
                    }
                }
            }
            if (hitSomething) projectiles.splice(i, 1);
        }

        for (let o of level.obstacles) {
            if (imgCacto.complete && imgCacto.naturalHeight !== 0) {
                ctx.drawImage(imgCacto, o.x - 3, o.y - 5, 30, 55);
            } else { ctx.fillStyle = o.color; ctx.fillRect(o.x, o.y, o.w, o.h); }
            players.forEach(p => { if (p.active && !p.dead && isColliding(p, o)) p.takeDamage(); });
        }

        for (let i = level.enemies.length - 1; i >= 0; i--) {
            let r = level.enemies[i];

            if (r.state === 'dying') {
                r.deathTimer--;
                let frameMorte = null;

                if (r.type === 'mangusto') {
                    frameMorte = imgMangustoMorrendo;
                } else {
                    frameMorte = (r.deathTimer > 10) ? imgRatoMorrendo[0] : imgRatoMorrendo[1];
                }

                if (frameMorte && frameMorte.complete) {
                    ctx.save();
                    if (r.dir === -1) {
                        ctx.scale(-1, 1);
                        ctx.drawImage(frameMorte, -r.x - r.w, r.y, r.w, r.h);
                    } else {
                        ctx.drawImage(frameMorte, r.x, r.y, r.w, r.h);
                    }
                    ctx.restore();
                }

                if (r.deathTimer <= 0) level.enemies.splice(i, 1);
                continue;
            }

            if (r.type === 'mangusto') {
                r.dy += 0.5;
                r.y += r.dy;

                let onPlatform = false;
                for (let p of level.platforms) {
                    if (r.x < p.x + p.w && r.x + r.w > p.x && r.y + r.h >= p.y && r.y + r.h <= p.y + 20 && r.dy >= 0) {
                        r.y = p.y - r.h;
                        r.dy = 0;
                        r.grounded = true;
                        onPlatform = true;
                    }
                }
                if (!onPlatform) r.grounded = false;

                r.jumpTimer--;
                if (r.grounded && r.jumpTimer <= 0) {
                    r.dy = -7;
                    r.jumpTimer = 60 + Math.random() * 60;
                }
            }

            r.x += r.speed * r.dir;
            if (r.x > r.endX || r.x < r.startX) r.dir *= -1;

            r.frameCount++;
            if (r.frameCount > 8) { r.frameIndex = (r.frameIndex + 1) % 4; r.frameCount = 0; }

            let imgAtual = null;
            if (r.type === 'mangusto') {
                if (!r.grounded && imgMangustoPulo.complete && imgMangustoPulo.naturalHeight !== 0) {
                    imgAtual = imgMangustoPulo;
                } else {
                    imgAtual = imgMangusto[r.frameIndex];
                }
            } else {
                imgAtual = imgRato[r.frameIndex];
            }

            ctx.save();
            if (r.dir === -1) {
                ctx.scale(-1, 1);
                if (imgAtual && imgAtual.complete) ctx.drawImage(imgAtual, -r.x - r.w, r.y, r.w, r.h);
            } else {
                if (imgAtual && imgAtual.complete) ctx.drawImage(imgAtual, r.x, r.y, r.w, r.h);
                else { ctx.fillStyle = r.color; ctx.fillRect(r.x, r.y, r.w, r.h); }
            }
            ctx.restore();

            players.forEach(p => {
                if (p.active && !p.dead && isColliding(p, r)) {
                    if (p.dy > 0 && p.y + p.h < r.y + 20) {
                        p.dy = -10; r.state = 'dying'; r.deathTimer = 20; pointsFromEnemies += 50;
                    } else { p.takeDamage(); }
                }
            });
        }

        players.forEach(p => p.draw()); ctx.restore();
        drawHUD();
        scoreDisplay.innerText = `PONTOS: ${score}`;
    }

    if (gameState === 'GAMEOVER') {
        gameOverScreen.classList.remove('hidden');
        finalScoreTxt.innerText = `Vocês fizeram ${score} pontos!`;
    }

    if (gameState === 'VICTORY') {
        victoryScreen.classList.remove('hidden');
        victoryScoreTxt.innerText = `Pontuação Final: ${score + 500} (Bônus de Boss!)`;
    }
}

requestAnimationFrame(gameLoop);