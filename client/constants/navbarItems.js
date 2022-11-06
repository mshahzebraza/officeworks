import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';

export const mainNavbarItems = [
    {
        id: 0,
        route: '/',
        icon: CottageOutlinedIcon,
        label: 'Home',
    },
    {
        id: 1,
        route: '/po',
        icon: ShoppingBagOutlinedIcon,
        label: 'Purchase Orders',
    },
    {
        id: 2,
        route: '/mwo',
        icon: ConstructionOutlinedIcon,
        label: 'Mfg. Work Orders',
    },
    {
        id: 3,
        route: '/module',
        icon: InventoryOutlinedIcon,
        label: 'Modules',
    },
    {
        id: 4,
        route: '/project',
        icon: BeenhereOutlinedIcon,
        label: 'Projects',
    },
    {
        id: 5,
        route: '/transaction',
        icon: AssignmentOutlinedIcon,
        label: 'Transactions',
    },
]