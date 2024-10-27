import { Controller, Get, Param } from '@nestjs/common'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IntensiveService } from './intensive.service'

@Controller('intensives')
export class IntensiveController {
	constructor(private readonly intensiveService: IntensiveService) {}

	@Get()
	async getAllIntensives() {
		return this.intensiveService.getAll()
	}

	@Get(':name')
	async getIntensive(@Param('name') name: string) {
		return this.intensiveService.getByName(name)
	}

	@Auth(Role.PREMIUM)
	@Get(':intensiveName/:videoName')
	async getIntensiveVideo(
		@Param('intensiveName') intensiveName: string,
		@Param('videoName') videoName: string
	) {
		return this.intensiveService.getVideo(intensiveName, videoName)
	}
}
