import { Module } from '@nestjs/common';
import { BloggerService } from './blogger.service';
import { BloggerController } from './blogger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Blogger } from './entities/blogger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blogger, User])],
  controllers: [BloggerController],
  providers: [BloggerService],
})
export class BloggerModule {}
