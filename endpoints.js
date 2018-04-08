const axios = require("axios");

module.exports = {
    users : function(){
        return axios.get("http://ec2-52-205-142-23.compute-1.amazonaws.com:8000/api/users")
    },

    roles : function(){
        return axios.get("http://ec2-52-205-142-23.compute-1.amazonaws.com:8000/api/roles")
    }, 

    transactions : function(){
        return axios.get("http://ec2-52-205-142-23.compute-1.amazonaws.com:8000/api/txns")
    }
};