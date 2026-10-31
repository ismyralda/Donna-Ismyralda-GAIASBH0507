import { useParams } from 'react-router-dom';

const users = {
    1: { name: "Redza", age: 24, status: "Married" },
    2: { name: "Ismyralda", age: 28, status: "Married" },
    3: { name: "Dila", age: 38, status: "Married" },
    4: { name: "Wan", age: 24, status: "Taken" },
    5: { name: "Catherine", age: 61, status: "" },
};

function UserProfile() {
    const { id } = useParams();
    const user = users[id];

    if (!user) return <p> User not found </p>;

    return(
        <> {/* This empty bracket is React Fragment */}
            <h2> User Profile</h2>
            <p> Name: {user.name}</p>
            <p> Age: {user.age}</p>
            <p> Status: {user.status}</p>
        </>
    )
}

export default UserProfile