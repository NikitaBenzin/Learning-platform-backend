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

@Controller('admin')
export class AdminController {
	constructor(
		private readonly adminService: AdminService,
		private readonly intensiveService: IntensiveService,
		private readonly subscriptionService: SubscriptionService
	) {}

	// Requests bellow for Admin
	@Auth(Role.ADMIN)
	@Get()
	async getAdminProfile(@CurrentUser('id') id: string) {
		return this.adminService.getById(id)
	}

	// Requests bellow for subscriptionService
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

	// Requests bellow for intensiveService
	@Auth(Role.ADMIN)
	@Post()
	async createIntensive(@Body() dto: IntensiveDto) {
		return this.intensiveService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(Role.ADMIN)
	@Put(':id')
	async updateIntensive(@Param('id') id: string, @Body() dto: IntensiveDto) {
		return this.intensiveService.update(id, dto)
	}

	@Auth(Role.ADMIN)
	@Delete('intensive/:id')
	async deleteIntensive(@Param('id') id: string) {
		return this.intensiveService.delete(id)
	}
}
