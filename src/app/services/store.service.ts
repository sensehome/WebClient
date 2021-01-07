const KEYS = {
    BEARER: "bearer"
}

export const StoreService = {
    setBearerToken: (token: string): void => {
        localStorage.setItem(KEYS.BEARER, token)
    },

    getBearerToken: (): string => {
        let token = localStorage.getItem(KEYS.BEARER)
        if (!!token) {
            return token
        }
        return ""
    }
}