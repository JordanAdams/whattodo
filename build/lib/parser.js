'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getLineFromPos=require('get-line-from-pos');var _getLineFromPos2=_interopRequireDefault(_getLineFromPos);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default={ /**
     * Tags to search for.
     * @type {Array}
     */tags:['todo','fixme'], /**
     * Parsers to use.
     * @return {Array} Parsers.
     */get parsers(){return [this.parseDoubleSlashStyle.bind(this),this.parseHashStyle.bind(this),this.parseDoubleHyphenStyle.bind(this),this.parseSlashStarBlockStyle.bind(this)]}, /**
     * Regex pattern for the search tags.
     * @return {String} Pattern.
     */get tagsPattern(){return '@?('+this.tags.join('|')+'):?'}, /**
     * Parses the given code.
     *
     * @param  {String} code Code to parse.
     * @return {Array}       Results.
     */parse:function parse(code){return this.parsers.reduce(function(comments,method){return comments.concat(method(code))},[])}, /**
     * Parses double-slash style comments.
     * Example: // todo: do something.
     *
     * @param  {String} code Code to parse.
     * @return {Array}       Results.
     */parseDoubleSlashStyle:function parseDoubleSlashStyle(code){var patternString='^\\s*//\\s+'+this.tagsPattern+' (.+)$';return this.parseSingleLineStyle(code,patternString)}, /**
     * Parses hash style comments.
     * Example: # todo: do something.
     *
     * @param  {String} code Code to parse.
     * @return {Array}       Results.
     */parseHashStyle:function parseHashStyle(code){var patternString='^\\s*#\\s+'+this.tagsPattern+' (.+)$';return this.parseSingleLineStyle(code,patternString)}, /**
     * Parses double-hyphen style comments.
     * Example: -- todo: do something.
     *
     * @param  {String} code Code to parse.
     * @return {Array}       Results.
     */parseDoubleHyphenStyle:function parseDoubleHyphenStyle(code){var patternString='^\\s*\\-\\-\\s+'+this.tagsPattern+' (.+)$';return this.parseSingleLineStyle(code,patternString)}, /**
     * Parses slash-star block style comments.
     * Example: this comment
     *
     * @param  {String} code Code to parse.
     * @return {Array}       Results.
     */parseSlashStarBlockStyle:function parseSlashStarBlockStyle(code){var patternString='/\\*+[\\s\\S]*?'+this.tagsPattern+' (.+?)[\\r\\n]?\\s*\\*\\/';var pattern=new RegExp(patternString,'gi');var blocks=[];var match=null;while((match=pattern.exec(code))!==null){blocks.push({raw:match[0].trim(),tag:match[1].toUpperCase(),value:match[2],line:(0,_getLineFromPos2.default)(code,match.index)})}return blocks}, /**
     * Parses single line comments
     *
     * @param  {String} code          Code to Parse.
     * @param  {String} patternString Search pattern.
     * @return {Array}                Results.
     */parseSingleLineStyle:function parseSingleLineStyle(code,patternString){var pattern=new RegExp(patternString,'i'); // 1. Split to lines
// 2. Map to {index, value}
// 3. Filter out non matches
// 4. Match capture groups and create result object
return code.split('\n').map(function(value,index){return {index:index,value:value}}).filter(function(line){return pattern.exec(line.value)!==null}).map(function(line){var match=pattern.exec(line.value);return {raw:line.value.trim(),tag:match[1].toUpperCase(),value:match[2],line:line.index+1}})}};