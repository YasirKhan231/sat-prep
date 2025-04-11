"use client";
import React, { JSX } from "react";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import {
  auth,
  db,
  storage,
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  doc,
  deleteDoc,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@/lib/firebase";
import { Timestamp } from "firebase/firestore";
import { signInAnonymously, onAuthStateChanged, User } from "firebase/auth";

interface Note {
  id?: string;
  title: string;
  notes: string;
  originalContent: string;
  createdAt?: Date | Timestamp | string;
}

export default function NotesProcessor() {
  // State management
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [statusMessages, setStatusMessages] = useState<
    { message: string; type: string }[]
  >([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Authentication state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        addStatusMessage(
          `Logged in as ${user.email || "anonymous user"}`,
          "info"
        );
        loadSavedNotes();
      } else {
        setCurrentUser(null);
        signInAnonymously(auth).catch((error) => {
          addStatusMessage(`Authentication error: ${error.message}`, "error");
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setIsDarkMode(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Status messages timeout
  useEffect(() => {
    if (statusMessages.length > 0) {
      const timer = setTimeout(() => {
        setStatusMessages((prev) => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessages]);

  // Audio recording handlers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(blob);
        addStatusMessage("Recording saved", "info");
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      addStatusMessage("Recording started", "info");
    } catch (error) {
      addStatusMessage(
        `Error accessing microphone: ${
          error instanceof Error ? error.message : String(error)
        }`,
        "error"
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state !== "inactive") {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      addStatusMessage("Recording stopped", "info");
    }
  };

  // Content processing
  const processWithOpenAI = async () => {
    if (!audioBlob && !file && !youtubeUrl) {
      addStatusMessage("Please provide at least one input", "error");
      return;
    }

    setIsLoading(true);
    setSelectedNote(null);

    try {
      let inputType = "";
      let content = "";
      let title = "Generated Notes";

      if (audioBlob) {
        inputType = "audio";
        content = await transcribeAudio(audioBlob);
        title = "Voice Recording Notes";
      } else if (file) {
        inputType = "document";
        content = await extractTextFromFile(file);
        title = `${file.name} Notes`;
      } else if (youtubeUrl) {
        inputType = "url";
        content = await extractFromYouTube(youtubeUrl);
        title = "YouTube Video Notes";
      }

      const generatedNotes = await generateNotesWithOpenAI(content, inputType);
      const note: Note = {
        title,
        notes: generatedNotes,
        originalContent: content,
      };

      setSelectedNote(note);
      await saveNotesToFirebase(note);
    } catch (error) {
      addStatusMessage(
        `Error processing content: ${
          error instanceof Error ? error.message : String(error)
        }`,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions
  const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
    return "Mock transcription of audio recording";
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    if (file.type === "text/plain") return await file.text();

    const storageRef = ref(storage, `uploads/${currentUser?.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return `Content from ${file.name}. Download URL: ${downloadURL}`;
  };

  const extractFromYouTube = async (url: string): Promise<string> => {
    const videoId =
      url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/
      )?.[1] || "";
    return `Transcript for YouTube video ${videoId}`;
  };

  const generateNotesWithOpenAI = async (
    content: string,
    inputType: string
  ): Promise<string> => {
    return `# Generated Notes from ${inputType}\n\n## Summary\nMock generated notes\n\n## Key Points\n- Point 1\n- Point 2\n\n## Details\nThis would contain AI-generated notes`;
  };

  // Notes formatting
  const formatNotes = (notes: string): JSX.Element => {
    return (
      <>
        {notes
          .split("\n\n")
          .filter((section) => section.trim())
          .map((section, index) =>
            section.startsWith("#") ? (
              <div key={`heading-${index}`} className="section-heading">
                {section.replace(/^#+\s*/, "")}
              </div>
            ) : (
              <div key={`section-${index}`} className="section">
                {section.split("\n").map((line, i) => (
                  <p key={`line-${i}`}>{line}</p>
                ))}
              </div>
            )
          )}
      </>
    );
  };

  // Firebase operations
  const saveNotesToFirebase = async (note: Note) => {
    if (!currentUser) return;

    try {
      await addDoc(collection(db, "users", currentUser.uid, "notes"), {
        ...note,
        createdAt: Timestamp.now(),
      });
      addStatusMessage("Notes saved successfully!", "success");
      loadSavedNotes();
    } catch (error) {
      addStatusMessage(
        `Error saving notes: ${
          error instanceof Error ? error.message : String(error)
        }`,
        "error"
      );
    }
  };

  const loadSavedNotes = async () => {
    if (!currentUser) return;

    try {
      const q = query(
        collection(db, "users", currentUser.uid, "notes"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      setNotes(
        snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
              // Convert Firestore Timestamp to Date
              createdAt:
                doc.data().createdAt?.toDate?.() || doc.data().createdAt,
            } as Note)
        )
      );
    } catch (error) {
      addStatusMessage(
        `Error loading notes: ${
          error instanceof Error ? error.message : String(error)
        }`,
        "error"
      );
    }
  };

  const deleteNote = async (noteId: string) => {
    if (!currentUser || !confirm("Delete this note?")) return;

    try {
      await deleteDoc(doc(db, "users", currentUser.uid, "notes", noteId));
      addStatusMessage("Note deleted", "success");
      loadSavedNotes();
    } catch (error) {
      addStatusMessage(
        `Error deleting note: ${
          error instanceof Error ? error.message : String(error)
        }`,
        "error"
      );
    }
  };

  // Format date for display
  const formatDate = (date?: Date | Timestamp | string) => {
    if (!date) return "";

    // If it's a Firestore Timestamp
    if (typeof date === "object" && "toDate" in date) {
      return date.toDate().toLocaleDateString();
    }

    // If it's already a Date object
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }

    // If it's a string that can be parsed to Date
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleDateString();
    }

    return "";
  };

  // UI helpers
  const addStatusMessage = (message: string, type: string) => {
    setStatusMessages((prev) => [...prev, { message, type }]);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Head>
        <title>Notes Processor</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="bg-gradient-to-r from-blue-600 to-purple-500 text-white py-6 text-center shadow-md">
        <h1 className="text-3xl font-bold">Notes Processor</h1>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Recording Box */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 text-lg font-semibold mb-4">
              <span>🎙️</span> Voice Recording
            </div>
            <div className="mb-4">
              {isRecording ? (
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                  <span>Recording...</span>
                </div>
              ) : audioBlob ? (
                <div className="text-blue-600 dark:text-blue-400">
                  Recording saved ({Math.round(audioBlob.size / 1024)} KB)
                </div>
              ) : null}
            </div>
            <div className="flex gap-2">
              <button
                onClick={startRecording}
                disabled={isRecording}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
              >
                Start
              </button>
              <button
                onClick={stopRecording}
                disabled={!isRecording}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50"
              >
                Stop
              </button>
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 text-lg font-semibold mb-4">
              <span>📄</span> Upload Document
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt"
              className="w-full"
            />
            {file && (
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Selected: {file.name}
              </div>
            )}
          </div>

          {/* YouTube URL */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 text-lg font-semibold mb-4">
              <span>🔗</span> YouTube URL
            </div>
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="Paste YouTube URL"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            />
          </div>
        </div>

        {/* Process Button */}
        <button
          onClick={processWithOpenAI}
          disabled={isLoading}
          className="w-full max-w-md mx-auto block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md mb-8 disabled:opacity-70"
        >
          {isLoading ? "Processing..." : "✨ Create Notes"}
        </button>

        {/* Status Messages */}
        <div className="mt-4 space-y-2">
          {statusMessages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-md border-l-4 ${
                msg.type === "error"
                  ? "bg-red-50 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300"
                  : "bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300"
              }`}
            >
              {msg.message}
            </div>
          ))}
        </div>

        {/* Generated Notes */}
        {selectedNote && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">📝 {selectedNote.title}</h2>
            <div className="space-y-6">{formatNotes(selectedNote.notes)}</div>
          </div>
        )}

        {/* Saved Notes */}
        {notes.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">📚 Saved Notes</h2>
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-md"
                >
                  <div>
                    <div className="font-semibold">{note.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(note.createdAt)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => note.id && setSelectedNote(note)}
                      className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => note.id && deleteNote(note.id)}
                      className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-red-100 dark:hover:bg-red-900/50"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="py-8 text-center border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <button
          onClick={toggleDarkMode}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </footer>
    </div>
  );
}
