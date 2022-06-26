import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Req,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../../guards/validate.guard';
import { DashboardService } from './dashboard.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { storage } from '../../utils/multer.storage';

@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post('create-real-estate')
  createPost(@Body() createPostDto: CreatePostDto, @Req() request) {
    return this.dashboardService.createPost(createPostDto, request.user);
  }

  @Get('all-user-posts')
  findAll(@Req() request) {
    return this.dashboardService.findAllUserPosts(request.user);
  }

  @Put('edit-user-post/:postId')
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

  @Delete('delete-post-item/:id')
  deleteImageById(@Param('id') id: number, @Query('image') image: string) {
    return this.dashboardService.deletePostItem(id, image);
  }
}
