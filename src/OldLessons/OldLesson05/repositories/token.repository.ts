import { Auth } from "../interfaces/auth.interface";
import { Token } from "../interfaces/token.interface";
import { TokenModel } from "../models/token.model";

class TokenRepository {
    public create(dto: Auth) {
        return TokenModel.create(dto);
    }

    public findByParams(params: Partial<Token>) {
        return TokenModel.findOne(params);
    }
}

export const tokenRepository = new TokenRepository();
