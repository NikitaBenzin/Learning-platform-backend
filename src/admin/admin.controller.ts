import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { IntensiveDto } from 'src/intensives/dto/intensive.dto'
import { IntensiveService } from 'src/intensives/intensive.service'
import { SubscriptionDto } from 'src/subscription/dto/subscription.dto'
import { SubscriptionService } from 'src/subscription/subscription.service'
import { AdminService } from './admin.service'
import { FileDto } from './dto/file.dto'
import { VideoDto } from './dto/video.dto'

@Controller('admin')
export class AdminController {
	constructor(
		private readonly adminService: AdminService,
		private readonly intensivesService: IntensiveService,
		private readonly subscriptionService: SubscriptionService
	) {}

	// Requests bellow for ADMIN
	@Auth(Role.ADMIN)
	@Get()
	async getAdminProfile(@CurrentUser('id') id: string) {
		return this.adminService.getById(id)
	}

	// Requests bellow for SUBSCRIPTIONS
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Post('subscription')
	async createSubscription(@Body() dto: SubscriptionDto) {
		return this.subscriptionService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Put('subscription/:slug')
	async updateSubscription(
		@Param('slug') slug: string,
		@Body() dto: SubscriptionDto
	) {
		return this.subscriptionService.update(slug, dto)
	}

	@Auth(Role.ADMIN)
	@Delete('subscription/:slug')
	async deleteSubscription(@Param('slug') slug: string) {
		return this.subscriptionService.delete(slug)
	}

	// Requests bellow for INTENSIVESS
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Post('intensives')
	async createIntensives(@Body() dto: IntensiveDto) {
		return this.intensivesService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Put('intensives/:slug')
	async updateIntensives(
		@Param('slug') slug: string,
		@Body() dto: IntensiveDto
	) {
		return this.intensivesService.update(slug, dto)
	}

	@Auth(Role.ADMIN)
	@Delete('intensives/:slug')
	async deleteIntensives(@Param('slug') slug: string) {
		return this.intensivesService.delete(slug)
	}

	// Requests bellow for VIDEO
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Post('intensives/video')
	async addVideoToIntensives(@Body() dto: VideoDto) {
		return this.adminService.addVideoToIntensive(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Put('intensives/video/:slug')
	async updateVideo(@Param(':slug') slug: string, @Body() dto: FileDto) {
		return this.adminService.updateVideo(slug, dto)
	}

	@Auth(Role.ADMIN)
	@Delete('intensives/video/:slug')
	async removeVideo(@Param(':slug') slug: string) {
		return this.adminService.removeVideo(slug)
	}

	// Requests bellow for STORAGE
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Post('storage')
	async addFile(@Body() dto: FileDto) {
		return this.adminService.addFile(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Put('storage/:id')
	async updateFile(@Param(':id') id: string, @Body() dto: FileDto) {
		return this.adminService.updateFile(id, dto)
	}

	@Auth(Role.ADMIN)
	@Delete('storage/:id')
	async removeFile(@Param(':id') id: string) {
		return this.adminService.removeFile(id)
	}
}
