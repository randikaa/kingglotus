"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Translations {
  [key: string]: {
    en: string
    si: string
  }
}

const translations: Translations = {
  // Navigation
  home: { en: "Home", si: "මුල් පිටුව" },
  music: { en: "Music", si: "සංගීතය" },
  tattoo: { en: "Tattoo", si: "පච්ච කිරීම" },
  news: { en: "News", si: "ප්‍රවෘත්ති" },
  contact: { en: "Contact", si: "සම්බන්ධතා" },
  contribute: { en: "Contribute", si: "දායකත්වය" },

  // Home page
  brandDesigner: { en: "Wants to About me?", si: "මං ගැන දැනගන්න ඕනද?" },
  brandDescription1: {
    en: "I’m King Lotus, I’m a Sri Lankan rapper who speaks the truth through music. My songs are not just about beats — they’re about real life, real feelings, and real stories. I use strong words and deep lyrics to talk about what’s happening around us.I rap in different styles like trap, drill, lo-fi, and conscious rap. Each track has a message. Sometimes it’s about pain, sometimes power — but always real.",
    si: "මම තමයි King Lotus, ලංකාවේ underground rap scene එකේ නව ජීවයක් ගෙනාව, හඬින්ම නඩත්තු වෙන්න පුළුවන් වාක්‍යවලින් පිරුණු මගේ bars හරහා, මම කතා කරන්නේ ගම්මිරිස් වගේ හරියටම තියෙන සත්‍යය. Beats වල rhythm එකට නටනවට වඩා, මගේ lyrics වල rhythm එකට හිත වෙනස් වෙනවා. මගේ style එකෙදී trap, drill, lo-fi, conscious rap — එකක්වත් හැරෙන්නෙ නෑ.",
  },
  brandDescription2: {
    en: "King Lothus isn’t just a name. It’s a voice for people who don’t get heard.",
    si: "King Lothus කියන්නෙ නමක් නෙවෙයි — එය හැඟීමක්.",
  },
  favoriteWorks: { en: "Here are some of our favorite works so far.", si: "මෙතෙක් අපගේ ප්‍රියතම කෘති කිහිපයක් මෙන්න." },

  // Features
  featuresTitle: { en: "Why Choose Luma?", si: "ලුමා තෝරා ගන්නේ ඇයි?" },
  feature1Title: { en: "Creative Excellence", si: "නිර්මාණශීලී විශිෂ්ටත්වය" },
  feature1Desc: {
    en: "Cutting-edge design solutions that push creative boundaries",
    si: "නිර්මාණශීලී සීමාවන් තල්ලු කරන අති නවීන නිර්මාණ විසඳුම්",
  },
  feature2Title: { en: "Global Reach", si: "ගෝලීය ව්‍යාප්තිය" },
  feature2Desc: {
    en: "Connect with audiences worldwide through compelling storytelling",
    si: "ආකර්ෂණීය කතන්දර කීම හරහා ලොව පුරා ප්‍රේක්ෂකයන් සමඟ සම්බන්ධ වන්න",
  },
  feature3Title: { en: "Innovation First", si: "නවෝත්පාදනය පළමුව" },
  feature3Desc: {
    en: "Leading the industry with breakthrough technologies and methods",
    si: "පෙරළිකාර තාක්ෂණයන් සහ ක්‍රම සමඟ කර්මාන්තයට නායකත්වය දීම",
  },

  // Latest Music
  latestMusic: { en: "Latest Music", si: "නවතම සංගීතය" },
  discoverTracks: {
    en: "Discover the newest tracks from our featured artists and contributors",
    si: "අපගේ විශේෂාංගගත කලාකරුවන් සහ දායකයන්ගේ නවතම ගීත සොයා ගන්න",
  },
  viewAllMusic: { en: "View All Music", si: "සියලුම සංගීතය බලන්න" },

  // Music page
  musicCollection: { en: "Music Collection", si: "සංගීත එකතුව" },
  exploreCurated: {
    en: "Explore our curated collection of music from talented artists and contributors",
    si: "දක්ෂ කලාකරුවන් සහ දායකයන්ගේ අපගේ තෝරාගත් සංගීත එකතුව ගවේෂණය කරන්න",
  },
  searchSongs: { en: "Search songs or artists...", si: "ගීත හෝ කලාකරුවන් සොයන්න..." },
  all: { en: "All", si: "සියල්ල" },
  pop: { en: "Pop", si: "පොප්" },
  dancePop: { en: "Dance Pop", si: "නර්තන පොප්" },
  popRock: { en: "Pop Rock", si: "පොප් රොක්" },
  indiePop: { en: "Indie Pop", si: "ඉන්ඩි පොප්" },
  hipHop: { en: "Hip Hop", si: "හිප් හොප්" },
  plays: { en: "plays", si: "වාදන" },

  // Contribute page
  contributeTitle: { en: "Contribute", si: "දායකත්වය" },
  supportCommunity: {
    en: "Support our creative community and help us bring amazing content to life. Your contribution makes a difference.",
    si: "අපගේ නිර්මාණශීලී ප්‍රජාවට සහාය වන්න සහ විස්මිත අන්තර්ගතයන් ජීවයට ගෙන ඒමට අපට උදව් කරන්න. ඔබගේ දායකත්වය වෙනසක් කරයි.",
  },
  fundingProgress: { en: "Funding Progress", si: "අරමුදල් ප්‍රගතිය" },
  raised: { en: "Raised", si: "එකතු කළ" },
  target: { en: "Target", si: "ඉලක්කය" },
  contributors: { en: "Contributors", si: "දායකයන්" },
  thisMonth: { en: "This Month", si: "මෙම මාසය" },
  contributionByCategory: { en: "Contribution by Category", si: "කාණ්ඩය අනුව දායකත්වය" },
  makeContribution: { en: "Make a Contribution", si: "දායකත්වයක් කරන්න" },
  fullName: { en: "Full Name", si: "සම්පූර්ණ නම" },
  email: { en: "Email", si: "විද්‍යුත් තැපෑල" },
  mobile: { en: "Mobile Number", si: "ජංගම දුරකථන අංකය" },
  contributeFor: { en: "Contribute For", si: "දායකත්වය සඳහා" },
  selectCategory: { en: "Select category", si: "කාණ්ඩය තෝරන්න" },
  movies: { en: "Movies", si: "චිත්‍රපට" },
  amount: { en: "Amount", si: "මුදල" },
  currency: { en: "Currency", si: "මුදල් ඒකකය" },
  contributeNow: { en: "Contribute Now", si: "දැන් දායකත්වය කරන්න" },
  recentContributors: { en: "Recent Contributors", si: "මෑත දායකයන්" },

  // Contact page
  getInTouch: { en: "Get In Touch", si: "සම්බන්ධ වන්න" },
  contactDescription: {
    en: "Have questions or want to collaborate? We'd love to hear from you.",
    si: "ප්‍රශ්න තිබේද හෝ සහයෝගයෙන් කටයුතු කිරීමට අවශ්‍යද? අපි ඔබගෙන් ඇසීමට කැමතියි.",
  },
  sendMessage: { en: "Send us a message", si: "අපට පණිවිඩයක් යවන්න" },
  name: { en: "Name", si: "නම" },
  yourName: { en: "Your name", si: "ඔබගේ නම" },
  yourEmail: { en: "your@email.com", si: "ඔබගේ@ඊමේල්.com" },
  subject: { en: "Subject", si: "විෂය" },
  whatsThis: { en: "What's this about?", si: "මෙය කුමක් ගැනද?" },
  message: { en: "Message", si: "පණිවිඩය" },
  tellUsMore: { en: "Tell us more about your inquiry...", si: "ඔබගේ විමසීම ගැන තවත් කියන්න..." },
  sendMessageBtn: { en: "Send Message", si: "පණිවිඩය යවන්න" },
  contactInformation: { en: "Contact Information", si: "සම්බන්ධතා තොරතුරු" },
  reachOut: {
    en: "Reach out to us through any of these channels. We're here to help and answer any questions you might have.",
    si: "මෙම නාලිකා වලින් ඕනෑම එකක් හරහා අප වෙත සම්බන්ධ වන්න. අපි උදව් කිරීමට සහ ඔබට ඇති ඕනෑම ප්‍රශ්නයකට පිළිතුරු දීමට මෙහි සිටිමු.",
  },
  phone: { en: "Phone", si: "දුරකථනය" },
  address: { en: "Address", si: "ලිපිනය" },
  officeHours: { en: "Office Hours", si: "කාර්යාල වේලාවන්" },
  mondayFriday: { en: "Monday - Friday", si: "සඳුදා - සිකුරාදා" },
  saturday: { en: "Saturday", si: "සෙනසුරාදා" },
  sunday: { en: "Sunday", si: "ඉරිදා" },
  closed: { en: "Closed", si: "වසා ඇත" },

  // Tattoo page
  tattooGallery: { en: "Tattoo Gallery", si: "පච්ච ගැලරිය" },
  tattooDescription: {
    en: "Explore our curated collection of exceptional tattoo artworks from talented artists around the world. Each piece represents unique creativity, skill, and artistic vision in the world of body art.",
    si: "ලොව පුරා සිටින දක්ෂ කලාකරුවන්ගේ සුවිශේෂී පච්ච කලා කෘතිවල අපගේ තෝරාගත් එකතුව ගවේෂණය කරන්න. සෑම කෘතියක්ම ශරීර කලා ලෝකයේ අද්විතීය නිර්මාණශීලිත්වය, කුසලතා සහ කලාත්මක දැක්ම නියෝජනය කරයි.",
  },
  traditional: { en: "Traditional Japanese", si: "සම්ප්‍රදායික ජපන්" },
  geometric: { en: "Geometric", si: "ජ්‍යාමිතික" },
  realism: { en: "Realism", si: "යථාර්ථවාදය" },
  watercolor: { en: "Watercolor", si: "ජල වර්ණ" },
  minimalist: { en: "Minimalist", si: "අවම" },
  tribal: { en: "Tribal", si: "ගෝත්‍රික" },
  viewDetails: { en: "View Details", si: "විස්තර බලන්න" },
  loadMoreTattoos: { en: "Load More Tattoos", si: "තවත් පච්ච බලන්න" },
  likes: { en: "likes", si: "කැමති" },
  views: { en: "views", si: "බැලීම්" },

  // News page
  latestNews: { en: "Latest News", si: "නවතම ප්‍රවෘත්ති" },
  newsDescription: {
    en: "Stay updated with the latest news, announcements, and stories from our community.",
    si: "අපගේ ප්‍රජාවේ නවතම ප්‍රවෘත්ති, නිවේදන සහ කතන්දර සමඟ යාවත්කාලීනව සිටින්න.",
  },
  readMore: { en: "Read More", si: "තව කියවන්න" },
  featured: { en: "Featured", si: "විශේෂාංගගත" },
  platform: { en: "Platform", si: "වේදිකාව" },
  artists: { en: "Artists", si: "කලාකරුවන්" },
  events: { en: "Events", si: "සිදුවීම්" },
  loadMoreArticles: { en: "Load More Articles", si: "තවත් ලිපි බලන්න" },

  // Common
  by: { en: "by", si: "විසින්" },
  of: { en: "of", si: "න්" },
  and: { en: "and", si: "සහ" },
}

interface TranslationContextType {
  language: "en" | "si"
  setLanguage: (lang: "en" | "si") => void
  t: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<"en" | "si">("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as "en" | "si" | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (lang: "en" | "si") => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
