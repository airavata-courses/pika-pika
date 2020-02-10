const addJobData=(jobData)=>{
	jobData['_id']='J-'+jobData['jobID']
	let collection=mongoDb.collection('job-data')
	return collection.insertOne(jobData)
}

const updateJobData=(jobData)=>{
	let _id='J-'+jobData['jobID']
	let collection=mongoDb.collection('job-data')
    return collection.updateOne({_id:_id},{'$set':{'status':jobData['status']}})
}

const updateResult=(resultData)=>{
	if(resultData['key']=='fetch')
	{
		return fetchResult(resultData['jobID'])
	}
	resultData['status']='Complete'
	return updateJobData(resultData)
}

const fetchResult=(jobID)=>{
	let _id='J-'+jobID
	let collection=mongoDb.collection('job-data')
    return collection.findOne({_id:_id})
}


module.exports={addJobData,updateJobData,updateResult}