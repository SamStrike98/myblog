'use client'

import { useRef, useEffect, useState } from "react"
import { fibonacci } from "@/utils/fibonacci";

const Canvas = () => {
    const canvasRef = useRef(null);
    const startBtnRef = useRef(null);
    const nextLevelBtnRef = useRef(null);
    const [score, setScore] = useState(0);
    const [lvl, setLvl] = useState(1);
    var level = 1;
    let gmOvr = true;
    const [started, setStarted] = useState(false)
    const [gameOver, setGameOver] = useState(true);
    const [loadingNextLevel, setLoadingNextLevel] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        setIsLoading(false)
        const canvas = canvasRef.current;
        const startBtn = startBtnRef.current;
        const nextLevelBtn = nextLevelBtnRef.current;
        const c = canvas.getContext('2d');

        canvas.width = 500;
        canvas.height = 500;



        class Enemy {
            constructor(width, height, posX, posY, velocity) {
                this.width = width;
                this.height = height;
                this.posX = posX;
                this.posY = posY;
                this.velocity = velocity;
            }

            draw() {
                c.fillStyle = 'purple';
                c.fillRect(this.posX, this.posY, this.width, this.height);
            }

            update() {
                this.draw();

                const playerCenterX = player1.posX + player1.width / 2;
                const playerCenterY = player1.posY + player1.height / 2;

                const angle = Math.atan2(playerCenterY - (this.posY + this.height / 2), playerCenterX - (this.posX + this.width / 2));
                const velocity = {
                    x: 3 * Math.cos(angle),
                    y: 3 * Math.sin(angle)
                };

                this.velocity.x = velocity.x;
                this.velocity.y = velocity.y;

                this.posX += this.velocity.x;
                this.posY += this.velocity.y;
            }
        }

        class Bullet {
            constructor(posX, posY, radius, velocity) {
                this.radius = radius;
                this.posX = posX;
                this.posY = posY;
                this.velocity = velocity;
            }

            draw() {
                c.fillStyle = 'red';
                c.beginPath();
                c.arc(this.posX, this.posY, this.radius, Math.PI * 2, false);
                c.fill();
            }

            update() {
                this.draw();
                this.posX += this.velocity.x;
                this.posY += this.velocity.y;
            }
        }

        class Player {
            constructor(width, height, posX, posY) {
                this.width = width;
                this.height = height;
                this.posX = posX;
                this.posY = posY;
                this.dx = 5;
                this.dy = 5;
            }

            draw() {
                c.fillStyle = 'green';
                c.fillRect(this.posX, this.posY, this.width, this.height);
            }

            update() {
                this.draw();
                if (rightPressed && this.posX + this.dx + this.width < canvas.width) {
                    this.posX += this.dx;
                } else if (leftPressed && this.posX - this.dx > 0) {
                    this.posX -= this.dx;
                }

                if (upPressed && this.posY - this.dy > 0) {
                    this.posY -= this.dy;
                } else if (downPressed && this.posY + this.dy + this.height < canvas.height) {
                    this.posY += this.dy;
                }
            }
        }

        let player1;
        let enemiesArr;
        let deadEnemiesArr;
        let bulletsArr;
        let animationId;


        function init() {
            if (level === 1) {
                setScore(0);
            }

            console.log('init', level)
            player1 = new Player(20, 20, canvas.width / 2, canvas.height / 2);
            enemiesArr = [];
            deadEnemiesArr = [];
            bulletsArr = [];

        }

        function spawnEnemies() {
            const playerCenterX = player1.posX + player1.width / 2;
            const playerCenterY = player1.posY + player1.height / 2;
            const angle = Math.atan2(playerCenterY, playerCenterX);
            const velocity = {
                x: level * 3 * Math.cos(angle),
                y: level * 3 * Math.sin(angle)
            };
            let i = 1;
            const spawnInterval = setInterval(() => {
                console.log('i', i, 'level', level, 'fib', fibonacci(level))
                enemiesArr.push(new Enemy(20, 20, 1 + Math.random() * canvas.width, 5, velocity));

                if (i === fibonacci(level) || gmOvr) {
                    clearInterval(spawnInterval);
                }
                i++;

            }, 1000 * 1 / level);
        }

        function animate() {
            animationId = requestAnimationFrame(animate);
            c.clearRect(0, 0, canvas.width, canvas.height);
            player1.update();

            bulletsArr.forEach((bullet, idx) => {
                bullet.update();
                if (bullet.posX - bullet.radius > canvas.width || bullet.posX + bullet.radius < 0 || bullet.posY - bullet.radius > canvas.height || bullet.posY + bullet.radius < 0) {
                    bulletsArr.splice(idx, 1);
                }
            });

            enemiesArr.forEach((enemy, enemyIdx) => {
                enemy.update();
                const dist = Math.hypot(player1.posX - enemy.posX, player1.posY - enemy.posY);
                if (dist - enemy.width / 2 - player1.width / 2 <= 0) {
                    cancelAnimationFrame(animationId);

                    setGameOver(true);
                    gmOvr = true
                    setLvl(1)

                    level = 1
                }

                bulletsArr.forEach((bullet, bulletIdx) => {
                    const dist = Math.hypot(bullet.posX - enemy.posX, bullet.posY - enemy.posY);

                    if (dist - enemy.width / 2 - bullet.radius <= 0.2) {
                        enemiesArr.splice(enemyIdx, 1);
                        deadEnemiesArr.push(enemy);
                        bulletsArr.splice(bulletIdx, 1);

                        setScore(prevScore => prevScore + 1);

                        if (deadEnemiesArr.length === fibonacci(level)) {
                            // setGameOver(true);
                            setLvl(prevLvl => prevLvl + 1)
                            level++
                            setLoadingNextLevel(true)
                        }
                    }
                });
            });
        }

        startBtn.addEventListener('click', () => {
            setStarted(true)
            gameStart();
        });

        nextLevelBtn.addEventListener('click', () => {
            // setLevel(prevLevel => prevLevel + 1)
            nextLevel();
        });

        function nextLevel() {
            setLoadingNextLevel(false)
            init();
            setGameOver(false);
            gmOvr = false
            cancelAnimationFrame(animationId); // Cancel any previous animation frames
            animate();
            spawnEnemies();
        }

        function gameStart() {
            level = 1
            init();
            setGameOver(false);
            gmOvr = false
            cancelAnimationFrame(animationId); // Cancel any previous animation frames
            animate();
            spawnEnemies();
        }

        // Handle Key Events
        let rightPressed = false;
        let leftPressed = false;
        let downPressed = false;
        let upPressed = false;

        function keyDownHandler(e) {
            if (e.code === "ArrowRight" || e.code === "KeyD") {
                rightPressed = true;
            } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
                leftPressed = true;
            } else if (e.code === "ArrowDown" || e.code === "KeyS") {
                downPressed = true;
            } else if (e.code === "ArrowUp" || e.code === "KeyW") {
                upPressed = true;
            }
        }

        function keyUpHandler(e) {
            if (e.code === "ArrowRight" || e.code === "KeyD") {
                rightPressed = false;
            } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
                leftPressed = false;
            } else if (e.code === "ArrowDown" || e.code === "KeyS") {
                downPressed = false;
            } else if (e.code === "ArrowUp" || e.code === "KeyW") {
                upPressed = false;
            }
        }

        window.addEventListener("keydown", keyDownHandler);
        window.addEventListener("keyup", keyUpHandler);

        // Handle Mouse Click Events
        canvas.addEventListener("click", handleMouseClick);

        function handleMouseClick(e) {
            e.stopPropagation();
            const playerCenterX = player1.posX + player1.width / 2;
            const playerCenterY = player1.posY + player1.height / 2;
            const angle = Math.atan2(e.offsetY - playerCenterY, e.offsetX - playerCenterX);
            const velocity = {
                x: 3 * Math.cos(angle),
                y: 3 * Math.sin(angle)
            };
            bulletsArr.push(new Bullet(playerCenterX, playerCenterY, 5, velocity));
        }

    }, []);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-10">
                <p className="font-bold text-2xl text-primary">Level: {lvl}</p>
                <p className="font-bold text-2xl text-primary">Score: {score}</p>
            </div>




            <div className="relative w-[90vw] h-[90vw] sm:w-[500px] sm:h-[500px] rounded-md">
                <div className={`${started ? 'hidden' : ''} z-10 absolute w-full h-full  rounded-md bg-[#0f172a] text-center text-white flex flex-col justify-evenly items-center p-4`}>
                    <h2 className="text-xl sm:text-4xl font-extrabold">The Fibonacci Horde</h2>
                    <p className="text-md sm:text-lg">{"This is a basic horde game where enemies will chase you and you've got to shoot them. The only difference is, every level the number of enemies will increase and will correspond to that level's term in the Fibonacci sequence. Also each level the spawn rate and speed of the enemies will increase!"}</p>
                    <p className="text-md sm:text-lg">{"Controls are WASD to move and use the Mouse to shoot!"}</p>
                    {isLoading ? <span className="loading loading-bars loading-lg"></span> : <button onClick={() => setStarted(true)} className="btn btn-primary w-[150px] text-white">Close</button>}
                </div>

                <div className={`${!gameOver ? 'hidden' : ''} absolute w-1/2 h-1/4 top-[40%] left-1/4 rounded-md bg-[#0f172a] text-center text-white flex flex-col justify-evenly items-center`}>
                    <h2 className="text-bold text-xl">Score: <span className="text-3xl font-extrabold">{score}</span></h2>
                    <button ref={startBtnRef} className="btn btn-primary w-[150px] text-white">Start Game</button>
                </div>

                <div className={`${!loadingNextLevel ? 'hidden' : ''} absolute w-1/2 h-1/4 top-[40%] left-1/4 rounded-md bg-[#0f172a] text-center text-white flex flex-col justify-evenly items-center`}>
                    <h2 className="text-bold text-xl">Current Score: <span className="text-3xl font-extrabold">{score}</span></h2>
                    <p>Next Level {lvl}</p>
                    <button ref={nextLevelBtnRef} className="btn btn-primary w-[150px] text-white">Next Level</button>
                </div>
                <canvas className="bg-white w-[90vw] h-[90vw] sm:w-[500px] sm:h-[500px] rounded-md" ref={canvasRef}></canvas>
            </div>

        </div>
    );
}

export default Canvas;
