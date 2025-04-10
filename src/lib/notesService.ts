// src/lib/notesService.ts
import { 
  db, 
  storage, 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  deleteDoc,
  ref,
  uploadBytes,
  getDownloadURL
} from './firebase';

export const saveNotes = async (userId: string, title: string, notes: string, originalContent: string) => {
  const timestamp = new Date();
  
  const notesCollectionRef = collection(db, 'users', userId, 'notes');
  const noteRef = await addDoc(notesCollectionRef, {
    title,
    notes,
    originalContent,
    createdAt: timestamp
  });
  
  return noteRef.id;
};

export const getNotes = async (userId: string) => {
  const notesCollectionRef = collection(db, 'users', userId, 'notes');
  const q = query(notesCollectionRef, orderBy('createdAt', 'desc'));
  const notesSnapshot = await getDocs(q);
  
  return notesSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const deleteNote = async (userId: string, noteId: string) => {
  const noteDocRef = doc(db, 'users', userId, 'notes', noteId);
  await deleteDoc(noteDocRef);
};

export const uploadFile = async (userId: string, file: File) => {
  const storageRef = ref(storage, `uploads/${userId}/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};