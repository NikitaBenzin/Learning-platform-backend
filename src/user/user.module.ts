import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SubscriptionModule } from 'src/subscription/subscription.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	imports: [SubscriptionModule],
	controllers: [UserController],
	providers: [UserService, PrismaService],
	exports: [UserService]
})
export class UserModule {}
