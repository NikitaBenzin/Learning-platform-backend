import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { IntensiveDto } from './dto/intensive.dto'

@Injectable()
export class IntensiveService {
	constructor(private prisma: PrismaService) {}

	getAll() {
		return this.prisma.intensive.findMany()
	}

	getByTitle(title: string) {
		const intensive = this.prisma.intensive.findFirst({
			where: { title },
			include: { video: true }
		})

		if (!intensive)
			throw new NotFoundException(`Intensive with title "${title}" not found`)

		return intensive
	}

	async create(dto: IntensiveDto) {
		const intensive = {
			title: dto.title,
			description: dto.description,
			previewImage: dto.previewImage
		}

		return this.prisma.intensive.create({
			data: intensive
		})
	}

	// Нужно прокидывать id чтобы обновлять
	async update(title: string, dto: IntensiveDto) {
		const data = dto
		return this.prisma.intensive.update({
			where: {
				title
			}
		})
	}

	async delete(id: string) {
		return this.prisma.intensive.delete({ where: { id } })
	}
}
