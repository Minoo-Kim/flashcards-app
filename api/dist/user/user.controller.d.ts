import { UserService } from "./user.service";
import { CreateUserDTO } from "./create-user.dto";
import { AuthService } from "src/auth/auth.service";
import { UserResponseDTO } from "./user-response.dto";
import { UserLoginDTO } from "./user-login.dto";
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    register(userDto: CreateUserDTO): Promise<UserResponseDTO>;
    login(userDto: UserLoginDTO): Promise<{
        access_token: string;
    }>;
}
