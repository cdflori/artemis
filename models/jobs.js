module.exports = function (sequelize, DataTypes) {
  let Jobs = sequelize.define("Jobs", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    time: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    benefits: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    salary: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    experience: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
  });

  Jobs.associate = function (models) {

    Jobs.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Jobs;
};
