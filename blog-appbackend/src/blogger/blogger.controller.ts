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
export class BloggerController {
  constructor(private readonly bloggerService: BloggerService) {}

  @UseGuards(JwtGuard)
  @Post('create-blog')
  create(@Body() createBlogDto: CreateBloggerDto, @Request() req) {
    console.log('Request User ID:', req.user.id); // Log the user ID
    return this.bloggerService.create(createBlogDto, req.user.id); // Pass user ID from request
  }
  // Fetch blogs for the logged-in user
  @UseGuards(JwtGuard)
  @Get('findAllBlog')
  findAll(@Request() req) {
    return this.bloggerService.findAll(req.user.id);
  }

  @Get('findAllPublicBlog')
  findAllPublicBlog() {
    return this.bloggerService.findAllPublicBlog();
  }

  @UseGuards(JwtGuard)
  @Get('findBlogByID/:id')
  findOne(@Param('id') id: string) {
    return this.bloggerService.findOne(+id);
  }
  @UseGuards(JwtGuard)
  @Patch('update-blog/:id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBloggerDto) {
    return this.bloggerService.update(+id, updateBlogDto);
  }
  @UseGuards(JwtGuard)
  @Delete('remove-blog/:id')
  remove(@Param('id') id: string) {
    return this.bloggerService.remove(+id);
  }
}
