import { CognitoIdentityServiceProvider } from 'aws-sdk';

const cognitoidentityserviceprovider = new CognitoIdentityServiceProvider();

export const handler = async (event) => {
    try {
        const email = event.queryStringParameters.email;
        const userPoolId = process.env.USER_POOL_ID;

        const params = {
            UserPoolId: userPoolId,
            Filter: `email = "${email}"`,
            Limit: 1
        };

        const result = await cognitoidentityserviceprovider.listUsers(params).promise();
        if (result.Users && result.Users.length > 0) {
            const user = result.Users[0];
            const nameAttribute = user.Attributes.find(attr => attr.Name === 'name');
            if (nameAttribute) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({ name: nameAttribute.Value })
                };
            } else {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ error: 'Name not found' })
                };
            }
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'User not found' })
            };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};