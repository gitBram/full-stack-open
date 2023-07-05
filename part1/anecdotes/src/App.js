import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const Text = ({text}) => <p>{text}</p>

const VotesDisplay = ({numberOfVotes}) => <Text text={`has ${numberOfVotes} votes`} />

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const refreshAnecdote = () => {
    const index = Math.floor(Math.random() * anecdotes.length);
    setSelected(index)
  }
  const addVote = (index) => () => {
    let copy = [... votes]
    console.log(index)
    copy[index] = copy[index] + 1
    console.log(copy)
    setVotes(copy)
  }
  console.log("The selected item is ", selected)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Text text={anecdotes[selected]} />
      <VotesDisplay numberOfVotes={votes[selected]}/>
      <Button handleClick={addVote(selected)} text={"vote"}/>
      <Button handleClick={refreshAnecdote} text={"nextAnecdote"}/>
      <h1>Anecdote with most votes</h1>
      <Text text={anecdotes[votes.map.call(votes, (x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1]]} />
    </div>
  )
}

export default App