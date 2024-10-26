import * as React from 'react'

export default function VerificationEmail({
	url
}: {
	url: string
}): React.JSX.Element {
	return (
		<div>
			<h1>Confirm your email address</h1>
			<p>
				To complete your registration, please click the following link:
				<a href={url}>Confirm email</a>
			</p>

			<p>Or copy this link and paste it in your browser</p>
			<a href={url} target="_blank" style={{ color: '#A981DC' }}>
				{url}
			</a>
		</div>
	)
}
