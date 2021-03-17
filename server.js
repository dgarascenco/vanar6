const {Service} = require('./backend/ServiceDataEndpoint')
service = new Service("123","./backend/data.json")

response = service.onRequest("?key=123&method=visa&client_id=2")

console.log("response: ",response) 