import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  HealthAPI(): string {
    return 'API is Healthy and Running!';
  }
}
