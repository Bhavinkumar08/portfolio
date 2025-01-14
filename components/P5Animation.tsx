import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import { useTheme } from 'next-themes';

interface P5AnimationProps {
  changeAnimation: number;
}

const P5Animation: React.FC<P5AnimationProps> = ({ changeAnimation }) => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const paramsRef = useRef({
    lx: 9, ly: 9, coef: 14, divAngle: 5, nbP: 50, a1: 10, a2: 7,
  });
  const { theme } = useTheme();
  const colorsRef = useRef({ c1: '', c2: '' });

  const updateColors = () => {
    if (!p5InstanceRef.current || !isInitialized) return;
    
    if (theme === 'dark') {
      colorsRef.current = { c1: '#0c0a09', c2: '#fff' };
    } else {
      colorsRef.current = { c1: '#fff', c2: '#0c0a09' };
    }
  };

  const changeConfig = () => {
    if (p5InstanceRef.current) {
      const p = p5InstanceRef.current;
      paramsRef.current = {
        lx: p.int(p.random(2, 10)),
        ly: p.int(p.random(2, 10)),
        coef: p.int(p.random(10, 15)),
        divAngle: p.int(p.random(5, 9)),
        a1: p.int(p.random(2, 12)),
        a2: p.int(p.random(2, 12)),
        nbP: paramsRef.current.nbP
      };
    }
  };

  useEffect(() => {
    if (!sketchRef.current || isInitialized) return;

    const sketch = (p: p5) => {
      const nbFrames = 30;
      const easing = 0.05;

      const data = [
        { lx: 9, ly: 8, coef: 13, divAngle: 7, nbP: 40, a1: 5, a2: 9 },
        { lx: 7, ly: 6, coef: 14, divAngle: 8, nbP: 40, a1: 3, a2: 6 },
        { lx: 9, ly: 4, coef: 11, divAngle: 6, nbP: 40, a1: 5, a2: 9 },
        { lx: 6, ly: 6, coef: 12, divAngle: 6, nbP: 40, a1: 10, a2: 10 },
        { lx: 7, ly: 8, coef: 13, divAngle: 8, nbP: 40, a1: 10, a2: 7 },
        { lx: 7, ly: 6, coef: 12, divAngle: 6, nbP: 40, a1: 5, a2: 9 },
        { lx: 6, ly: 7, coef: 11, divAngle: 6, nbP: 40, a1: 8, a2: 5 },
        { lx: 7, ly: 9, coef: 13, divAngle: 7, nbP: 40, a1: 9, a2: 6 },
        { lx: 9, ly: 9, coef: 14, divAngle: 5, nbP: 40, a1: 10, a2: 7 },
        { lx: 8, ly: 4, coef: 14, divAngle: 8, nbP: 40, a1: 4, a2: 9 },
        { lx: 9, ly: 9, coef: 11, divAngle: 5, nbP: 40, a1: 4, a2: 6 }
      ];

      let currentLx = paramsRef.current.lx;
      let currentLy = paramsRef.current.ly;
      let currentA1 = paramsRef.current.a1;
      let currentA2 = paramsRef.current.a2;
      let currentCoef = paramsRef.current.coef;
      let currentDivAngle = paramsRef.current.divAngle;
      let xrad: number, yrad: number;

      function assignTabData(data: { lx: number, ly: number, coef: number, divAngle: number, nbP: number, a1: number, a2: number }[], params: { lx: number, ly: number, coef: number, divAngle: number, nbP: number, a1: number, a2: number }) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const datas = data[randomIndex];
        const keys = Object.keys(params) as Array<keyof typeof params>;
        Object.values(datas).forEach((value, index) => {
          if (keys[index] !== undefined) {
            params[keys[index]] = value;
          }
        });
      }

      assignTabData(data, paramsRef.current);

      p.setup = () => {
        p.setAttributes('antialias', true);
        p.createCanvas(p.displayWidth, p.displayHeight, p.WEBGL);
        p.windowResized();
        setIsInitialized(true);
      };

      p.draw = () => {
        currentLx += (paramsRef.current.lx - currentLx) * easing;
        currentLy += (paramsRef.current.ly - currentLy) * easing;
        currentA1 += (paramsRef.current.a1 - currentA1) * easing;
        currentA2 += (paramsRef.current.a2 - currentA2) * easing;
        currentCoef += (paramsRef.current.coef - currentCoef) * easing;
        currentDivAngle += (paramsRef.current.divAngle - currentDivAngle) * easing;

        const colFond = p.color(colorsRef.current.c1 || '#e5e5e5');
        const colObjt = p.color(colorsRef.current.c2 || '#1a1a1a');

        p.noStroke();
        p.rectMode(p.CENTER);
        const t = (p.frameCount / nbFrames) % 1;

        p.background(colFond);
        p.fill(colObjt);

        for (let i = 0; i < paramsRef.current.nbP; i++) {
          const pp = (i + t) / paramsRef.current.nbP;
          const angle = p.map(pp, 0, 1, 0, p.TAU / currentDivAngle);

          for (let j = 0; j < paramsRef.current.nbP; j++) {
            const a = p.map(j, 0, paramsRef.current.nbP, 0, p.TAU);
            const rad = 0.35;
            const r = 1 + p.sin((angle * currentCoef) / 2) * 2;

            p.push();
            p.translate(
              (p.sin(a + angle * currentLx) * p.height / 1.5 * rad) + (p.sin(a + angle * currentA1) * xrad),
              (p.cos(a + angle * currentLy) * p.height / 1.5 * rad) + (p.cos(a + angle * currentA1) * yrad),
              0
            );
            p.box(r);
            p.pop();
          }
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        xrad = (window.innerWidth < 400) ? 50 : 100;
        yrad = (window.innerWidth < 400) ? 50 : 100;
      };

      p.keyPressed = () => {
        if (p.key === "p" || p.key === "P") {
          if (p.isLooping()) {
            p.noLoop();
          } else {
            p.loop();
          }
        }
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current);
    p5InstanceRef.current = p5Instance;

    return () => {
      p5Instance.remove();
      setIsInitialized(false);
    };
  }, []); // Remove theme dependency

  // Separate effect for theme changes
  useEffect(() => {
    updateColors();
  }, [theme, isInitialized]);

  useEffect(() => {
    changeConfig();
  }, [changeAnimation]);

  return <div ref={sketchRef} style={{ width: '100%', height: '100%' }} />;
};

export default P5Animation;
