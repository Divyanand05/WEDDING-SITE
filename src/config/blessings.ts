import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface Blessing {
  id?: string;
  name: string;
  message: string;
  featured: boolean;
  createdAt?: unknown;
}

const COL = 'blessings';

/** Called when a guest submits the form */
export async function submitBlessing(name: string, message: string) {
  await addDoc(collection(db, COL), {
    name: name.trim(),
    message: message.trim(),
    featured: false,          // you flip this to true in Firebase console
    createdAt: serverTimestamp(),
  });
}

/** Fetches only the messages you've marked featured: true */
export async function getFeaturedBlessings(): Promise<Blessing[]> {
  const q = query(
    collection(db, COL),
    where('featured', '==', true),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Blessing));
}
