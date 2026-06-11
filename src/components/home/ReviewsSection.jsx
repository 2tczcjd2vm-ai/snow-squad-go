import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-accent text-accent' : 'text-border'}`}
        />
      ))}
    </div>
  );
}

const fallbackReviews = [
  { id: '1', author_name: 'Jana Procházková', rating: 5, text: 'Syn byl na dvou soustředěních a je nadšený. Trenéři jsou skvělí, organizace bezchybná. Rozhodně doporučuji!', relation: 'Maminka Jakuba, 13 let' },
  { id: '2', author_name: 'Pavel Šimek', rating: 5, text: 'Dcera se díky SnowRiders zamilovala do snowboardingu. Za ty dva roky udělala neuvěřitelný pokrok. Skvělá parta!', relation: 'Tatínek Elišky, 12 let' },
  { id: '3', author_name: 'Markéta Vlčková', rating: 5, text: 'Super přístup k dětem, bezpečnost na prvním místě. Syn se vždy nemůže dočkat dalšího soustředění.', relation: 'Maminka Adama, 11 let' },
];

export default function ReviewsSection() {
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => base44.entities.Review.list('-created_date', 6),
    initialData: [],
  });

  const displayReviews = reviews.length > 0 ? reviews : fallbackReviews;

  return (
    <section className="py-24 bg-background" id="recenze">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Recenze</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mt-3 mb-4">
            Co říkají rodiče
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Nejlépe nás hodnotí ti, kdo nás dobře znají — rodiče a děti z naší komunity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-card rounded-2xl p-6 border border-border/50 relative hover:border-primary/20 hover:shadow-md transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-primary/10 absolute top-4 right-4" />
              <StarRating rating={review.rating} />
              <p className="text-foreground mt-4 mb-5 text-sm leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">
                    {review.author_name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold">{review.author_name}</p>
                  {review.relation && (
                    <p className="text-xs text-muted-foreground">{review.relation}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}