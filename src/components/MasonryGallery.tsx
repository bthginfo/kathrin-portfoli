import React, { useState } from 'react';

interface MasonryGalleryProps {
  images: { src: string; caption: string; category: string }[];
  categories: string[];
}

export default function MasonryGallery({ images, categories }: MasonryGalleryProps) {
  const [activeTab, setActiveTab] = useState(categories[0]);

  const filteredImages = images.filter((img) => img.category === activeTab);

  return (
    <div className="masonry-gallery">
      <div className="masonry-gallery__tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`masonry-gallery__tab${cat === activeTab ? ' masonry-gallery__tab--active' : ''}`}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="masonry-gallery__grid">
        {filteredImages.map((img, i) => (
          <div key={i} className="masonry-gallery__item">
            <img src={img.src} alt={img.caption} style={{ width: '100%', display: 'block' }} />
            <div className="masonry-gallery__caption">{img.caption}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
