import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaRobot,
  FaUser,
  FaPaperPlane,
  FaTrash,
  FaSpinner,
  FaLightbulb,
  FaExclamationTriangle,
} from "react-icons/fa";

import API from "../../services/api";

import "./Assistant.css";


// =========================================================
// GET LOGGED-IN USER ID
// =========================================================

const getUserId = () => {
  const possibleKeys = [
    "userId",
    "user_id",
    "loggedInUserId",
    "patientUserId",
  ];

  for (const key of possibleKeys) {
    const sessionValue = sessionStorage.getItem(key);

    if (sessionValue) {
      return sessionValue;
    }

    const localValue = localStorage.getItem(key);

    if (localValue) {
      return localValue;
    }
  }

  return null;
};


// =========================================================
// INITIAL AI MESSAGE
// =========================================================

const initialMessage = {
  id: 1,
  sender: "ai",
  text:
    "Hello! I'm Nurture AI 🌸\n\n" +
    "I'm your pregnancy wellness assistant. " +
    "You can ask me questions about pregnancy, " +
    "nutrition, healthy habits, common concerns, " +
    "and your pregnancy journey.\n\n" +
    "How can I help you today?",
};


// =========================================================
// SUGGESTED QUESTIONS
// =========================================================

const suggestedQuestions = [
  "What healthy habits should I follow during pregnancy?",
  "What foods are generally good during pregnancy?",
  "How can I manage common pregnancy discomforts?",
  "What should I know about my current pregnancy week?",
];


// =========================================================
// AI ASSISTANT COMPONENT
// =========================================================

