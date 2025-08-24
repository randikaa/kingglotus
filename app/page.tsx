"use client";

import { useState } from "react";
import DynamicFrameLayout from "../components/DynamicFrameLayout";
import EnhancedSpotifyPlayer from "../components/EnhancedSpotifyPlayer";
import LatestMusic from "../components/LatestMusic";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import OrbitingCirclesDemo from "../components/OrbitingCirclesDemo";
import { ppEditorialNewUltralightItalic, inter } from "./fonts";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";
import Image from "next/image";
import Link from "next/link";

import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { File, Settings, Search } from "lucide-react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion } from "framer-motion";

export default function Home() {
  const [headerSize] = useState(1.2);
  const [textSize] = useState(0.8);
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors ${
        theme === "dark" ? "bg-[#141414]" : "bg-gray-50"
      } ${ppEditorialNewUltralightItalic.variable} ${inter.variable}`}
    >
      <Navigation />

      <div className="pt-20 flex items-center justify-center p-8">
        <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 md:gap-8">
          {/* Left Content */}
          <div className="w-full md:w-[260px] flex-shrink-0 flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <h1
                className={`${
                  ppEditorialNewUltralightItalic.className
                } text-4xl md:text-6xl font-light italic tracking-tighter leading-[130%] transition-colors mt-14 ${
                  theme === "dark" ? "text-white/80" : "text-gray-800"
                }`}
                style={{ fontSize: `${4 * headerSize}rem` }}
              >
                {t("brandDesigner")}
              </h1>
              <div
                className={`${
                  inter.className
                } flex flex-col gap-12 text-sm font-light max-w-[300px] transition-colors ${
                  theme === "dark" ? "text-white/50" : "text-gray-600"
                }`}
                style={{ fontSize: `${0.875 * textSize}rem` }}
              >
                <div className="space-y-6">
                  <div
                    className={`h-px w-full ${
                      theme === "dark" ? "bg-white/10" : "bg-gray-300"
                    }`}
                  />
                  <p>{t("brandDescription1")}</p>
                  <p>{t("brandDescription2")}</p>
                  <p>{t("favoriteWorks")}</p>
                  <div
                    className={`h-px w-full ${
                      theme === "dark" ? "bg-white/10" : "bg-gray-300"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full md:flex-grow h-[60vh] md:h-[80vh]">
            <DynamicFrameLayout />
          </div>
        </div>
      </div>

      {/* Enhanced Spotify Player Section */}
      {/* <EnhancedSpotifyPlayer /> */}

      {/* Latest Music Section */}
      <LatestMusic />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2
          className={`text-4xl md:text-6xl font-light italic mb-4 transition-colors ${
            theme === "dark" ? "text-white/90" : "text-gray-800"
          }`}
        >
          {t("collab")}
        </h2>
        <p
          className={`max-w-2xl mx-auto transition-colors ${
            theme === "dark" ? "text-white/70" : "text-gray-600"
          }`}
        >
          {t("collabDis")}
        </p>
      </motion.div>

      <AnimatedTestimonials
        testimonials={[
          {
            quote:
              "Known professionally as, is a producer, Music composer, Arranger & Singer. He works with HipHop, Pop, RnB, Trap, EDM, Classical Music, Modern Music, World Music and Many other genres. He currently works as a Music producer at Magampura Records",
            name: "Dilu Beats",
            designation: "Music composer, Arranger & Singer",
            src: "https://cdn.jsdelivr.net/gh/Team-Hologram/lotussdbs/dilubeats.jpg",
          },
          {
            quote:
              "is one of the most popular rapper in the current rap scene hailing from Weeraketiya, Sri Lanka. Representing 'Magampura'. He became popular with his unique voice & flows among the Sri Lankan youth!",
            name: "Shan Putha",
            designation: "Rapper & Singer",
            src: "https://cdn.jsdelivr.net/gh/Team-Hologram/lotussdbs/shanputha.jpg",
          },
          {
            quote:
              "Maduwa is a trailblazing Sinhala melodic rapper and genre-fluid artist known for his authentic, vibe-driven approach to music. Refusing to be boxed into a single style, Maduwa creates directly from the moment—letting the beat guide his flow, feeling, and message. His music is a unique blend of raw experience, personal struggle, and sharp life observations, often delivered with a playful, comedic twist.",
            name: "Maduwa",
            designation: "Rapper and genre-fluid",
            src: "https://cdn.jsdelivr.net/gh/Team-Hologram/lotussdbs/maduwa.jpg",
          },
          {
            quote:
              "Established in 2016, 'lil Rome' is a group of talented rappers representing street rap culture in Sri Lanka. Based in Negombo, Sri Lanka. This is their journey in the making. more Established in 2016, 'lil Rome' is a group of talented rappers representing street rap culture in Sri Lanka",
            name: "Lil Rome Praba",
            designation: "Rapper and genre-fluid",
            src: "https://cdn.jsdelivr.net/gh/Team-Hologram/lotussdbs/lilromepraba.jpg",
          },
          {
            quote:
              "also known by his stage name La Signore is a Sri Lankan singer, musician and music producer who came to limelight with his 2008 breakthrough Hit single 'Rambari'.",
            name: "Lahiru Perera",
            designation: "Singer, musician and music producer",
            src: "https://cdn.jsdelivr.net/gh/Team-Hologram/lotussdbs/lahiruperera.jpg",
          },
          {
            quote:
              "The rapper IZZU, also known as Isuru Aravvalage, is a Sri Lankan artist, singer, and songwriter who began his career in 2018. His work includes tracks like 'Samakami,' an official music video released in 2022, and his discography features singles and EPs such as 'Day to Day' and  'While My Balls Gently Weep",
            name: "IZZU",
            designation: "Singer and songwriter",
            src: "https://cdn.jsdelivr.net/gh/Team-Hologram/lotussdbs/izzu.jpeg",
          },
        ]}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
