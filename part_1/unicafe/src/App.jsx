import { useState } from 'react'


const Button = (props) => {
  return(
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}{props.text === 'Positive' ? '%' : ''}</td>
    </tr>
  )
}

const Statistics = (props) => {
  return(
    <tbody>
      <StatisticLine text='Good' value={props.good}/>
      <StatisticLine text='Neutral' value={props.neutral}/>
      <StatisticLine text='Bad' value={props.bad}/>
      <StatisticLine text='All' value={props.all}/>
      <StatisticLine text='Average' value={props.average}/>
      <StatisticLine text='Positive' value={props.positive * 100}/>
    </tbody>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  let newAll, newAverage, newPositive

  const incrementCount = (type) => {
    if (type === 'good') {
      newAll = all + 1
      newAverage = (average * all + 1) / newAll
      newPositive = (positive * all + 1) / newAll
      setGood(good + 1)
      setAll(newAll)
      setAverage(newAverage)
      setPositive(newPositive)
    } else if (type === 'bad') {
      newAll = all + 1
      newAverage = (average * all - 1) / newAll
      newPositive = (positive * all + 0) / newAll
      setBad(bad + 1)
      setAll(newAll)
      setAverage(newAverage)
      setPositive(newPositive)
    } else {
      newAll = all + 1
      newAverage = (average * all + 0) / newAll
      newPositive = (positive * all + 0) / newAll
      setNeutral(neutral + 1)
      setAll(newAll)
      setAverage(newAverage)
      setPositive(newPositive)
    }
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => incrementCount('good')} text='Good'/>
      <Button onClick={() => incrementCount('neutral')} text='Neutral'/>
      <Button onClick={() => incrementCount('bad')} text='Bad'/>
      <h1>Statistics</h1>
      {all === 0 ? (<p>No Feedback Given Yet</p>) : ( 
        <table>
          <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
        </table>
      )}
    </div>
  )
}

export default App