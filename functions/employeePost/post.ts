import {APIGatewayEvent} from 'aws-lambda'


export default async function (event: APIGatewayEvent): Promise<any> {
	const pool = require('../../configs/dbConfig.js');
	const {id, name, email, phone, address} = event.queryStringParameters;

	const query = `INSERT INTO employees_tb (name, email, phone, address, active) \
		 VALUES ('${name}', '${email}', '${phone}', '${address}', 1)`
		
	return queryPost(query)
		.then((res) => {
			return {body: JSON.stringify({data: res,})}
		})
		.catch((error) => {
			return {body: JSON.stringify({data:error.message,})}
		})
}

function queryPost(q): Promise<any> {

	var pool = require('../../configs/dbConfig.js')

	return new Promise((resolve,reject) => {
  		pool.query(q, (err, results, fields) => {
			if (err) 
				reject(err);
			else resolve(results)	
		})

	});
}
