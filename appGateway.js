'use strict'
const { Gateway } = require('fabric-network')
const utils=require("./utils.js")
const orgConfig=require("./connections/org1-config.json")


/**
 * Function returns the chaincode object configured in the org1-config.json file
 * with the user Identity provided. 
 * Note: User Identity must exist in the wallet
 * @param {String} userId 
 * @returns {String}
 */
async function getContract(userId){
   

    // Building the ccp object 
    const ccp = utils.buildCCPOrg(orgConfig.orgName); 
    const gateway = new Gateway();

    // Retireving the wallet object
    const wallet = await utils.buildWallet(); 


    try{


        // Connecting to the gateway with the provided identity
        await gateway.connect(ccp, {
            wallet,
            identity: userId,
            discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
        });


        // Retriving the channel
        const network = await gateway.getNetwork(orgConfig.channelName);

        // Retrirving the chaincode
        const contract = network.getContract(orgConfig.chaincodeName);

        return contract

    }catch(err){

        // Returing if any error
        console.log("Err: ", err)
        return err
    }


}


/**
 * A function to calling a EnrollCustomer Function
 * @param {String} userId 
 * @param {String} fcn 
 * @param {ARRAY[String]} args 
 * @returns  {JSON}
 */
exports.EnrollCustomer = async function(userId, customerId, firstName, lastName, transitId){
    
    try{


    // Retirivig the chaincode object
      const contract = await getContract(userId)
       
     // The resposne of the transaction
      const response = await contract.submitTransaction("EnrollCustomer", customerId, firstName, lastName, transitId )
 
      // Parsing the JSON object from the response
      return utils.prettyJSONString(response.toString());;

    }catch(err){

        // Returing if any error
        return err
    }

}







/**
 * A generic function to query the ledger
 * @param {String} userId 
 * @param {String} fcn 
 * @param {ARRAY[String]} args 
 * @returns  {JSON}
 */
exports.GetCustomer = async function(userId, fcn, args){

    try{
      
      // Retirivig the chaincode object
      const contract = await getContract(userId)

      
      // The resposne of the query   
      const response = await contract.submitTransaction("GetCustomer", customerId)

      // Parsing the JSON object from the response
      return utils.prettyJSONString(response.toString());

    }catch(err){
        // Returing if any error
        return err
    }

}


//module.exports.invoke("user1", "InitLedger").then(console.log).catch(console.log)


// module.exports.invoke("user1", "EnrollCustomer", "customer19", "Harry", "Kerrington", "TTC")
// .then((res)=>{
//     console.log(res)
// }).catch(console.log)



// module.exports.invoke("user1", 'CreateAsset', 'asset13', 'yellow', '5', 'Tom', '1300')
// .then((res)=>{
//     console.log(res)
// }).catch(console.log)


module.exports.GetCustomer("user1","customer19").then(console.log).catch(console.log)