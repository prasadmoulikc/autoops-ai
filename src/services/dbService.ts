import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  getDoc,
  getDocs,
  Timestamp
} from 'firebase/firestore';
import { db, auth } from '../firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo: any[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const userService = {
  async createUserProfile(uid: string, email: string, displayName: string) {
    const path = `users/${uid}`;
    try {
      await setDoc(doc(db, 'users', uid), {
        uid,
        email,
        displayName,
        role: 'user',
        createdAt: new Date().toISOString(),
        preferences: {}
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },
  async getUserProfile(uid: string) {
    const path = `users/${uid}`;
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  }
};

export const transactionService = {
  async addTransaction(userId: string, data: any) {
    const path = `users/${userId}/transactions`;
    try {
      return await addDoc(collection(db, 'users', userId, 'transactions'), {
        ...data,
        userId,
        date: data.date || new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },
  subscribeTransactions(userId: string, callback: (data: any[]) => void) {
    const path = `users/${userId}/transactions`;
    const q = query(collection(db, 'users', userId, 'transactions'), orderBy('date', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const transactions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(transactions);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  }
};

export const taskService = {
  async addTask(userId: string, data: any) {
    const path = `users/${userId}/tasks`;
    try {
      return await addDoc(collection(db, 'users', userId, 'tasks'), {
        ...data,
        userId,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },
  subscribeTasks(userId: string, callback: (data: any[]) => void) {
    const path = `users/${userId}/tasks`;
    const q = query(collection(db, 'users', userId, 'tasks'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(tasks);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  }
};

export const memoryService = {
  async addMemory(userId: string, data: any) {
    const path = `users/${userId}/memory`;
    try {
      return await addDoc(collection(db, 'users', userId, 'memory'), {
        ...data,
        userId,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },
  subscribeMemory(userId: string, callback: (data: any[]) => void) {
    const path = `users/${userId}/memory`;
    const q = query(collection(db, 'users', userId, 'memory'), orderBy('updatedAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const memory = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(memory);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  }
};
