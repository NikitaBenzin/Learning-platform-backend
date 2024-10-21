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

	@Get(':name')
	async getIntensive(@Param('name') name: string) {
		return this.intensiveService.getByName(name)
	}

	// All methods bellow only for ADMIN
	@Post()
	async createIntensive(@Body() dto: IntensiveDto) {
		return this.intensiveService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	async updateIntensive(@Param('id') id: string, @Body() dto: IntensiveDto) {
		return this.intensiveService.update(id, dto)
	}

	@Delete(':id')
	async deleteIntensive(@Param('id') id: string) {
		return this.intensiveService.delete(id)
	}
}
