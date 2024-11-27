import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { IntensiveService } from 'src/intensive/intensive.service'
import { UserDto } from './dto/user.dto'
import { UserService } from './user.service'

@Controller('student')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly intensiveService: IntensiveService
	) {}

	@Auth()
	@Get()
	async getProfile(@CurrentUser('id') id: string) {
		return this.userService.getProfile(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put('settings')
	async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto) {
		return this.userService.update(id, dto)
	}

	@Auth(Role.PREMIUM)
	@Get(':intensiveName/:videoName')
	async getIntensiveVideo(
		@Param('intensiveName') intensiveName: string,
		@Param('videoName') videoName: string
	) {
		return this.intensiveService.getVideo(intensiveName, videoName)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.PREMIUM)
	@Get('storage/:page')
	async getStorage(@Param('page') page: number) {
		return this.userService.getStorage(page)
	}
}
