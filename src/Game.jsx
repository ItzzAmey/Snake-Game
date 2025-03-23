import { React, useCallback, useEffect, useState } from "react";

const BOARD_SIZE = 20;

function Game() {
    const [isGameOn, setGameOn] = useState(1);
    const [fruit, setFruit] = useState(217);
    const [snake, setSnake] = useState([207]);
    const [direction, setDirection] = useState("RIGHT");
    const [board, setBoard] = useState(new Array(BOARD_SIZE).fill(null).map(() => new Array(BOARD_SIZE).fill(0)));

    useEffect(() => {
        function handleKeyDown(event) {
            switch (event.key) {
                case "ArrowUp":
                    if (direction !== "DOWN") setDirection("UP");
                    break;
                case "ArrowDown":
                    if (direction !== "UP") setDirection("DOWN");
                    break;
                case "ArrowLeft":
                    if (direction !== "RIGHT") setDirection("LEFT");
                    break;
                case "ArrowRight":
                    if (direction !== "LEFT") setDirection("RIGHT");
                    break;
                default:
                    break;
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => { // VVIP AS EVENT LISTENERS GET STACKED
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [direction])

    const generateFruit = useCallback(() => {
        var pos = Math.floor(Math.random() * 400);
        while (snake.includes(pos)) pos = Math.floor(Math.random() * 400);
        return pos;
    }, [snake])

    const renderSnakeAndFruit = useCallback(() => {
        // Check if allowed
        if (direction === "UP") {
            if ((snake[0] <= 19 && snake[0] >= 0) || (snake.includes(snake[0] - 20))) {
                setGameOn(0);
                return;
            }
            else {
                if (snake[0] - 20 === fruit) {
                    setSnake((prev) => {
                        return [prev[0] - 20, ...prev];
                    });

                    setFruit(generateFruit());
                }
                else {
                    setSnake((prev) => {
                        return [prev[0] - 20, ...prev.filter((element, index) => {
                            return index !== prev.length - 1;
                        })];
                    });
                }
            }
        }

        else if (direction === "DOWN") {
            if ((snake[0] <= 399 && snake[0] >= 380) || (snake.includes(snake[0] + 20))) {
                setGameOn(0);
                return;
            }
            else {
                if (snake[0] + 20 === fruit) {
                    setSnake((prev) => {
                        return [prev[0] + 20, ...prev];
                    });

                    setFruit(generateFruit());
                }
                else {
                    setSnake((prev) => {
                        return [prev[0] + 20, ...prev.filter((element, index) => {
                            return index !== prev.length - 1;
                        })];
                    });
                }
            }
        }
        else if (direction === "RIGHT") {
            if (((snake[0] + 1) % 20 === 0) || (snake.includes(snake[0] + 1))) {
                setGameOn(0);
                return;
            }
            else {
                if (snake[0] + 1 === fruit) {
                    setSnake((prev) => {
                        return [prev[0] + 1, ...prev];
                    });

                    setFruit(generateFruit());
                }
                else {
                    setSnake((prev) => {
                        return [prev[0] + 1, ...prev.filter((element, index) => {
                            return index !== prev.length - 1;
                        })];
                    });
                }
            }
        }

        else {
            if (((snake[0]) % 20 === 0) || (snake.includes(snake[0] - 1))) {
                setGameOn(0);
                return;
            }
            else {
                if (snake[0] - 1 === fruit) {
                    setSnake((prev) => {
                        return [prev[0] - 1, ...prev];
                    });

                    setFruit(generateFruit());
                }
                else {
                    setSnake((prev) => {
                        return [prev[0] - 1, ...prev.filter((element, index) => {
                            return index !== prev.length - 1;
                        })];
                    });
                }
            }
        }

        setBoard(board);

    }, [snake, fruit, direction, generateFruit, board])

    useEffect(() => {
        if (!isGameOn) return;

        const intervalID = setInterval(() => {
            renderSnakeAndFruit();
        }, 100);

        return () => clearInterval(intervalID);
    }, [isGameOn, renderSnakeAndFruit]);

    return (
        <div className = "content">
            <div className="board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((col, colIndex) => (
                            <div
                                key={colIndex}
                                id={String(((rowIndex * BOARD_SIZE) + colIndex))}
                                className="cell"
                                style={{ backgroundColor: snake.includes(rowIndex * BOARD_SIZE + colIndex) ? "green" : (fruit === (rowIndex * BOARD_SIZE + colIndex) ? "red" : null) }}
                            >
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            
        </div>

    );
}

export default Game;