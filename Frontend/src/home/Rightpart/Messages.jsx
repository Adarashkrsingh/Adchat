import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage(); // Listening for incoming messages

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto bg-gray-100 p-4 rounded-lg"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loading />
        </div>
      ) : (
        <>
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message._id} ref={lastMsgRef} className="mb-4">
                <Message message={message} />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-20">
              <p className="text-lg font-semibold">
                Say! Hi to start the conversation
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Messages;
