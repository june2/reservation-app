'use strict';
module.exports = (sequelize, DataTypes) => {
  var reservation = sequelize.define('reservation', {
    date: DataTypes.DATE
  }, {});
  reservation.associate = function(models) {
    // associations can be defined here
  };
  return reservation;
};