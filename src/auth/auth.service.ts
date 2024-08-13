import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  validateUser = async (username: string, pass: string): Promise<any> => {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid === true) {
        return user;
      }
    }

    return null;
  };

  login = async (user: IUser, response: Response) => {
    const { _id, name, email, role } = user;
    const payload = {
      sub: 'token login',
      iss: 'form server',
      _id,
      name,
      email,
      role,
    };

    const refresh_token = this.createRefreshToken(payload);

    // Update user with refresh token
    await this.usersService.updateUserToken(refresh_token, _id);

    // Set refresh token to cookie
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) * 1000,
    });

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token,
      user: {
        _id,
        name,
        email,
        role,
      },
    };
  };

  register = async (user: RegisterUserDto) => {
    const newUser = await this.usersService.register(user);

    return {
      _id: newUser?._id,
      createdAt: newUser?.createdAt,
    };
  };

  createRefreshToken = (payload: any) => {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn:
        ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) / 1000,
    });

    return refresh_token;
  };

  processNewToken = async (refreshToken: string, response: Response) => {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });

      const user = await this.usersService.findUserByToken(refreshToken);

      // Update user refresh token
      if (user) {
        const { _id, name, email, role } = user;
        const payload = {
          sub: 'token refresh',
          iss: 'form server',
          _id,
          name,
          email,
          role,
        };

        const refresh_token = this.createRefreshToken(payload);

        // Update user with refresh token
        await this.usersService.updateUserToken(refresh_token, _id.toString());

        // Set refresh token to cookie
        response.clearCookie('refresh_token');
        response.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          maxAge:
            ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) * 1000,
        });

        return {
          access_token: this.jwtService.sign(payload),
          refresh_token,
          user: {
            _id,
            name,
            email,
            role,
          },
        };
      } else {
        throw new BadRequestException(
          'Refresh token not valid. Please login again',
        );
      }
    } catch (error) {
      throw new BadRequestException(
        'Refresh token not valid. Please login again',
      );
    }
  };

  logout = async (response: Response, user: IUser) => {
    await this.usersService.updateUserToken('', user._id);
    // Clear refresh token to cookie
    response.clearCookie('refresh_token');
    return 'ok';
  };
}
