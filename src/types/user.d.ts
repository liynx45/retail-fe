interface FetchUserType {
    id: string;
    email: string;
    username: string;
    user_info: {
        add_at: string;
        first_name: string;
        last_name: string;
    },
    role: "member" | "admin";
    user_profile?: string
}

interface UserType {
    email: string;
    username: string;
    login_at: string;
    first_name: string;
    last_name: string;
    role: "member" | "admin";
    user_profile?: string
}

export {
    FetchUserType,
    UserType
}