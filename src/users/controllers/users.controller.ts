import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Res,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Users } from '../users.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserCheckDto } from 'src/auth/dto/users.check.dto';
import { AwsService } from 'src/aws.service';
import { UserSignUpDto } from '../dto/users.signUp.dto';
import { Response } from 'express';
import { UserUpdateRequestDto } from '../dto/users.update.request.dto';

@ApiTags('users')
@Controller('users')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(
    private readonly usersSevice: UsersService,
    private readonly authService: AuthService,
    private readonly awsService: AwsService,
  ) {}

  // POST. http://localhost:8080/users
  @ApiOperation({ summary: 'sign-up' })
  @Post()
  async signUp(@Body() body: UserSignUpDto) {
    console.log(body);
    return await this.usersSevice.signUp(body);
  }

  // POST. http://localhost:8080/users/login
  @ApiOperation({ summary: 'log-in' })
  @Post('login')
  logIn(@Body() body: LoginRequestDto, @Res() res: Response) {
    return this.authService.jwtLogIn(body, res);
  }

  // GET. http://localhost:8080/users
  @ApiOperation({ summary: 'get current user' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentUser(@CurrentUser() user: Users) {
    return user;
  }

  // POST. http://localhost:8080/users/check
  @ApiOperation({ summary: 'user check for update or delete' })
  @UseGuards(JwtAuthGuard)
  @Post('check')
  userCheck(@CurrentUser() user: Users, @Body() body: UserCheckDto) {
    return this.authService.userCheck(user.id, body);
  }

  // PUT. http://localhost:8080/users
  @ApiOperation({ summary: 'update current user' })
  @UseGuards(JwtAuthGuard)
  @Put()
  async updateCurrentUser(
    @CurrentUser() user: Users,
    @Body() body: UserUpdateRequestDto,
  ) {
    return await this.usersSevice.updateUser(user.id, body);
  }

  // POST. http://localhost:8080/users/image
  @ApiOperation({ summary: 'upload user profile image' })
  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard)
  async uploadMediaFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: Users,
  ) {
    console.log(file);
    return await this.awsService.uploadImageToS3(user.id, 'users', file);
  }

  // GET. http://localhost:8080/users/image
  @ApiOperation({ summary: 'get user profile image' })
  @UseGuards(JwtAuthGuard)
  @Get('image')
  getUserImage(@CurrentUser() user: Users) {
    return this.awsService.getAwsS3ImageUrl(user.id);
  }

  // DELETE. http://localhost:8080/users
  @ApiOperation({ summary: 'delete current user' })
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteCurrentUser(@CurrentUser() user: Users) {
    return await this.usersSevice.deleteUser(user.id);
  }
}
