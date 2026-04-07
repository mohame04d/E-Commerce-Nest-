import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'node_modules/helmet/index.mjs';
import { doubleCsrf} from 'csrf-csrf';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    rawBody: true,
    bodyParser: true
  });

  // add cookie parser to parse cookies from incoming requests
  app.use(cookieParser());

  //secure app

  // add helmet to secure app by setting various HTTP headers
   app.use(helmet());

   //add cors to allow cross-origin requests
   app.enableCors({
    origin: 'http://localhost:4200',     //frontend url
});

// add csrf to protect against cross-site request forgery attacks
const {
  doubleCsrfProtection, // This is the default CSRF protection middleware.
} = doubleCsrf({
  getSecret:() => process.env.CSRF_SECRET!, // A secret key used to generate CSRF tokens. You should set this to a long, random string in your environment variables.
getSessionIdentifier: (req) => {
  // خيارات آمنة:
  return req.cookies['connect.sid'] ||           // لو بتستخدم cookie-session
         (req as any).user?.id ||                // لو بتستخدم JWT + Passport
         req.ip ||                               // IP address (مؤقت)
         req.headers['x-session-id'] as string || 
         'anonymous-' + Date.now();              // fallback
},
  cookieOptions: {
    httpOnly: true, // The CSRF token will be stored in an HTTP-only cookie, which is not accessible via JavaScript.    

}});
app.use(doubleCsrfProtection);

  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
