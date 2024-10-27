import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from 'src/config/jwt.config'
import { IntensiveModule } from 'src/intensive/intensive.module'
import { PrismaService } from 'src/prisma.service'
import { SubscriptionModule } from 'src/subscription/subscription.module'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'

@Module({
	imports: [
		IntensiveModule,
		SubscriptionModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	],
	controllers: [AdminController],
	providers: [AdminService, PrismaService],
	exports: [AdminService]
})
export class AdminModule {}
