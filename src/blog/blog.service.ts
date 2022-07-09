import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async getBlogs() {
    const blogs = await this.blogRepository.find();
    return blogs;
  }

  async getBlog(id: string) {
    const blog = await this.blogRepository.findBy({ id });
    if (!blog) {
      throw new HttpException('blog not found', HttpStatus.NOT_FOUND);
    }
    return blog;
  }

  async deleteABlog(id: string) {
    const deleted = await this.blogRepository.delete({ id });
    if (!deleted.affected) {
      throw new HttpException('blog not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'deleted' };
  }

  async createBlog(title: string, desc: string) {
    const newBlog = await this.blogRepository.create({ title, desc });
    await this.blogRepository.save(newBlog);
    return newBlog;
  }

  async updateBlog(id: string, updateBlogDto: UpdateBlogDto) {
    await this.blogRepository.update(id, updateBlogDto);
    const updatedBlog = await this.blogRepository.findBy({ id });
    if (!updatedBlog) {
      throw new HttpException('blog not found', HttpStatus.NOT_FOUND);
    }
    return updatedBlog;
  }
}
