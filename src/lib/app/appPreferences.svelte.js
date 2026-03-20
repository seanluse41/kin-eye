// src/lib/app/appPreferences.svelte.js
import { load } from '@tauri-apps/plugin-store';

export const preferencesState = $state({
    loggingEnabled: true,
    language: "en",
    notificationsEnabled: true
});

// File path for the preferences store
const PREFERENCES_STORE_PATH = 'preferences.json';
let storeInstance = null;

async function getStore() {
    if (!storeInstance) {
        // Load or create the store with autoSave disabled
        storeInstance = await load(PREFERENCES_STORE_PATH, { autoSave: false });
    }
    return storeInstance;
}

export async function savePreferences() {
    try {
        const store = await getStore();
        
        await store.set('preferences', preferencesState);
        
        // save to disk
        await store.save();
        console.log('Preferences saved successfully');
    } catch (error) {
        console.error('Failed to save preferences:', error);
    }
}

export async function loadPreferences() {
    try {
        const store = await getStore();
        
        // Get the preferences object
        const savedPrefs = await store.get('preferences');
        
        if (savedPrefs) {
            // Update the preferences state with loaded values
            Object.assign(preferencesState, savedPrefs);
            console.log('Preferences loaded successfully');
        } else {
            console.log('No saved preferences found, using defaults');
            // Save the default preferences
            await savePreferences();
        }
    } catch (error) {
        console.error('Failed to load preferences:', error);
    }
}

// Initialize preferences on app start
export async function initializePreferences() {
    await loadPreferences();
}