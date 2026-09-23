import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity.js';
import { UserDto } from './DTO/user.dto.js';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private jwtService: JwtService) {}

    async createUser(user: UserDto) {
        const SaltsOrRounds = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(user.password, SaltsOrRounds);
        user.password = hashedPassword;
        const newUser = this.userRepository.create(user);
        return await this.userRepository.save(newUser);
    }

    async loginUser(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        // JWT generation logic would go here.
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
