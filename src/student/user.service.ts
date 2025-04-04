import { ConflictException, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { hash } from 'argon2'
import type { AuthDto } from 'src/auth/dto/auth.dto'
import {
	IGithubProfile,
	IGoogleProfile
} from 'src/auth/social-media/social-media-auth.types'
import { PrismaService } from 'src/prisma.service'
import type { UserDto } from './dto/user.dto'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

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

	async getStorage(page: number) {
		return this.prisma.file.findMany({
			skip: (page - 1) * 20,
			take: 20
		})
	}

	async getProfile(id: string) {
		const profile = await this.getById(id)
		let subscriptionEndDate: string = 'No subscription'
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...data } = profile

		if (
			profile.subscription != null &&
			profile.subscription.isActive === true
		) {
			const day = profile.subscription.endDate.getDate()
			const month = profile.subscription.endDate.getMonth() + 1
			const year = profile.subscription.endDate.getFullYear()

			subscriptionEndDate = `${day}.${month}.${year}`
		}

		return {
			...data,
			subscriptionEndDate
		}
	}

	async create(dto: AuthDto) {
		return await this.prisma.user.create({
			data: {
				...dto,
				password: await hash(dto.password)
			},
			include: {
				subscription: true
			}
		})
	}

	async findOrCreateSocialUser(profile: IGoogleProfile | IGithubProfile) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
		let { subscription, ...user } = await this.getByEmail(profile.email)

		if (!user) {
			user = await this._createSocialUser(profile)
		}
		return user
	}

	private async _createSocialUser(
		profile: IGoogleProfile | IGithubProfile
	): Promise<User> {
		const email = profile.email
		const name =
			'firstName' in profile
				? `${profile.firstName} ${profile.lastName}`
				: profile.username
		const picture = profile.picture || ''

		return this.prisma.user.create({
			data: {
				email,
				name,
				password: '',
				verificationToken: null,
				avatarPath: picture
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
