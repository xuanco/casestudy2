import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import {useNavigate} from "react-router";

const categories = [
    {
        id: 'Build',
        children: [
            {
                id: 'Home',
                icon: <PeopleIcon/>,
                active: false,
                url: '/admin/home'
            },
            {
                id: 'empty',
                icon: <DnsRoundedIcon/>,
                active: false,
                url: '/admin/books'
            },
            {
                id: 'Managerusers',
                icon: <PermMediaOutlinedIcon/>,
                active: false,
                url: '/admin/managerusers'

            },
            {
                id: 'managerhouses',
                icon: <PublicIcon/>,
                active: false,
                url: '/admin/managerhouses'
            },
            {
                id: 'empty',
                icon: <SettingsEthernetIcon/>,
                active: false,
                url: '/admin/functions'
            },
            {
                id: 'empty',
                icon: <SettingsInputComponentIcon/>,
                active: false,
                url: '/admin/machine-learning'
            },
        ],
    }
];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

export default function Navigator(props) {
    const {...other} = props;
    const  navigate = useNavigate();

    const redirectPage = (url) => {
        navigate(url);
    }

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{...item, ...itemCategory, fontSize: 22, color: '#fff'}}>
                    Paperbase
                </ListItem>
                <ListItem sx={{...item, ...itemCategory}}>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText>Project Overview</ListItemText>
                </ListItem>
                {categories.map(({id, children}) => (
                    <Box key={id} sx={{bgcolor: '#101F33'}}>
                        <ListItem sx={{py: 2, px: 3}}>
                            <ListItemText sx={{color: '#fff'}}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({id, icon, active, url}) => (
                            <ListItem disablePadding key={id}  >
                                <ListItemButton selected={active} sx={item} onClick={() => redirectPage(url)}>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText>{id}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Divider sx={{mt: 2}}/>
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}