'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return [
            queryInterface.addColumn(
                'Users',
                'firstname',
                {
                    type: Sequelize.STRING,
                    allowNull: true
                },
            ),
            queryInterface.addColumn(
                'Users',
                'lastname',
                {
                    type: Sequelize.STRING,
                    allowNull: true
                }
            ),
            queryInterface.addColumn(
                'Users',
                'department_id',
                {
                    type: Sequelize.INTEGER,
                    allowNull:true
                }
            ),
            queryInterface.addColumn(
                'Users',
                'role_id',
                {
                    type:Sequelize.INTEGER,
                    allowNull:true
                }
            ),
            queryInterface.addColumn(
                'Users',
                'email',
                {
                    type:Sequelize.STRING,
                    allowNull:true
                }
            )
        ]
    },

    down: (queryInterface, Sequelize) => {
        return[
            queryInterface.removeColumn('Users', 'firstname'),
            queryInterface.removeColumn('Users', 'lastname'),
            queryInterface.removeColumn('Users', 'department_id'),
            queryInterface.removeColumn('Users', 'role_id'),
            queryInterface.removeColumn('Users', 'email')
        ]
    }
};
