import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRep: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRep.create(createUserDto);
    return await this.userRep.save(user);
  }

  async findAll() {
    return await this.userRep.find();
  }

  async findOne(id: number) {
    return await this.userRep.findOne({ where: { id: id } });
  }
  async findByusername(username: string) {
    return await this.userRep.findOne({ where: { username: username } });
  }
}
