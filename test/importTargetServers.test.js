/**
 * Created by Neeraj Wadhwa on 7/26/17.
 */

const chai = require('chai');

const utils = require('../lib/utils');
const config = require('../config');
const options = require('../lib/options');

const importTargetServers = require('../lib/commands/importTargetServers');


let expect = chai.expect;



describe('Testing importTargetServers', function () {

    describe('Testing extractEnvListFromExports(str)', function () {

        this.timeout(5000);

        it('should return back the environment list from provided path list', async function () {

            let pathToTargetServers = options.dataDir.targetserverDir;

            let list = await utils.getExportedEntities(pathToTargetServers);

            let envList = await importTargetServers.extractEnvListFromExports('' + list + '');

            expect(envList).to.be.an('array');
            expect(envList[0]).to.be.a('string');
        });

        it('should not return environment list if proper paths are not given', async function () {

            let list = ['sdffsdsf/sda/ccc', 'sfsfsdf/sda/fff', 'sdfss/sda/ttt'];

            let envList = await importTargetServers.extractEnvListFromExports('' + list + '');

            expect(envList).to.be.an('array');
            expect(envList[0]).to.be.a('string');
        });
    });

    describe('Testing extractNames(exportedTargetServers)', function () {

        this.timeout(10000);

        it('should extract target server names from the paths provided', async function () {

            let targerServerNames = ['prod2', 'test1', 'some'];

            list = [ 'data/targetservers/prod/' + targerServerNames[0] + '.json',
                'data/targetservers/test/' + targerServerNames[1] + '.json',
                'data/targetservers/test/' + targerServerNames[2] + '.json' ];

            let extractedNames = await importTargetServers.extractNames(list);

            expect(extractedNames).to.be.an('array');
            expect(extractedNames).to.include(...targerServerNames);
        });
    });

    describe('Testing performCorrection(withPath, withoutPath)', function () {

        this.timeout(10000);

        it('should provide a list of full paths for provided targetServer names', async function () {


            let list = ['data/targetservers/prod/prod2.json',
                'data/targetservers/test/test1.json',
                'data/targetservers/test/some.json'];

            let needPath = ['prod2', 'test2'];

            let withPath = await importTargetServers.performCorrection(list, needPath);

            expect(withPath).to.be.an('array');
            expect(withPath[0]).to.include(...needPath);
        });
    });
});
