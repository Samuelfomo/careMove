import React, { useRef, useEffect } from 'react';
import { Car, Phone, Mail, MapPin, ArrowUp, Facebook, Instagram, Twitter } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ShareWumaFooter = () => {
const featuresSection = useRef(null);
const featureCards = useRef([]);

const locations = [
{
title: 'Siège social (Douala)',
address: 'Akwa, Avenue de la Liberté, Immeuble Le Paradis',
phone: '+237 233 42 17 88',
textPhone: '+237 233 42 17 88',
mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1048.3107933470685!2d9.70440172672647!3d4.05273483122112!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061136521bddd85%3A0x4dc0381643068eab!2sShareWuma%20-%20Covoiturage%20Cameroun!5e0!3m2!1sfr!2scm!4v1747233173429!5m2!1sfr!2scm",
gpsCoords: '4.052734831221122,9.70440172672647'
},
{
title: 'Point de service Yaoundé',
address: 'Bastos, Rue 1005, Face Pharmacie du Rond-Point',
phone: '+237 693 87 24 56',
textPhone: '+237 693 87 24 56',
mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.8289708097245!2d11.511476911682971!3d3.862953097127033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcfd9dba9c739%3A0xeb9f84583978b64c!2sShareWuma%20Yaound%C3%A9!5e0!3m2!1sfr!2scm!4v1715971524686!5m2!1sfr!2scm",
gpsCoords: '3.862953097127033,11.511476911682971'
},
{
title: 'Point de service Bafoussam',
address: 'Marché A, Avenue des Bananiers, Centre-ville',
phone: '+237 699 12 34 56',
textPhone: '+237 699 12 34 56',
mapEmbedUrl: null,
gpsCoords: '5.77758409582046,10.41624259171053'
},
{
title: 'Point de service Garoua',
address: 'Quartier Plateau, Rue de la Bénoué',
phone: '+237 678 90 12 34',
textPhone: '+237 678 90 12 34',
mapEmbedUrl: null,
gpsCoords: '9.301185,13.398892'
}
];

const openGoogleMapsDirections = (location) => {
if (!location || !location.gpsCoords) return;
const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.gpsCoords}`;
window.open(mapsUrl, '_blank');
};

const openWhatsApp = (phone) => {
if (phone) {
const phoneClean = String(phone).replace(/\s+/g, '').replace('+', '');
const url = `https://api.whatsapp.com/send/?phone=${phoneClean}&text=Bonjour ShareWuma, je souhaite obtenir des informations sur vos services de covoiturage.&type=phone_number&app_absent=0`;
window.open(url, "_blank");
} else {
console.error("Numéro de téléphone non disponible !");
}
};

const contact = () => {
window.open(`https://api.whatsapp.com/send/?phone=237233421788&text=Bonjour ShareWuma, je souhaite commencer un trajet de covoiturage.&type=phone_number&app_absent=0`, "_blank");
};

const openSocialMedia = (platform) => {
const urls = {
facebook: "https://www.facebook.com/sharewuma.cameroun",
instagram: "https://www.instagram.com/sharewuma_cm",
twitter: "https://www.twitter.com/sharewuma_cm"
};
window.open(urls[platform], "_blank");
};

const scrollToTop = () => {
window.scrollTo({ top: 0, behavior: 'smooth' });
};

useEffect(() => {
ScrollTrigger.create({
trigger: featuresSection.current,
start: 'top 80%',
onEnter: () => {
gsap.from(featureCards.current, {
y: 50,
opacity: 0,
duration: 0.8,
stagger: 0.2,
ease: 'power3.out'
});
}
});

return () => {
ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};
}, []);

