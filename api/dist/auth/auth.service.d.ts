import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserResponseDTO } from "../user/user-response.dto";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<UserResponseDTO | null>;
    login(user: UserResponseDTO): Promise<{
        access_token: string;
    }>;
}
