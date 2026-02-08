import { Module } from '@nestjs/common';
import { RequestService } from './request.service';  
import { RequestController } from './request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplyRequestSchema } from './request.schema';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: 'SupplyRequest', schema: SupplyRequestSchema }]),
    ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}  