exports.seed = async function (knex) {
    
    await knex('cars').truncate()

    await knex('cars').insert([
        { vin: '3LNHL2JC6BR761449', make: 'acura', model: 'tl', mileage: '189922', title: 'clean', transmission: '6 speed auto' },
        { vin: '3LNHL2JC6BR761409', make: 'toyota', model: 'highlander', mileage: '150900', title: 'salvage', transmission: '6 speed auto' },
        { vin: '3LNHL2JC6BR761119', make: 'toyota', model: 'prius', mileage: '10000', title: 'rebuilt', transmission: 'cvt' }
    ])
}
