import { modelOptions, prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @ApiProperty({ description: '用户名', example: 'user1' })
  @prop()
  username: String;

  @ApiProperty({ description: '密码', example: 'pass1' })
  @prop()
  password: String;
}
