import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const loadNotes = async (uid = '') => {
  if (!uid) throw new Error("User's UID doesn't exists");

  const docs = await getDocs(collection(FirebaseDB, `${uid}/journal/notes`));
  const notes = [];

  docs.forEach(doc => {
    notes.push({ id: doc.id, ...doc.data() });
  });

  return notes;
};
