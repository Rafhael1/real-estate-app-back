import { Injectable } from '@nestjs/common';

@Injectable()
export class PublicService {
  autocomplete() {
    return `This action returns all public`;
  }

  findAllPropeties() {
    return 'all properties';
  }

  findOne(id: number) {
    return `This action returns a #${id} public`;
  }
}
