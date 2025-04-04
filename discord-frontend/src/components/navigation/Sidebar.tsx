import React from 'react'
import classes from './Sidebar.module.css'
import { Button, Center } from '@mantine/core'

function Sidebar() {
  return (
    <nav className={classes.navbar}>
     <Center>
      <Button variant="subtle" radius={100} onClick={() => {}}>
      </Button>
     </Center>
    </nav>
  )
}

export default Sidebar