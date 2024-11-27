import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Role, User } from '@prisma/client'
import { verify } from 'argon2'
import { omit } from 'lodash'
import { EmailService } from 'src/email/email.service'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/student/user.service'
import type { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private jwt: JwtService,
		private userService: UserService,
		private prisma: PrismaService,
		private emailService: EmailService
	) {}

	private readonly TOKEN_EXPIRATION_ACCESS = '1h'
	private readonly TOKEN_EXPIRATION_REFRESH = '7d'

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		return this.buildResponseObject(user)
	}

	async register(dto: AuthDto) {
		const oldUser = await this.userService.getByEmail(dto.email)
		if (oldUser) throw new BadRequestException('User already exists')

		const user = await this.userService.create(dto)

		await this.emailService.sendVerification(
			user.email,
			`http://localhost:4200/verify-email?token=${user.verificationToken}`
		)

		return this.buildResponseObject(user)
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) {
			throw new UnauthorizedException('Invalid refresh token')
		}
		const user = await this.userService.getById(result.id)
		return this.buildResponseObject(user)
	}

	async verifyEmail(token: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				verificationToken: token
			}
		})

		if (!user) throw new NotFoundException('Token not exists!')

		await this.userService.update(user.id, {
			verificationToken: null
		})

		return 'Email verified!'
	}

	private async issueTokens(userId: string, rights: Role[]) {
		const payload = { id: userId, rights }
		const accessToken = this.jwt.sign(payload, {
			expiresIn: this.TOKEN_EXPIRATION_ACCESS
		})
		const refreshToken = this.jwt.sign(payload, {
			expiresIn: this.TOKEN_EXPIRATION_REFRESH
		})
		return { accessToken, refreshToken }
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.userService.getByEmail(dto.email)
		if (!user) {
			throw new UnauthorizedException('Email or password invalid')
		}
		const isValid = await verify(user.password, dto.password)
		if (!isValid) {
			throw new UnauthorizedException('Email or password invalid')
		}
		return user
	}

	async buildResponseObject(user: User) {
		const tokens = await this.issueTokens(user.id, user.rights)
		return { user: this.omitPassword(user), ...tokens }
	}

	private omitPassword(user: User) {
		return omit(user, ['password'])
	}
}
