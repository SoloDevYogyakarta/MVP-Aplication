import { UserService } from '../services/user/user.service';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(username: string, password: string): Promise<any>;
}
export {};
