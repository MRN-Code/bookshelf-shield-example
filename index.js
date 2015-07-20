'use strict';

const relations = require('relations');
const shield = require('bookshelf-shield');
const fs = require('fs');

relations.define('study', {
    PI: ['read_Study'],
    siteAdmin: [
        'read_Study',
        'update_Study',
        'create_Study',
        'delete_Study'
    ]
});

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'devdbcoin.mrn.org',
        user: 'node_api',
        port: 5432,
        password: fs.readFileSync('/coins/keys/node_api_pwd').toString().trim(),
        database: 'dyldb',
        charset: 'utf8'
    }
});

console.log(fs.readFileSync('/coins/keys/node_api_pwd').toString().trim());

const bookshelf = require('bookshelf')(knex);

const Study = bookshelf.Model.extend({tableName: 'mrs_studies'});

const config = [
    {
        defaults: {
            modelName: 'Study',
            authKey: 'id',
            aclContextName: 'study'
        },
        //optional action-specific configs here
    }
]

shield({
    config: config,
    models: {Study: Study},
    acl: relations
});

//new Study({pi_id: 'KKIEHL'}).fetchAll().then(console.dir);
