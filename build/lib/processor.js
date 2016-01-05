'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};Object.defineProperty(exports,'__esModule',{value:true});var _fs=require('mz/fs');var _fs2=_interopRequireDefault(_fs);var _path=require('path');var _path2=_interopRequireDefault(_path);var _q=require('q');var _q2=_interopRequireDefault(_q);var _parser=require('./parser');var _parser2=_interopRequireDefault(_parser);var _flattenDeep=require('lodash/array/flattenDeep');var _flattenDeep2=_interopRequireDefault(_flattenDeep);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default={ /**
     * Directories to ignore.
     * @type {Array}
     */ignore:['node_modules','.git','bower_components','vendor'], /**
     * Processes file at the given path.
     *
     * @param  {String}  filePath File path.
     * @return {Promise}          Results.
     */file:function file(filePath){return _fs2.default.readFile(filePath,'utf8').then(function(contents){return _parser2.default.parse(contents)}).then(function(results){return results.map(function(result){return _extends({path:filePath},result)})})}, /**
     * Processes files in directory at the given path.
     *
     * @param  {String}        dirPath Directory path.
     * @return {Promise|Array}         Results.
     */dir:function dir(dirPath){var _this=this;if(this.ignore.indexOf(_path2.default.basename(dirPath))>=0){return []}var promises=_fs2.default.readdir(dirPath).then(function(items){return items.map(function(item){var itemPath=_path2.default.join(dirPath,item);return _this.path(itemPath)})});return _q2.default.all(promises).then(_flattenDeep2.default)}, /**
     * Processes anything at the given path.
     *
     * @param  {String}  searchPath Path.
     * @return {Promise}            Results.
     */path:function path(searchPath){var _this2=this;return _fs2.default.stat(searchPath).then(function(stat){if(stat.isFile())return _this2.file(searchPath);if(stat.isDirectory())return _this2.dir(searchPath);throw new Error('Unable to process path: '+searchPath)})}};