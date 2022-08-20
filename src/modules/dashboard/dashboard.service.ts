import checkIsBase64 from 'src/utils/checkIsBase64';
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
    const userPosts = await this.propertiesModel.find({
      'user.id': userId,
    });

    return { data: userPosts };
  }

  async updateUserPost(postId: string, updateDashboardDto: UpdateDashboardDto) {
    const filter = { _id: postId };

    const bodyImages = updateDashboardDto.images.map(image => image);

    const { images } = await this.propertiesModel.findOne({
      _id: postId,
    });

    images.forEach(async image => {
      if (!checkIsBase64(image) && !bodyImages.includes(image)) {
        await this.deletePostItem(image);
      }
    });

    await Promise.all(
      updateDashboardDto.images.map(async (image, index) => {
        if (checkIsBase64(image)) {
          const path = saveFile(image);
          return await this.propertiesModel.updateOne(filter, {
            $push: { images: path },
          });
        } else {
          return;
        }
      }),
    );

    // Updates everything but images
    delete updateDashboardDto.images;

    await this.propertiesModel.updateOne(filter, {
      ...updateDashboardDto,
    });

    return `This action updates a #${postId} dashboard`;
  }

  async removePost(postId: string) {
    const post = await this.propertiesModel.findOne({ _id: postId });

    post.images
      .filter(el => el !== null)
      .forEach((i: string) => {
        deleteFile(i);
      });

    await this.propertiesModel.findByIdAndDelete(postId);

    return `This action removes a #${postId} dashboard`;
  }

  async deletePostItem(image: string) {
    await this.propertiesModel.updateOne({ $pull: { images: image } });
    deleteFile(image);
  }
}
