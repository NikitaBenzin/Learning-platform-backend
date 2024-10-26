import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha'
import { AdminModule } from './admin/admin.module'
import { AuthModule } from './auth/auth.module'
import { getGoogleRecaptchaConfig } from './config/google-recaptcha.config'
import { IntensiveModule } from './intensive/intensive.module'
import { SubscriptionModule } from './subscription/subscription.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		GoogleRecaptchaModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getGoogleRecaptchaConfig,
			inject: [ConfigService]
		}),
		AuthModule,
		UserModule,
		IntensiveModule,
		AdminModule,
		SubscriptionModule
	]
})
export class AppModule {}
