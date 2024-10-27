import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { FileDto } from './dto/file.dto'
import { VideoDto } from './dto/video.dto'

@Injectable()
export class AdminService {
	constructor(private prisma: PrismaService) {}
	getById(id: string) {
		return this.prisma.user.findUnique({
			where: { id }
		})
	}

	addFile(dto: FileDto) {
		return this.prisma.file.create({
			data: {
				name: dto.name,
				fileUrl: dto.fileUrl
			}
		})
	}

	updateFile(id: string, dto: FileDto) {
		return this.prisma.file.update({
			where: {
				id
			},
			data: {
				...dto
			}
		})
	}

	removeFile(id: string) {
		return this.prisma.file.delete({ where: { id } })
	}

	addVideoToIntensive(dto: VideoDto) {
		return this.prisma.video.create({
			data: {
				name: dto.name,
				description: dto.description,
				videoUrl: dto.videoUrl,
				intensiveId: dto.intensiveId
			}
		})
	}

	updateVideo(id: string, dto: FileDto) {
		return this.prisma.video.update({
			where: {
				id
			},
			data: {
				...dto
			}
		})
	}

	removeVideo(id: string) {
		return this.prisma.video.delete({ where: { id } })
	}
}
