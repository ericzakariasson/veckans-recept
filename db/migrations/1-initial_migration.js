'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "items", deps: []
 * createTable "recipes", deps: []
 * createTable "tags", deps: []
 * createTable "units", deps: []
 * createTable "users", deps: []
 * createTable "sections", deps: [recipes]
 * createTable "instructions", deps: [recipes]
 * createTable "recipe_tags", deps: [recipes, tags]
 * createTable "scores", deps: [recipes]
 * createTable "ingredients", deps: [units, items, sections]
 * createTable "weeks", deps: [users]
 * createTable "week_recipes", deps: [weeks, recipes]
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2019-02-08T22:37:22.718Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "items",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "recipes",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "providerId": {
                    "type": Sequelize.STRING,
                    "field": "providerId"
                },
                "provider": {
                    "type": Sequelize.STRING,
                    "field": "provider"
                },
                "url": {
                    "type": Sequelize.STRING,
                    "field": "url",
                    "allowNull": false
                },
                "title": {
                    "type": Sequelize.STRING,
                    "field": "title",
                    "allowNull": false
                },
                "description": {
                    "type": Sequelize.TEXT,
                    "field": "description"
                },
                "difficulty": {
                    "type": Sequelize.STRING,
                    "field": "difficulty"
                },
                "time": {
                    "type": Sequelize.INTEGER,
                    "field": "time"
                },
                "portions": {
                    "type": Sequelize.INTEGER,
                    "field": "portions"
                },
                "numberOfIngredients": {
                    "type": Sequelize.INTEGER,
                    "field": "numberOfIngredients"
                },
                "type": {
                    "type": Sequelize.STRING,
                    "field": "type"
                },
                "image": {
                    "type": Sequelize.STRING,
                    "field": "image"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "tags",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "units",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "unique": true,
                    "allowNull": false
                },
                "short": {
                    "type": Sequelize.STRING,
                    "field": "short",
                    "unique": true,
                    "allowNull": false
                },
                "qty": {
                    "type": Sequelize.FLOAT,
                    "field": "qty"
                },
                "type": {
                    "type": Sequelize.STRING,
                    "field": "type"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "validate": {
                        "isEmail": true
                    },
                    "unique": true,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "sections",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "order": {
                    "type": Sequelize.INTEGER,
                    "field": "order",
                    "allowNull": false
                },
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
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "recipes",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "instructions",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "step": {
                    "type": Sequelize.INTEGER,
                    "field": "step",
                    "allowNull": false
                },
                "text": {
                    "type": Sequelize.TEXT,
                    "field": "text",
                    "allowNull": false
                },
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
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "recipes",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "recipe_tags",
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
                "tagId": {
                    "type": Sequelize.INTEGER,
                    "field": "tagId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "tags",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "scores",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "score": {
                    "type": Sequelize.INTEGER,
                    "field": "score"
                },
                "averageScore": {
                    "type": Sequelize.INTEGER,
                    "field": "averageScore",
                    "allowNull": false
                },
                "votes": {
                    "type": Sequelize.INTEGER,
                    "field": "votes",
                    "allowNull": false
                },
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
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "recipes",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "ingredients",
            {
                "amount": {
                    "type": Sequelize.FLOAT,
                    "field": "amount"
                },
                "amountPerPortion": {
                    "type": Sequelize.FLOAT,
                    "field": "amountPerPortion"
                },
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
                "unitId": {
                    "type": Sequelize.INTEGER,
                    "field": "unitId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "units",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "itemId": {
                    "type": Sequelize.INTEGER,
                    "field": "itemId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "items",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "sectionId": {
                    "type": Sequelize.INTEGER,
                    "field": "sectionId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "sections",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "weeks",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.INTEGER,
                    "field": "name",
                    "allowNull": true
                },
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
                "userId": {
                    "type": Sequelize.INTEGER,
                    "field": "userId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "week_recipes",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "order": {
                    "type": Sequelize.INTEGER,
                    "field": "order",
                    "allowNull": false
                },
                "day": {
                    "type": Sequelize.STRING,
                    "field": "day",
                    "allowNull": false
                },
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
                "weekId": {
                    "type": Sequelize.INTEGER,
                    "field": "weekId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "weeks",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "recipeId": {
                    "type": Sequelize.INTEGER,
                    "field": "recipeId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "recipes",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    }
];

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
