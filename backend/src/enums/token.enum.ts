import config from "../configs/config";

const AUTH_TOKEN_ENUM = {
    ACCESS: "access",
    REFRESH: "refresh"
} as const;

export type AuthTokens = (typeof AUTH_TOKEN_ENUM)[keyof typeof AUTH_TOKEN_ENUM];

const ACTION_TOKEN_ENUM = {
    ACTIVATION: "activation",
    RECOVERY: "recovery"
} as const;

export type ActionTokens = (typeof ACTION_TOKEN_ENUM)[keyof typeof ACTION_TOKEN_ENUM];

export const getSecretByTokenType = (tokenType: AuthTokens | ActionTokens) => {
    switch (tokenType) {
        case AUTH_TOKEN_ENUM.ACCESS:
            return config.JWT_ACCESS_SECRET;
        case AUTH_TOKEN_ENUM.REFRESH:
            return config.JWT_REFRESH_SECRET;
        case ACTION_TOKEN_ENUM.ACTIVATION:
            return config.JWT_ACTIVATION_SECRET;
        case ACTION_TOKEN_ENUM.RECOVERY:
            return config.JWT_RECOVERY_SECRET;
    }
};

export const getLifetimeByTokenType = (tokenType: AuthTokens | ActionTokens) => {
    switch (tokenType) {
        case AUTH_TOKEN_ENUM.ACCESS:
            return config.JWT_ACCESS_LIFETIME;
        case AUTH_TOKEN_ENUM.REFRESH:
            return config.JWT_REFRESH_LIFETIME;
        case ACTION_TOKEN_ENUM.ACTIVATION:
            return config.JWT_ACTIVATION_LIFETIME;
        case ACTION_TOKEN_ENUM.RECOVERY:
            return config.JWT_RECOVERY_LIFETIME;
    }
};
