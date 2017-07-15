/**
 * Created by Neeraj Wadhwa on 7/5/17.
 */

var TableFormat = {
    chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
        , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
        , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
        , 'right': '' , 'right-mid': '' , 'middle': ' ' },
    style: { 'padding-left': 0, 'padding-right': 0 }
};
module.exports.TableFormat = TableFormat;


const dataDir = {
    proxyDir: "./data/proxies/", //+ proxyName + revisionNumber / proxy.zip
    developerDir: "./data/developers/",
    productDir: "",
    appsDir: "",
    envKvmDir: "./data/envKvms/",
    orgKvmDir: "./data/orgKvms/",
    proxyKvmDir: "./data/proxyKvms/",
    targetserverDir: "./data/targetservers/",
    cacheDir: "./data/cache/",
    userDir: "./data/users/"
};
module.exports.dataDir = dataDir;

