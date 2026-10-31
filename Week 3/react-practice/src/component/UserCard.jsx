function UserCard ({name = "Anonymous", age = 0, isActive = false}) {
    return (
        <div>
            <h1>{name}</h1>
            <p>Age: {age}</p>
            <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
        </div>
    )
}

export default UserCard