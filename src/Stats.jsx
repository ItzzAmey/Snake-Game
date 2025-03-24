import React from "react";

function Stats(props) {
    return (
        <div className="stats">
            {props.isGameOn === 0
                ? "Press Arrows/WASD To Continue"
                : (props.isGameOn === 1
                    ? <div>
                        Current Score : {props.score} <br />
                        Best Score : {props.bestScore} <br />
                    </div>

                    : <div>
                        Game Over <br />
                        Round's Score : {props.score} <br />
                        Best Score : {props.bestScore} <br />
                        Press Arrows/WASD To Play Again
                    </div>
                )}
        </div>
    );
}

export default Stats;