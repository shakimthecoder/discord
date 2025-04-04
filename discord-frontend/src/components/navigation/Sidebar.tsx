import React from 'react'
import '@mantine/core/styles.css';
import classes from './Sidebar.module.css'
import { Button, Center } from '@mantine/core'
import { IconPlus, IconArrowsJoin } from '@tabler/icons-react';

function Sidebar() {
  return (
    <nav className={classes.navbar}>
     <Center>
      <Button 
       className={classes.link}
       variant="subtle" 
       radius={100} 
       onClick={() => 
        {}}>
          <IconPlus radius={100} />
      </Button>
     </Center>
     <Button
     className={classes.link}
     variant="subtle"
     radius={100}
     onClick={() => {}}
     >
      <IconArrowsJoin radius={300} />
     </Button>
    </nav>
  )
}

export default Sidebar