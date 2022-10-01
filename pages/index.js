import Layout from '../components/Layout';
import { ButtonLink } from '../components/customMUI';
import { Paper } from '@mui/material';

export default function Home() {

    const paperStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gridAutoRows: '1fr',
        gap: 5,
        padding: 10,
    }

    return (
        <Layout >
            <Paper sx={paperStyles}  >
                <ButtonLink href='/po'>Purchase Orders</ButtonLink>
                <ButtonLink href='/wo'>Work Orders</ButtonLink>
                <ButtonLink href='/transaction'>Transactions</ButtonLink>
                <ButtonLink href='/project'>Projects</ButtonLink>
                <ButtonLink href='/inventory'>Inventory</ButtonLink>
            </Paper>
        </Layout>
    )
}

