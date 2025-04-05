import React from 'react'
import '@mantine/core/styles.css';
import { useModal } from '../../../hooks/useModal';
import classes from './Sidebar.module.css'
import { Button, Center, Stack, useMantineColorScheme } from '@mantine/core'
import { IconPlus, IconArrowsJoin, IconMoon, IconSun } from '@tabler/icons-react';

function Sidebar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const createServerModal = useModal("CreateServer");
  return (
    <nav className={classes.navbar}>
     <Center>
      <Button 
       className={classes.link}
       variant="subtle" 
       radius={100} 
       onClick={createServerModal.openModal}>
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
      <Stack justify="center" align="center">
       <Button
        className={classes.link}
        variant="subtle"
        onClick={toggleColorScheme}
        radius={100}
        p={0}
        >
         { colorScheme === 'dark' ? (
            <IconMoon radius={100} /> 
            ): (
            <IconSun radius={100} />)
         }
       </Button>
      </Stack>
    </nav>
  )
}

export default Sidebar