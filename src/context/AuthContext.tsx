import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, googleProvider } from '../firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface UserProfile {
  uid: string;
  email: string;
  role: 'admin' | 'user';
  displayName?: string;
  photoURL?: string;
  createdAt: any;
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setProfile(userDoc.data() as UserProfile);
          } else {
            // Create new user profile
            const isDefaultAdmin = firebaseUser.email === 'windowspc998767@gmail.com' && firebaseUser.emailVerified;
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              role: isDefaultAdmin ? 'admin' : 'user',
              displayName: firebaseUser.displayName || '',
              photoURL: firebaseUser.photoURL || '',
              createdAt: serverTimestamp(),
            };
            await setDoc(userDocRef, newProfile);
            setProfile(newProfile);
          }
        } catch (error) {
          console.error("Error fetching/creating user profile:", error);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
