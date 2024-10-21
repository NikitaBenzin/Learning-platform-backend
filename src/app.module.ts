import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AdminModule } from './admin/admin.module'
import { AuthModule } from './auth/auth.module'
import { IntensiveModule } from './intensive/intensive.module'
import { SubscriptionModule } from './subscription/subscription.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		IntensiveModule,
		AdminModule,
		SubscriptionModule
	]
})
export class AppModule {}
