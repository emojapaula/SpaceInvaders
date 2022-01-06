import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './auth/authContext';
import StudentsProvider from './context/classContext';
import StudentProvider from './context/studentContext';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <StudentsProvider>
        <AuthProvider>
          <StudentProvider>
            <SafeAreaProvider>
              <Navigation />
              <StatusBar />
            </SafeAreaProvider>
          </StudentProvider>
        </AuthProvider>
      </StudentsProvider>
    );
  }
}
