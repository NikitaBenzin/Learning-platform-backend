import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import type { SubscriptionDto } from './dto/subscription.dto'

@Injectable()
export class SubscriptionService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService
	) {}

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

	async createUserSubscription(subscriptionPlanId: string, userId: string) {
		const oldUser = await this.userService.getById(userId)
		const subscriptionPlan = await this.getById(subscriptionPlanId)

		if (oldUser.subscription == null) {
			const startDate = new Date()
			const endDate = new Date()
			endDate.setDate(startDate.getDate() + subscriptionPlan.duration)
			const newSubscription = {
				subscriptionPlanId,
				startDate,
				endDate,
				isActive: true,
				userId
			}

			return this.prisma.userSubscription.create({
				data: newSubscription
			})
		} else {
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

	async create(dto: SubscriptionDto) {
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

	async update(id: string, dto: SubscriptionDto) {
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
