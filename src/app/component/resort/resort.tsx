"use client";
import "./resort.scss"
import CircleIcon from '@mui/icons-material/Circle';
import { playfair } from "@/app/page";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

const resortData = [
  {
    id: 1,
    title: "Suite Océan (55 m²)",
    description: "Balcon privé, vue frontale mer, baignoire profonde et service de majordome sur demande.",
    imageUrl: "/1.png",
  },
  {
    id: 2,
    title: "Villa avec Piscine",
    description: "Piscine privée, jardin luxuriant et espace détente exclusif.",
    imageUrl: "/2.png",
  },
  {
    id: 3,
    title: "Suite Tropicale",
    description: "Vue sur palmiers, décoration exotique et confort haut de gamme.",
    imageUrl: "/3.png",
  },
  {
    id: 4,
    title: "Villa Moderne",
    description: "Architecture contemporaine, piscine à débordement et large terrasse.",
    imageUrl: "/4.png",
  },
  {
    id: 5,
    title: "Complexe Luxueux",
    description: "Grande piscine centrale, activités pour toute la famille.",
    imageUrl: "/5.png",
  },
];

export default function Resort() {
  const etiquette = useRef(null);
  const h21 = useRef(null);
  const h22 = useRef(null);
  const list = useRef(null);
  const p2 = useRef(null);
  const p1 = useRef(null);
  const btn = useRef(null);

  function onHover() {
    if (!btn.current) return;
    gsap.to(btn.current, { 
        scale: 1.05, 
        duration: 0.6, 
        ease: "elastic.out(10, 5)"
    });
  }

  function onLeave() {
    if (!btn.current) return;
    gsap.to(btn.current, { 
        scale: 1, 
        duration: 0.6, 
        ease: "elastic.out(10, 5)"
    });
  }

  gsap.registerPlugin(ScrollTrigger, SplitText);

  useEffect(() => {
    if (typeof window === 'undefined' || !p2.current) return;

    const split = new SplitText(p2.current, { type: "lines" });
    const splut = new SplitText(p1.current, { type: "lines" });

    split.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = "hidden";
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    splut.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = "hidden";
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    gsap.from(split.lines, {
      scrollTrigger: {
        trigger: p2.current,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
      },
      yPercent: 100,
      stagger: 0.1,
      ease: "power2.out"
    });

    gsap.from(splut.lines, {
      scrollTrigger: {
        trigger: p1.current,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
      },
      yPercent: 100,
      stagger: 0.1,
      ease: "power2.out"
    });

    gsap.to(h21.current, {
      scrollTrigger: {
        trigger: h21.current,
        start: "bottom 100%",
        end: "bottom 50%",
        scrub: 1
      },
      y: 0,
      scale: 1
    });

    gsap.to(h22.current, {
      scrollTrigger: {
        trigger: h22.current,
        start: "bottom 100%",
        end: "bottom 60%",
        scrub: 1
      },
      y: 0,
      scale: 1
    });

    gsap.to(etiquette.current, {
      scrollTrigger: {
        trigger: etiquette.current,
        start: "bottom 100%",
        end: "Bottom 50%",
        scrub: 1
      },
      scale: 1,
      opacity: 1
    });

    gsap.to(list.current, {
      scrollTrigger: {
        trigger: list.current,
        start: "top 200%",
        end: "Bottom 100%",
        scrub: 1
      },
      y:0,
    });

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section>
      <div className="etiquette" ref={etiquette}>
        <CircleIcon className="circle"/>
        <span>Resorts prisés</span>
      </div>

      <div className="title">
        <div className="first">
          <div className="h2">
            <h2 ref={h21}>
              Chambres & Suites — 
            </h2>
          </div>
          <div className="h2">
            <h2 ref={h22}>
              un <i>refuge</i> <span className={playfair.className}>personnel</span>
            </h2>
          </div>
        </div>
        <p ref={p2}>
          Chaque chambre et suite du UPON HOTEL a été conçue pour offrir un équilibre parfait entre élégance contemporaine, confort absolu et intimité. Volumes généreux, matériaux nobles et vues apaisantes composent un univers où chaque détail invite au lâcher-prise.
        </p>
      </div>

      <div className="para">
        <p ref={p1}>Suites avec vue mer, villas privées avec piscine et prestations sur mesure pour un séjour à votre image.</p>
        <a href="#" ref={btn} onMouseEnter={onHover} onMouseLeave={onLeave}>Voir la suite</a>
      </div>

      <div className="list" ref={list}>
        {resortData.map((resort) => (
          <div className="card" key={resort.id}> 
            <ArrowOutwardIcon className="arrow"/> 
            <img src={resort.imageUrl} alt={resort.title}/> 
            <div className="content">
              <h3>{resort.title}</h3> 
              <p>{resort.description}</p> 
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
