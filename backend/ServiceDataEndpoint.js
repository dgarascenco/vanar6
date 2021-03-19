module.exports.Service = class ServiceDataEndpoint {
    
    constructor( accessKey, pathToData ) {
      this.accessKey = accessKey;
      this.pathToData = pathToData;
    }
    
    onRequest( params ) {       
        let map = new Array();
        let response = {
            status: 401,
            message: "authorization required",
            data: "Nan"
        };

        (params.slice(1)).split("&").forEach(element => {
            map[(element.split("="))[0]] = (element.split("="))[1]
        });

        if ( map['key'] == this.accessKey) {
            const {data} = require(`.${this.pathToData}`)

            response.status = 200;
            response.message = `ok`;
            response.data = data;

            Object.keys(map).forEach( function(key, id) {                
                if ( id > 0 )
                    response.data = response.data.filter(element => element[key] == map[key]);             
            })
        }
        return response;
    }

}