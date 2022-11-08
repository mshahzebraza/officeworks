import Layout from '../client/components/Layout';
import { ButtonLink } from '../client/components/customMUI';
import { Paper } from '@mui/material';

export default function Home() {
    /* 
    {
        TERM: 'xterm-256color',
        SHELL: '/usr/local/bin/bash',
        USER: 'maciej',
        PATH: '~/.bin/:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin',
        PWD: '/Users/maciej',
        EDITOR: 'vim',
        SHLVL: '1',
        HOME: '/Users/maciej',
        LOGNAME: 'maciej',
        _: '/usr/local/bin/node'
    }
     */

    console.log("PATH:", process.env.PATH)
    console.log("PWD:", process.env.PWD)
    console.log("HOME:", process.env.HOME)

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
                <ButtonLink href='/mwo'>Mfg. Work Orders</ButtonLink>
                <ButtonLink href='/transaction'>Transactions</ButtonLink>
                <ButtonLink href='/project'>Projects</ButtonLink>
                <ButtonLink href='/inventory'>Inventory</ButtonLink>
            </Paper>
        </Layout>
    )
}

