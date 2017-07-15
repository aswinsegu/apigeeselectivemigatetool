/**
 * Created by Neeraj Wadhwa on 7/5/17.
 */

const _ = require('lodash');
const Table = require('cli-table');
const options = require('../options');


let commands = {
    exportproxies: {
        name: "exportproxies",
        description: '      -- Export the specified proxies from source organization.',
        load: function() {
            return require('./exportProxies');
        }
    },
    importproxies: {
        name: "importproxies",
        description: '      -- Import the proxies to target organization.',
        load: function() {
            return require('./exportProxies');
        }
    }
    //enter more commands here
};


module.exports.commands = commands;


module.exports.getCommand = function(n) {
    let command = _.findKey(commands, function(val, key) {
        return key.toLowerCase() === n.toLowerCase();
    });
    return commands[command]
};


module.exports.printCommandHelp = function() {
    console.error();
    console.error('Valid commands:');
    console.error("");

    let tab = new Table(options.TableFormat);
    _.each(commands, function(p) {
        tab.push([p.name.toString(),  p.description]);
    });
    console.error(tab.toString());
};
