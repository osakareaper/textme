import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAPIStatus(): string {
    return 'API is running';
  }
}
