import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    // Get all users with the role of blogger
    return this.userRepository.find({ where: { role: 'blogger' } });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id, role: 'blogger' }, //match the role
    });

    if (!user) {
      throw new NotFoundException(`Blogger with id ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    Object.assign(user, updateAdminDto);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepository.remove(user);
    return { message: `User with id ${id} has been removed` };
  }

  async toggleActiveStatus(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    user.isActive = !user.isActive; // Toggle the isActive status
    await this.userRepository.save(user);
    return user;
  }
}
