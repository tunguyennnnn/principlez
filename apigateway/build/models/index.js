"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basename = _path.default.basename(__filename);

var env = process.env.NODE_ENV || 'development';
var db = {};
var config = _config.default[env];
var sequelize;

if (config.use_env_constiable) {
  sequelize = new _sequelize.default(process.env[config.use_env_constiable], config);
} else {
  sequelize = new _sequelize.default(config.database, config.username, config.password, config);
}

_fs.default.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = sequelize['import'](_path.default.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = _sequelize.default;
module.exports = db;