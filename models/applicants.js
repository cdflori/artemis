module.exports = function(sequelize, DataTypes) {
    let Applicants = sequelize.define("Applicants", {
      
    });
  
    Applicants.associate = function(models) {
      // We're saying that a Post should belong to an User
      // A Post can't be created without an User due to the foreign key constraint
      Applicants.belongsTo(models.Profile, {
        foreignKey: {
          allowNull: false
        }
      });
      Applicants.belongsTo(models.Jobs, {
          foreignKey: {
              allowNull: false
          }
      });
    };
  
    return Applicants;
  };