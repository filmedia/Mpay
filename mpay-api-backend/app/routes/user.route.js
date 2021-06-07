module.exports = function(app) {
 
    const account = require('../controller/account.controller.js');
    const student = require('../controller/student.controller');
    const staff = require('../controller/staff.controller');
 
    // Create a new Customer
    app.post('/api/account', account.createUser);
    app.get('/api/account', account.findAll);
    
    app.get('/api/account/:id', account.show);
    app.put('/api/account/:id', account.update);
    app.put('/api/login/account/:id', account.login);
    app.put('/api/logout/account/:id', account.logout);
    app.get('/api/find/account/:tel', account.findByPhone);
    //app.get('/api/search/account/:query', account.searchaccount);
    
    app.delete('/api/account/:id', account.delete);

    app.post('/api/student', student.create);
    app.put('/api/student/:id', student.update);
    app.delete('/api/student/:id', student.delete);
    app.get('/api/student', student.findAll);
    
    app.get('/api/student/:id', student.show);

    app.post('/api/staff', staff.create);
    app.put('/api/staff/:id', staff.update);
    app.delete('/api/staff/:id', staff.delete);
    app.get('/api/staff', staff.findAll);
    
    app.get('/api/staff/:id', staff.show);

    
  
}