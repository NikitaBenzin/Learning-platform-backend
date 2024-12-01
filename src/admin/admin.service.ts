import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

import { FileDto } from './dto/file.dto'
import { VideoDto } from './dto/video.dto'

@Injectable()
export class AdminService {
	constructor(private prisma: PrismaService) {}
	async getById(id: string) {
		return this.prisma.user.findUnique({
			where: { id }
		})
	}

	async addFile(dto: FileDto) {
		return this.prisma.file.create({ data: dto })
	}

	async updateFile(id: string, dto: FileDto) {
		return this.prisma.file.update({
			where: {
				id
			},
			data: {
				...dto
			}
		})
	}

	async removeFile(id: string) {
		return this.prisma.file.delete({ where: { id } })
	}

	async addVideoToIntensive(dto: VideoDto) {
		const videoData: Prisma.VideoCreateInput = {
			slug: dto.slug,
			title: dto.title,
			description: dto.description,
			videoUrl: dto.videoUrl,
			intensive: {
				connect: { id: dto.intensiveId } // Nested relation
			}
		}
		return this.prisma.video.create({
			data: videoData
		})
	}

	async updateVideo(slug: string, dto: FileDto) {
		return this.prisma.video.update({
			where: {
				slug
			},
			data: {
				...dto
			}
		})
	}

	async removeVideo(slug: string) {
		return this.prisma.video.delete({ where: { slug } })
	}
}
