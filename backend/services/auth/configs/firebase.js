import { initializeApp, cert } from "firebase-admin/app";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Fix escaped newlines in private key (env vars encode \n as literal \\n)
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

export const app = initializeApp({
  credential: cert(serviceAccount),
});