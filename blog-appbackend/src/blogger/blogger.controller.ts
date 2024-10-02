import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BloggerService } from './blogger.service';
import { CreateBloggerDto } from './dto/create-blogger.dto';
import { UpdateBloggerDto } from './dto/update-blogger.dto';
import { JwtGuard } from 'src/auth/Guard/jwt-auth.guard';

@Controller('blogger')
@UseGuards(JwtGuard)
export class BloggerController {
  constructor(private readonly bloggerService: BloggerService) {}

  @Post('create-blog')
  create(@Body() createBlogDto: CreateBloggerDto, @Request() req) {
    console.log('Request User ID:', req.user.id); // Log the user ID
    return this.bloggerService.create(createBlogDto, req.user.id); // Pass user ID from request
  }
  // Fetch blogs for the logged-in user
  @Get('findAllBlog')
  findAll(@Request() req) {
    return this.bloggerService.findAll(req.user.id);
  }

  @Get('findBlogByID/:id')
  findOne(@Param('id') id: string) {
    return this.bloggerService.findOne(+id);
  }

  @Patch('update-blog/:id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBloggerDto) {
    return this.bloggerService.update(+id, updateBlogDto);
  }

  @Delete('remove-blog/:id')
  remove(@Param('id') id: string) {
    return this.bloggerService.remove(+id);
  }
}
