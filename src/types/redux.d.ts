interface ReduxState {
    user: {
        data: {
            status: boolean,
            user?: {
                username: string;
                role: string;
                first_name: string;
                last_name?: string;
            }
        }
    }
}

export {
    ReduxState
}