import { IsOptional, IsString } from 'class-validator'

export class VideoDto {
	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsString()
	description?: string

	@IsOptional()
	@IsString()
	videoUrl?: string

	@IsOptional()
	@IsString()
	intensiveId?: string
}
