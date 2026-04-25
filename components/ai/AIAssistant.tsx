import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Bot, X, SendHorizonal, LoaderCircle } from 'lucide-react';
import type { ChatMessage } from '../../types';
import { totalStudents, totalTeachers, totalParents, totalRevenue } from '../../constants/data';

const SYSTEM_INSTRUCTION = `You are an expert AI assistant for the "Victory School Management System". Your name is Vic. Your purpose is to help users (school administrators, teachers) navigate the system and understand its features.

You are integrated into a React-based web application. The application has the following modules, accessible via a sidebar:

1.  **Dashboard**: This is the main landing page. It shows key statistics like Total Students (currently ${totalStudents}), Total Teachers (${totalTeachers}), Total Parents (${totalParents}), and Total Revenue (₹${totalRevenue.toLocaleString()}). It also has charts for Fee Collection and Attendance Overview.
2.  **Student Management**: This page lists all students. Users can:
    *   View a table of students with their name, ID, class, fees due, attendance percentage, and status (Active/Inactive).
    *   Search for students by name or ID.
    *   Filter students by their status.
    *   There is an "Add Student" button.
3.  **Teacher Management**: This page is for managing teacher profiles, schedules, and payroll. It is currently under construction.
4.  **Academics**: This page is for managing classes, subjects, timetables, and exams. It is currently under construction.
5.  **Fees**: This page is for tracking payments, generating invoices, and managing outstanding dues. It is currently under construction.
6.  **Library**: This page is for managing the book catalog, borrowing, and returns. It is currently under construction.
7.  **Communication**: This is a portal for sending announcements and messages. It is currently under construction.

When a user asks a question, provide a concise and helpful answer based on this knowledge. If they ask how to do something, guide them to the correct page. If they ask about a feature that is under construction, inform them politely.

Be friendly, professional, and slightly enthusiastic. Start the first conversation with: "Hello! I'm Vic, your AI assistant. How can I help you navigate the Victory School Management System today?"`;


const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chat) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const newChat = ai.chats.create({
          model: 'gemini-2.5-flash-preview-04-17',
          config: { systemInstruction: SYSTEM_INSTRUCTION },
        });
        setChat(newChat);
        setMessages([
          {
            role: 'model',
            content: "Hello! I'm Vic, your AI assistant. How can I help you navigate the Victory School Management System today?"
          },
        ]);
      } catch (error) {
        console.error("Failed to initialize AI Chat:", error);
        setMessages([
            {
                role: 'model',
                content: "Sorry, I'm having trouble connecting right now. Please try again later."
            }
        ]);
      }
    }
  }, [isOpen, chat]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !chat || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = userInput;
    setUserInput('');
    setIsLoading(true);

    try {
      const result = await chat.sendMessageStream({ message: currentInput });

      let modelResponse = '';
      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      for await (const chunk of result) {
        modelResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = modelResponse;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: ChatMessage = { role: 'model', content: "Oops! Something went wrong. Please try again." };
      setMessages(prev => {
         const newMessages = [...prev];
         // In case a blank model message was added before the error
         if(newMessages[newMessages.length - 1].content === ''){
            newMessages[newMessages.length - 1] = errorMessage;
            return newMessages;
         }
         return [...newMessages, errorMessage]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <>
      <button
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 z-50"
        aria-label="Open AI Assistant"
      >
        <Bot className="h-8 w-8" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-[70vh] max-h-[600px] bg-white dark:bg-dark-card rounded-2xl shadow-2xl flex flex-col z-50 transition-all duration-300 ease-out transform origin-bottom-right animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-border">
            <div className="flex items-center gap-3">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full items-center justify-center bg-primary-100 dark:bg-primary-900/50">
                <Bot className="h-6 w-6 text-primary-600 dark:text-primary-400"/>
              </span>
              <div>
                <h2 className="font-bold text-lg text-gray-800 dark:text-white">Vic Assistant</h2>
                <p className="text-xs text-green-500 flex items-center">
                  <span className="relative flex h-2 w-2 mr-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Online
                </p>
              </div>
            </div>
            <button onClick={toggleOpen} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Chat Messages */}
          <div ref={chatContainerRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                  <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                     <Bot className="h-5 w-5 text-gray-600 dark:text-gray-300"/>
                  </span>
                )}
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary-500 text-white rounded-br-none'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-dark-text rounded-bl-none'
                  }`}>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{msg.content || '...'}</p>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1].role === 'user' && (
               <div className="flex items-end gap-2 justify-start">
                  <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                     <Bot className="h-5 w-5 text-gray-600 dark:text-gray-300"/>
                  </span>
                  <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-dark-text rounded-bl-none">
                      <LoaderCircle className="h-5 w-5 animate-spin text-gray-500" />
                  </div>
              </div>
            )}
          </div>
          
          {/* Input Form */}
          <div className="p-4 border-t border-gray-200 dark:border-dark-border">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={chat ? "Ask Vic anything..." : "Connecting to assistant..."}
                disabled={!chat || isLoading}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-70"
              />
              <button
                type="submit"
                disabled={isLoading || !userInput.trim() || !chat}
                className="p-3 rounded-full bg-primary-500 text-white disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors"
                aria-label="Send message"
              >
                <SendHorizonal className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
