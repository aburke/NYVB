const utils = require("./utils")

const check_test = function(test_name, criteria){
    if (criteria){
        console.log(test_name + " [PASSED]")
    }else{
        console.log(test_name + " [FAILED]")
    }
}

const compare_obj = function(obj1, obj2){
    return JSON.stringify(obj1) == JSON.stringify(obj2)
}

const all_user_txn_dtls = {
    txns : [
        {userId : 1, transAmt : 23},
        {userId : 2, transAmt : 11},
        {userId : 1, transAmt : 44}
    ],

    users : [
        {userId : 1},
        {userId : 2},
        {userId : 3}
    ],

    exp_val : [
        {1 : [
            {userId : 1, transAmt : 23},
            {userId : 1, transAmt : 44}
        ]},
        {2 : [
            {userId : 2, transAmt : 11}
        ]},
        {3 : []}
    ]
} 

const test_all_user_txn = function(){
    actual_value = utils.pull_all_user_txns(all_user_txn_dtls.txns, all_user_txn_dtls.users)
    //console.log(actual_value)
    check_test("test_all_user_txn", compare_obj(actual_value, all_user_txn_dtls.exp_val))
}

const user_txn_dtls = {
    txns : [
        {userId : 1, transAmt : 23},
        {userId : 2, transAmt : 11},
        {userId : 1, transAmt : 44}
    ],

    userId : 1,

    exp_val : 
        {1 : [
            {userId : 1, transAmt : 23},
            {userId : 1, transAmt : 44}
        ]}
    
} 

const test_user_txn = function(){
    actual_value = utils.pull_user_txns(user_txn_dtls.txns, user_txn_dtls.userId)
    //console.log(actual_value)
    check_test("test_user_txn", compare_obj(actual_value, user_txn_dtls.exp_val))
}

const violators_dtls = {
    txns : [
        {userId : 1, transAmt : 60},
        {userId : 2, transAmt : 1},
        {userId : 1, transAmt : 30},
        {userId : 2, transAmt : 1},
        {userId : 2, transAmt : 1},
        {userId : 3, transAmt : 50}
    ],

    roles : [
        {roleId : 1, maxAmount : 30, maxTxnCount : 2},
        {roleId : 2, maxAmount : 70, maxTxnCount : 1},
        {roleId : 3, maxAmount : 100, maxTxnCount : 5}
    ],

    users : [
        {userId : 1, roleId: 1},
        {userId : 2, roleId: 2},
        {userId : 3, roleId: 3}
    ],

    exp_val : [
        {userId : 1, too_many_txns: false, has_oversized_txns: true},
        {userId : 2, too_many_txns: true, has_oversized_txns: false}
    ]
}

const test_violators = function(){
    actual_value = utils.pull_violators(violators_dtls.txns, violators_dtls.roles, violators_dtls.users)
    //console.log(actual_value)
    check_test("test_violators", compare_obj(actual_value, violators_dtls.exp_val))
}


const txns_by_date_dtls = {
    txns : [
        {transId: 1, transTime : new Date("2018.01.02").getTime()},
        {transId: 2, transTime : new Date("2018.02.02").getTime()},
        {transId: 3, transTime : new Date("2018.03.02").getTime()},
        {transId: 4, transTime : new Date("2018.04.02").getTime()}
    ],

    start_date : '11012017',

    end_date : '03052018',

    exp_val : [
        {transId: 1, transTime : new Date("2018.01.02").getTime()},
        {transId: 2, transTime : new Date("2018.02.02").getTime()},
        {transId: 3, transTime : new Date("2018.03.02").getTime()}
    ]
}

const test_txns_by_date = function(){
    actual_value = utils.pull_txns_by_date(txns_by_date_dtls.txns, txns_by_date_dtls.start_date, txns_by_date_dtls.end_date)
    //console.log(actual_value)
    check_test("test_txns_by_date", compare_obj(actual_value, txns_by_date_dtls.exp_val))
}


test_all_user_txn()
test_user_txn()
test_violators()
test_txns_by_date()