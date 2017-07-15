/**
 * Created by Neeraj Wadhwa on 7/11/17.
 */

const _ = require('lodash');
const fs = require('fs');
const intersect = require('intersect');
const objectForeach = require('object-foreach');
const promptCheckbox = require('prompt-checkbox');
const async = require('async');

const utilsForImport = require('../utilsForImport');
const urlBuilder = require('../URLBuilders');
const config = require('../../config');
const utils = require('../utils');
const options = require('../options');



let pathToCache = options.dataDir.cacheDir;


async function start(pathToCache) {
    utils.getExportedEntities(pathToCache).then(async (list)=>{

        if(list){
            let envList;
            try {
                envList = JSON.parse(await utilsForImport.getListOfEnvironments());
            }
            catch (e){
                return console.log("Error: ", e);
            }

            let toBeImported = await checkForExistence(list, envList);

            // let promises = [];
            //
            // envList.forEach(async (env)=>{
            //     promises.push(makeEnvCachePair(env));
            // });
            //
            // let output = await Promise.all(promises);
            //
            // let correctedOutput = await correctUndefinedEntries(output);
            //
            // if(correctedOutput.length > 0){
            //     //ask user what to do
            //
            //     checkForExistence(list, )
            //
            //     // let promptObject = await makePromptCompatibleChoice(correctedOutput);
            //     // //console.log(promptObject);
            //     // promptUser(promptObject, list);
            //
            //
            // }
            // else {
            //     // don't have anything on target
            //     //just push everything there
            //
            //     envList.forEach((env)=>{
            //         processImports(list, env);
            //     });
            //     // list.forEach((path)=>{
            //     //     const regex = /\/[a-z].*\//g;
            //     //     while ((m = regex.exec(path)) !== null) {
            //     //         // This is necessary to avoid infinite loops with zero-width matches
            //     //         if (m.index === regex.lastIndex) {
            //     //             regex.lastIndex++;
            //     //         }
            //     //
            //     //         // The result can be accessed through the `m`-variable.
            //     //         m.forEach((match, groupIndex) => {
            //     //             //console.log(`Found match, group ${groupIndex}: ${match}`);
            //     //             console.log(match.split('/'));
            //     //         });
            //     //     }
            //     // });
            // }
        }
    });
}

//module.exports.start = start(pathToCache)
start(pathToCache);



function processImports(list, env) {

    list = _.filter(list, (path)=>{
        return path.indexOf(env) > -1;
    });

    importCache(list, env);
}



function importCache(cachePath, env) {

    let cacheName = cachePath.replace(/^.*[\\\/]/, '').slice(0, -5);

    let url = urlBuilder.getCachePath(config.to.org, env);

    let requestObject = utilsForImport.requestForImport;
    requestObject.url = utilsForImport.requestForImport.baseurl + url;
    requestObject.method = 'POST';
    requestObject.body = fs.readFileSync(cachePath, 'utf8');

    utils.makePostRequest(requestObject, config.to.userid, config.to.passwd, function (err, res) {
        if(err){
            console.log('Error while uploading cache "' + cacheName + '" to "' + env + '"');
            return console.log("Error is ", err);
        }
        if(res.statusCode >= 400){
            console.log('Error while uploading cache "' + cacheName + '" to "' + env + '"');
            return console.log("Error is " +  res.statusMessage + "");
        }
        console.log('Cache "' + cacheName + '" was uploaded to "' + env + '"');
    });
}



async function makeEnvCachePair(env) {
    try {
        let cacheList = JSON.parse(await utilsForImport.getListOfCaches(env));
        if (cacheList.length > 0) {
            return {[env]: cacheList}
        }
    }
    catch (e) {
        console.log("Error: ", e);
    }
}



function correctUndefinedEntries(arr) {
    return new Promise(function (resolve, reject) {

        let newArray = [];

        arr.forEach((el)=>{
            if(el !== undefined){
                newArray.push(el);
            }
        });
        resolve(newArray);
    });
}




function makePromptCompatibleChoice(withPath, envs,  choices){
    return new Promise(function(resolve, reject){

        choices = _.uniq(choices);

        withPath.forEach((path)=>{
            choices.forEach((choice)=>{
               if(withPath.indexOf(choice) > -1 && withPath.indexOf()){

               }
            });
        });


        // let newObject = {};
        // arr.forEach((ob)=>{
        //
        //     objectForeach(ob, function (val, prop, ob) {
        //         newObject[prop] = val;
        //     });
        // });
        // resolve(newObject);
    });
}




function promptUser(promptChoices, listOfPaths, exportedList) {

    let promptObject = {
        name: "exists",
        message: 'These caches were found in target env, select those which should be updated',
        radio: true,
        choices: promptChoices
    };

    let prompt = new promptCheckbox(promptObject);

    prompt.run().then(function (answers) {

        if(answers.length === 0){
            console.log("No cache were tagged for update");

            //subtract prompt choices from listOfPaths
            importWithoutUpdate(listOfPaths, promptChoices);
        }
        else {
            let toBeUpdated = _.uniq(answers);
            processAnswers(toBeUpdated, listOfPaths);

            let toBeImported = _.difference(exportedList, promptChoices);

            if(toBeImported.length > 0){
                correctAndImport(listOfPaths, toBeImported)
            }
            else{
                console.log("We don't have anything new to import");
            }
        }
    }).catch(function (e) {
        console.log("Error in prompt: ", e);
    });
}




