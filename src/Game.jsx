import { React, useCallback, useEffect, useRef, useState } from "react";

const BOARD_SIZE = 20;

function Game() {
    const [isGameOn, setGameOn] = useState(1);
    const [fruit, setFruit] = useState(217);
    const [snake, setSnake] = useState([207]);
    const [direction, setDirection] = useState("RIGHT");
    const boardRef = useRef(null);
    const board = new Array(BOARD_SIZE).fill(null).map(() => (new Array(BOARD_SIZE).fill(0)));

    useEffect(() => {
        if (boardRef.current) {
            boardRef.current.children[Math.floor(fruit / BOARD_SIZE)].children[fruit % BOARD_SIZE].style.backgroundColor = "red";
        }
    }, [fruit])

    useEffect(() => {
        function handleKeyDown(event) {
            setDirection((prev) => {
                switch (event.key) {
                    case "ArrowUp":
                        return prev !== "DOWN" ? "UP" : prev;
                    case "ArrowDown":
                        return prev !== "UP" ? "DOWN" : prev;
                    case "ArrowLeft":
                        return prev !== "RIGHT" ? "LEFT" : prev;
                    case "ArrowRight":
                        return prev !== "LEFT" ? "RIGHT" : prev;
                    default:
                        return prev;
                }
            });
        }

        window.addEventListener("keydown", handleKeyDown);
        console.log(direction);
        return () => {
            console.log("Cleaning up...");
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []); // The single event listener is there until the component unmounts(is remove from the Virtual DOM)

    const generateFruit = useCallback(() => {
        var pos = Math.floor(Math.random() * 400);
        while (snake.includes(pos)) pos = Math.floor(Math.random() * 400);
        return pos;
    }, [snake])

    const renderSnakeAndFruit = useCallback(() => {
        if (direction === "UP") {
            if ((snake[0] <= (BOARD_SIZE - 1) && snake[0] >= 0) || snake.includes(snake[0] - BOARD_SIZE)) {
                setGameOn(0);
                return;
            } else {
                let newHead = snake[0] - BOARD_SIZE;
                boardRef.current.children[Math.floor(newHead / BOARD_SIZE)].children[newHead % BOARD_SIZE].style.backgroundColor = "blue";

                if (newHead === fruit) {
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
                setGameOn(0);
                return;
            } else {
                let newHead = snake[0] + BOARD_SIZE;
                boardRef.current.children[Math.floor(newHead / BOARD_SIZE)].children[newHead % BOARD_SIZE].style.backgroundColor = "blue";

                if (newHead === fruit) {
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
                setGameOn(0);
                return;
            } else {
                let newHead = snake[0] + 1;
                boardRef.current.children[Math.floor(newHead / BOARD_SIZE)].children[newHead % BOARD_SIZE].style.backgroundColor = "blue";

                if (newHead === fruit) {
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
                setGameOn(0);
                return;
            } else {
                let newHead = snake[0] - 1;
                boardRef.current.children[Math.floor(newHead / BOARD_SIZE)].children[newHead % BOARD_SIZE].style.backgroundColor = "blue";

                if (newHead === fruit) {
                    setSnake((prev) => [newHead, ...prev]);
                    setFruit(() => generateFruit());
                } else {
                    let tail = snake.at(-1);
                    boardRef.current.children[Math.floor(tail / BOARD_SIZE)].children[tail % BOARD_SIZE].style.backgroundColor = null;
                    setSnake((prev) => [newHead, ...prev.slice(0, -1)]);
                }
            }
        }
    }, [snake, fruit, direction, generateFruit]);


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

    function returnColor(row, col) {
        if (row * BOARD_SIZE + col === 217) return "red";
        else if (row * BOARD_SIZE + col === 207) return "blue";
        return null;
    }

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

        </div>

    );
}

export default Game;