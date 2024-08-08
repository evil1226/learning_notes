const axios=require('axios')

const apiAUrl='https://api.example.com/a'
const apiCtemplateUrl='https://api.example.com/c?dataFormA='

axios.get(apiAUrl)
    .then(responseA=>{
        const idFormA=responseA.data.idFormA

        const apiCUrl=apiCtemplateUrl+encodeURIComponent(idFormA)
        return axios.get(apiCUrl)
    })
    .then(responseC=>{
        console.timeLog(responseC.data)
    })
    .catch(error=>{
        console.error('Error',error)
    })