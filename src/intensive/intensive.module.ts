import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { IntensiveController } from './intensive.controller'
import { IntensiveService } from './intensive.service'

@Module({
	controllers: [IntensiveController],
	providers: [IntensiveService, PrismaService],
	exports: [IntensiveService]
})
export class IntensiveModule {}
