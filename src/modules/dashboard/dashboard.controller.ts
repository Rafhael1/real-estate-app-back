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
  Req,
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

  @Post('create-real-estate')
  @UseInterceptors(FilesInterceptor('images', 20))
  createPost(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.dashboardService.createPost(createPostDto, images);
  }

  @Get('all-user-posts')
  findAll(@Req() request) {
    return this.dashboardService.findAllUserPosts(request.user);
  }

  @Patch('edit-user-post/:postId')
  updateUserPost(
    @Param('postId') postId: string,
    @Body() updateDashboardDto: UpdateDashboardDto,
  ) {
    return this.dashboardService.updateUserPost(postId, updateDashboardDto);
  }

  @Delete('delete-user-post/:postId')
  removePost(@Param('postId') postId: string) {
    return this.dashboardService.removePost(postId);
  }
}
