import { Controller, Get, Param, Post } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { SubscriptionService } from './subscription.service'

@Controller('subscription')
export class SubscriptionController {
	constructor(private readonly subscriptionService: SubscriptionService) {}

	@Get()
	async getAllSubscriptions() {
		return this.subscriptionService.getAll()
	}

	@Post(':id')
	@Auth()
	async createUserSubscription(
		@Param('id') subscriptionPlanId: string,
		@CurrentUser('id') userId: string
	) {
		return this.subscriptionService.createUserSubscription(
			userId,
			subscriptionPlanId
		)
	}
}
