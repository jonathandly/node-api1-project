exports.seed = function(knex) {
	return knex('users')
		.truncate()
		.then(function() {
			return knex('users').insert([
				{
					name: 'Ted Williams',
					bio: 'Insert boring bio details here.',
				},
				{
					name: 'Ganja Mddison',
					bio: 'A somehwat less disappointing bio goes brrr.',
				},
			]);
		});
};

