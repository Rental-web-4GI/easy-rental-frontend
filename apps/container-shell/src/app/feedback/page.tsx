'use client';

import React, { useState } from 'react';
import { Star, Send, ThumbsUp, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { reviewService } from '@pwa-easy-rental/shared-services';

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('Client');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFeedback(null);

    if (!authorName.trim()) {
      setFeedback({ type: 'error', message: 'Indiquez votre nom.' });
      return;
    }
    if (rating < 1) {
      setFeedback({ type: 'error', message: 'Sélectionnez une note entre 1 et 5 étoiles.' });
      return;
    }

    setSubmitting(true);
    const res = await reviewService.submitPlatformFeedback({
      authorName: authorName.trim(),
      authorRole,
      rating,
      comment: comment.trim() || undefined,
    });
    setSubmitting(false);

    if (!res.ok) {
      setFeedback({
        type: 'error',
        message: 'Envoi impossible. Vérifiez que le backend est démarré puis réessayez.',
      });
      return;
    }

    setFeedback({
      type: 'success',
      message: 'Merci ! Votre avis a été transmis à l\'équipe. Il pourra apparaître sur la page d\'accueil après validation.',
    });
    setAuthorName('');
    setAuthorRole('Client');
    setRating(0);
    setComment('');
  };

  return (
    <main className="min-h-screen bg-gray-50 text-slate-800 font-sans mt-20">

      <section className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Votre avis compte énormément pour nous</h1>
        <p className="text-blue-100 max-w-2xl mx-auto">
          {"Aidez-nous à améliorer Easy-Rent. Que vous soyez client, agent ou une organisation, votre retour d'expérience est précieux."}
        </p>
      </section>

      <section className="container mx-auto">
        <div className="bg-white mx-auto overflow-hidden flex flex-col md:flex-row">

          <div className="md:w-1/3 bg-slate-900 text-white p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6">Pourquoi donner votre avis ?</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-3">
                  <ThumbsUp className="text-orange-500 w-6 h-6 mt-1" />
                  <p className="text-sm text-gray-300">Amélioration continue de nos services de location.</p>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="text-orange-500 w-6 h-6 mt-1" />
                  <p className="text-sm text-gray-300">Mise en avant des meilleurs agents et agences.</p>
                </li>
                <li className="flex items-start gap-3">
                  <MessageSquare className="text-orange-500 w-6 h-6 mt-1" />
                  <p className="text-sm text-gray-300">Support réactif à vos besoins spécifiques.</p>
                </li>
              </ul>
            </div>
            <div className="mt-12 text-sm text-gray-500">
              © 2025 Easy-Rent Inc.
            </div>
          </div>

          <div className="md:w-2/3 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Partagez votre expérience</h2>

            {feedback && (
              <div
                className={`mb-6 flex items-start gap-3 rounded-lg px-4 py-3 text-sm ${
                  feedback.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <p>{feedback.message}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Votre Nom</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Votre Rôle</label>
                  <select
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Client</option>
                    <option>Agent</option>
                    <option>Organisation</option>
                    <option>Chauffeur</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Notez votre expérience</label>
                <div className="flex gap-2">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <Star
                        key={index}
                        size={32}
                        className={`cursor-pointer transition-colors duration-200 ${ratingValue <= (hover || rating) ? 'fill-orange-500 text-orange-500' : 'text-gray-300'}`}
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                      />
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Votre Message</label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Racontez-nous votre expérience..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
              >
                {submitting ? 'Envoi en cours…' : 'Envoyer mon avis'} <Send size={20} />
              </button>
            </form>
          </div>

        </div>
      </section>
    </main>
  );
}
