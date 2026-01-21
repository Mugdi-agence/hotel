"use client"
import Header from "./component/header/header";
import Resort from "./component/resort/resort";
import Text from "./component/text/text";
import Lenis from "@studio-freight/lenis";
import "./page.scss";
import { Poppins, Playfair_Display } from 'next/font/google';
import { useEffect } from "react";

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400','500','600','700','800','900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.075,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <main className={poppins.className} style={{ overflow: "hidden"}}>
      <Header/>
      <Text/>
      <Resort/>
    </main>
  );
}
