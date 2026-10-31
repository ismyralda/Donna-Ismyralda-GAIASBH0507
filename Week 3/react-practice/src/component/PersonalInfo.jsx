import './PersonalInfo.css'

function PersonalInfo() {
    const name = "Donna Ismyralda"
    const favLang = "Python"
    const hobbies = ['Drawing', 'Coding', 'Gaming', 'Reading']
    return (
        <div>
            <h1 className="redText">{name}</h1>
            <p>My favorite programming language is {favLang} <br/> because they are easy to read!</p>
            <ul>
                {hobbies.map((hobby, index) => (
                    <li key={index}>{hobby}</li>
                ))}
            </ul>
            <p>Current date and time: {new Date().toLocaleTimeString()}</p>
            <img src="https://media.tenor.com/eH4de9S1c2oAAAAM/shh.gif" alt="shh" />
        </div>
    )
}

export default PersonalInfo