import { BadRequestException, Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { TSocialProfile } from './social-media-auth.types'

@Injectable()
export class SocialMediaAuthService {
	constructor(private userService: UserService) {}

	async login(req: { user: TSocialProfile }) {
		if (!req.user) {
			throw new BadRequestException('User not found by social media')
		}

		return this.userService.findOrCreateSocialUser(req.user)
	}
}
