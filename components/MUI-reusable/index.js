import Button from '@mui/material/Button'
import Link from 'next/link'

export function ButtonLink({ href = "/", variant = 'contained', children, className, ...rest }) {
    return (
        <Link href={href} >
            <Button variant={variant} className={className} {...rest} >
                {children}
            </Button>
        </Link>
    )
}