'use client';

import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {

  return (
   <footer className="bg-white pt-16 pb-8 border-t border-gray-200">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
                <div className="text-2xl font-bold text-blue-600 mb-4">EASY-<span className="text-orange-500">RENT</span></div>
                <p className="text-gray-500 mb-6">Rent your Dream Car with a Click.</p>
                <div className="flex space-x-4 text-gray-400">
                    <Facebook className="hover:text-blue-600 cursor-pointer" size={20}/>
                    <Twitter className="hover:text-blue-400 cursor-pointer" size={20}/>
                    <Instagram className="hover:text-pink-600 cursor-pointer" size={20}/>
                    <Linkedin className="hover:text-blue-700 cursor-pointer" size={20}/>
                </div>
            </div>
            
            <div>
                <h4 className="font-bold text-lg mb-6 text-slate-800">Legal</h4>
                <ul className="space-y-3 text-gray-500">
                    <li><a href="#" className="hover:text-orange-500">Mentions légales</a></li>
                    <li><a href="#" className="hover:text-orange-500">CGV</a></li>
                    <li><a href="#" className="hover:text-orange-500">Confidentialité</a></li>
                    <li><a href="#" className="hover:text-orange-500">Cookies</a></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-lg mb-6 text-slate-800">Services</h4>
                <ul className="space-y-3 text-gray-500">
                    <li><a href="#" className="hover:text-orange-500">Financement</a></li>
                    <li><a href="#" className="hover:text-orange-500">Assurance</a></li>
                    <li><a href="#" className="hover:text-orange-500">Garantie</a></li>
                    <li><a href="#" className="hover:text-orange-500">Livraison</a></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-lg mb-6 text-slate-800">Contact Us</h4>
                <a href="mailto:easy-rent@mail.com" className="text-blue-600 hover:underline">easy-rent@mail.com</a>
                <div className="mt-4 text-gray-500">
                    +237 000 000 000<br/>
                    Yaoundé, Cameroun
                </div>
            </div>
        </div>
        <div className="text-center text-gray-400 text-sm border-t border-gray-100 pt-8">
            © 2025 Easy-rent. Tous droits réservés.
        </div>
      </footer>
  );
}