const Assistant = () => {

  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    initialMessage,
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState(null);

  const messagesEndRef = useRef(null);

  const textareaRef = useRef(null);


  // =======================================================
  // LOAD USER ID
  // =======================================================

  useEffect(() => {

    const id = getUserId();

    if (id) {
      setUserId(Number(id));
    }

  }, []);


  // =======================================================
  // AUTO SCROLL CHAT
  // =======================================================

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);


  // =======================================================
  // SEND MESSAGE TO BACKEND
  // =======================================================

  const sendMessage = async () => {

    const question = input.trim();

    // Don't send empty messages
    if (!question || loading) {
      return;
    }


    // Get current user ID
    const currentUserId =
      userId || getUserId();


    // =====================================================
    // USER ID CHECK
    // =====================================================

    if (!currentUserId) {

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: Date.now(),
          sender: "ai",
          error: true,
          text:
            "I couldn't identify your logged-in account. " +
            "Please log in again and try once more.",
        },
      ]);

      return;
    }


    // =====================================================
    // ADD USER MESSAGE
    // =====================================================

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: question,
    };


    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);


    // Clear input
    setInput("");

    setLoading(true);


    try {

      // ===================================================
      // CALL SPRING BOOT API
      // ===================================================

      const response = await API.post(
        "/ai/chat",
        {
          userId: Number(currentUserId),
          message: question,
        }
      );


      // ===================================================
      // GET AI REPLY
      // ===================================================

      const reply =
        response?.data?.reply;


      if (!reply) {

        throw new Error(
          "AI returned an empty response."
        );
      }


      // ===================================================
      // ADD AI MESSAGE
      // ===================================================

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: reply,
      };


      setMessages((previousMessages) => [
        ...previousMessages,
        aiMessage,
      ]);


    } catch (error) {

      console.error(
        "Nurture AI Error:",
        error
      );


      // Default error
      let errorMessage =
        "Sorry, I couldn't connect to Nurture AI right now. Please try again.";


      // =================================================
      // BACKEND ERROR
      // =================================================

      if (
        error?.response?.data?.message
      ) {

        errorMessage =
          error.response.data.message;
      }


      // =================================================
      // NETWORK ERROR
      // =================================================

      else if (
        error?.message === "Network Error"
      ) {

        errorMessage =
          "Unable to connect to the Nurture AI server. " +
          "Please make sure your Spring Boot backend is running.";
      }


      // =================================================
      // ADD ERROR MESSAGE
      // =================================================

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: Date.now() + 1,
          sender: "ai",
          error: true,
          text: errorMessage,
        },
      ]);

    } finally {

      setLoading(false);


      // Focus textarea
      setTimeout(() => {

        textareaRef.current?.focus();

      }, 100);
    }
  };


  // =========================================================
  // HANDLE KEYBOARD
  // =========================================================

  const handleKeyDown = (event) => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      sendMessage();
    }
  };


  // =========================================================
  // HANDLE SUGGESTION
  // =========================================================

  const handleSuggestion = (question) => {

    setInput(question);

    setTimeout(() => {

      textareaRef.current?.focus();

    }, 50);
  };


  // =========================================================
  // CLEAR CHAT
  // =========================================================

  const clearChat = () => {

    if (loading) {
      return;
    }

    setMessages([
      {
        ...initialMessage,
        id: Date.now(),
      },
    ]);

    setInput("");
  };


  // =========================================================
  // GO BACK TO DASHBOARD
  // =========================================================

  const goBack = () => {

    navigate("/dashboard");
  };


  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="assistant-page">


      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="assistant-header">

        <div className="assistant-header-left">

          <button
            type="button"
            className="assistant-back-button"
            onClick={goBack}
            aria-label="Go back"
          >
            <FaArrowLeft />
          </button>


          <div className="assistant-brand-icon">
            <FaRobot />
          </div>


          <div className="assistant-brand-info">

            <h1>Nurture AI</h1>

            <span>
              Pregnancy Wellness Assistant
            </span>

          </div>

        </div>


        <button
          type="button"
          className="assistant-clear-button"
          onClick={clearChat}
          disabled={
            loading ||
            messages.length <= 1
          }
        >
          <FaTrash />

          <span>
            Clear Chat
          </span>
        </button>

      </header>


      {/* =====================================================
          MAIN
          ===================================================== */}

      <main className="assistant-main">


        {/* ===================================================
            WELCOME CARD
            =================================================== */}

        <section className="assistant-welcome-card">

          <div className="assistant-welcome-icon">
            <FaRobot />
          </div>


          <div>

            <h2>
              Your Pregnancy Wellness Companion
            </h2>

            <p>
              Ask questions about pregnancy,
              maternal wellness, nutrition,
              common concerns and healthy habits.
            </p>

          </div>

        </section>


        {/* ===================================================
            CHAT CONTAINER
            =================================================== */}

        <section className="assistant-chat-container">

          <div className="assistant-messages">


            {/* =================================================
                CHAT MESSAGES
                ================================================= */}

            {messages.map((message) => (

              <div
                key={message.id}
                className={`assistant-message-row ${
                  message.sender === "user"
                    ? "assistant-user-row"
                    : "assistant-ai-row"
                }`}
              >


                {/* AI AVATAR */}

                {message.sender === "ai" && (

                  <div className="assistant-message-avatar assistant-ai-avatar">
                    <FaRobot />
                  </div>

                )}


                {/* MESSAGE BUBBLE */}

                <div
                  className={`assistant-message-bubble ${
                    message.sender === "user"
                      ? "assistant-user-bubble"
                      : "assistant-ai-bubble"
                  } ${
                    message.error
                      ? "assistant-error-bubble"
                      : ""
                  }`}
                >

                  {message.sender === "ai" && (

                    <div className="assistant-message-name">
                      Nurture AI
                    </div>

                  )}


                  <div className="assistant-message-text">
                    {message.text}
                  </div>

                </div>


                {/* USER AVATAR */}

                {message.sender === "user" && (

                  <div className="assistant-message-avatar assistant-user-avatar">
                    <FaUser />
                  </div>

                )}

              </div>

            ))}


            {/* =================================================
                LOADING
                ================================================= */}

            {loading && (

              <div className="assistant-message-row assistant-ai-row">

                <div className="assistant-message-avatar assistant-ai-avatar">
                  <FaRobot />
                </div>


                <div className="assistant-message-bubble assistant-ai-bubble">

                  <div className="assistant-message-name">
                    Nurture AI
                  </div>


                  <div className="assistant-typing">

                    <span></span>
                    <span></span>
                    <span></span>

                    <span className="assistant-thinking-text">
                      Thinking...
                    </span>

                  </div>

                </div>

              </div>

            )}


            <div ref={messagesEndRef} />

          </div>


          {/* ===================================================
              SUGGESTED QUESTIONS
              =================================================== */}

          {messages.length <= 1 && (

            <div className="assistant-suggestions">

              <div className="assistant-suggestions-title">

                <FaLightbulb />

                <span>
                  Try asking
                </span>

              </div>


              <div className="assistant-suggestions-list">

                {suggestedQuestions.map(
                  (question, index) => (

                    <button
                      type="button"
                      key={index}
                      className="assistant-suggestion-button"
                      onClick={() =>
                        handleSuggestion(question)
                      }
                    >
                      {question}
                    </button>

                  )
                )}

              </div>

            </div>

          )}

        </section>


        {/* ===================================================
            INPUT
            =================================================== */}

        <section className="assistant-input-section">

          <div className="assistant-input-wrapper">

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask Nurture AI something..."
              rows={1}
              disabled={loading}
            />


            <button
              type="button"
              className="assistant-send-button"
              onClick={sendMessage}
              disabled={
                loading ||
                !input.trim()
              }
              aria-label="Send message"
            >

              {loading ? (
                <FaSpinner className="assistant-spinner" />
              ) : (
                <FaPaperPlane />
              )}

            </button>

          </div>


          <p className="assistant-input-help">
            Press Enter to send • Shift + Enter for a new line
          </p>

        </section>


        {/* ===================================================
            DISCLAIMER
            =================================================== */}

        <section className="assistant-disclaimer">

          <FaExclamationTriangle />

          <p>

            <strong>Important:</strong>{" "}

            Nurture AI provides general educational
            wellness information and does not replace
            professional medical advice. For urgent
            or serious symptoms, contact a qualified
            healthcare professional or emergency service.

          </p>

        </section>

      </main>

    </div>
  );
};


export default Assistant;