function correctAndImport(listOfPath, toBeImported) {
    toBeImported.forEach(async (answer)=>{
        listOfPath.forEach(async (path)=>{
            let env = await extractEnvListFromExports('' + path + '');
            if(path.indexOf(answer) > -1 && path.indexOf(env[0] > -1)){
                importCache(path, env[0]);
            }
        })
    });
}




function extractEnvListFromExports(str){
    return new Promise(function(resolve, reject){
        const regex = /\/[a-z].*\//g;
        let m;
        let envList = [];
        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                let mat = match.split(',');
                mat.forEach((arr)=>{
                    let envName = arr.split('/')[2];
                    if(!_.includes(envList, envName)){
                        envList.push(envName);
                    }
                })
            });
        }
        resolve(envList);
    });
}



async function checkForExistence(list, envList) {
    let exportedEnvs = await extractEnvListFromExports(''+ list + '');

    let envsToCheckFor = _.intersection(exportedEnvs, envList);

    let alreadyOnTarget = await getCachesForSpecificEnvs(envsToCheckFor);
    let exportedList = await extractNames(list);
    // console.log(alreadyOnTarget);
    // console.log(exportedList);

    if(alreadyOnTarget.length > 0){
        //make intersection
        let choices = _.uniq(intersect.big(exportedList, alreadyOnTarget));

        makePromptCompatibleChoice(list, envsToCheckFor, choices);

        promptUser(choices, list ,exportedList);
    }
    else {
        //import everything that we have without any prompt;
        processImport(list);
    }
}


function getCachesForSpecificEnvs(envsToCheckFor) {

    return new Promise(async function (resolve, reject) {

        let cacheList = [];

        for(let i = 0; i < envsToCheckFor.length; i++){
            let caches = JSON.parse(await utilsForImport.getListOfCaches(envsToCheckFor[i]));
            if(caches.length > 0){
                cacheList.push(...caches);
            }
        }
        // envsToCheckFor.forEach(async (env)=>{
        //     let caches = JSON.parse(await utilsForImport.getListOfCaches(env));
        //     if(caches.length > 0){
        //         cacheList.push(...caches);
        //     }
        // });
        resolve(cacheList);
    });
}



function extractNames(exportedCaches) {

    return new Promise(function (resolve, reject) {
        let exportedList = [];
        exportedCaches.forEach((cache)=>{
            let cachePath = cache.replace(/^.*[\\\/]/, '');
            //console.log(targetServerPath);
            let nameOfCache = cachePath.slice(0, -5);
            exportedList.push(nameOfCache);
        });
        resolve(exportedList);
    });
}


//
function processAnswers(answers, listOfPath) {

    answers.forEach(async (answer)=>{
       listOfPath.forEach(async (path)=>{
           let env = await extractEnvListFromExports('' + path + '');
           if(path.indexOf(answer) > -1 && path.indexOf(env[0] > -1)){
               updateCache(path, env[0]);
           }
       })
    });
}


function processImport(listOfPath) {
    listOfPath.forEach(async (path)=>{
        let env = await extractEnvListFromExports('' + path + '');
        if(path.indexOf(env[0] > -1)){
            importCache(path, env);
        }
    })
}


function updateCache(cachePath, env) {

    let cacheName = cachePath.replace(/^.*[\\\/]/, '').slice(0, -5);

    let url = urlBuilder.getCacheUrl(config.to.org, env, cacheName);
    let requestObject = utilsForImport.requestForImport;
    requestObject.url = utilsForImport.requestForImport.baseurl + url;
    requestObject.method = 'PUT';
    requestObject.body = fs.readFileSync(cachePath, 'utf8');

    utils.makePostRequest(requestObject, config.to.userid, config.to.passwd, function (err, res) {
        if(err){
            console.log('Error while uploading cache "' + cacheName + '" to "' + env + '"');
            return console.log("Error is ", err);
        }
        if(res.statusCode >= 400){
            console.log('Error while uploading cache "' + cacheName + '" to "' + env + '"');
            return console.log("Error is " +  res.statusMessage + "");
        }
        console.log('Cache "' + cacheName + '" was uploaded to "' + env + '"');
    });
}



async function importWithoutUpdate(listOfPath, promptChoices) {

    let exportedList = await extractNames(listOfPath);

    let toBeImported = _.difference(exportedList, promptChoices);

    if(toBeImported.length > 0){
        let correctedPaths = await performCorrection(listOfPath, toBeImported);
        processImport(correctedPaths);
        // /correctUndefinedEntries() this was found inside importCorrected's parenthesis;
    }

    else{
        console.log("Everything is set up already");
    }



    // promptChoices.forEach((promptChoice)=>{
    //    let toBeImported =  _.filter(listOfPath, (path)=>{
    //         return path.indexOf(promptChoice) === -1;
    //     });
    //    console.log(toBeImported);
    //     //processImport(toBeImported);
    // });
}


function performCorrection(withPath, withoutPath) {

    return new Promise(function (resolve, reject) {
        let uniqueWithoutPath = _.sortedUniq(withoutPath);
        let toBeImported = [];
        withPath.forEach((path)=>{
            uniqueWithoutPath.forEach((unique)=>{
                if(path.indexOf(unique) > -1){
                    toBeImported.push(path);
                }
            });
        });
        resolve(toBeImported);
    });
}