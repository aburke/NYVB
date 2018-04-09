const endpoints = require('./endpoints');
const axios = require("axios");
const utils = require("./utils")


module.exports = {
    all_users : function(){
        return axios.all([
            endpoints.users(),
            endpoints.transactions()
        ])
        .then(axios.spread(function (users, transactions) {
            return Promise.resolve(utils.pull_all_user_txns(transactions.data.data, users.data.data))
          }))
    },

    user_txns : function(userId){
        return endpoints
                .transactions()
                .then(function(txns){
                    return Promise.resolve(utils.pull_user_txns(txns.data.data, userId))
                })
    },

    txn_range : function(startDate, endDate){
        return endpoints
                .transactions()
                .then(function(txns){
                    return Promise.resolve(utils.pull_txns_by_date(txns.data.data, startDate, endDate))
                })
    },

    violators : function(){
        return axios.all([
            endpoints.users(),
            endpoints.transactions(),
            endpoints.roles()
        ])
        .then(axios.spread(function (usrs, txns, rls){
            return Promise.resolve(utils.pull_violators(txns.data.data, rls.data.data, usrs.data.data))
        }))
    }
}

/*
module.exports.violators()
                .then(function(response){
                    console.log(response)
                })*/