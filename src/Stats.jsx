import React from "react";

function Stats(props) {
    return (
        <div className="stats">
            {props.isGameOn === 0
                ? "Arrows/WASD To Play"
                : (props.isGameOn === 1
                    ? <div>
                        Current Score : {props.score} <br />
                        Best Score : {props.bestScore} <br />
                    </div>

                    : <div>
                        Game over <br />Arrows/WASD To Play<br /> <br />
                        Round's Score : {props.score} <br />
                        Best Score : {props.bestScore} <br />
                    </div>
                )}
        </div>
    );
}

export default Stats;