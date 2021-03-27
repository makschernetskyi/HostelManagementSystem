import React from 'react'
import styles from './Footer.module.sass'




export const Footer = props =>{
    return(
        <footer className = {styles.footer}>
            author: <a href = "https://github.com/makschernetskyi">makschernetskyi</a>
        </footer>
    )
}