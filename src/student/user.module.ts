import { Module } from '@nestjs/common'
import { IntensiveModule } from 'src/intensive/intensive.module'
import { PrismaService } from 'src/prisma.service'
import { SubscriptionModule } from 'src/subscription/subscription.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	imports: [SubscriptionModule, IntensiveModule],
	controllers: [UserController],
	providers: [UserService, PrismaService],
	exports: [UserService]
})
export class UserModule {}
