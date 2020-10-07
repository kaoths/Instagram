import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { User } from "../decorators/user.decorator";
import { UserDto } from "../model/user.model";

@ApiBearerAuth()
@ApiTags("User")
@Controller("user")
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  me(@User() user: UserDto) {
    return user;
  }
}