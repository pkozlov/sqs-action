const core = require('@actions/core');
const aws = require('aws-sdk');

async function run() {
    try {
        const sqsUrl = core.getInput('sqs-url', { required: false });
        const message = core.getInput('message', { required: true });
        const messageGroupId = core.getInput('message-group-id', { required: false });
        const params = {
            QueueUrl: sqsUrl,
            MessageBody: message,
        };
        if (messageGroupId) params['MessageGroupId'] = messageGroupId;
        
        
        const endpoint = core.getInput('endpoint', { required: false });
        const region = core.getInput('region', { required: false });
        const sqsParams = {};
        if (endpoint) sqsParams['endpoint'] = endpoint;
        if (region) sqsParams['region'] = region;

        const sqs = new aws.SQS(sqsParams);
        sqs.sendMessage(params, (err, resp) => {
            if (err) {
                throw err;
            } else {
                console.log(`resp ${JSON.stringify(resp, null, 2)}`);
            }
        })
    } catch (error) {
        core.setFailed(error.message);
    }
}

module.exports = run;

/* istanbul ignore next */
if (require.main === module) {
    run();
}
