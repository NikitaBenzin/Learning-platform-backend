import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
import { IntensiveModule } from './intensive/intensive.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule, IntensiveModule]
})
export class AppModule {}
