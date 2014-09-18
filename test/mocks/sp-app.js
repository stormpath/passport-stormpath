function MockSpApp(){

}

MockSpApp.prototype.authenticateAccount = function(data,cb) {
    if(data.username==="good" && data.password === "good"){
        cb(null,{
            account:{},
            getAccount: function(expansions,cb){
              (expansions || cb)(null,{});
            }
        });
    }else{
        cb({userMessage:"Invalid username or password."});
    }

};

module.exports = MockSpApp;