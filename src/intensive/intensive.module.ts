import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { IntensiveController } from './intensive.controller'
import { IntensiveService } from './intensive.service'
import { SubscriptionCronService } from './SubscriptionCronService'

@Module({
	controllers: [IntensiveController],
	providers: [IntensiveService, SubscriptionCronService, PrismaService],
	exports: [IntensiveService]
})
export class IntensiveModule {}
