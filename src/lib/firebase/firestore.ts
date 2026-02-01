import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
  DocumentData,
  Query,
} from 'firebase/firestore';
import { db } from './config';

// Generic type for Firestore documents
export interface BaseDocument extends DocumentData {
  id?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  CAPSULES: 'capsules',
  MEMORIES: 'memories',
  WRAPPED: 'wrapped',
  TRENDS: 'trends',
} as const;

// Get a document by ID
export const getDocument = async <T extends BaseDocument>(
  collectionName: string,
  docId: string
): Promise<T | null> => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T;
  }
  return null;
};

// Get all documents in a collection
export const getAllDocuments = async <T extends BaseDocument>(
  collectionName: string
): Promise<T[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
};

// Query documents with filters
export const queryDocuments = async <T extends BaseDocument>(
  collectionName: string,
  conditions: { field: string; operator: '==' | '>' | '<' | '>=' | '<='; value: any }[],
  sortBy?: string,
  sortDirection?: 'asc' | 'desc',
  limitCount?: number
): Promise<T[]> => {
  let q: Query = collection(db, collectionName);
  
  // Apply filters
  conditions.forEach((condition) => {
    q = query(q, where(condition.field, condition.operator, condition.value));
  });
  
  // Apply sorting
  if (sortBy) {
    q = query(q, orderBy(sortBy, sortDirection || 'desc'));
  }
  
  // Apply limit
  if (limitCount) {
    q = query(q, limit(limitCount));
  }
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
};

// Create or update a document
export const setDocument = async <T extends BaseDocument>(
  collectionName: string,
  docId: string,
  data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
): Promise<void> => {
  const docRef = doc(db, collectionName, docId);
  
  // Check if document exists to set createdAt
  const docSnap = await getDoc(docRef);
  const now = serverTimestamp();
  
  await setDoc(docRef, {
    ...data,
    ...(docSnap.exists() ? { updatedAt: now } : { createdAt: now, updatedAt: now }),
  });
};

// Update a document
export const updateDocument = async <T extends BaseDocument>(
  collectionName: string,
  docId: string,
  data: Partial<Omit<T, 'id' | 'createdAt'>>
): Promise<void> => {
  const docRef = doc(db, collectionName, docId);
  
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

// Delete a document
export const deleteDocument = async (
  collectionName: string,
  docId: string
): Promise<void> => {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
};

// Generate a new document ID
export const generateDocId = () => {
  return doc(collection(db, COLLECTIONS.CAPSULES)).id;
};
