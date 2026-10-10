import pkgApp from 'firebase-admin/app';
const { initializeApp, getApps } = pkgApp;
import pkgAuth from 'firebase-admin/auth';
const { getAuth } = pkgAuth;
import firebaseConfig from '../firebase-applet-config.json';

if (!getApps().length) {
  initializeApp({
    projectId: firebaseConfig.projectId,
  });
}

export const adminAuth = getAuth();
