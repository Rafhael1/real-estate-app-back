import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
	UseGuards,
	Req,
	Query,
} from '@nestjs/common';
import { AuthGuard } from '../../guards/validate.guard';
import { DashboardService } from './dashboard.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

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
}
