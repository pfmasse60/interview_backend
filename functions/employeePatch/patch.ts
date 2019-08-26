import {APIGatewayEvent} from 'aws-lambda'


export default async function (event: APIGatewayEvent): Promise<any> {

	let paramid = event.pathParameters;
	paramid = paramid.id

	const {id, name, email, phone, address} = event.queryStringParameters;

	const query = `UPDATE employees_tb SET name = '${name}', email ='${email}', \
phone = '${phone}', address = '${address}' WHERE id = '${paramid}'`
		 
	return queryPatch(query)
		.then((res) => {
			return {body: JSON.stringify({data: res,})}
		})
		.catch((error) => {
			return {body: JSON.stringify({data:error.message,})}
		})
}

function queryPatch(q): Promise<any> {

	var pool = require('../../configs/dbConfig.js')

	return new Promise((resolve,reject) => {
  		pool.query(q, (err, results, fields) => {
			if (err) 
				reject(err)
			else 
				resolve(results)
		})

	});
}
