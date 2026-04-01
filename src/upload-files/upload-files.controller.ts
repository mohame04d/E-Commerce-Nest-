// app.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UploadedFiles,
} from '@nestjs/common';
import { CloudinaryService } from './upload-files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/user/guard/auth.gard';
import { Roles } from 'src/user/decorators/user.decorators';

@Controller('image')
export class AppController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  //user can upload images or files
  @Post('uploads')
  // @Roles(['admin', 'user'])
  // @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('files', 5))
uploadImages(
  @UploadedFiles(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 , message: 'File size should not exceed 10MB' }),
        // new FileTypeValidator({
        //   fileType: /\.(jpg|jpeg|png|pdf|mp4)$/i,
        // }),
      ],
    }),
  )
  files: any[],
) {
  return this.cloudinaryService.uploadFiles(files);
}
}
