import Contact from "./Contact.jsx"

const Person = ({list, deleteFn}) => {
    return(
        <div>
            <ul>
                {list.map(each =>
                    <Contact key = {each.name} name = {each.name} number = {each.number} toggleDelete={deleteFn} id={each.id}/>
                )}
            </ul>
        </div>
    )
}

export default Person