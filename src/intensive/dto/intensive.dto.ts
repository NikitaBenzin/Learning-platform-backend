import { IsOptional, IsString } from 'class-validator'

export class IntensiveDto {
	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsString()
	description?: string

	@IsOptional()
	@IsString()
	previewImage?: string
}
