/**
 * Created by Neeraj Wadhwa on 7/26/17.
 */

const chai = require('chai');

const utils = require('../lib/utils');
const config = require('../config');
const options = require('../lib/options');

const importCache = require('../lib/commands/importCache');


let expect = chai.expect;



describe('Testing importCache', function () {

    describe('Testing extractEnvListFromExports(str)', function () {

        this.timeout(5000);

        it('should return back the environment list from provided path list', async function () {

            let pathToCache = options.dataDir.cacheDir;

            let list = await utils.getExportedEntities(pathToCache);

            let envList = await importCache.extractEnvListFromExports('' + list + '');

            expect(envList).to.be.an('array');
            expect(envList[0]).to.be.a('string');
        });

        it('should not return environment list if proper paths are not given', async function () {

            let list = ['sdffsdsf/sda/ccc', 'sfsfsdf/sda/fff', 'sdfss/sda/ttt'];

            let envList = await importCache.extractEnvListFromExports('' + list + '');
            
            expect(envList).to.be.an('array');
            expect(envList[0]).to.be.a('string');
        });
    });

    describe('Testing extractNames(exportedCaches)', function () {

        this.timeout(10000);

        it('should extract cache names from the paths provided', async function () {

            let cacheNames = ['prod2', 'someCache', 'someCache2'];

            list = [ 'data/cache/prod/' + cacheNames[0] + '.json',
                     'data/cache/test/' + cacheNames[1] + '.json',
                     'data/cache/test/' + cacheNames[2] + '.json' ];

            let extractedNames = await importCache.extractNames(list);

            expect(extractedNames).to.be.an('array');
            expect(extractedNames).to.include(...cacheNames);
        });
    });

    describe('Testing performCorrection(withPath, withoutPath)', function () {

        this.timeout(10000);

        it('should provide a list of full paths for provided cache names', async function () {

            let list = ['data/cache/prod/prod2.json',
                        'data/cache/test/part.json',
                        'data/cache/test/someCache2.json'];

            let needPath = ['prod2', 'someCache2'];

            let withPath = await importCache.performCorrection(list, needPath);

            expect(withPath).to.be.an('array');
            expect(withPath[0]).to.include(...needPath);
        });
    });
});