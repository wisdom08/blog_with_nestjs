import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('blog')
@ApiTags('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getBlogs() {
    return await this.blogService.getBlogs();
  }

  @Get(':id')
  async getBlog(@Param('id') id: string) {
    return await this.blogService.getBlog(id);
  }

  @Delete(':id')
  async deleteABlog(@Param('id') id: string) {
    return await this.blogService.deleteABlog(id);
  }
  // todo 전체삭제
  @Patch(':id')
  async updateBlog(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return await this.blogService.updateBlog(id, updateBlogDto);
  }

  @Post()
  async createBlog(@Body() blog: CreateBlogDto) {
    return await this.blogService.createBlog(blog.title, blog.desc);
  }
}
