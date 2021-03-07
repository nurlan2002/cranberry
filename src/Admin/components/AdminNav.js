import React, { useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { useHistory, useLocation } from 'react-router-dom';

function AdminNav({activeItem, setActiveItem, handleItemClick}) {
    const history = useHistory();
    const location = useLocation();
    
    useEffect(() => {
        let path = location.pathname;
        path = path.split('/');
        path = path[path.length - 1];
        if(path == 'products' || path == 'orders' || path == 'users')
            setActiveItem(path.charAt(0).toUpperCase() + path.slice(1));
    }, []);

    useEffect(() => {
        history.push(`/admin/${activeItem.toLowerCase()}`);
    }, [activeItem]);

    return (
        <Menu fluid widths={4} pointing stackable>
            <Menu.Item
                name='Dashboard'
                active={activeItem === 'Dashboard'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='Products'
                active={activeItem === 'Products'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='Orders'
                active={activeItem === 'Orders'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='Users'
                active={activeItem === 'Users'}
                onClick={handleItemClick}
            />
        </Menu>
    )
}

export default AdminNav;
