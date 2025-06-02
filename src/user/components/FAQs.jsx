import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api.js";

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/faq/all`);
        setFaqs(response.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
    fetchFaqs();
  }, []);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pt-20 pb-12"
      style={{
        backgroundImage: `url('https://plus.unsplash.com/premium_photo-1664304819212-911fd3b50a1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFyYXRob24lMjBydW5uZXJzfGVufDB8fDB8fHww')`,
      }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 md:px-28">
          <h2 className="text-5xl font-bold text-center text-white mb-12 drop-shadow-lg">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            {faqs.length > 0 ? (
              faqs.map((faq) => (
                <div
                  key={faq.faq_id}
                  className="mb-4 bg-white bg-opacity-90 rounded-lg shadow-lg p-4"
                >
                  <button
                    onClick={() => toggleFaq(faq.faq_id)}
                    className="w-full text-left flex justify-between items-center"
                  >
                    <h3 className="text-xl font-semibold text-gray-800">
                      {faq.question}
                    </h3>
                    <span className="text-gray-800 text-2xl">
                      {openFaq === faq.faq_id ? "-" : "+"}
                    </span>
                  </button>
                  {openFaq === faq.faq_id && (
                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-white text-center">No FAQs available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
