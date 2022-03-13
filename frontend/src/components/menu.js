import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom'

import { authContext } from '../context/auth'

function MenuBar() {
    const {user, logout } = useContext(authContext)


    const location = useLocation()
    const pathname = location.pathname
    const path = pathname === '/' ? 'home' : pathname.substring(1)
    const [activeItem, setActiveItem] = useState(path)


  const handleItemClick = (e, { name }) => setActiveItem(name)

    const menubar = user ? 
    
    (
        <Menu pointing secondary size='massive' color='teal'>
          <Menu.Item
            name={user.username}
            active
            as ={Link}
            to='/'
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              onClick={logout}
              
            />
          </Menu.Menu>
        </Menu>
    )

    :

    (
        <Menu pointing secondary size='massive' color='teal'>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as ={Link}
            to='/'
          />
          <Menu.Menu position='right'>
            <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as ={Link}
                to='/login'
            />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as ={Link}
              to='/register'
            />
          </Menu.Menu>
        </Menu>
    )



    return menubar
  }


export default MenuBar