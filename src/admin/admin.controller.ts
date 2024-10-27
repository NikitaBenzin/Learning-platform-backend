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
import { IntensiveDto } from 'src/intensive/dto/intensive.dto'
import { IntensiveService } from 'src/intensive/intensive.service'
import { SubscriptionService } from 'src/subscription/subscription.service'
import { AdminService } from './admin.service'
import { FileDto } from './dto/file.dto'
import { VideoDto } from './dto/video.dto'

@Controller('admin')
export class AdminController {
	constructor(
		private readonly adminService: AdminService,
		private readonly intensiveService: IntensiveService,
		private readonly subscriptionService: SubscriptionService
	) {}

	// Requests bellow for ADMIN
	@Auth(Role.ADMIN)
	@Get()
	async getAdminProfile(@CurrentUser('id') id: string) {
		return this.adminService.getById(id)
	}

	// Requests bellow for SUBSCRIPTIONS
	@Auth(Role.ADMIN)
	@Post('subscription')
	async createSubscription(@Body() dto: IntensiveDto) {
		return this.subscriptionService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Put('subscription/:id')
	async updateSubscription(@Param('id') id: string, @Body() dto: IntensiveDto) {
		return this.subscriptionService.update(id, dto)
	}

	@Auth(Role.ADMIN)
	@Delete('subscription/:id')
	async deleteSubscription(@Param('id') id: string) {
		return this.subscriptionService.delete(id)
	}

	// Requests bellow for INTENSIVES
	@Auth(Role.ADMIN)
	@Post('intensive')
	async createIntensive(@Body() dto: IntensiveDto) {
		return this.intensiveService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Put('intensive/:id')
	async updateIntensive(@Param('id') id: string, @Body() dto: IntensiveDto) {
		return this.intensiveService.update(id, dto)
	}

	@Auth(Role.ADMIN)
	@Delete('intensive/:id')
	async deleteIntensive(@Param('id') id: string) {
		return this.intensiveService.delete(id)
	}

	// Requests bellow for VIDEO
	@Auth(Role.ADMIN)
	@Post('intensive/video')
	async addVideoToIntensive(@Body() dto: VideoDto) {
		return this.adminService.addVideoToIntensive(dto)
	}

	@Auth(Role.ADMIN)
	@Put('intensive/video/:id')
	async updateVideo(@Param(':id') id: string, @Body() dto: VideoDto) {
		return this.adminService.updateVideo(id, dto)
	}

	@Auth(Role.ADMIN)
	@Delete('intensive/video/:id')
	async removeVideo(@Param(':id') id: string) {
		return this.adminService.removeVideo(id)
	}

	// Requests bellow for STORAGE
	@Auth(Role.ADMIN)
	@Post('storage')
	async addFile(@Body() dto: FileDto) {
		return this.adminService.addFile(dto)
	}

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