return (
<footer className="bg-primary pt-10 lg:pt-12">
<div className="container mx-auto px-4 w-full">
  {/* Call to Action Section */}
  <div className="flex flex-col items-center text-center lg:mb-32 mb-10">
    <div className="flex items-center justify-center mb-4">
      <Car className="w-8 h-8 text-primary-accent mr-3" />
      <h1 className="text-3xl font-montserrat font-bold text-white">
        Share<span className="text-secondary">Wuma</span>
      </h1>
    </div>
    <h2 className="text-white font-bold text-2xl lg:text-3xl mb-4 font-montserrat">
      Voyagez ensemble, économisez ensemble
    </h2>
    <p className="text-gray-200 font-open-sans text-base lg:text-lg mb-6 max-w-2xl">
      ShareWuma connecte les conducteurs et passagers pour des trajets sécurisés et économiques
      à travers le Cameroun. Que vous soyez conducteur ou passager, rejoignez notre communauté
      et transformez vos déplacements en expériences partagées.
    </p>
    <button
      type="button"
      className="bg-primary-accent text-primary px-8 py-4 rounded-xl font-montserrat font-semibold text-lg hover:bg-primary-accent/90 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
      onClick={contact}
    >
      <Car className="w-5 h-5" />
      <span>Commencer un trajet aujourd'hui</span>
    </button>
  </div>

  {/* Locations Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-5" ref={featuresSection}>
    {locations.map((location, index) => (
    <div
      key={index}
      className="text-white md:text-start text-center"
      ref={el => featureCards.current[index] = el}
    >
    <div className="mb-4">
      {location.mapEmbedUrl ? (
      <div
        className="map-container rounded-lg overflow-hidden shadow-md cursor-pointer h-32 hover:opacity-80 transition-all duration-300 hover:transform hover:scale-105"
        onClick={() => openGoogleMapsDirections(location)}
      >
      <iframe
        src={location.mapEmbedUrl}
        width="100%"
        height="180"
        style={{border: 0}}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps"
        className="w-full"
      />
    </div>
    ) : (
    <div
      className="w-full h-32 bg-gradient-to-br from-secondary to-secondary/80 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-all duration-300 hover:transform hover:scale-105"
      onClick={() => openGoogleMapsDirections(location)}
    >
    <MapPin className="w-8 h-8 text-white" />
  </div>
  )}
</div>

<h3 className="font-montserrat font-bold text-base my-2">{location.title}</h3>
<p className="text-gray-200 italic font-open-sans text-xs mb-3">
  {location.address}
</p>
<div className="flex md:justify-normal justify-center items-center space-x-2">
  <Phone className="w-4 h-4 text-primary-accent" />
  <span
    className="cursor-pointer text-sm font-montserrat font-semibold text-white hover:text-primary-accent transition-colors duration-200"
    onClick={() => openWhatsApp(location.phone)}
  >
  {location.textPhone}
  </span>
</div>
</div>
))}
</div>

{/* Services Section */}
<div className="border-t border-gray-600 pt-8 pb-8 mb-8">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
    <div className="text-white">
      <h4 className="font-montserrat font-bold text-lg mb-4 text-primary-accent">Nos Services</h4>
      <ul className="space-y-2 font-open-sans text-sm">
        <li className="hover:text-primary-accent transition-colors cursor-pointer">Covoiturage urbain</li>
        <li className="hover:text-primary-accent transition-colors cursor-pointer">Trajets interurbains</li>
        <li className="hover:text-primary-accent transition-colors cursor-pointer">Covoiturage événementiel</li>
        <li className="hover:text-primary-accent transition-colors cursor-pointer">Transport étudiant</li>
      </ul>
    </div>

    <div className="text-white">
      <h4 className="font-montserrat font-bold text-lg mb-4 text-primary-accent">Support</h4>
      <ul className="space-y-2 font-open-sans text-sm">
        <li className="hover:text-primary-accent transition-colors cursor-pointer">Centre d'aide</li>
        <li className="hover:text-primary-accent transition-colors cursor-pointer">Conditions d'utilisation</li>
        <li className="hover:text-primary-accent transition-colors cursor-pointer">Politique de confidentialité</li>
        <li className="hover:text-primary-accent transition-colors cursor-pointer">Signaler un problème</li>
      </ul>
    </div>

    <div className="text-white">
      <h4 className="font-montserrat font-bold text-lg mb-4 text-primary-accent">Suivez-nous</h4>
      <div className="flex justify-center md:justify-start space-x-4">
        <button
          onClick={() => openSocialMedia('facebook')}
        className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary/80 transition-all duration-300 hover:scale-110"
        >
        <Facebook className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => openSocialMedia('instagram')}
        className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary/80 transition-all duration-300 hover:scale-110"
        >
        <Instagram className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => openSocialMedia('twitter')}
        className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary/80 transition-all duration-300 hover:scale-110"
        >
        <Twitter className="w-5 h-5 text-white" />
        </button>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
          <Mail className="w-4 h-4 text-primary-accent" />
          <span className="font-open-sans text-sm">contact@sharewuma.cm</span>
        </div>
        <div className="flex items-center justify-center md:justify-start space-x-2">
          <Phone className="w-4 h-4 text-primary-accent" />
          <span className="font-open-sans text-sm">+237 233 42 17 88</span>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Footer Bottom */}
<div className="border-t border-white/20 pt-6 pb-2">
  <div className="lg:flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
    <div className="w-full lg:flex flex-wrap lg:justify-start justify-center gap-x-4 text-sm text-gray-300 lg:space-x-0 space-x-4 leading-8 font-open-sans">
      <span>Copyright © 2024 - 2025</span>
      <span className="hover:text-primary-accent transition-colors cursor-pointer font-bold">
                ShareWuma - Covoiturage Cameroun
              </span>
      <span className="hidden md:inline">|</span>
      <span>Développé par</span>
      <span className="hover:text-primary-accent transition-colors cursor-pointer font-bold">
                TEAM NF
              </span>
    </div>
  </div>
