'use client'

import { useRef, useEffect, useState } from "react"


const Canvas = () => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(0)



    useEffect(() => {
        const canvas = canvasRef.current
        const c = canvas.getContext('2d')

        canvas.width = 500;
        canvas.height = 500;

        class Enemy {
            constructor(width, height, posX, posY, velocity) {
                this.width = width;
                this.height = height;
                this.posX = posX;
                this.posY = posY;
                this.velocity = velocity

            }

            draw() {
                c.fillStyle = 'purple'
                c.fillRect(this.posX, this.posY, this.width, this.height)
            }



            update() {
                this.draw()


                const playerCenterX = player1.posX + player1.width / 2
                const playerCenterY = player1.posY + player1.height / 2

                const angle = Math.atan2(playerCenterY - (this.posY + this.height / 2), playerCenterX - (this.posX + this.width / 2))
                const velocity = {
                    x: 3 * Math.cos(angle),
                    y: 3 * Math.sin(angle)
                }


                this.velocity.x = velocity.x;
                this.velocity.y = velocity.y



                this.posX += this.velocity.x;
                this.posY += this.velocity.y;
            }
        }

        class Bullet {
            constructor(posX, posY, radius, velocity) {
                this.radius = radius
                this.posX = posX;
                this.posY = posY;
                this.velocity = velocity

            }
            draw() {
                c.fillStyle = 'red'
                c.fill()
                c.beginPath()
                c.arc(this.posX, this.posY, this.radius, Math.PI * 2, false)
            }

            update() {
                this.draw()

                this.posX += this.velocity.x
                this.posY += this.velocity.y

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
                c.fillStyle = 'green'
                c.fillRect(this.posX, this.posY, this.width, this.height)
            }



            update() {
                this.draw()
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

        const player1 = new Player(20, 20, 50, 50)


        const enemiesArr = []
        function spawnEnemies() {

            const playerCenterX = player1.posX + player1.width / 2
            const playerCenterY = player1.posY + player1.height / 2

            const angle = Math.atan2(playerCenterY, playerCenterX)
            const velocity = {
                x: 3 * Math.cos(angle),
                y: 3 * Math.sin(angle)
            }

            let i = 0;
            const spawnInterval = setInterval(() => {
                enemiesArr.push(new Enemy(20, 20, 5, 5, velocity))
                i++
                if (i === 5) {
                    clearInterval(spawnInterval)
                }
            }, 1000)
        }



        // Handle Key Events
        addEventListener("keydown", keyDownHandler)
        addEventListener("keyup", keyUpHandler)

        let rightPressed = false;
        let leftPressed = false;
        let downPressed = false;
        let upPressed = false;
        let ePressed = false;

        function keyDownHandler(e) {
            if (e.code === "ArrowRight" || e.code === "KeyD") {
                rightPressed = true;
            } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
                leftPressed = true;
            } else if (e.code === "ArrowDown" || e.code === "KeyS") {
                downPressed = true;
            } else if (e.code === "ArrowUp" || e.code === "KeyW") {
                upPressed = true;
            } else if (e.code === "KeyE") {
                ePressed = true;
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
            } else if (e.code === "KeyE") {
                ePressed = false;
            }
        }

        // Handle Mouse Click Events
        canvas.addEventListener("click", handleMouseClick)

        const bulletsArr = []

        function handleMouseClick(e) {
            e.stopPropagation();
            console.log('click')
            if (e.target === canvas) {
                const playerCenterX = player1.posX + player1.width / 2
                const playerCenterY = player1.posY + player1.height / 2

                // console.log(e.offsetX, e.offsetY)
                const angle = Math.atan2(e.offsetY - playerCenterY, e.offsetX - playerCenterX)
                const velocity = {
                    x: 3 * Math.cos(angle),
                    y: 3 * Math.sin(angle)
                }
                bulletsArr.push(new Bullet(playerCenterX, playerCenterY, 5, velocity))
            }
        }

        let animationId;

        function animate() {
            animationId = requestAnimationFrame(animate);
            c.clearRect(0, 0, canvas.width, canvas.height);
            player1.update()
            bulletsArr.forEach((bullet, idx) => {
                bullet.update()
                if (bullet.posX - bullet.radius > canvas.width || bullet.posX + bullet.radius < 0 || bullet.posY - bullet.radius > canvas.height || bullet.posY + bullet.radius < 0) {
                    bulletsArr.splice(idx, 1);
                }
            })



            enemiesArr.forEach((enemy, enemyIdx) => {
                enemy.update()
                const dist = Math.hypot(player1.posX - enemy.posX, player1.posY - enemy.posY)
                if (dist - enemy.width / 2 - player1.width / 2 <= 0) {
                    cancelAnimationFrame(animationId)
                }


                bulletsArr.forEach((bullet, bulletIdx) => {


                    const dist = Math.hypot(bullet.posX - enemy.posX, bullet.posY - enemy.posY)

                    // Objects touch
                    if (dist - enemy.width / 2 - bullet.radius <= 0) {
                        enemiesArr.splice(enemyIdx, 1);
                        bulletsArr.splice(bulletIdx, 1);
                        setScore(prevScore => prevScore + 1)

                    }

                })
            })

        }

        animate()
        spawnEnemies()

    }, [])
    return (
        <>
            <div className="flex flex-col">
                <p className="font-bold text-lg text-primary">Level: {level}</p>
                <p className="font-bold text-lg text-primary">Score: {score}</p>
            </div>



            <canvas className="bg-white w-[90vw] h-[90vw] sm:w-[500px] sm:h-[500px] rounded-md" ref={canvasRef}></canvas>
        </>
    )
}

export default Canvas