import { IsOptional, IsString } from 'class-validator'

export class FileDto {
	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsString()
	fileUrl?: string
}
