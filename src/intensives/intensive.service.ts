import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
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

	getBySlug(slug: string) {
		const intensive = this.prisma.intensive.findUnique({
			where: { slug },
			include: {
				video: {
					orderBy: { createdAt: 'asc' }
				}
			}
		})

		if (!intensive)
			throw new NotFoundException(`Intensive with slug "${slug}" not found`)

		return intensive
	}

	async getVideo(intensiveSlug: string, videoSlug: string) {
		const intensive = this.prisma.intensive.findUnique({
			where: { slug: intensiveSlug },
			select: {
				video: {
					where: { slug: videoSlug },
					select: {
						videoUrl: true
					}
				}
			}
		})
		if (!intensive)
			throw new BadRequestException(
				`Video with name "${videoSlug}" does not exist`
			)

		return intensive
	}

	async create(dto: IntensiveDto) {
		return this.prisma.intensive.create({
			data: dto
		})
	}

	async update(slug: string, dto: IntensiveDto) {
		return this.prisma.intensive.update({
			where: {
				slug
			},
			data: {
				title: dto.title,
				videoPresentationUrl: dto.videoPresentationUrl,
				previewImage: dto.previewImage,
				isPublished: dto.isPublished
			}
		})
	}

	async delete(slug: string) {
		return this.prisma.intensive.delete({ where: { slug } })
	}
}
