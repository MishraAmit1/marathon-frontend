import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { API_BASE_URL } from "../../config/api.js";

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryData, setGalleryData] = useState({
    header_image:
      "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?q=80&w=1000&auto=format&fit=crop",
    heading: "Gallery",
    description_title: "Memories From Ladakh Marathon",
    description_text:
      "Explore the vibrant moments, stunning landscapes, and incredible achievements captured during the Ladakh Marathon events. These images showcase the spirit, determination, and beauty that define this extraordinary race.",
    images: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa",
        alt: "Marathon runners at start line",
        caption: "Marathon Race Start",
        category: "Marathon",
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1486218119243-13883505764c",
        alt: "Marathon finish line",
        caption: "Marathon Finish Line",
        category: "Marathon",
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571",
        alt: "Swimming competition",
        caption: "Swimming Heat",
        category: "Swimming",
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8",
        alt: "Cyclist on trail",
        caption: "Cycling Race",
        category: "Cycling",
      },
      {
        id: 5,
        src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5",
        alt: "Triathlon transition",
        caption: "Triathlon Transition",
        category: "Triathlon",
      },
      {
        id: 6,
        src: "https://images.unsplash.com/photo-1519712999306-7a3e40139cc9",
        alt: "Marathon crowd",
        caption: "Marathon Spectators",
        category: "Marathon",
      },
      {
        id: 7,
        src: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
        alt: "Swimming training",
        caption: "Swimming Practice",
        category: "Swimming",
      },
      {
        id: 8,
        src: "https://images.unsplash.com/photo-1529516548873-9ce57c8f155e",
        alt: "Cycling group",
        caption: "Cycling Team",
        category: "Cycling",
      },
      {
        id: 9,
        src: "https://images.unsplash.com/photo-1578763363228-6e6bfeb6e786",
        alt: "Triathlon run",
        caption: "Triathlon Run Leg",
        category: "Triathlon",
      },
    ],
  });

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/gallery/gallery`);
        if (response.data) {
          const imagesWithIds = response.data.images.map((img, index) => ({
            ...img,
            id: index + 1,
          }));
          setGalleryData({ ...response.data, images: imagesWithIds });
        }
      } catch (error) {
        console.error("Error fetching Gallery:", error);
      }
    };
    fetchGallery();
  }, []);

  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", "Marathon", "Swimming", "Cycling", "Triathlon"];

  const filteredImages =
    activeFilter === "All"
      ? galleryData.images
      : galleryData.images.filter((img) => img.category === activeFilter);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      {/* Header Section */}
      <div
        className="w-full relative bg-cover bg-center h-80"
        style={{
          backgroundImage: `url(${galleryData.header_image})`,
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div className="container mx-auto text-center py-20 relative z-10">
          <h1 className="text-6xl font-black text-white mb-4 drop-shadow-2xl tracking-wider font-sans">
            {galleryData.heading}
          </h1>
          <div className="text-white text-lg font-medium drop-shadow-lg tracking-wider">
            <Link
              to="/user/dashboard"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              <span>HOME</span>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-yellow-400">Gallery</span>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="w-full bg-gray-50 py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          {/* Gallery Description */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 font-sans">
              {galleryData.description_title}
            </h2>
            <p className="text-lg text-gray-600 font-serif leading-relaxed">
              {galleryData.description_text}
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                  activeFilter === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => openLightbox(image)}
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-1">
                    {image.caption}
                  </h3>
                  <p className="text-gray-200 text-sm">{image.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
            onClick={closeLightbox}
          >
            <AiOutlineClose size={24} />
          </button>
          <div
            className="max-w-6xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <div className="text-white mt-4 text-center">
              <h3 className="text-2xl font-bold">{selectedImage.caption}</h3>
              <p className="text-gray-300 mt-2">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GallerySection;
