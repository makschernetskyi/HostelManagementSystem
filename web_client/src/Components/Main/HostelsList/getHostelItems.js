import React from 'react'
import getLink from './convertNameToLink'
import { Hostel } from './Hostel'

const getHostelItems = (hostels) =>{
	try{
		const items = 
			hostels.map(
				hostel => {
					return( 
							<Hostel 
								name={hostel.name} 
								adress={hostel.adress} 
								rooms={hostel.amount_of_rooms} 
								freeSpace={hostel.amount_of_beds - hostel.occupated_beds} 
								description={hostel.about}
								link = {getLink(hostel.name, hostel.id)}
								key={hostel.id}
							/> 
						)
				}
			)
		return items
	}catch(e){
		console.error(e);
		return (<p>Sorry cannot fetch data, Error occured <br/> try later </p>)
	}
}

export default getHostelItems