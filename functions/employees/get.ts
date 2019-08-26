import {APIGatewayEvent} from 'aws-lambda';

export default async function (event: APIGatewayEvent): Promise<any> {

	console.log(event.headers['Content-Type'])

	return queryGet()
		.then((res) => {
			return {body: JSON.stringify({data:res,})}
		})
		.catch((error) => {
			return {body: JSON.stringify({data:error.message,})}
		})
		
}

function queryGet(): Promise<any> {

	var pool = require('../../configs/dbConfig.js')
	const query = `SELECT * FROM employees_tb`

	return new Promise((resolve,reject) => {
  		pool.query(query, (err, results, fields) => {
			if (err) 
				reject(err);
			else resolve(results)	
		})

	});
}
