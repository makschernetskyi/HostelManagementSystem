import React from 'react'
import styles from './SearchBar.module.sass'



export const SearchBar = props =>{
    return(
        <div className = {styles.searchBar}>
            <input type='search' placeholder="Search..." className={styles.searchBar__input}></input>
        </div>
    )
}