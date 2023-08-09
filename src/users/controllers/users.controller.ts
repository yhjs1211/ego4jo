import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRequestDto } from '../dto/users.request.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@ApiTags('users')
@Controller('users')
@UseInterceptors(SuccessInterceptor)
export class UsersController {
  constructor(private readonly usersSevice: UsersService) {}

  @ApiOperation({ summary: 'sign-up' })
  @Post()
  async singUp(@Body() body: UserRequestDto) {
    return await this.usersSevice.signUp(body);
  }
}
