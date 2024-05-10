const Course = ({course}) => {
    return (
        <div>
            <Header course = {course}/>
            <Content course = {course.parts} />
            <Total course = {course} />
        </div>
    )
}

const Header = ({course}) => {
    return (
        <div>
            <h1>
                {course.name}
            </h1>
        </div>
    )
}

const Content = ({course}) => {
    return(
        <div>
            {course.map(each => {
                return <Part key={each.id} part={each} />
            })}
        </div>
    )
}

const Part = (props) => {
    return(
        <div>
            <p>{props.part.name} {props.part.exercises}</p>
        </div>
    )
}



const Total = ({course}) => {
    const total = course.parts.reduce((id, accum) => id + accum.exercises, 0)
    return(
        <div>
            <h3>Total number of exercises {total}</h3>
        </div>
    )
}

export default Course