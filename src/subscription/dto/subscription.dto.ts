import { IsArray, IsInt, IsOptional, IsString } from 'class-validator'

export class SubscriptionDto {
	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsInt()
	price?: number

	@IsOptional()
	@IsString()
	duration?: number

	@IsOptional()
	@IsArray()
	description?: string
	// description?: string[]
}
