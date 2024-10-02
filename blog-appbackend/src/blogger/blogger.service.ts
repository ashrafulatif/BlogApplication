import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { Blogger } from './entities/blogger.entity';
import { CreateBloggerDto } from './dto/create-blogger.dto';
import { UpdateBloggerDto } from './dto/update-blogger.dto';

@Injectable()
export class BloggerService {
  constructor(
    @InjectRepository(Blogger)
    private readonly blogRepository: Repository<Blogger>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createBlogDto: CreateBloggerDto, userId: number) {
    console.log('User ID in Service:', userId);
    const author = await this.userRepository.findOne({ where: { id: userId } });

    //check usr role
    if (!author || author.role !== 'blogger') {
      throw new NotFoundException(
        `User with id ${userId} not found or not authorized to create a blog.`,
      );
    }

    const blog = this.blogRepository.create({
      ...createBlogDto,
      author, // Set the author to the found user
    });
    return this.blogRepository.save(blog);
  }

  async findAll(userId: number) {
    return this.blogRepository.find({ where: { author: { id: userId } } });
  }

  async findOne(id: number) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
    return blog;
  }

  async update(id: number, updateBlogDto: UpdateBloggerDto) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
    Object.assign(blog, updateBlogDto);
    return this.blogRepository.save(blog);
  }

  async remove(id: number) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
    await this.blogRepository.remove(blog);
    return { message: `Blog with id ${id} has been removed` };
  }
}
