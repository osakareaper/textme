import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'swagboy | swagboy@mail.com' })
  usernameOrEmail: string;

  @ApiProperty({ example: '$wag_P4SS!1337x' })
  password: string;
}
