module.exports = function (sequelize, DataTypes) {
    let Profile = sequelize.define("Profile", {
      petName: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      animalType: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      animalBreed: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      age: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      gender: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      personality: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      qualifications: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      facebook: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      twitter: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      instagram: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      ownerName: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      ownerEmail: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      avatar: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    });
  
    Profile.associate = function (models) {
  
      Profile.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Profile;
  };
  