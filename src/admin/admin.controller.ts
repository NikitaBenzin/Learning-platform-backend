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
import { AdminGuard } from './guard/admin.guard'

@Controller('admin')
export class AdminController {
	constructor(
		private readonly adminService: AdminService,
		private readonly subscriptionService: SubscriptionService,
		private readonly intensiveService: IntensiveService
	) {}

	// Requests bellow for Admin
	@Get()
	@Auth()
	async getAdminProfile(
		@CurrentUser('id') id: string,
		@CurrentUser('role') role: string
	) {
		if (AdminGuard(role)) return this.adminService.getById(id)
	}

	// Requests bellow for Intensive
	@Post()
	@Auth()
	async createIntensive(
		@CurrentUser('role') role: Role | undefined,
		@Body() dto: IntensiveDto
	) {
		if (AdminGuard(role)) return this.intensiveService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateIntensive(
		@CurrentUser('role') role: Role | undefined,
		@Param('id') id: string,
		@Body() dto: IntensiveDto
	) {
		if (AdminGuard(role)) return this.intensiveService.update(id, dto)
	}

	@Delete('intensive/:id')
	@Auth()
	async deleteIntensive(
		@CurrentUser('role') role: Role | undefined,
		@Param('id') id: string
	) {
		if (AdminGuard(role)) return this.intensiveService.delete(id)
	}

	// Requests bellow for Subscription
	@Post('subscription')
	@Auth()
	async createSubscription(
		@CurrentUser('role') role: Role | undefined,
		@Body() dto: IntensiveDto
	) {
		if (AdminGuard(role)) return this.subscriptionService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('subscription/:id')
	@Auth()
	async updateSubscription(
		@CurrentUser('role') role: Role | undefined,
		@Param('id') id: string,
		@Body() dto: IntensiveDto
	) {
		if (AdminGuard(role)) return this.subscriptionService.update(id, dto)
	}

	@Delete('subscription/:id')
	@Auth()
	async deleteSubscription(
		@CurrentUser('role') role: Role | undefined,
		@Param('id') id: string
	) {
		if (AdminGuard(role)) return this.subscriptionService.delete(id)
	}
}
