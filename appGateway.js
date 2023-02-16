'use strict'
const { Gateway } = require('fabric-network')
const utils=require("./utils.js")
const orgConfig=require("./connections/org1-config.json")


module.exports.getContract=async function(userId){
   
    const ccp = utils.buildCCPOrg(orgConfig.orgName); 
    const gateway = new Gateway();
    const wallet = await utils.buildWallet(); 


    try{


        await gateway.connect(ccp, {
            wallet,
            identity: userId,
            discovery: { enabled: false, asLocalhost: false } // using asLocalhost as this gateway is using a fabric network deployed locally
        });

        const network = await gateway.getNetwork(orgConfig.channelName);

        const contract = network.getContract(orgConfig.chaincodeName);

        return contract

    }catch(err){
        console.log("Err: ", err)
    }


}



exports.invoke = async function(userId, fcn){

    try{

      const contract = await module.exports.getContract(userId)
       
      const response = await contract.submitTransaction(fcn)


      return response;

    }catch(err){
        return err
    }

}







exports.query = async function(userId, fcn){

    try{

      const contract = await module.exports.getContract(userId)
       
      const response = await contract.evaluateTransaction(fcn)


      return response;

    }catch(err){
        return err
    }

}




module.exports.invoke('admin').then((result)=>{
    console.log(`*** Result: ${result}`);

}).catch(console.log)

//module.exports(orgConfig.userId).then(console.log)