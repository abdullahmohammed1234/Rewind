'use client';

import { useState, useCallback } from 'react';
import {
  getDocument,
  getAllDocuments,
  queryDocuments,
  setDocument,
  updateDocument,
  deleteDocument,
  generateDocId,
  BaseDocument,
} from '@/lib/firebase/firestore';

// Generic firestore hook
export const useFirestore = <T extends BaseDocument>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get a single document
  const getDoc = useCallback(async (collectionName: string, docId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getDocument<T>(collectionName, docId);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get all documents in a collection
  const getDocs = useCallback(async (collectionName: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAllDocuments<T>(collectionName);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Query documents with filters
  const query = useCallback(
    async (
      collectionName: string,
      conditions: { field: string; operator: '==' | '>' | '<' | '>=' | '<='; value: any }[],
      sortBy?: string,
      sortDirection?: 'asc' | 'desc',
      limitCount?: number
    ) => {
      setLoading(true);
      setError(null);
      try {
        const result = await queryDocuments<T>(
          collectionName,
          conditions,
          sortBy,
          sortDirection,
          limitCount
        );
        return result;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Create or update a document
  const setDoc = useCallback(
    async (collectionName: string, docId: string, data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => {
      setLoading(true);
      setError(null);
      try {
        await setDocument(collectionName, docId, data);
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Update a document
  const updateDoc = useCallback(
    async (collectionName: string, docId: string, data: Partial<Omit<T, 'id' | 'createdAt'>>) => {
      setLoading(true);
      setError(null);
      try {
        await updateDocument(collectionName, docId, data);
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete a document
  const removeDoc = useCallback(async (collectionName: string, docId: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteDocument(collectionName, docId);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    removeDoc,
    generateDocId,
    loading,
    error,
  };
};

// Hook for user-specific documents
export const useUserDocuments = <T extends BaseDocument>(collectionName: string, userId: string | undefined) => {
  const [documents, setDocuments] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserDocuments = useCallback(async () => {
    if (!userId) {
      setDocuments([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await queryDocuments<T>(collectionName, [
        { field: 'userId', operator: '==', value: userId },
      ]);
      setDocuments(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [collectionName, userId]);

  return { documents, fetchUserDocuments, loading, error };
};
