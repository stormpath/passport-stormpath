function MockSpApp(){

}

MockSpApp.prototype.authenticateAccount = function(data,cb) {
    if(data.username==="good" && data.password === "good"){
        cb(null,{
            account:{

            }
        });
    }else{
        cb(true);
    }
    
};

module.exports = MockSpApp;