import { IsArray, IsInt, IsString } from 'class-validator'

export class SubscriptionDto {
	@IsString()
	slug: string

	@IsString()
	title: string

	@IsInt()
	price: number

	@IsString()
	duration: number

	@IsArray()
	description: string
	// description?: string[]
}
