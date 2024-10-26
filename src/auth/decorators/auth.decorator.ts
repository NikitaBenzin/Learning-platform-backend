import { UseGuards } from '@nestjs/common'
import { Role } from '@prisma/client'
import { JwtAuthGuard } from '../guard/jwt.guard'

export const Auth = (roles: Role | Role[] = [Role.USER]) => {
	if (!Array.isArray(roles)) {
		roles = [roles]
	}

	return applyDecorators(Roles(...roles), UseGuards(JwtAuthGuard, RolesGuard))
}
