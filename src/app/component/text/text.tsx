import { useEffect, useRef } from 'react';
import './text.scss';
import gsap from 'gsap';

export default function Text() {
    const texted = useRef<HTMLDivElement | null>(null);
    const tween = useRef<gsap.core.Tween | null>(null);
    const direction = useRef<number>(-1);

    useEffect(() => {
        const el = texted.current;
        if (!el || !el.children[0]) return;

        const spanWidth = (el.children[0] as HTMLElement).offsetWidth;

        tween.current = gsap.to(el, {
            x: -spanWidth,
            duration: 15,
            ease: 'linear',
            repeat: -1,
        });

        const onWheel = (e: WheelEvent) => {
            // scroll vers le bas → accélère à gauche
            if (e.deltaY > 0) {
                gsap.to(tween.current, { timeScale: 1, duration: 0.5, ease: 'power2.out' });
            }
            // scroll vers le haut → inverser → droite
            else {
                gsap.to(tween.current, { timeScale: -1, duration: 0.5, ease: 'power2.out' });
            }
        };

        window.addEventListener('wheel', onWheel);

        return () => {
            window.removeEventListener('wheel', onWheel);
        };
    }, []);

    const handleEnter = () => {
        if (tween.current) {
            gsap.to(tween.current, {
                timeScale: 0,
                duration: 0.5,
                ease: 'power2.out',
            });
        }
    };

    const handleLeave = () => {
        if (tween.current) {
            gsap.to(tween.current, {
                timeScale: 1,
                duration: 0.5,
                ease: 'power2.out',
            });
        }
    };

    return (
        <div
            className="text-wrapper"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <div className="texted" ref={texted}>
                <span>Évasion • Liberté • Découverte • Évasion • Liberté • Découverte • </span>
                <span>Évasion • Liberté • Découverte • Évasion • Liberté • Découverte • </span>
            </div>
        </div>
    );
}
