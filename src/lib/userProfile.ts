import { db, doc, getDoc } from "./firebase";

/**
 * Check if a user has completed the onboarding process
 * @param userId The Firebase user ID
 * @returns Promise<boolean> True if user has completed onboarding, false otherwise
 */
export const hasCompletedOnboarding = async (
  userId: string
): Promise<boolean> => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    return userDoc.exists() && userDoc.data()?.onboarding === true;
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return false;
  }
};

/**
 * Get a user's full profile data from Firestore
 * @param userId The Firebase user ID
 * @returns Promise with the user's profile data
 */
export const getUserProfile = async (userId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return {
        id: userId,
        ...userDoc.data(),
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
};
