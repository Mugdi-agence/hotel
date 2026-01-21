"use client"
import gsap from 'gsap';
import './header.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useEffect, useRef } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Header() {
    const h1 = useRef(null);
    const stiket = useRef(null);
    const p = useRef(null);
    const p2 = useRef(null);
    const btn1 = useRef(null);
    const btn2 = useRef(null);
    const section = useRef(null);

    function onHover() {
        if (!btn1.current) return;
        gsap.to(btn1.current, { 
            scale: 1.05, 
            duration: 0.6, 
            ease: "elastic.out(10, 5)"
        });
    }

    function onLeave() {
        if (!btn1.current) return;
        gsap.to(btn1.current, { 
            scale: 1, 
            duration: 0.6, 
            ease: "elastic.out(10, 5)"
        });
    }

    function onHover2() {
        if (!btn2.current) return;
        gsap.to(btn2.current, { 
            scale: 1.05, 
            duration: 0.6, 
            ease: "elastic.out(10, 5)"
        });
    }

    function onLeave2() {
        if (!btn2.current) return;
        gsap.to(btn2.current, { 
            scale: 1, 
            duration: 0.6, 
            ease: "elastic.out(10, 5)"
        });
    }

    useEffect(() => {
        // et enfin ici
        const split = new SplitText(h1.current, { type: "lines"});
        const splot = new SplitText(p.current, { type: "lines"});
        const splut = new SplitText(p2.current, { type: "lines"});

        split.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            line.parentNode?.insertBefore(wrapper, line);
            wrapper.appendChild(line);
          });

          splot.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            line.parentNode?.insertBefore(wrapper, line);
            wrapper.appendChild(line);
          });

          splut.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            line.parentNode?.insertBefore(wrapper, line);
            wrapper.appendChild(line);
          });
        
          gsap.from(split.lines, {
            yPercent: 100,
            scale: 1.01,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
          });

          gsap.from(splot.lines, {
            yPercent: 100,
            scale: 1.01,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
          });

          gsap.from(splut.lines, {
            yPercent: 100,
            scale: 1.01,
            duration: 1,
            stagger: 0.1,
            delay: 0.5,
            ease: "power3.out"
          });

          gsap.to(stiket.current, {
            scale: 1,
            opacity: 1,
            ease: 'elastic.out(5, 5)',
            duration: 0.9
          });

          gsap.to(btn1.current, {
            scale: 1,
            opacity: 1,
            ease: 'elastic.out(5, 5)',
            duration: 0.9,
            delay: 0.6
          });

          gsap.to(btn2.current, {
            scale: 1,
            opacity: 1,
            ease: 'elastic.out(5, 5)',
            duration: 0.9,
            delay: 0.9
          });

          gsap.to(section.current, {
            scrollTrigger: {
                trigger: section.current,
                start: 'bottom 50%',
                end: "bottom 0%",
                scrub: 1,
            },
            y: -300,
            scale: 0.9,
            ease: "sine.out",
            filter: 'blur(15px)'
          });
        
          return () => {
            split.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          };
    }, []);
    return(
        <header>
            <div className="container" ref={section}>
                <div className="fond"></div>
                <nav>
                    <a href="https://mugdi.com">
                        <img src={"/logo.png"} alt="logo" />
                    </a>
                    <div className="link">
                        <a href="#">Accueil</a>
                        <a href="#">Destinations</a>
                        <a href="#">Voyages sur mesure</a>
                        <a href="#">Expériences</a>
                    </div>
                    <div className="right">
                        <a href="#">Contact</a>
                        <span>EN</span>
                    </div>
                </nav>


                <div className="hero">
                    <div className="tiquet" ref={stiket}>
                        <CircleIcon className='circle'/>
                        <span>Explorez le monde autrement</span>
                    </div>
                    <h1 ref={h1}>Séjournez là où l’élégance rencontre l’horizon</h1>
                    <div className="paragraphes">
                        <p ref={p}>Un resort 5★ sur la côte, suites privées, piscines à débordement et expériences sur mesure pour un voyage totalement ressourçant.</p>
                        <p ref={p2}>Bienvenue au Upon Hotel — havre de raffinement et de calme proposant des suites avec vue panoramique, une gastronomie d’exception et des rituels bien-être conçus pour réinventer vos sens.</p>
                    </div>
                    <div className="cta">
                        <div className="buttons">
                            <a href="" ref={btn1} onMouseEnter={onHover} onMouseLeave={onLeave}>Réserver maintenant</a>
                            <a href="" ref={btn2} onMouseEnter={onHover2} onMouseLeave={onLeave2}>Voir nos chambres & suites</a>
                        </div>
                        <div className="others">
                            <ArrowBackIcon className='arrows'/>
                            <ArrowForwardIcon className='arrows'/>
                        </div>
                    </div>
                </div>

                <div className="droiture">
                    <div className="encoche">
                        <ArrowDownwardIcon className='arrow'/>
                    </div>
                </div>
            </div>
        </header>
    )
}