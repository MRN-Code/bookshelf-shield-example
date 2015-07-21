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

relations.study('dylan is PI of 367');

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

const bookshelf = require('bookshelf')(knex);

const Study = bookshelf.Model.extend({tableName: 'mrs_studies'});

const config = [
    {
        defaults: {
            modelName: 'Study',
            authKey: 'study_id',
            aclContextName: 'study'
        }
    }
];

shield({
    config: config,
    models: {Study: Study},
    acl: relations
});

const user = {username: 'dylan'};

const dylanStudy = new Study({study_id: 367});
const runtangStudy = new Study({study_id: 347});

//dylanStudy.read(user).then(console.log).catch(console.error);
runtangStudy.read(user).then(console.log).catch(console.error);
