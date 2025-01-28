/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import "./global.css"
import RootViewComponent from './app/RootViewComponent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createNotificationChannel } from './app/notification/NotificationService';

const queryClient: QueryClient = new QueryClient();

function App(): React.JSX.Element {

  // useEffect(() => {
  //   createNotificationChannel();
  // }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <RootViewComponent />
    </QueryClientProvider>
  );
}

export default App;
