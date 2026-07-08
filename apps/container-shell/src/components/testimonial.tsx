'use client';

import React, { useState, useEffect } from 'react';
import { Star, Quote, Loader2 } from 'lucide-react';
import { TestimonialCard } from './TestimonialCard';
import { useLang } from './LangContext';

const FALLBACK = [
  {
    name: 'Jean-Pierre Nguema',
    rating: 5,
    comment: 'Service impeccable ! Véhicule en parfait état, équipe professionnelle.',
    date: '2024-01-15',
  },
  {
    name: 'Marie Atangana',
    rating: 5,
    comment: 'Réservation simple et rapide. Je recommande Easy Rental.',
    date: '2024-01-10',
  },
  {
    name: 'Paul Kamga',
    rating: 4,
    comment: 'Prix compétitifs et suivi clair de ma location.',
    date: '2024-01-08',
  },
];

type FeaturedReview = {
  authorName?: string;
  author_name?: string;
  rating: number;
  comment?: string;
  createdAt?: string;
  created_at?: string;
};

const Testimonial = () => {
  const [items, setItems] = useState(FALLBACK);
  const [avg, setAvg] = useState(4.8);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { t } = useLang();
  const labels = t.testimonials;

  useEffect(() => {
    fetch('/api-rental/api/reviews/featured')
      .then((r) => r.json())
      .then((data) => {
        const reviews = (data.reviews ?? []) as FeaturedReview[];
        if (reviews.length > 0) {
          setItems(
            reviews.slice(0, 3).map((r) => ({
              name: r.authorName ?? r.author_name ?? 'Client',
              rating: r.rating,
              comment: r.comment ?? '',
              date: (r.createdAt ?? r.created_at ?? '').slice(0, 10),
            }))
          );
        }
        if (data.averageRating) setAvg(Number(data.averageRating));
        if (data.totalCount) setTotal(Number(data.totalCount));
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-[10px] font-black tracking-widest uppercase mb-3">
              <Star size={12} fill="currentColor" /> {labels.badge}
            </div>
            <h2 className="text-3xl md:text-5xl font-[900] italic leading-none tracking-tighter text-slate-900 dark:text-white">
              {labels.title} <span className="text-[#0528d6]">{labels.titleAccent}</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
            {loading ? (
              <Loader2 className="animate-spin text-[#0528d6]" size={24} />
            ) : (
              <>
                <div className="text-2xl font-black text-[#0528d6] italic">{avg.toFixed(1)}/5</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase leading-tight">
                  {labels.basedOn} {total > 0 ? total : '2500+'} <br /> {labels.certified}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((testimonial, index) => (
            <div key={index} className="relative group">
              <div className="absolute -top-3 -right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={48} className="text-[#0528d6]" />
              </div>
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
