### BCDV 1025 Enterprise Blockchain ###
#### Lab 7 ####

#### Description ####
The project has the sample fabric apis implmeneted to interact with the network 
The project has following two APIs:
1. fabric-ca APIs to enroll and  generate the new identities
2. fabric chaincode APIs to invoke and the query the chaincode

The chaincode, org and the channel configuration needs to be set in 
the ./connections/org1-config.json file.


Also, the project needs  the JSON formatted connection config profile genrated for the orgs 
in the network. 
The ccp can be genrated using the ./orgranizations/ccp_generate.sh in the test-network dir 
of the fabric-samples repo.
The project also contains a wallet directory which stores all the identities enrolled.

Any additional REST-APIs, functionalities can be built on the top of these APIs.


If you want to keep the config information and the identities confidential, 
make sure to uncomment the following lines in the .gitignore file:

wallet/
connections/
