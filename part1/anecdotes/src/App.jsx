import { useState } from 'react'

const Title = ({text}) => {
    return(
        <div>
            <h1>{text}</h1>
        </div>
    )
}

const Anecdotes = ({anecdotes, votes}) => {
    return(
        <div>
            <div>{anecdotes}</div>
            <div>has {votes} votes</div>
        </div>
    )
}

const Button = ({text, handleClick}) => {
    return(
        <div>
            <button onClick = {handleClick}>{text}</button>
        </div>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]
    const [selected, setSelected] = useState(0)
    const [voted, setVote] = useState(Array(anecdotes.length).fill(0))

    const nextAnecdote = () => {
        setSelected(Math.floor(Math.random() * anecdotes.length))
    }

    const toVote = () => {
        const newVote = [...voted]
        newVote[selected] += 1
        setVote(newVote)
    }

    const max = Math.max(...voted)
    const maxIndex = voted.indexOf(max)

    return (
        <div>
            <Title text="Anecdote of the day"/>
            <Anecdotes anecdotes={anecdotes[selected]} votes={voted[selected]}/>
            <Button handleClick={nextAnecdote} text="next anecdote"/>
            <Button handleClick={toVote} text="vote"/>
            <Title text="Anecdote with most votes"/>
            <Anecdotes anecdotes={anecdotes[maxIndex]} votes={max}/>
        </div>
    )
}

export default App