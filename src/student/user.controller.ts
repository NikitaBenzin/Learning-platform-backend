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
import { IntensiveService } from 'src/intensives/intensive.service'
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

	@Auth()
	@Get('storage')
	async getStoragePage(@Body('page') page: number = 1) {
		return this.userService.getStorage(page)
	}

	@Auth()
	@Get('intensives')
	async getIntensives() {
		return this.intensiveService.getAll()
	}

	@Auth(Role.PREMIUM)
	@Get('intensives/:slug')
	async getIntensiveBySlug(@Param('slug') slug: string) {
		return this.intensiveService.getBySlug(slug)
	}

	@Auth(Role.PREMIUM)
	@Get('intensives/:intensiveSlug/:videoSlug')
	async getIntensiveVideo(
		@Param('intensiveSlug') intensiveSlug: string,
		@Param('videoSlug') videoSlug: string
	) {
		return this.intensiveService.getVideo(intensiveSlug, videoSlug)
	}
}
