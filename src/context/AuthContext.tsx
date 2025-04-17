"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { UserData } from "@/lib/types/user";
import { doc, onSnapshot } from "firebase/firestore";
import { createUser, getUser } from "@/lib/services/userService";

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  userDataLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  userDataLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userDataLoading, setUserDataLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);

      if (!user) {
        setUserData(null);
        setUserDataLoading(false);
        return;
      }

      // Check if user exists in Firestore
      try {
        const existingUserData = await getUser(user.uid);

        if (!existingUserData) {
          // Create new user document if it doesn't exist
          await createUser(
            user.uid,
            user.displayName || "User",
            user.email || ""
          );
        }
      } catch (error) {
        console.error("Error checking/creating user:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to user document in Firestore
  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(
      userRef,
      (doc) => {
        if (doc.exists()) {
          setUserData(doc.data() as UserData);
        } else {
          setUserData(null);
        }
        setUserDataLoading(false);
      },
      (error) => {
        console.error("Error listening to user data:", error);
        setUserDataLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, userData, loading, userDataLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
