# ApigeeSelectiveMigrationTool

This tool is used to selectively migrate Apigee entities from one organization to another organization.


<br></br>

### Prerequisites

Following are some prerequisites for Apigee Selective Migration Tool:

1) Please make sure the environment in which this tool will run have [Node.js](https://nodejs.org/en/download/current/) v8.1.0 or above installed.

2) If you plan to install this tool globally then please make sure that you have the permissions required to do so.

3) Please note that the tool will write the exported data to the directory in which the tool is being used, so make sure you have write access to the current directory.


### Installation

Follow the below mentioned steps to install the tool

1) Clone the repository from [https://github.com/neerajwadhwa/apigeeselectivemigatetool.git].

2) Edit the configuration file "config.js" with appropriate credentials.

2) In the root directory of the project run the following command- "npm install -g ." (without quotes).

Note:
    Please make sure you have appropriate permissions to install the tool globally.


### Configuration

This is the sample configuration file, it should contain all the necessary
 information that is required to run the tool properly.

```
module.exports = {

    from: {
        version: '17.05',
        url: 'url of the edge server (for source)',
        userid: 'username (for source)',
        passwd: 'password (for source)',
        org: 'org name (for source)',
        env: 'env name (for source)'
    },
    to: {
        version: '17.05',
        url: 'url of the edge server (for destination)',
        userid: 'username (for destination)',
        passwd: 'password (for destination)',
        org: 'org name (for destination)',
        env: 'env name (for destination)'
    }
};
```

* version: The version field holds the version number of the OPDK, in the "from" section it is
           for the source organization and in the "to" section it is for the target organization.

* url: The url field should have the url of the OPDK, in the "from" section it should point to
       the source organization and in the "to" section it should point to the target organization.

* userid: The userid field should have the userid or the email id for the user who has all the rights
          required to perform the operations, in the "from" section it should have the userid from the
          source organization and in the "to" section it should have the userid from the target organization.

* passwd: The passwd field should have the password of the user that is mentioned in the related section.

* org: The org field should hold the name of the organization on which these operation should be performed,
       in the "from" section it should have source organization name and in the "to" section it should have
       the name of the target organization.

* env: The env field should hold the name of the environment in which the operation will be performed, in the
       "from" section it should hold the name of the source environment and in the "to" section it should hold
       the name of the target environment.


### Running the tool

From the command-line run the tool as apigeemigrate {command-name}

See the Commands section to know more about commands.



### Commands

* `apigeemigrate` - Get the list of all available commands.

* `apigeemigrate exportProxies` - Export all the specified proxies from the source organization.

* `apigeemigrate importProxies` - Import all the proxies which were exported previously to the target organization.

* `apigeemigrate exportTargetServers` - Export all the specified target servers from the source organization.

* `apigeemigrate importTargetServers` - Import all the target servers which were exported previously to the target organization.

* `apigeemigrate exportCache` - Export all the specified cache definitions from the source organization.

* `apigeemigrate importCache` - Import all the cache definitions which were exported previously to the target organization.

* `apigeemigrate exportDevelopers` - Export all the specified developers from the source organization.

* `apigeemigrate importDevelopers` - Import all the developers which were exported previously to the target organization.

* `apigeemigrate exportProducts` - Export all the specified API products from the source organization.

* `apigeemigrate importProducts` - Import all the API products which were exported previously to the target organization.

* `apigeemigrate exportDeveloperApps` - Export all the specified developer apps from the source organization.

* `apigeemigrate importDeveloperApps` - Import all the developer apps which were exported previously to the target organization.

* `apigeemigrate exportEnvKvms` - Export all the specified environment KVMs from the source organization.

* `apigeemigrate importEnvKvms` - Import all the environment KVMs which were exported previously to the target organization.

* `apigeemigrate exportOrgKvms` - Export all the specified organization KVMs from the source organization.

* `apigeemigrate importOrgKvms` - Import all the organization KVMs which were exported previously to the target organization.

* `apigeemigrate exportProxyKvms` - Export all the specified proxy KVMs from the source organization.

* `apigeemigrate importProxyKvms` - Import all the proxy KVMs which were exported previously to the target organization.

* `apigeemigrate exportUsers` - Export all the specified users from the source organization.

* `apigeemigrate importUsers` - Import all the users which were exported previously to the target organization.

* `apigeemigrate exportUserRoles` - Export all the specified user roles from the source organization.

* `apigeemigrate importUserRoles` - Import all the user roles which were exported previously to the target organization.

* `apigeemigrate deployAPIProxy` - Deploy the imported API proxies to the target organization in the target environment.

