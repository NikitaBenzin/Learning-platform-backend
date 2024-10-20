import { IsOptional, IsString } from 'class-validator'

export class IntensiveDto {
	@IsOptional()
	@IsString()
	title?: string

	@IsOptional()
	@IsString()
	description?: string

	@IsOptional()
	@IsString()
	previewImage?: string
}
