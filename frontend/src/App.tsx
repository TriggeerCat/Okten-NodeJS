import React, {useEffect, useState} from 'react';
import {User} from "./interfaces/user.interface";
import axios from "axios";

function App() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios.get("/api/users").then(({data}) => setUsers(data));
    }, []);

    console.log(users);

    return (
        <div>
            <h1>Users:</h1>
            {users.map((value) => <div key={value._id}>{JSON.stringify(value)}</div>)}
        </div>
    );
}

export default App;
