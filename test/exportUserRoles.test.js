/**
 * Created by Neeraj Wadhwa on 7/26/17.
 */

const chai = require('chai');

const exportUserRoles = require('../lib/commands/exportUserRoles');



let expect = chai.expect;



describe('Testing exportUserRoles', function () {


    describe('Testing getUserRoles()', function () {

        this.timeout(5000);

        it('should return back with a list of user roles', async function () {

            let userRoles = JSON.parse(await exportUserRoles.getUserRoles());

            expect(userRoles).to.be.an('array');
            expect(userRoles).to.have.property('length');
        });
    });

    describe('Testing getUsersForUserRole(userRole)', function () {

        this.timeout(5000);

        it('should return back with user associated to this role', async function () {

            let userRoles = JSON.parse(await exportUserRoles.getUserRoles());
            let users = JSON.parse(await exportUserRoles.getUsersForUserRole(userRoles[0]));

            expect(users).to.be.an('array');
            expect(users).to.have.property('length');
            expect(users[0]).to.be.a('string');
        });
    });

    describe('Testing getResourcePermissionsForUserRole(userrole)', function () {

        this.timeout(5000);

        it('should return back with object containing resource permissions for that user role', async function () {

            let userRoles = JSON.parse(await exportUserRoles.getUserRoles());
            let resourcePermissions = JSON.parse(await exportUserRoles.getResourcePermissionsForUserRole(userRoles[0]));

            expect(resourcePermissions).to.be.an('object');
            expect(resourcePermissions).to.have.property('resourcePermission');
            expect(resourcePermissions['resourcePermission']).to.be.an('array');
        });
    });
});