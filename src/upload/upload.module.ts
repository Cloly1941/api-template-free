// ** NestJs
import { Module, forwardRef } from '@nestjs/common';

// ** Services
import { UploadService } from './upload.service';

// ** Controllers
import { UploadController } from './upload.controller';

// ** Module
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [forwardRef(() => ImagesModule)],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
