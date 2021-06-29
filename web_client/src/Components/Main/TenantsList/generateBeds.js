import React from 'react'
import {Tenant} from './Tenant'

export const generateBeds = (amountOfBeds, tenants, styles) =>{
	let beds = Array(amountOfBeds);
	tenants?.forEach(tenant=>{
		beds[tenant.bed_number-1] = <Tenant name={tenant.name} bedNumber={tenant.bed_number} nextPaymentDate={tenant.next_payment_date} id = {tenant.id} key={tenant.id}/>
	})
	for(let i = 0, len = beds.length; i < len; i++){
		if(!beds[i])
			beds[i] = getFreeBed(i+1, styles)
	}
	
	
	return beds;
}

function getFreeBed(key, styles){
	return <div className = {styles.List_FreeSpace} key={key}>Free Bed</div>;
}