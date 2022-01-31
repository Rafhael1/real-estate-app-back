import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../../guards/validate.guard';
import { DashboardService } from './dashboard.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('all-user-posts')
  findAll() {
    return this.dashboardService.findAllUserPosts();
  }

  @Post('create-real-estate')
  @UseInterceptors(FilesInterceptor('images', 20))
  createPost(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() createPostDto: CreatePostDto,
  ) {
    console.log(images);
    return this.dashboardService.createPost(createPostDto, images);
  }

  @Patch('edit-user-post/:postId')
  updateUserPost(
    @Param('postId') id: string,
    @Body() updateDashboardDto: UpdateDashboardDto,
  ) {
    return this.dashboardService.updateUserPost(+id, updateDashboardDto);
  }

  @Delete('delete-user-post/:postId')
  removePost(@Param('postId') id: string) {
    return this.dashboardService.removePost(+id);
  }
}
