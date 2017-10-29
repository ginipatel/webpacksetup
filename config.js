const env ='dev';

const config={
    dev:{
        location:'http://localhost:2002'
    }
};

module.exports = config[env];

