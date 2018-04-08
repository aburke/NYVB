const ep_proc = require('./ep_processor.js')

module.exports = function(app){
    //http://localhost:3001/users/all
    app.get('/users/all', function(req, res){
        ep_proc.all_users()
            .then(usrs => res.send(usrs))
    });
    
    //http://localhost:3001/users
    app.get('/users/:id', function(req, res){
        ep_proc.user_txns(req.params.id)
            .then(usrs => res.send(usrs))
    });

    //http://localhost:3001/txns
    app.get('/txns/:startDate/:endDate', function(req, res){
        ep_proc.txn_range(req.params.startDate, req.params.endDate)
            .then(usrs => res.send(usrs))
    });
    
    //http://localhost:3001/violations
    app.get('/violations', function(req, res){
        ep_proc.violators()
            .then(vls => res.send(vls))
    });
    
} 