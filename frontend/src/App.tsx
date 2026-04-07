import React, {useEffect, useState} from 'react';
import {LoginComponent} from "./components/login.component";
import {PizzaListComponent} from "./components/pizza-list.component";
import axios from "axios";

function App() {
    localStorage.setItem("accessToken", "");

    const [accessToken, setAccessToken] = useState<string>(localStorage.getItem("accessToken") ?? "");
    const [tokenValidity, setTokenValidity] = useState<boolean>(false)

    useEffect(() => {
        if (!accessToken) {
            setTokenValidity(false);
            return;
        }

        axios.get('/api/auth/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(() => {
            setTokenValidity(true);
        }).catch(() => {
            setTokenValidity(false)
        });
    }, [accessToken]);

    return (
        <div>
            {tokenValidity ? <PizzaListComponent /> : <LoginComponent setAccessToken={setAccessToken} />}
        </div>
    );
}

export default App;
