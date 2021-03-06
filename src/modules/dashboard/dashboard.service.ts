import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IDashboard } from './interfaces/dashboard.interface';
import { IUser } from '../authentication/interfaces/user.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import saveFile from 'src/utils/saveFile';
import deleteFile from 'src/utils/deleteFile';

@Injectable()
export class DashboardService {
  constructor(
    @Inject('PROPERTIES_MODEL')
    private propertiesModel: Model<IDashboard>,
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
  ) {}

  async createPost(createPostDto: CreatePostDto, userId: string) {
    const userData = await this.userModel.findOne({ _id: userId });

    const imagesPath = createPostDto.images.map(image => {
      if (image.length) {
        return saveFile(image);
      }
      return;
    });

    const records = new this.propertiesModel({
      ...createPostDto,
      images: imagesPath,
      user: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
      },
    });
    const save = await records.save();

    return save._id;
  }

  async findAllUserPosts(userId: string) {
    const userPosts = await await this.propertiesModel.find({
      'user.id': userId,
    });

    return { data: userPosts };
  }

  async updateUserPost(postId: string, updateDashboardDto: UpdateDashboardDto) {
    const filter = { _id: postId };

    await this.propertiesModel.updateOne(filter, updateDashboardDto);

    return `This action updates a #${postId} dashboard`;
  }

  async removePost(postId: string) {
    const post = await this.propertiesModel.findOne({ _id: postId });

    post.images
      .filter(el => el !== null)
      .map((i: string) => {
        deleteFile(i);
      });

    await this.propertiesModel.findByIdAndDelete(postId);

    return `This action removes a #${postId} dashboard`;
  }

  async deletePostItem(id: number, image: string) {
    await this.propertiesModel.deleteOne({ $pull: { images: image } });
    deleteFile(image);
  }
}
