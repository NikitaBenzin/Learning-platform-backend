import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import type { IntensiveDto } from './dto/intensive.dto'

@Injectable()
export class IntensiveService {
	constructor(private prisma: PrismaService) {}

	getAll() {
		return this.prisma.intensive.findMany({
			orderBy: {
				createdAt: 'asc'
			}
		})
	}

	getByName(name: string) {
		const intensive = this.prisma.intensive.findFirst({
			where: { name },
			include: { video: true }
		})

		if (!intensive)
			throw new NotFoundException(`Intensive with name "${name}" not found`)

		return intensive
	}

	async create(dto: IntensiveDto) {
		const intensive = {
			name: dto.name,
			description: dto.description,
			previewImage: dto.previewImage
		}

		return this.prisma.intensive.create({
			data: intensive
		})
	}

	async update(id: string, dto: IntensiveDto) {
		const data = dto
		return this.prisma.intensive.update({
			where: {
				id
			},
			data
		})
	}

	async delete(id: string) {
		return this.prisma.intensive.delete({ where: { id } })
	}
}
