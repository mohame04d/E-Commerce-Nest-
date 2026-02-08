import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule} from '@nestjs/jwt';  
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { BrandModule } from './brand/brand.module';
import { CouponModule } from './Coupon/brand.module';
import { Supplier } from './supplier/supplier.schema';
import { SupplierModule } from './supplier/supplier.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/E-CommerceAPIByNest'),
    UserModule,
    JwtModule.register({
      global: true,
      secret:process.env.JWT_SECRET,
      // signOptions:{expiresIn:'60s'}
    }),
    AuthModule,
     MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
     CategoryModule,
     SubCategoryModule,
     BrandModule,
     CouponModule,
     SupplierModule,
     RequestModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}