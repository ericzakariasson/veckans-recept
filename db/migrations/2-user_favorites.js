'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "favorites", deps: [recipes, users]
 *
 **/

var info = {
    "revision": 2,
    "name": "user_favorites",
    "created": "2019-02-08T23:42:56.412Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "favorites",
        {
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            },
            "recipeId": {
                "type": Sequelize.INTEGER,
                "field": "recipeId",
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "recipes",
                    "key": "id"
                },
                "primaryKey": true
            },
            "userId": {
                "type": Sequelize.INTEGER,
                "field": "userId",
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "users",
                    "key": "id"
                },
                "primaryKey": true
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
