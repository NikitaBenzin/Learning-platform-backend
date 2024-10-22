import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import type { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/prisma.service'
import { SubscriptionService } from 'src/subscription/subscription.service'
import type { UserDto } from './dto/user.dto'

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private subscriptionService: SubscriptionService
	) {}

	getById(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
			include: {
				subscription: true
			}
		})
	}

	getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: { email },
			include: { subscription: true }
		})
	}

	async getProfile(id: string) {
		const profile = await this.getById(id)
		const subscriptionEndDate =
			profile.subscription == null ? 'No subscription' : profile.subscription

		if (profile.subscription == null)
			await this.subscriptionService.createUserSubscription(id, 'Free')

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...data } = profile

		return {
			...data,
			subscriptionEndDate
		}
	}

	async create(dto: AuthDto) {
		const user = {
			email: dto.email,
			name: '',
			password: await hash(dto.password)
		}

		return this.prisma.user.create({
			data: user,
			include: {
				subscription: true
			}
		})
	}

	async update(id: string, dto: UserDto) {
		let data = dto
		if (dto.password) data = { ...dto, password: await hash(dto.password) }
		if (dto.email) {
			const oldUser = await this.getByEmail(dto.email)
			if (oldUser && oldUser.id != id)
				throw new ConflictException('Email already exists')
		}

		return this.prisma.user.update({
			where: { id },
			data
		})
	}
}
