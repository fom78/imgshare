const helpers = {};

helpers.randomNumber = () => {
    const possible = 'qazwsxedcrfvtgbyhnujmikolp1234567890';
    let randomNumber = '';
    for (let i = 0; i < 6; i++) {
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
        
    }
    return randomNumber;
};

module.exports = helpers;