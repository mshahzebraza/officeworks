import Button from '@mui/material/Button'
import Link from 'next/link'

export function ButtonLink({ href = "/", variant = 'contained', children, ...rest }) {
    return (
        <Link href={href} >
            <Button variant={variant}  {...rest} >
                {children}
            </Button>
        </Link>
    )
}