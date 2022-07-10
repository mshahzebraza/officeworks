import Button from '@mui/material/Button'
import Link from 'next/link'

export function ButtonLink({ href = "/", variant = 'contained', children, className }) {
    return (
        <Link href={href} >
            <Button variant={variant} className={className}>
                {children}
            </Button>
        </Link>
    )
}