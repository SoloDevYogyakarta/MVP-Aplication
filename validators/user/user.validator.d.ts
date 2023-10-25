export declare class LoginField {
    token: string;
    password: string;
}
export declare class RegisterField {
    username?: string;
    email?: string;
    password: string;
    confirmation: string;
    http?: boolean;
}
export declare class ResetField {
    email: string;
}
export declare class UpdateRoleField {
    public_id: string;
    role: string;
}
