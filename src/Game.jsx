import { React, useCallback, useEffect, useRef, useState } from "react";
import Stats from "./Stats";
const BOARD_SIZE = 20;
function Game() {

    const [isGameOn, setGameOn] = useState(0);
    const [fruit, setFruit] = useState(217);
    const [snake, setSnake] = useState([207]);
    const [direction, setDirection] = useState("RIGHT");
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const boardRef = useRef(null);
    const board = new Array(BOARD_SIZE).fill(null).map(() => (new Array(BOARD_SIZE).fill(0)));
    useEffect(() => {
        if (boardRef.current) {
            boardRef.current.children[Math.floor(fruit / BOARD_SIZE)].children[fruit % BOARD_SIZE].style.backgroundColor = "red";
        }
    }, [fruit])

    useEffect(() => {
        if (score > bestScore) setBestScore(score);
    }, [score])

    useEffect(() => {
        if (isGameOn == 1) {
            function handleKeyDown(event) {
                setDirection((prev) => {
                    switch (event.key) {
                        case "ArrowUp":
                        case "w":
                        case "W":
                            return prev !== "DOWN" ? "UP" : prev;

                        case "ArrowDown":
                        case "s":
                        case "S":
                            return prev !== "UP" ? "DOWN" : prev;

                        case "ArrowLeft":
                        case "a":
                        case "A":
                            return prev !== "RIGHT" ? "LEFT" : prev;

                        case "ArrowRight":
                        case "d":
                        case "D":
                            return prev !== "LEFT" ? "RIGHT" : prev;

                        default:
                            return prev;
                    }
                });
                console.log("1");
            }

            window.addEventListener("keydown", handleKeyDown);
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [isGameOn]); // The single event listener is there until the component unmounts(is remove from the Virtual DOM)

    const generateFruit = useCallback(() => {
        var pos = Math.floor(Math.random() * 400);
        while (snake.includes(pos)) pos = Math.floor(Math.random() * 400);
        return pos;
    }, [snake])

    const renderSnakeAndFruit = useCallback(() => {
        if (direction === "UP") {
            if ((snake[0] <= (BOARD_SIZE - 1) && snake[0] >= 0) || snake.includes(snake[0] - BOARD_SIZE)) {
                setGameOn(2);
                return;
            } else {
                let newHead = snake[0] - BOARD_SIZE;
                boardRef.current.children[Math.floor(newHead / BOARD_SIZE)].children[newHead % BOARD_SIZE].style.backgroundColor = "blue";

                if (newHead === fruit) {
                    setScore(score + 1);
                    setSnake((prev) => [newHead, ...prev]);
                    setFruit(() => generateFruit());
                }
                else {
                    let tail = snake.at(-1);
                    boardRef.current.children[Math.floor(tail / BOARD_SIZE)].children[tail % BOARD_SIZE].style.backgroundColor = null;
                    setSnake((prev) => [newHead, ...prev.slice(0, -1)]);
                }
            }
        }

        else if (direction === "DOWN") {
            if ((snake[0] >= 380 && snake[0] <= 399) || snake.includes(snake[0] + BOARD_SIZE)) {
                setGameOn(2);
                return;
            } else {
                let newHead = snake[0] + BOARD_SIZE;
                boardRef.current.children[Math.floor(newHead / BOARD_SIZE)].children[newHead % BOARD_SIZE].style.backgroundColor = "blue";

                if (newHead === fruit) {
                    setScore(score + 1);
                    setSnake((prev) => [newHead, ...prev]);
                    setFruit(() => generateFruit());
                } else {
                    let tail = snake.at(-1);
                    boardRef.current.children[Math.floor(tail / BOARD_SIZE)].children[tail % BOARD_SIZE].style.backgroundColor = null;
                    setSnake((prev) => [newHead, ...prev.slice(0, -1)]);
                }
            }
        }

        else if (direction === "RIGHT") {
            if ((snake[0] + 1) % BOARD_SIZE === 0 || snake.includes(snake[0] + 1)) {
                setGameOn(2);
                return;
            } else {
                let newHead = snake[0] + 1;
                boardRef.current.children[Math.floor(newHead / BOARD_SIZE)].children[newHead % BOARD_SIZE].style.backgroundColor = "blue";

                if (newHead === fruit) {
                    setScore(score + 1);
                    setSnake((prev) => [newHead, ...prev]);
                    setFruit(() => generateFruit());
                }

                else {
                    let tail = snake.at(-1);
                    boardRef.current.children[Math.floor(tail / BOARD_SIZE)].children[tail % BOARD_SIZE].style.backgroundColor = null;
                    setSnake((prev) => [newHead, ...prev.slice(0, -1)]);
                }
            }
        }

        else { // LEFT
            if (snake[0] % BOARD_SIZE === 0 || snake.includes(snake[0] - 1)) {
                setGameOn(2);
                return;
            } else {
                let newHead = snake[0] - 1;
                boardRef.current.children[Math.floor(newHead / BOARD_SIZE)].children[newHead % BOARD_SIZE].style.backgroundColor = "blue";

                if (newHead === fruit) {
                    setScore(score + 1);
                    setSnake((prev) => [newHead, ...prev]);
                    setFruit(() => generateFruit());
                } else {
                    let tail = snake.at(-1);
                    boardRef.current.children[Math.floor(tail / BOARD_SIZE)].children[tail % BOARD_SIZE].style.backgroundColor = null;
                    setSnake((prev) => [newHead, ...prev.slice(0, -1)]);
                }
            }
        }
    }, [snake, fruit, direction, generateFruit, score]);
    function returnColor(row, col) {
        if (row * BOARD_SIZE + col === 217) return "red";
        else if (row * BOARD_SIZE + col === 207) return "blue";
        return null;
    }
    useEffect(() => {
        if (isGameOn === 0) {
            function handleKeyDown(event) {
                if (["ArrowUp", "w", "W", "ArrowDown", "s", "S", "ArrowLeft", "a", "A", "ArrowRight", "d", "D"].includes(event.key)) {
                    setGameOn(1);
                    setDirection((prev) => {
                        switch (event.key) {
                            case "ArrowUp":
                            case "w":
                            case "W":
                                return "UP";

                            case "ArrowDown":
                            case "s":
                            case "S":
                                return "DOWN";

                            case "ArrowLeft":
                            case "a":
                            case "A":
                                return "LEFT";

                            case "ArrowRight":
                            case "d":
                            case "D":
                                return "RIGHT";

                            default:
                                return prev;
                        }
                    });
                    console.log("0");
                }
            }

            window.addEventListener("keydown", handleKeyDown);
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }

        else if ((isGameOn === 2)) {
            function handleKeyDown2(event) {
                if (["ArrowUp", "w", "W", "ArrowDown", "s", "S", "ArrowLeft", "a", "A", "ArrowRight", "d", "D"].includes(event.key)) {
                    setGameOn(1);
                    setFruit(() => {
                        return 217;
                    })

                    setSnake(() => {
                        return [207];
                    })

                    setScore(() => {
                        return 0;
                    })

                    setDirection((prev) => {
                        switch (event.key) {
                            case "ArrowUp":
                            case "w":
                            case "W":
                                return "UP";

                            case "ArrowDown":
                            case "s":
                            case "S":
                                return "DOWN";

                            case "ArrowLeft":
                            case "a":
                            case "A":
                                return "LEFT";

                            case "ArrowRight":
                            case "d":
                            case "D":
                                return "RIGHT";

                            default:
                                return prev;
                        }
                    });

                    if (boardRef) {
                        board.forEach((row, rowIndex) => {
                            row.forEach((col, colIndex) => {
                                boardRef.current.children[rowIndex].children[colIndex].style.backgroundColor = returnColor(rowIndex, colIndex);
                            })
                        })
                    }
                    console.log("2");
                }
            }

            window.addEventListener("keydown", handleKeyDown2);
            return () => {
                window.removeEventListener("keydown", handleKeyDown2);
            };
        }
    }, [isGameOn])

    useEffect(() => {
        if (!isGameOn) return;
        const intervalID = setInterval(() => {
            renderSnakeAndFruit();
        }, 100);

        return () => clearInterval(intervalID);
    }, [isGameOn, renderSnakeAndFruit]);

    // useEffect(() => {
    //     if (boardRef.current) {
    //         console.log(boardRef.current.children[0].children[1]); 
    //     }
    // }, []); 


    return (
        <div className="content">
            <div ref={boardRef} className="board">
                {board.map((row, rowIndex) => {
                    return <div key={rowIndex} className="row">
                        {row.map((col, colIndex) => {
                            return <div
                                key={colIndex}
                                className="cell"
                                style={{ backgroundColor: returnColor(rowIndex, colIndex) }}
                            >
                            </div>
                        })}
                    </div>
                })}
            </div>

            <Stats isGameOn={isGameOn} score={score} bestScore={bestScore} />
        </div>
    );
}
export default Game;