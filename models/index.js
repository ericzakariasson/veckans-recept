const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

const modelFiles = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .map(file => {
    const filePath = path.resolve(path.join(__dirname, file));
    const fileName = file.split('.')[0];

    return { filePath, fileName };
  });

const modelOptions = {
  // underscored: true
};

module.exports = { modelFiles, modelOptions };
