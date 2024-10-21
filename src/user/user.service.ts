import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './dto/user.dto'

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
			where: { email }
		})
	}

	async getProfile(id: string) {
		const profile = await this.getById(id)

		const subscriptionEndDate =
			profile.subscription?.endDate && 'No subscription'

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
			data: user
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
