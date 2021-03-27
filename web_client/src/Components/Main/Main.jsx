import React from 'react'
import styles from './Main.module.sass'

import { HostelsList } from './HostelsList'

export const Main = props => {
    return(
        <main className = {styles.main}>
            <HostelsList/>
        </main>
    )
}