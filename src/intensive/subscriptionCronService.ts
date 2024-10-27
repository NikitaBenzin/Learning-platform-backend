import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class SubscriptionCronService {
	constructor(private readonly prisma: PrismaService) {}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async deactivateExpiredSubscriptions() {
		const now = new Date()

		// Обновляем все подписки с истекшим endDate
		await this.prisma.userSubscription.updateMany({
			where: { endDate: { lt: now }, isActive: true },
			data: { isActive: false }
		})
	}
}
