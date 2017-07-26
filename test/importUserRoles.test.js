/**
 * Created by Neeraj Wadhwa on 7/26/17.
 */

const chai = require('chai');

const config = require('../config');
const options = require('../lib/options');
const utils = require('../lib/utils');

const importUserRoles = require('../lib/commands/importUserRoles');


let expect = chai.expect;



describe('Testing importUserRoles', function () {

    describe('Testing extractUserRolesFromExports(str)', function () {

        this.timeout(5000);

        it('should return back the proxy list from provided path list', async function () {

            let pathToUserRole = options.dataDir.userrole;

            let list = await utils.getExportedEntities(pathToUserRole);

            let roleName = 'orgadmin';

            let userRoleList = await importUserRoles.extractUserRolesFromExports('' + list + '');

            expect(userRoleList).to.be.an('array');
            expect(userRoleList[0]).to.be.a('string');
            expect(userRoleList).to.include(roleName);
        });

        it('should not return user roles list if proper paths are not given', async function () {

            let list = ['sdffsdsf/sda/ccc', 'sfsfsdf/sda/fff', 'sdfss/sda/ttt'];

            let userRoleList = await importUserRoles.extractUserRolesFromExports('' + list + '');

            expect(userRoleList).to.be.an('array');
            expect(userRoleList[0]).to.be.a('string');
        });
    });

    describe('Testing getUserRoles()', function () {

        this.timeout(5000);

        it('should return back the list of user roles', async function () {

            let roleList = JSON.parse(await importUserRoles.getUserRoles());

            let roleName = 'orgadmin';

            expect(roleList).to.be.an('array').that.includes(roleName);
            expect(roleList).to.have.property('length');
            expect(roleList[0]).to.be.a('string');
        });
    });
});