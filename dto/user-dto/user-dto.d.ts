declare class LoginField {
    token: string;
    password: string;
    secret: string;
}
declare class RegisterField {
    plat_number: string;
    phone_number: string;
    name: string;
    motor: string;
    year_production: number;
    address: string;
    password: string;
    confirmation: string;
}
declare class ChangePasswordField {
    plat_number: string;
    old_password: string;
    password: string;
    confirmation: string;
}
export { LoginField, RegisterField, ChangePasswordField };
