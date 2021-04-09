import React from 'react'
import styles from './Tenant.module.sass'
import {NavLink} from 'react-router-dom'

import getLink from './linkGenerator.js'

export const Tenant = props =>
		<NavLink to={getLink(props.name, props.id)} className = {styles['tenant-item']} >
			yeeeeeeeeeeey
		</NavLink>

