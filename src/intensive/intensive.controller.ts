import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { IntensiveDto } from './dto/intensive.dto'
import { IntensiveService } from './intensive.service'

@Controller('intensives')
export class IntensiveController {
	constructor(private readonly intensiveService: IntensiveService) {}

	@Get()
	async getAllIntensives() {
		return this.intensiveService.getAll()
	}

	@Get(':title')
	async getIntensive(@Param('title') title: string) {
		return this.intensiveService.getByTitle(title)
	}

	@Post()
	async createIntensive(@Body() dto: IntensiveDto) {
		return this.intensiveService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':title')
	async updateIntensive(
		@Param('title') title: string,
		@Body() dto: IntensiveDto
	) {
		return this.intensiveService.update(title, dto)
	}

	@Delete(':id')
	async deleteIntensive(@Param('id') id: string) {
		return this.intensiveService.delete(id)
	}
}
