import React, { useState } from "react";

function Head(props) {
    const [selectedColor, setSelectedColor] = useState("Blue"); // Default color

    function handleSnakeColorChange(event) {
        const color = event.target.value;
        setSelectedColor(color);  
        props.handleSnakeColorChange(color);  
    }

    return (
        <div className="head">
            <div>Snake Game</div>
            <div className="modes">
                <div className = "dropdown_div_snake">
                    <select id="color_snake_dropdown" value={selectedColor}  onChange={handleSnakeColorChange}>
                        <option value="Blue">Blue</option>
                        <option value="Cyan">Cyan</option>
                        <option value="Yellow">Yellow</option>
                    </select>
                    <span class="hover_div_snake">Snake Color</span>
                </div>
            </div>
        </div>
    );
}

export default Head;