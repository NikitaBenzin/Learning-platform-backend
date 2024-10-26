import { ConfigService } from '@nestjs/config'
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha'
import { isDev } from 'src/utils/is-dev.util'

export const getGoogleRecaptchaConfig = async (
	configService: ConfigService
): Promise<GoogleRecaptchaModuleOptions> => ({
	secretKey: configService.get<string>('RECAPTCHA_SECRET_KEY'),
	response: req => req.headers.recaptcha,
	skipIf: () => isDev(configService)
})
