import {useForm} from "react-hook-form";
import {FormValidator} from "../validators/form.validator";
import {joiResolver} from "@hookform/resolvers/joi";
import axios from "axios";
import {TokenPair} from "../interfaces/token.interface";
import React, {FC} from "react";

type PropsType = {setAccessToken: React.Dispatch<React.SetStateAction<string>>}

export const LoginComponent: FC<PropsType> = ({setAccessToken}) => {
    const {handleSubmit, register, formState: {isValid}} = useForm({
        mode: "all",
        resolver: joiResolver(FormValidator.checkForm)
    })

    return <form onSubmit={handleSubmit(async (formData) => {
        const {data} = await axios.post("/api/auth/sign-in", formData);
        const tokens: TokenPair = data.tokens;
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        setAccessToken(tokens.accessToken);
    })}>
        <input type="text" {...register("email")}></input>
        <input type="password" {...register("password")}></input>

        <button disabled={!isValid}>Send</button>
    </form>
}