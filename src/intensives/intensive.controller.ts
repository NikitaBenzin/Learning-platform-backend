import { Controller, Get, Param } from '@nestjs/common'
import { IntensiveService } from './intensive.service'

@Controller('intensives')
export class IntensiveController {
	constructor(private readonly intensiveService: IntensiveService) {}

	@Get()
	async getAllIntensives() {
		return this.intensiveService.getAll()
	}

	@Get(':slug')
	async getIntensive(@Param('slug') slug: string) {
		return this.intensiveService.getBySlug(slug)
	}
}
