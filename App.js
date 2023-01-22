import React from "react"
import Menu from "./Menu"
import Game from "./Game"


export default function App() {
    // const [started, setStarted] = React.useState(false)
    const [screen, setScreen] = React.useState(<Menu startGame={startGame}/>)
    function startGame() {
        // setStarted(true)
        setScreen(<Game />)
    }

    return (
        <main>
            {screen}
        </main>
    )
}