
module.exports = {

    pull_user_txns : function(transactions, userId){
        let user_transactions = {}
        user_transactions[userId] = transactions.filter(x => x.userId == userId)
        return user_transactions
    },

    pull_all_user_txns : function(transactions, users){
        let partial_func = module.exports.pull_user_txns.bind(null, transactions)
        return users.map(x => x.userId).map(partial_func)
    },

    pull_txns_by_date : function(transactions, start_date, end_date){
        start_date = new Date(start_date.substring(0,2) + '-' + start_date.substring(2,4)+ '-' + start_date.substring(4,8))
        end_date = new Date(end_date.substring(0,2) + '-' + end_date.substring(2,4)+ '-' + end_date.substring(4,8))
        return transactions.filter(x => new Date(x.transTime) <= end_date && new Date(x.transTime) >= start_date)
    },

    user_violation_check : function(transactions, roles, user){
        let user_txns = transactions.filter(x => x.userId == user.userId)
        let user_role = roles.filter(x => x.roleId == user.roleId)[0]
        let oversized_txns = user_txns.filter(x => user_role.maxAmount < Math.abs(x.transAmt))

        return {userId : user.userId,
                too_many_txns : user_txns.length > user_role.maxTxnCount, 
                has_oversized_txns : oversized_txns.length > 0}
    },

    pull_violators : function(transactions, roles, users){
        let partial_func = module.exports.user_violation_check.bind(null, transactions, roles)
        return users.map(partial_func).filter(x => x.too_many_txns || x.has_oversized_txns)
    }
}
