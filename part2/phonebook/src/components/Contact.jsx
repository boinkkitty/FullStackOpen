const Contact = ({name, number, toggleDelete, id}) => {
    return(
        <div>
            <li>
                {name} {number}
                <button onClick={() => toggleDelete(id)}>delete</button>
            </li>
        </div>
    )
}

export default Contact