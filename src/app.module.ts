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
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { TaxModule } from './tax/tax.module';
import { CloudinaryModule } from './upload-files/upload-files.module';
// import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
// import path from 'path';
// import {
//   QueryResolver,
//   AcceptLanguageResolver,
//   HeaderResolver,
// } from 'nestjs-i18n';
// import { join } from 'path';

@Module({
  imports: [
    //   I18nModule.forRoot({
    //   fallbackLanguage: 'en',
    //   loaderOptions: {
    //     path: join(__dirname, '/apps/api/i18n/'),
    //     watch: true,
    //   },
    //   resolvers: [
    //     { use: QueryResolver, options: ['lang'] },
    //     AcceptLanguageResolver,
    //     new HeaderResolver(['x-lang']),
    //   ],
    // }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/E-CommerceAPIByNest'),
    UserModule,
    JwtModule.register({
      global: true,
      secret:process.env.JWT_SECRET,
      signOptions:{expiresIn:'60s'}
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
    UserModule,
     CategoryModule,
     SubCategoryModule,
     BrandModule,
     CouponModule,
     SupplierModule,
     RequestModule,
     ProductModule,
     ReviewModule,
     CartModule,
     OrderModule,
     TaxModule,
      CloudinaryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}