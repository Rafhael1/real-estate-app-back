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

    Promise.all(
      createPostDto.images.map(async image => {
        saveFile(image);
      }),
    );

    // const filePath = `${__dirname}/../../../../real-estate-app-uploads/${createPostDto.image}`;

    const records = new this.propertiesModel({
      ...createPostDto,
      user: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
      },
    });
    const save = await records.save();

    return save._id;
  }

  // async addImagesToPost(postId: string, images: Array<Express.Multer.File>) {
  //   const filter = { _id: postId };

  //   const imagesPaths = images?.map(file => {
  //     const filename = new Date().getTime() + file.originalname;
  //     return filename;
  //   });

  //   const update = { $push: { images: imagesPaths } };
  //   await this.propertiesModel.updateOne(filter, update);

  //   return `Post of id ${postId} was updated successfully`;
  // }

  async findAllUserPosts(userId: string) {
    const userPosts = await this.propertiesModel.find({ 'user.id': userId });
    return { data: userPosts, pagination: { page: 10 } };
  }

  async updateUserPost(postId: string, updateDashboardDto: UpdateDashboardDto) {
    const filter = { _id: postId };

    await this.propertiesModel.updateOne(filter, updateDashboardDto);

    return `This action updates a #${postId} dashboard`;
  }

  async removePost(postId: string) {
    await this.propertiesModel.findByIdAndDelete(postId);

    return `This action removes a #${postId} dashboard`;
  }

  async deleteImageById(imagename: string) {
    deleteFile(imagename);
  }
}
