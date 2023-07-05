import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const Header = ({text}) => <h1>{text}</h1>
const Text = ({text}) => <p>{text}</p>



const Feedback = ({buttonConfig}) => {
  return (
  <>
    <Header text="Give Feedback"/>
    <Button handleClick={buttonConfig.good.handleClick} text={buttonConfig.good.text}/>
    <Button handleClick={buttonConfig.neutral.handleClick} text={buttonConfig.neutral.text}/>
    <Button handleClick={buttonConfig.bad.handleClick} text={buttonConfig.bad.text}/>
  </>)
}

const StatisticsTableRow = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );
};

const StatisticsTable = ({ tableData }) => {
  return (
    <table>
      <tbody>
        {tableData.map((tableDataRow, i) => (
          <StatisticsTableRow
            key={`row${i}`} // Use a unique key for the StatisticsTableRow component
            label={tableDataRow["label"]}
            value={tableDataRow["value"]}
          />
        ))}
      </tbody>
    </table>
  );
};

const Statistics = ({feedBackStates}) => {
  const total = feedBackStates.bad + feedBackStates.neutral + feedBackStates.good
  const score = -feedBackStates.bad + feedBackStates.good

  const tableData = [
    {
      "label" : "good",
      "value" : String(feedBackStates.good)
    },
    {
      "label" : "neutral",
      "value" : String(feedBackStates.neutral)
    },
    {
      "label" : "bad",
      "value" : String(feedBackStates.bad)
    },
    {
      "label" : "all",
      "value" : String(total)
    },
    {
      "label" : "average",
      "value" : String(score / total)
    },
    {
      "label" : "positive",
      "value" : String(feedBackStates.good / total * 100).concat(" %")
    }
  ]

  if (total > 0) {
    return (
      <>
        <Header text="statistics"/>
        <Text text={"good ".concat(String(feedBackStates.good))}/>
        <Text text={"neutral ".concat(String(feedBackStates.neutral))}/>
        <Text text={"bad ".concat(String(feedBackStates.bad))}/>
        <Text text={"all ".concat(String(total))}/>
        <Text text={"average ".concat(String(score / total))}/>
        <Text text={"positive ".concat(String(feedBackStates.good / total * 100)).concat(" %")}/>
        <StatisticsTable tableData={tableData} />
      </>
    ) 
  }
  return <Text text="No feedback has been given yet"/>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const buttonConfig = {
    "good": {
      "text" : "good",
      "handleClick" : () => setGood(good + 1)
    },
    "neutral": {
      "text" : "neutral",
      "handleClick" : () => setNeutral(neutral + 1)
    },
    "bad": {
      "text" : "bad",
      "handleClick" : () => setBad(bad + 1)
    }    
  }

  const feedBackStates = {
    "good" : good,
    "neutral" : neutral,
    "bad" : bad
  }

  console.log(feedBackStates.good)

  return (
    <div>
      <Feedback buttonConfig={buttonConfig} />
      <Statistics feedBackStates={feedBackStates} />
    </div>
  )
}

export default App