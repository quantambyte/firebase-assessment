import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { onRequest } from 'firebase-functions/v2/https';

initializeApp();

const auth = getAuth();
const db = getFirestore();

export const createUser = onRequest(async (req, res) => {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const { email, password, name, gender, uid } = req.body;

    if (!email || !password || !name || !gender) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    let userRecord;
    if (uid) {
      userRecord = await auth.createUser({ uid, email, password });
    } else {
      userRecord = await auth.createUser({ email, password });
    }

    await db.collection('users').doc(userRecord.uid).set({
      name,
      gender,
      email,
      createdAt: FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: 'User created successfully', uid: userRecord.uid });
    return;
  } catch (error: any) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
    return;
  }
});
