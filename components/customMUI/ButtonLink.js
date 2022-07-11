import Button from '@mui/material/Button'
import Link from 'next/link'

export function ButtonLink({ href = "/", variant = 'contained', children, sx, ...rest }) {
    return (
        <Link href={href} >
            <Button variant={variant} sx={sx} {...rest} >
                {children}
            </Button>
        </Link>
    )
}