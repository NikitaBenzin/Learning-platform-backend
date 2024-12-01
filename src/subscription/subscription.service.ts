import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import type { SubscriptionDto } from './dto/subscription.dto'

@Injectable()
export class SubscriptionService {
	constructor(private prisma: PrismaService) {}

	getAll() {
		return this.prisma.subscriptionPlan.findMany({
			orderBy: {
				price: 'asc'
			}
		})
	}

	getById(id: string) {
		return this.prisma.subscriptionPlan.findUnique({
			where: {
				id
			}
		})
	}

	async createUserSubscription(userId: string, subscriptionPlanId: string) {
		const userSubscription = await this.prisma.userSubscription.findUnique({
			where: {
				userId
			}
		})

		const subscriptionPlan = await this.prisma.subscriptionPlan.findUnique({
			where: {
				id: subscriptionPlanId
			}
		})

		if (!userSubscription) {
			const startDate = new Date()
			const endDate = new Date()
			endDate.setDate(startDate.getDate() + subscriptionPlan.duration)

			return this.prisma.userSubscription.create({
				data: {
					subscriptionPlanId: subscriptionPlan.id,
					startDate,
					endDate,
					userId,
					isActive: true
				}
			})
		}

		// Продление текущей подписки
		if (userSubscription && userSubscription.isActive) {
			const endDate = userSubscription.endDate
			endDate.setDate(endDate.getDate() + subscriptionPlan.duration)

			return this.prisma.userSubscription.update({
				where: {
					userId
				},
				data: {
					endDate
				}
			})
		} else {
			return this.prisma.userSubscription.update({
				where: {
					userId
				},
				data: {
					subscriptionPlanId,
					isActive: true
				}
			})
		}
	}

	removeSubscription(userId: string) {
		return this.prisma.userSubscription.update({
			where: {
				userId
			},
			data: {
				isActive: false
			}
		})
	}

	create(dto: SubscriptionDto) {
		return this.prisma.subscriptionPlan.create({
			data: dto
		})
	}

	update(slug: string, dto: SubscriptionDto) {
		const data = dto
		return this.prisma.subscriptionPlan.update({
			where: {
				slug
			},
			data
		})
	}

	async delete(slug: string) {
		return this.prisma.subscriptionPlan.delete({ where: { slug } })
	}
}
