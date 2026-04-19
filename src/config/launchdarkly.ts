import { asyncWithLDProvider, initialize, LDClient, LDContext } from 'launchdarkly-react-client-sdk';
import Observability from '@launchdarkly/observability';
import SessionReplay from '@launchdarkly/session-replay';

export const initializeLaunchDarkly = async (currentUser: any) => {
    try {
        const context: LDContext = currentUser && currentUser.length !== 0 ? {
            kind: 'user',
            key: currentUser.key,
            name: currentUser.name,
            email: currentUser.email,
            office: currentUser.office,
            title: currentUser.title
        } : null;

        // Set clientSideID to your own Client-side ID. You can find this in
        // your LaunchDarkly portal under Account settings / Projects
        const ldProvider = await asyncWithLDProvider({
            clientSideID: process.env.LAUNCHDARKLY_CLIENT_SIDE_ID as string ?? '69e09a2b60ee3c0a6d062be9',
            context,
            options: {
                plugins: [
                    new Observability({
                        tracingOrigins: true, // attribute frontend requests to backend domains
                        networkRecording: {
                            enabled: true,
                            recordHeadersAndBody: true
                        }
                    }),
                    new SessionReplay({
                        privacySetting: 'strict',
                        // or 'default' to redact text matching common regex for PII
                        // or 'none' to turn off obfuscation
                    }
                    )
                ]
            }
        });

        const ldClient: LDClient = initialize(process.env.LAUNCHDARKLY_CLIENT_SIDE_ID as string ?? '69e09a2b60ee3c0a6d062be9', context);
        await ldClient.waitForInitialization(10);
        ldClient.track('home-page-views', { context: context });
        ldClient.track('sign-up-apple-average-click-rate', { context: context });

        return { ldProvider, ldClient, context };
    }
    catch (error) {
        console.error('Error initializing LaunchDarkly provider:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};
