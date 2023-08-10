import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from '../dto/users.create.dto';
import { UserUpdateDto } from '../dto/users.update.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Users } from '../users.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';
import { UserCheckDto } from 'src/auth/dto/users.check.dto';

@ApiTags('users')
@Controller('users')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(
    private readonly usersSevice: UsersService,
    private readonly authService: AuthService,
  ) {}

  // POST. http://localhost:8000/users
  @ApiOperation({ summary: 'sign-up' })
  @Post()
  async signUp(@Body() body: UserCreateDto) {
    return await this.usersSevice.signUp(body);
  }

  // POST. http://localhost:8000/users/login
  @ApiOperation({ summary: 'log-in' })
  @Post('login')
  logIn(@Body() body: LoginRequestDto) {
    return this.authService.jwtLogIn(body);
  }

  // GET. http://localhost:8000/users
  @ApiOperation({ summary: 'get current user' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentUser(@CurrentUser() user: Users) {
    return user;
  }

  // POST. http://localhost:8000/users/check
  @ApiOperation({ summary: 'user check for update or delete' })
  @UseGuards(JwtAuthGuard)
  @Post('check')
  userCheck(@CurrentUser() user: Users, @Body() body: UserCheckDto) {
    return this.authService.userCheck(user.id, body);
  }

  // PUT. http://localhost:8000/users
  @ApiOperation({ summary: 'update current user infomation' })
  @UseGuards(JwtAuthGuard)
  @Put()
  async updateCurrentUser(
    @CurrentUser() user: Users,
    @Body() body: UserUpdateDto,
  ) {
    return await this.usersSevice.updateUser(user.id, body);
  }

  // POST. http://localhost:8000/users/upload
  @ApiOperation({ summary: 'upload user profile image' })
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('users')))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadCatImage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() user: Users,
  ) {
    console.log(files);
    return this.usersSevice.uploadImage(user, files);
  }

  // DELETE. http://localhost:8000/users
  @ApiOperation({ summary: 'delete current user' })
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteCurrentUser(@CurrentUser() user: Users) {
    return await this.usersSevice.deleteUser(user.id);
  }
}
