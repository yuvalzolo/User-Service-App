import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import dotenv from 'dotenv';

dotenv.config();

const snsClient = new SNSClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function notifyUserSignupEmail(first_name: string, last_name: string) {
    console.log('📨 Attempting to send SNS email for:', first_name, last_name);
    const params = {
        TopicArn: process.env.AWS_SNS_TOPIC_ARN!,
        Message: `New user registered: ${first_name} ${last_name}`,
        Subject: 'New User Registration',
    };

    const command = new PublishCommand(params);
    try {
        const result = await snsClient.send(command);
        console.log('✅ SNS email sent:', result);
    } catch (err) {
        console.error('❌ Failed to send SNS email:', err);
    }
}
