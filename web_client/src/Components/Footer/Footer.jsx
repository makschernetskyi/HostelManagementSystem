import React from 'react'
import styles from './Footer.module.sass'




export const Footer = props =>{
	return(
		<footer className = {styles.Footer}>
			<p className = {styles.Footer_AuthorRef}> author:
				<a href = "https://github.com/makschernetskyi" target="_blank" className ={styles.Footer_AuthorRef_Link}>
					makschernetskyi
				</a>
			</p>
		</footer>
	)
}