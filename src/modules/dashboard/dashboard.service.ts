import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Injectable()
export class DashboardService {
  createPost(createPostDto: CreatePostDto, images: Array<Express.Multer.File>) {
    return 'This action adds a new dashboard';
  }

  findAllUserPosts() {
    return `This action returns all dashboard`;
  }

  updateUserPost(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  removePost(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
