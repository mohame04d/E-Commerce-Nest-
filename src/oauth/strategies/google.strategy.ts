import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:3000/api/v1/auth/google/callback`,
      scope: ['profile', 'email'],
    });
  }

  // this method will be called after successful authentication with Google
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = {
      accessToken,
      refreshToken,
      profile,
    };
    return user;
  }
}