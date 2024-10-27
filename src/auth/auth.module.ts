import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from 'src/config/jwt.config'
import { EmailModule } from 'src/email/email.module'
import { UserModule } from 'src/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { RefreshTokenService } from './refresh-token.service'
import { SocialMediaAuthController } from './social-media/social-media-auth.controller'
import { SocialMediaAuthService } from './social-media/social-media-auth.service'
import { GithubStrategy } from './strategies/github.strategy'
import { GoogleStrategy } from './strategies/google.strategy'

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		UserModule,
		EmailModule
	],
	controllers: [AuthController, SocialMediaAuthController],
	providers: [
		AuthService,
		JwtStrategy,
		RefreshTokenService,
		GoogleStrategy,
		GithubStrategy,
		SocialMediaAuthService
	]
})
export class AuthModule {}
