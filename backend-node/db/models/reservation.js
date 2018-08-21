'use strict';
module.exports = (sequelize, DataTypes) => {
  var reservation = sequelize.define('reservation', {    
    roomId: DataTypes.INTEGER,
    memo: DataTypes.STRING,
    startAt: DataTypes.DATE,
    endAt: DataTypes.DATE
  }, {});
  reservation.associate = function (models) {
    // associations can be defined here     
    reservation.belongsTo(models.room, {
      foreignKey: 'roomId'
    })
  };
  return reservation;
};