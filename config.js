/**
 * Created by Neeraj Wadhwa on 7/3/17.
 */

module.exports = {

    from: {
        version: '17.05',
        url: 'https://api.enterprise.apigee.com/v1',
        userid: 'your userid here (for source)',
        passwd: 'your password here (for source)',
        org: 'your org here (source)',
        env: 'environment (for source)'
    },
    to: {
        version: '17.05',
        url: 'https://api.enterprise.apigee.com/v1',
        userid: 'your userid here (for target) ',
        passwd: 'yout password here (for target)',
        org: 'your org here (target)',
        env: 'environment (for target)'
    }
} ;
