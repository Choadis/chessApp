var Chatkit = require('@pusher/chatkit-server');

const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:550e6efe-fc7a-4278-97a0-cfd30735aed9',
    key: '2d19b64a-f04d-4bc6-ba47-764e3669c073:eMJgr4SG7PDdTnANwrFQy6y6YWM8a18HnNePcngleu4='
});

module.exports = chatkit
