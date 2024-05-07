import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
    const sum = good + neutral + bad
    if(sum === 0) {
        return(
            <div>
                <p>No feedback given</p>
            </div>
        )
    }


    return(
        <div>
            <table>
                <tbody>
                    <StatisticLine text = "good" value = {good} />
                    <StatisticLine text = "neutral" value = {neutral} />
                    <StatisticLine text = "bad" value = {bad} />
                    <StatisticLine text = "all" value = {sum} />
                    <StatisticLine text = "average" value = {(good - bad) / sum} />
                    <StatisticLine text = "positive" value = {`${parseFloat(good / sum) * 100} %`} />
                </tbody>
            </table>
        </div>
    )
}

const StatisticLine =({text,value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Button = ({click, text}) => {
    return (
        <button onClick={click}>
            {text}
        </button>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const incrGood = () => {
        setGood(good + 1)
    }

    const incrNeutral = () => {
        setNeutral(neutral + 1)
    }

    const incrBad = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button text = "good" click = {incrGood}/>
            <Button text = "neutral" click = {incrNeutral}/>
            <Button text = "bad" click = {incrBad}/>
            <h1>statistics</h1>
            <Statistics good = {good} neutral = {neutral} bad = {bad}/>
        </div>
    )
}

export default App