import { IsOptional, IsString } from 'class-validator'

export class VideoDto {
	@IsOptional()
	@IsString()
	slug?: string

	@IsOptional()
	@IsString()
	title?: string

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
