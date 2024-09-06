'use client'

import { useRef, useEffect, useState } from "react"
import { collisions } from "@/utils/collisions";
import { battleZones } from "@/utils/battleZones";


const Game = () => {
    const gameRef = useRef(null);

    useEffect(() => {
        const canvas = gameRef.current;
        const c = canvas.getContext('2d');

        canvas.width = 500;
        canvas.height = 500;

        const collisionsMap = []
        for (let i = 0; i < collisions.length; i += 70) {
            collisionsMap.push(collisions.slice(i, 70 + i))
        }

        const battleZonesMap = []
        for (let i = 0; i < battleZones.length; i += 70) {
            battleZonesMap.push(battleZones.slice(i, 70 + i))
        }


        class Boundary {
            static width = 48;
            static height = 48;
            constructor({ position }) {
                this.position = position;
                this.width = 48
                this.height = 48
            }
            draw() {
                c.fillStyle = 'rgba(255, 0, 0, 0.5)';
                c.fillRect(this.position.x, this.position.y, this.width, this.height);
            }
        }

        const boundaries = []
        const battleZonesArr = []

        const offset = { x: -1475, y: -450 }

        collisionsMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if (symbol === 1025) {
                    boundaries.push(new Boundary({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y }, symbol: symbol }))
                }
            })
        })

        battleZonesMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if (symbol === 1025) {
                    battleZonesArr.push(new Boundary({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y }, symbol: symbol }))
                }
            })
        })

        const image = new Image()
        image.src = '/game_assets/map.png'

        const playerDownImage = new Image()
        playerDownImage.src = '/game_assets/playerDown.png'

        const playerUpImage = new Image()
        playerUpImage.src = '/game_assets/playerUp.png'

        const playerLeftImage = new Image()
        playerLeftImage.src = '/game_assets/playerLeft.png'

        const playerRightImage = new Image()
        playerRightImage.src = '/game_assets/playerRight.png'

        const foregroundImage = new Image()
        foregroundImage.src = '/game_assets/foreground.png'




        class Sprite {
            constructor({
                position,
                image,
                frames = { max: 1, hold: 10 },
                sprites = [],
                animate = false
            }) {
                this.position = position;
                this.image = image
                this.frames = { ...frames, val: 0, elapsed: 0 }

                this.image.onload = () => {
                    this.width = this.image.width / this.frames.max
                    this.height = this.image.height
                }
                this.animate = animate
                this.sprites = sprites
                this.opacity = 1
            }
            draw() {
                c.save()
                c.globalAlpha = this.opacity
                c.drawImage(
                    this.image,
                    this.frames.val * this.width,
                    0,
                    this.image.width / this.frames.max,
                    this.image.height,
                    this.position.x,
                    this.position.y,
                    this.image.width / this.frames.max,
                    this.image.height
                )
                c.restore()


                if (this.animate) {
                    if (this.frames.max > 1) {
                        this.frames.elapsed++
                    }

                    if (this.frames.elapsed % this.frames.hold === 0) {
                        if (this.frames.val < this.frames.max - 1) {
                            this.frames.val++
                        } else {
                            this.frames.val = 0
                        }
                    }
                }
            }

            attack({ attack, recipient }) {

            }
        }


        const player = new Sprite({
            position: {
                // x: canvas.width / 2 - 192 / 8,
                // y: canvas.height / 2 - 68 / 2,
                x: canvas.width / 2 - 192 / 8,
                y: canvas.height / 2 - 50 / 2,

            },
            image: playerDownImage,
            frames: { max: 4, hold: 10 },
            sprites: {
                up: playerUpImage,
                down: playerDownImage,
                left: playerLeftImage,
                right: playerRightImage
            }
        })


        const background = new Sprite({ position: { x: offset.x, y: offset.y }, image: image })
        const foreground = new Sprite({ position: { x: offset.x, y: offset.y }, image: foregroundImage })




        const movables = [background, ...boundaries, foreground, ...battleZonesArr]
        function rectangularCollision({ rectangle1, rectangle2 }) {
            return (
                rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
                rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
                rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
            )
        }

        const battle = {
            initiated: false
        }

        function animate() {
            const animationId = requestAnimationFrame(animate);

            background.draw()
            boundaries.forEach(boundary => {
                boundary.draw()
            })

            battleZonesArr.forEach(battleZone => {
                battleZone.draw()
            })

            player.draw()

            foreground.draw()

            let moving = true;
            player.animate = false

            if (battle.initiated) return
            // Activate Battle
            if (upPressed || downPressed || leftPressed || rightPressed) {
                for (let i = 0; i < battleZonesArr.length; i++) {
                    const battleZone = battleZonesArr[i]
                    const overlappingArea = (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) - Math.max(player.position.x, battleZone.position.x)) *
                        (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) - Math.max(player.position.y, battleZone.position.y))
                    if (rectangularCollision({
                        rectangle1: player,
                        rectangle2: battleZone
                    }) && overlappingArea > (player.width * player.height) / 2 && Math.random() < 0.1) {
                        console.log('battlezone collision')


                        battle.initiated = true



                        // deactivate current animation loop
                        cancelAnimationFrame(animationId)

                        // activate new animation loop
                        animateBattle()

                        break;
                    }
                }
            }


            if (upPressed && lastPressed === 'up') {
                player.animate = true;
                player.image = player.sprites.up
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i]
                    if (rectangularCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y + 5
                            }
                        }
                    })) {
                        moving = false;

                        break;
                    }
                }


                if (moving) {
                    movables.forEach(moveable => {
                        moveable.position.y += 5
                    })
                }

            } else if (downPressed && lastPressed === 'down') {
                player.animate = true
                player.image = player.sprites.down
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i]

                    if (rectangularCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y - 5
                            }
                        }
                    })) {

                        moving = false;
                        break;
                    }
                }


                if (moving) {
                    movables.forEach(moveable => {
                        moveable.position.y -= 5
                    })
                }
            } else if (leftPressed && lastPressed === 'left') {
                player.animate = true
                player.image = player.sprites.left
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i]

                    if (rectangularCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x + 5,
                                y: boundary.position.y
                            }
                        }
                    })) {

                        moving = false;
                        break;
                    }
                }


                if (moving) {
                    movables.forEach(moveable => {
                        moveable.position.x += 5
                    })
                }
            } else if (rightPressed && lastPressed === 'right') {
                player.animate = true
                player.image = player.sprites.right
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i]

                    if (rectangularCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x - 5,
                                y: boundary.position.y
                            }
                        }
                    })) {

                        moving = false;
                        break;
                    }
                }


                if (moving) {
                    movables.forEach(moveable => {
                        moveable.position.x -= 5
                    })
                }
            }
            // c.clearRect(0, 0, canvas.width, canvas.height);

        }

        // Handle Key Events
        let lastPressed = ''
        let rightPressed = false;
        let leftPressed = false;
        let downPressed = false;
        let upPressed = false;

        function keyDownHandler(e) {
            if (e.code === "ArrowRight" || e.code === "KeyD") {
                rightPressed = true;
                lastPressed = 'right'
            } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
                leftPressed = true;
                lastPressed = 'left'
            } else if (e.code === "ArrowDown" || e.code === "KeyS") {
                downPressed = true;
                lastPressed = 'down'
            } else if (e.code === "ArrowUp" || e.code === "KeyW") {
                upPressed = true;
                lastPressed = 'up'
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


        // animate()

        const battleBackgroundImage = new Image()
        battleBackgroundImage.src = '/game_assets/battleBackground.png'

        const battleBackground = new Sprite({
            position: { x: -400, y: 0 },
            image: battleBackgroundImage
        })

        const draggleImage = new Image()
        draggleImage.src = '/game_assets/draggleSprite.png'


        const draggle = new Sprite({
            position: {
                x: 390,
                y: 100
            },
            image: draggleImage,
            frames: {
                max: 4,
                hold: 20
            },
            animate: true
        })

        const embyImage = new Image()
        embyImage.src = '/game_assets/embySprite.png'


        const emby = new Sprite({
            position: {
                x: 50,
                y: 350
            },
            image: embyImage,
            frames: {
                max: 4,
                hold: 20
            },
            animate: true
        })

        function animateBattle() {
            requestAnimationFrame(animateBattle)
            // console.log('animating battle')
            battleBackground.draw()

            draggle.draw()
            emby.draw()

        }

        animateBattle()

    }, []);

    return (
        <div className="flex flex-col gap-4 relative">
            <div className="bg-black w-[500px] h-[500px] absolute rounded-md pointer-events-none opacity-0"></div>
            <div className="absolute bg-white w-[300px] h-[80px] top-[10px] left-[20px] border-2 border-black flex flex-col justify-evenly">
                <h2 className="text-2xl font-extrabold text-black ml-5">Draggle</h2>
                <div className="relative ml-5">
                    <div className="w-[80%] h-[5px] bg-gray-400"></div>
                    <div className="w-[50%] h-[5px] bg-green-400 absolute top-0"></div>
                </div>
            </div>

            <div className="absolute bg-white w-[300px] h-[80px] bottom-[60px] right-[20px] border-2 border-black flex flex-col justify-evenly">
                <h2 className="text-2xl font-extrabold text-black ml-5">Emby</h2>
                <div className="relative ml-5">
                    <div className="w-[80%] h-[5px] bg-gray-400"></div>
                    <div className="w-[50%] h-[5px] bg-green-400 absolute top-0"></div>
                </div>
            </div>
            <canvas className="bg-white w-[90vw] h-[90vw] sm:w-[500px] sm:h-[500px] rounded-md" ref={gameRef}></canvas>
            <div className="bg-white h-[50px] w-full absolute bottom-0 border-t-2 border-black flex flex-row">
                <div className=" w-3/4 h-full flex flex-row justify-evenly text-black">
                    <button onClick={() => {
                        emby.attack({
                            attack: {
                                name: 'Tackle',
                                damage: 10,
                                type: 'Normal'
                            },
                            recipient: draggle

                        })
                    }} className="cursor-pointer hover:bg-gray-300 transition-colors w-full">Attack 1</button>
                    <button className="cursor-pointer hover:bg-gray-300 transition-colors w-full">Attack 2</button>
                    <button className="cursor-pointer hover:bg-gray-300 transition-colors w-full">Attack 3</button>
                    <button className="cursor-pointer hover:bg-gray-300 transition-colors w-full">Attack 4</button>

                </div>
                <div className=" w-1/4 h-full flex flex-row justify-center items-center text-black font-extrabold">
                    <h1>Attack Type</h1>
                </div>
            </div>
        </div>
    );
}

export default Game;
