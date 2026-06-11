import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const images = [
  {
    src: 'https://media.base44.com/images/public/69de2e87ca4221fb80b44806/f5237e2d7_generated_f47e4b3e.png',
    alt: 'Skupinová fotka snowboardistů',
    caption: 'Naše parta na soustředění v Mayrhofen',
  },
  {
    src: 'https://media.base44.com/images/public/69de2e87ca4221fb80b44806/c77495285_generated_8e3c37cb.png',
    alt: 'Snowboard jump',
    caption: 'Freestyle triky ve snowparku',
  },
  {
    src: 'https://media.base44.com/images/public/69de2e87ca4221fb80b44806/eaad43f7c_generated_c0218c28.png',
    alt: 'Trénink na svahu',
    caption: 'Ranní trénink s instruktorem',
  },
  {
    src: 'https://media.base44.com/images/public/69de2e87ca4221fb80b44806/48bb6e405_generated_6e3ac8e2.png',
    alt: 'Večer na chatě',
    caption: 'Odpolední relax v chatě po ježdění',
  },
];

export default function GallerySection() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section className="py-24 bg-muted/50" id="galerie">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Galerie</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mt-3 mb-4">
            Zážitky z akcí
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Podívejte se, jak vypadá typické soustředění s naším klubem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setLightbox(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white text-sm font-medium">{image.caption}</p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full rounded-2xl"
              />
              <p className="text-white/70 text-sm text-center mt-3">{lightbox.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}