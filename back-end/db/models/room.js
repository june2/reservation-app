'use strict';
module.exports = (sequelize, DataTypes) => {
  var room = sequelize.define('room', {
    name: DataTypes.STRING
  }, {});
  room.associate = function(models) {
    // associations can be defined here
    room.hasMany(models.reservation);
  };
  return room;
};