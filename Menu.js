import React from "react"
           
export default function Menu(props) {
    return ( 
            <div className="box">
                <div className="blue-blob"></div>
                <div className="yellow-blob"></div>
                <h1 className="title">Quizzical</h1>
                <div className="menu-button" onClick={props.startGame}>Start Quiz</div>
            </div>
    )
}