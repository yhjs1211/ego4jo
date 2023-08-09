import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRequestDto } from '../dto/users.request.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Users } from '../users.entity';

@ApiTags('users')
@Controller('users')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(
    private readonly usersSevice: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'sign-up' })
  @Post()
  async singUp(@Body() body: UserRequestDto) {
    return await this.usersSevice.signUp(body);
  }

  @ApiOperation({ summary: 'log-in' })
  @Post('login')
  logIn(@Body() body: LoginRequestDto) {
    return this.authService.jwtLogIn(body);
  }

  @ApiOperation({ summary: 'get current user' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() user: Users) {
    return user;
  }
}
