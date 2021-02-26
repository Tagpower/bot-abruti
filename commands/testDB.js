const { Client } = require('pg');
const DB = require('../abruti.js').Constants.DATABASE;

module.exports = {
	name: 'testdb',
	description: "Test.",
	works_in_dm: true,
	execute(message, args) {
		console.log(JSON.stringify(DB));
		const db_client = new Client({
			host: DB.HOST,
			port: 5432,
			user: DB.USER,
			password: DB.PASSWORD,
			database: DB.DATABASE,
			//connectionString: process.env.DATABASE_URL,
			ssl: {
			  rejectUnauthorized: false
			}
		  });
		  
		  db_client.connect(function (err) {
			if (err) {
				console.log(err);
			} else {
				console.log('ouer');
			}
		  });
		  
		  db_client.query('SELECT * FROM public.journee WHERE id=103', (err, res) => {
			if (err) console.log(err);
			for (let row of res.rows) {
			  console.log(JSON.stringify(row));
			}
			db_client.end();
		  });
		message.channel.send("_wesh_");
	}
}


