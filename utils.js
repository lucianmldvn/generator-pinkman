var path = require('path');
var fs = require('fs');

exports.addToFile = function (filename, lineToAdd, beforeMarker, spacing) {

  try {
    var fullPath = path.join(process.cwd(),filename);
    var fileSrc = fs.readFileSync(fullPath,'utf8');

    var indexOf = fileSrc.indexOf(beforeMarker);
    fileSrc = fileSrc.substring(0,indexOf) + lineToAdd + "\n" + spacing + fileSrc.substring(indexOf);

    fs.writeFileSync(fullPath,fileSrc);

  } catch(e) {
    throw e;
  }
};

exports.DIRECTIVE_LESS_MARKER = "/* Add Directive LESS Above */"; 
exports.DIRECTIVE_JS_MARKER = "<!-- Add New Directive JS Above -->";
exports.FILTER_JS_MARKER = "<!-- Add New Filter JS Above -->";
exports.SERVICE_JS_MARKER = "<!-- Add New Service JS Above -->";
exports.MODEL_JS_MARKER = "<!-- Add New Model JS Above -->";
exports.PARTIAL_LESS_MARKER = "/* Add Partial LESS Above */"; 
exports.PARTIAL_JS_MARKER = "<!-- Add New Partial JS Above -->";


exports.DIRECTIVE_JS_TEST_MARKER = "<!-- Add New Directive Test JS Above -->";
exports.FILTER_JS_TEST_MARKER = "<!-- Add New Filter Test JS Above -->";
exports.SERVICE_JS_TEST_MARKER = "<!-- Add New Service Test JS Above -->";
exports.MODEL_JS_TEST_MARKER = "<!-- Add New Model Test JS Above -->"; 
exports.PARTIAL_JS_TEST_MARKER = "<!-- Add New Partial Test JS Above -->";

exports.ROUTE_MARKER = "/* Add New Routes Above */";
