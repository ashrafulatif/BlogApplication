import { IsNotEmpty } from 'class-validator';

export class CreateBloggerDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
