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
import DashboardLayout from "@/components/DashboardLayout";

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
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Smart Notes
        </h1>

        {/* Status Messages */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {statusMessages.map((status, index) => (
            <div
              key={index}
              className={`p-3 rounded-md shadow-md ${
                status.type === "error"
                  ? "bg-red-500 text-white"
                  : status.type === "success"
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white"
              } transition-all duration-300 animate-fadeIn`}
            >
              {status.message}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="md:col-span-1 bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5">
            <h2 className="text-xl font-semibold mb-4">Input</h2>
            <div className="space-y-4">
              {/* Audio Recording */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Voice Notes
                </label>
                <div className="flex flex-col items-center">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-full py-2 px-4 rounded-md flex items-center justify-center ${
                      isRecording
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-purple-600 hover:bg-purple-700"
                    } transition-colors`}
                    disabled={isLoading}
                  >
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </button>
                  {audioBlob && (
                    <div className="mt-2 w-full">
                      <audio
                        controls
                        className="w-full"
                        src={URL.createObjectURL(audioBlob)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Document Upload
                </label>
                <div className="flex flex-col">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
                    disabled={isLoading}
                  >
                    Choose File
                  </button>
                  {file && (
                    <div className="mt-2 text-sm">
                      Selected:{" "}
                      <span className="text-purple-400">{file.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* YouTube URL */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  YouTube URL
                </label>
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="Paste YouTube URL"
                  className="w-full p-2 bg-[#252538] border border-purple-900/30 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                  disabled={isLoading}
                />
              </div>

              {/* Process Button */}
              <button
                onClick={processWithOpenAI}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-md font-medium transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Generate Notes"}
              </button>
            </div>
          </div>

          {/* Generated Notes */}
          <div className="md:col-span-2 bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {selectedNote ? "Generated Notes" : "Saved Notes"}
              </h2>
              {selectedNote && (
                <button
                  onClick={() => setSelectedNote(null)}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Back to saved notes
                </button>
              )}
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-gray-400">Processing your content...</p>
              </div>
            ) : selectedNote ? (
              <div>
                <h3 className="text-lg font-medium mb-2">
                  {selectedNote.title}
                </h3>
                <div className="prose prose-invert max-w-none">
                  {formatNotes(selectedNote.notes)}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {notes.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400">
                      No saved notes yet. Generate your first notes to see them
                      here.
                    </p>
                  </div>
                ) : (
                  notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-4 border border-purple-900/30 rounded-lg hover:bg-[#252538] transition-colors cursor-pointer"
                      onClick={() => setSelectedNote(note)}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium">{note.title}</h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            note.id && deleteNote(note.id);
                          }}
                          className="text-red-400 hover:text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        {formatDate(note.createdAt)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
