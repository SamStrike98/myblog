'use client'

import { useRef, useEffect } from "react"

const Canvas = () => {
    const canvasRef = useRef(null);



    useEffect(() => {
        const canvas = canvasRef.current
        const c = canvas.getContext('2d')

        canvas.width = 500;
        canvas.height = 500;

        const gravity = 0.5;

        class Player {
            constructor() {
                this.position = {
                    x: 100,
                    y: 100
                };
                this.width = 20;
                this.height = 20;
                this.velocity = {
                    x: 0,
                    y: 0
                };
            }
            draw() {
                c.fillStyle = 'red'
                c.fillRect(this.position.x, this.position.y, this.width, this.height)
            }

            update() {
                this.draw()
                this.position.y += this.velocity.y
                this.position.x += this.velocity.x

                if (this.position.y + this.height + this.velocity.y <= canvas.height) {
                    this.velocity.y += gravity
                } else {
                    this.velocity.y = 0
                }

            }
        }

        const player = new Player()
        const keys = {
            right: {
                pressed: false
            },
            left: {
                pressed: false
            }
        }


        function animate() {
            requestAnimationFrame(animate)
            c.clearRect(0, 0, canvas.width, canvas.height)
            player.update()

            if (keys.right.pressed) {
                player.velocity.x = 2
            } else if (keys.left.pressed) {
                player.velocity.x = -2
            }
            else {
                player.velocity.x = 0
            }
        }

        animate()


        addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'KeyD':
                    keys.right.pressed = true
                    break;
                case 'KeyA':
                    keys.left.pressed = true
                    break;
                case 'KeyS':
                    player.velocity.y += 1
                    break;
                case 'KeyW':
                    if (e.repeat) {
                        return
                    }
                    player.velocity.y -= 3

                    break;

            }
        })

        addEventListener('keyup', ({ code }) => {
            switch (code) {
                case 'KeyD':
                    keys.right.pressed = false
                    break;
                case 'KeyA':
                    keys.left.pressed = false
                    break;
                case 'KeyS':
                    player.velocity.y = 0
                    break;
                case 'KeyW':
                    player.velocity.y = 0
                    break;

            }
        })

    }, [])
    return (
        <canvas className="bg-white w-[500px] h-[500px] rounded-sm" ref={canvasRef}></canvas>
    )
}

export default Canvas