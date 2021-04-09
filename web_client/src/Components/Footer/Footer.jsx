import React from 'react'
import styles from './Footer.module.sass'




export const Footer = props =>{
	return(
		<footer className = {styles.footer}>
			<p className = {styles.author_ref}> author: 
				<a href = "https://github.com/makschernetskyi" target="_blank" className ={styles.link}>
					makschernetskyi
				</a>
			</p>
		</footer>
	)
}