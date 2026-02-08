import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { ChangePasswordDto, ResetPasswordDto, signInDto, SignUpDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtServices: JwtService,
    private readonly mailService: MailerService,
  ) {}
  async signUp(signUpDto: SignUpDto) {
    const user = await this.userModel.findOne({ email: signUpDto.email });
    if (user) throw new HttpException('user already exist', 400);
    const password = await bcrypt.hash(signUpDto.password, 12);
    const newUser = {
      password,
      role: 'user',
      active: true,
    };
    const userCreated = await this.userModel.create({
      ...signUpDto,
      ...newUser,
    });
    const payload = {
      _id: userCreated._id,
      email: userCreated.email,
      role: userCreated.role,
    };
    const token = await this.jwtServices.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      status: 'success',
      data: { userCreated },
      access_token: token,
    };
  }
  async signIn(signInDto: signInDto) {
    const password = await bcrypt.hash(signInDto.password, 12);
    const user = await this.userModel
      .findOne({ email: signInDto.email })
      .select('+role');
    if (!user) throw new NotFoundException();
    const isMatch = await bcrypt.compare(signInDto.password, user.password);
    console.log(isMatch);
    if (!isMatch) throw new UnauthorizedException();
    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };
    const token = await this.jwtServices.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      status: 'success',
      data: { user },
      access_token: token,
    };
  }
  async resetPassword(email: ResetPasswordDto) {
    const user = await this.userModel.findOne({ email: email.email });
    if (!user) throw new NotFoundException('user not found');
    const code = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
    await this.userModel.findOneAndUpdate(
      { email: email.email },
      { vertificationCode: code },
      { new: true },
    );
    const message = 
    `<div>
    <h1>Forgot your password?</h1>
    <p>verificationCode is <h3>${code}</h3></p>`
    this.mailService.sendMail({
      from: 'mohakim88tr@gmail.com',
      to: user.email,
      subject: 'your password reset token( valid for 10 mintues)',
      html:message
    });
    return {
      status:'success',
      message:`code sent successfully on your email ${user.email}`
    }
  }
  async verifyCode({email,code}){
    const user = await this.userModel.findOne({email}).select('vertificationCode');
    if (!user) throw new NotFoundException('user not found');
    if(user.vertificationCode!==code)
      throw new UnauthorizedException('invalid code');
    await this.userModel.findOneAndUpdate({email},{vertificationCode:null},{new:true});
    return {
      status:'success',
      message:'code verified successfully'
    }
  }
  async changePassword(changePassword:signInDto){
    const user = await this.userModel.findOne({email:changePassword.email});
    if (!user) throw new NotFoundException('user not found');
    const password = await bcrypt.hash(changePassword.password,12);
    await this.userModel.findOneAndUpdate({email:changePassword.email},{password},{new:true})
    return {
      status:'success',
      message:'password changed successfully'
    }
  }
}
