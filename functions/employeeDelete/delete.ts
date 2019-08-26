import {APIGatewayEvent} from 'aws-lambda'


export default async function (event: APIGatewayEvent): Promise<any> {

	let id = event.pathParameters;
	id = id.id

	const query = `DELETE FROM employees_tb WHERE id = '${id}'`
		 
	return queryDelete(query)
		.then((res) => {
			return {body: JSON.stringify({data: res,})}
		})
		.catch((error) => {
			return {body: JSON.stringify({data:error.message,})}
		})
}

function queryDelete(q): Promise<any> {

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
