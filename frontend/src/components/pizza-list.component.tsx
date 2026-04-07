import {useEffect, useState} from "react";
import axios from "axios";
import {Pizza} from "../interfaces/pizza.interface";

export const PizzaListComponent = () => {
    const [pizzaList, setPizzaList] = useState<Pizza[]>([])

    useEffect(() => {
        axios.get("api/pizza").then(({data}) => {
            setPizzaList(data)
        })
    }, []);

    return <div>
        <h1>Pizzas:</h1>
        {pizzaList.map((value) => <div key={value._id}>{JSON.stringify(value)}</div>)}
    </div>
}