const Header = (props) => <h1> { props.text } </h1>
const Content = (props) => {
    const parts = props.parts
    console.log(parts)
    return (
    <ul>
        { parts.map((part) => 
            <li key={part.id}>{part.name} {part.exercises}</li>
        )} 
    </ul>
    )
}
const Total = (props) => <p><b>total of {props.parts.reduce((s, p)=>s+p.exercises,0)} exercises</b></p>
const Course = (props) => {
    const course = props.course
    return (
        <div>
            <Header text={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
  }
  
  export default Course