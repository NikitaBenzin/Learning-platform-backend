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

	async createUserSubscription(userId: string, subscriptionPlanName: string) {
		if (subscriptionPlanName === 'Free') {
			const newSubscription = {
				subscriptionPlanName,
				userId
			}

			return this.prisma.userSubscription.create({
				data: newSubscription
			})
		} else {
			const subscriptionPlan = await this.prisma.subscriptionPlan.findUnique({
				where: {
					id: subscriptionPlanName
				}
			})

			const userSubscription = await this.prisma.userSubscription.findUnique({
				where: {
					userId
				}
			})

			if (userSubscription.isActive) {
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
			}
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
		const subscription = {
			name: dto.name,
			price: dto.price,
			duration: dto.duration,
			description: dto.description
		}

		return this.prisma.subscriptionPlan.create({
			data: subscription
		})
	}

	update(id: string, dto: SubscriptionDto) {
		const data = dto
		return this.prisma.subscriptionPlan.update({
			where: {
				id
			},
			data
		})
	}

	async delete(id: string) {
		return this.prisma.subscriptionPlan.delete({ where: { id } })
	}
}
