import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ example: 'swagboy' })
  username: string;

  @ApiProperty({ example: 'swagboy@mail.com' })
  email: string;

  @ApiProperty({ example: '$wag_P4SS!1337x' })
  password: string;
}