</div>
</div>

{/* Scroll to Top Button */}
<div className="fixed right-4 bottom-6 z-50">
  <button
    onClick={scrollToTop}
    className="w-12 h-12 bg-primary-accent text-primary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-secondary/20"
  >
    <ArrowUp className="w-6 h-6" />
  </button>
</div>
</footer>
);
};

export default ShareWumaFooter;


import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, Car, ArrowRight, Phone, Send, Eye, EyeOff } from 'lucide-react';
import gsap from 'gsap';

const ShareWumaAuth = () => {
const [currentView, setCurrentView] = useState('tokenLogin'); // 'tokenLogin', 'requestToken', 'emailLogin'
const [formData, setFormData] = useState({
token: '',
email: '',
password: '',
phone: ''
});
const [showPassword, setShowPassword] = useState(false);
const [isLoading, setIsLoading] = useState(false);

const containerRef = useRef(null);
const formRef = useRef(null);
const titleRef = useRef(null);

useEffect(() => {
// Animation d'entrée
if (containerRef.current && formRef.current && titleRef.current) {
gsap.fromTo(containerRef.current,
{ opacity: 0, y: 50 },
{ opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
);

gsap.fromTo(titleRef.current,
{ opacity: 0, y: -30 },
{ opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
);

gsap.fromTo(formRef.current,
{ opacity: 0, scale: 0.95 },
{ opacity: 1, scale: 1, duration: 0.6, delay: 0.4, ease: "back.out(1.7)" }
);
}
}, [currentView]);

const handleViewChange = (newView) => {
gsap.to(formRef.current, {
opacity: 0,
x: -20,
duration: 0.3,
ease: "power2.in",
onComplete: () => {
setCurrentView(newView);
setFormData({ token: '', email: '', password: '', phone: '' });
gsap.fromTo(formRef.current,
{ opacity: 0, x: 20 },
{ opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
);
}
});
};

const handleSubmit = async () => {
setIsLoading(true);

// Simulation d'une requête
await new Promise(resolve => setTimeout(resolve, 2000));
setIsLoading(false);

console.log('Form submitted:', formData, 'View:', currentView);
};

const handleInputChange = (e) => {
setFormData(prev => ({
...prev,
[e.target.name]: e.target.value
}));
};

const TokenLoginForm = () => (
<div className="space-y-6">
<div className="text-center mb-8">
  <div className="mx-auto w-16 h-16 bg-primary-accent rounded-full flex items-center justify-center mb-4">
    <Car className="w-8 h-8 text-primary" />
  </div>
  <h2 className="text-2xl font-montserrat font-bold text-primary mb-2">
    Connexion Conducteur
  </h2>
  <p className="text-gray-600 font-open-sans">
    Saisissez votre token d'authentification
  </p>
</div>

<div className="space-y-6">
  <div className="relative">
    <input
      type="text"
      name="token"
      value={formData.token}
      onChange={handleInputChange}
      placeholder="Entrer votre token"
      className="w-full px-4 py-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300 font-open-sans"
      required
    />
    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-secondary">
            J'ai un token valide
          </span>
  </div>

  <button
    onClick={handleSubmit}
    disabled={isLoading}
    className="w-full bg-primary text-white py-4 rounded-xl font-montserrat font-semibold hover:bg-primary-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
  >
    {isLoading ? (
    <>
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
    <span>Connexion...</span>
  </>
  ) : (
  <>
  <span>Se connecter</span>
  <ArrowRight className="w-5 h-5" />
</>
)}
</button>
</div>

<div className="mt-8 p-4 bg-primary-accent/10 rounded-xl border border-primary-accent/20">
<p className="text-sm text-gray-700 mb-2 font-open-sans">
  Vous n'avez pas de token ?
</p>
<button
  onClick={() => handleViewChange('requestToken')}
className="text-secondary font-semibold hover:text-secondary-700 transition-colors duration-200 font-montserrat"
>
Demander un token d'authentification →
</button>
</div>

<div className="text-center">
<button
  onClick={() => handleViewChange('emailLogin')}
className="text-gray-500 hover:text-primary transition-colors duration-200 font-open-sans"
>
Ou se connecter avec email/mot de passe
</button>
</div>
</div>
);

const RequestTokenForm = () => (
<div className="space-y-6">
<div className="text-center mb-8">
  <div className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
    <Send className="w-8 h-8 text-white" />
  </div>
  <h2 className="text-2xl font-montserrat font-bold text-primary mb-2">
    Demande de Token
  </h2>
  <p className="text-gray-600 font-open-sans">
    Saisissez votre e-mail pour recevoir votre token d'authentification
  </p>
</div>

<div className="space-y-6">
  <div className="relative">
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      placeholder="Entrer votre email"
      className="w-full px-4 py-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all duration-300 font-open-sans"
      required
    />
    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    <span className="text-red-500 absolute right-4 top-1/2 transform -translate-y-1/2 text-xs">*</span>
  </div>

  <button
    onClick={handleSubmit}
    disabled={isLoading}
    className="w-full bg-secondary text-white py-4 rounded-xl font-montserrat font-semibold hover:bg-secondary-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
  >
    {isLoading ? (
    <>
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
    <span>Envoi...</span>
  </>
  ) : (
  <>
  <Send className="w-5 h-5" />
  <span>Envoyer</span>
</>
)}
</button>
</div>

<div className="mt-8 p-4 bg-secondary/10 rounded-xl border border-secondary/20">
<p className="text-sm text-gray-700 mb-2 font-open-sans">
  Vous avez déjà un token ?
</p>
<button
  onClick={() => handleViewChange('tokenLogin')}
className="text-primary font-semibold hover:text-primary-800 transition-colors duration-200 font-montserrat"
>
Se connecter avec le token →
</button>
</div>

<div className="text-center">
<button
  onClick={() => handleViewChange('emailLogin')}
className="text-gray-500 hover:text-primary transition-colors duration-200 font-open-sans"
>
Ou se connecter avec email/mot de passe
</button>
</div>
</div>
);

const EmailLoginForm = () => (
<div className="space-y-6">
<div className="text-center mb-8">
  <div className="mx-auto w-16 h-16 bg-primary-accent rounded-full flex items-center justify-center mb-4">
    <Lock className="w-8 h-8 text-primary" />
  </div>
  <h2 className="text-2xl font-montserrat font-bold text-primary mb-2">
    Connexion Traditionnelle
  </h2>
  <p className="text-gray-600 font-open-sans">
    Connectez-vous avec votre email et mot de passe
  </p>
</div>

<div className="space-y-6">
  <div className="relative">
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      placeholder="Entrer votre email"
      className="w-full px-4 py-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300 font-open-sans"
      required
    />
    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
  </div>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
    name="password"
    value={formData.password}
    onChange={handleInputChange}
    placeholder="Mot de passe"
    className="w-full px-4 py-4 pl-12 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300 font-open-sans"
    required
    />
    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
    >
    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
  </div>

  <button
    onClick={handleSubmit}
    disabled={isLoading}
    className="w-full bg-primary text-white py-4 rounded-xl font-montserrat font-semibold hover:bg-primary-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
  >
    {isLoading ? (
    <>
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
    <span>Connexion...</span>
  </>
  ) : (
  <>
  <span>Se connecter</span>
  <ArrowRight className="w-5 h-5" />
</>
)}
</button>
</div>

<div className="mt-8 p-4 bg-primary-accent/10 rounded-xl border border-primary-accent/20">
<p className="text-sm text-gray-700 mb-2 font-open-sans">
  Préférez-vous utiliser un token ?
</p>
<button
  onClick={() => handleViewChange('tokenLogin')}
className="text-secondary font-semibold hover:text-secondary-700 transition-colors duration-200 font-montserrat mr-4"
>
Connexion par token →
</button>
<button
  onClick={() => handleViewChange('requestToken')}
className="text-primary font-semibold hover:text-primary-800 transition-colors duration-200 font-montserrat"
>
Demander un token →
</button>
</div>
</div>
);

return (
<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
<div ref={containerRef} className="w-full max-w-md">
  <div ref={titleRef} className="text-center mb-8">
    <h1 className="text-3xl font-montserrat font-bold text-primary mb-2">
      Share<span className="text-secondary">Wuma</span>
    </h1>
    <p className="text-gray-600 font-open-sans">
      Votre plateforme de covoiturage
    </p>
  </div>

  <div ref={formRef} className="bg-white rounded-2xl shadow-xl p-8">
    {currentView === 'tokenLogin' && <TokenLoginForm />}
    {currentView === 'requestToken' && <RequestTokenForm />}
    {currentView === 'emailLogin' && <EmailLoginForm />}
  </div>

  <div className="mt-8 flex justify-center space-x-6">
    <div className="flex items-center space-x-2 text-gray-500">
      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      <span className="text-xs font-open-sans">Version iPhone</span>
    </div>
    <div className="flex items-center space-x-2 text-gray-500">
      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      <span className="text-xs font-open-sans">Version Android</span>
    </div>
    <div className="flex items-center space-x-2 text-gray-500">
      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      <span className="text-xs font-open-sans">Support</span>
    </div>
  </div>
</div>
</div>
);
};

export default ShareWumaAuth;


