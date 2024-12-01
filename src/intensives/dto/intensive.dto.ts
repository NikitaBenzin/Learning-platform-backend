import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class IntensiveDto {
	@IsOptional()
	@IsString()
	slug: string

	@IsString()
	title: string

	@IsString()
	videoPresentationUrl: string

	@IsString()
	previewImage: string

	@IsOptional()
	@IsBoolean()
	isPublished?: boolean
}
