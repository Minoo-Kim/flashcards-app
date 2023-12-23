import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDTO } from "./create-user.dto";
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findOne(username: string): Promise<User | undefined>;
    createUser(userDto: CreateUserDTO): Promise<User>;
}
