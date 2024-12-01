import { IsOptional, IsString } from 'class-validator'

export class FileDto {
	@IsOptional()
	@IsString()
	title: string

	@IsOptional()
	@IsString()
	fileUrl: string
}
