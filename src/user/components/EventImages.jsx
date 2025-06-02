import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api.js";

const EventImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [slidePosition, setSlidePosition] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const scrollRef = useRef(null);
  const cardWidth = 12; // w-48 = 12rem

  // Fetch all event images
  useEffect(() => {
    const fetchEventImages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/event/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.length === 0) {
          setImages([]);
          return;
        }

        const eventImages = response.data
          .filter((event) => event.event_image)
          .map((event) => ({
            id: event.event_id,
            url: `${API_BASE_URL}${event.event_image}`,
            name: event.event_name,
          }));

        // Only duplicate if we have images
        if (eventImages.length > 0) {
          // Create a duplicated array for seamless looping
          setImages([...eventImages, ...eventImages]);
        } else {
          setImages([]);
        }
      } catch (error) {
        console.error("Error fetching event images:", error);
        setError(
          error.response?.data?.message ||
            "Error fetching event images. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEventImages();
  }, []);

  // Auto-scroll logic with better cleanup
  useEffect(() => {
    let interval;
    if (images.length > 0 && !selectedImage) {
      interval = setInterval(() => {
        setSlidePosition((prev) => {
          const maxShift = (images.length / 2) * cardWidth; // Halfway point in rem
          const newPosition = prev - cardWidth; // Move left by one card

          // Smooth reset for loop
          if (Math.abs(newPosition) >= maxShift) {
            return 0;
          }
          return newPosition;
        });
      }, 2000); // 2 sec per card
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [images, selectedImage]);

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && selectedImage) {
        setSelectedImage(null);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [selectedImage]);

  // Manual scroll functions
  const scrollLeft = () => {
    setSlidePosition((prev) => {
      const maxShift = (images.length / 2) * cardWidth;
      const newPosition = prev + cardWidth;
      return newPosition > 0 ? -maxShift + cardWidth : newPosition;
    });
  };

  const scrollRight = () => {
    setSlidePosition((prev) => {
      const maxShift = (images.length / 2) * cardWidth;
      const newPosition = prev - cardWidth;
      return Math.abs(newPosition) >= maxShift ? 0 : newPosition;
    });
  };

  // Open image in modal
  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  // Close image modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Handle empty states
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">Loading event images...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">No event images available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Event Images
      </h2>
      <div className="w-full overflow-hidden relative" ref={scrollRef}>
        {/* Slider */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${images.length * cardWidth}rem`, // Total width
            transform: `translateX(${slidePosition}rem)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={`${image.id}-${index}`} // More stable key pattern
              className="flex-shrink-0 w-48 px-2 group" // Fixed width: 12rem = 192px
            >
              <div
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 group-hover:scale-125 cursor-pointer"
                onClick={() => openImageModal(image)}
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg"; // Fallback image
                    e.target.alt = "Image not available";
                  }}
                />
                <div className="p-2">
                  <p className="text-gray-800 text-sm font-semibold text-center truncate">
                    {image.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrow Controls */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
          aria-label="Previous image"
        >
          ←
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
          aria-label="Next image"
        >
          →
        </button>
      </div>

      {/* Modal for viewing full images */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">{selectedImage.name}</h3>
              <button
                onClick={closeImageModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                className="w-full object-contain max-h-96"
                onError={(e) => {
                  e.target.src = "/placeholder-image.jpg"; // Fallback image
                  e.target.alt = "Image not available";
                }}
              />
            </div>
            <div className="p-4 border-t">
              <button
                onClick={closeImageModal}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventImages;
