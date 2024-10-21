import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { UserModule } from 'src/user/user.module'
import { SubscriptionController } from './subscription.controller'
import { SubscriptionService } from './subscription.service'

@Module({
	imports: [UserModule],
	controllers: [SubscriptionController],
	providers: [SubscriptionService, PrismaService],
	exports: [SubscriptionService]
})
export class SubscriptionModule {}
