import { NotFoundException } from '@nestjs/common'

export const AdminGuard = (role: string) => {
	if (role === 'ADMIN') return true
	else throw new NotFoundException()
}
