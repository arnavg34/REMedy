import { router } from 'expo-router';
import firebase from 'firebase/compat';
import { useEffect, useState } from 'react';


const NotificationComponent: React.FC = () => {
    const [authenticated, setAuthenticated] = useState(false);
    // Get history object from react-router-dom

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                setAuthenticated(true);
            }
        });
        return () => unsubscribe(); // Clean up on unmount
    }, []);

    const sendPushNotification = async () => {
        const notificationData = {
            appId: 22228,
            appToken: "dD3cb1Gf1MhwmDtzijlbuT",
            title: "Good Morning!",
            body: "Time to log your sleep!",
            dateSent: new Date().toLocaleString(),
        };

        try {
            const response = await fetch('https://app.nativenotify.com/api/notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(notificationData),
            });

            // Log the raw response text for debugging
            const responseText = await response.text();
            console.log('Raw response text:', responseText);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Parse the response text as JSON
            const result = JSON.parse(responseText);
            console.log('Notification sent successfully:', result);

            // Navigate to '/new' when notification is clicked
            router.push('/news');
        } catch (error) {
            console.error('Error sending push notification:', error);
        }
    };

    const checkTimeAndSendNotification = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        console.log(`Current time: ${hours}:${minutes}`);
        console.log(`Authenticated: ${authenticated}`);
        if (hours === 7 && minutes === 30 && authenticated) {
            console.log('Sending push notification');
            sendPushNotification();
        }
    };

    useEffect(() => {
        const interval = setInterval(checkTimeAndSendNotification, 60000);
        return () => clearInterval(interval);
    }, []);

    return null; 
};

export default NotificationComponent;
