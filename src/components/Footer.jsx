import React from 'react';
import { Leaf, Github, Twitter, Linkedin, MessageSquare, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Calculator', href: '#calculator' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'AI Coach', href: '#recommendations' },
    { name: 'Challenges', href: '#challenges' },
    { name: 'Our Mission', href: '#mission' }
  ];

  return (
    <footer className="bg-slate-900 border-t border-white/5 text-slate-300">
      
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Logo & Pitch */}
          <div className="md:col-span-5 space-y-6">
            <a href="#" className="flex items-center gap-2 group w-max">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center text-white shadow-md shadow-emerald-950">
                <Leaf className="w-5 h-5 fill-current" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                EcoTrack<span className="text-emerald-500 ml-0.5">AI</span>
              </span>
            </a>
            <p className="text-slate-400 text-sm font-normal leading-relaxed max-w-sm">
              Helping users understand, track, and reduce their carbon footprint through localized AI analytics and community-driven rewards.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                { icon: Twitter, href: '#' },
                { icon: Github, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: MessageSquare, href: '#' }
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-slate-400 border border-white/5 hover:border-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-widest border-b border-white/5 pb-2">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm font-medium">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-emerald-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-widest border-b border-white/5 pb-2">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>support@ecotrack.ai</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+1 (555) 019-2834</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Rethink Space, San Francisco, CA</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Lower Copyright section */}
      <div className="border-t border-white/5 bg-slate-950 py-6 text-center text-xs text-slate-500 font-semibold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>&copy; {new Date().getFullYear()} EcoTrack AI. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
