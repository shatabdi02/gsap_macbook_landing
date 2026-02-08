import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { performanceImages ,performanceImgPositions } from "../constants/index.js";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Performance = () => {
  const isMobile = useMediaQuery({query: '(max-width: 1024px)'});
  const sectionRef =useRef(null);

  useGSAP(
    () => {
     const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      gsap.fromTo(
      ".content p",
      {opacity:0 , y:10},
      {
        opacity:1,
        y:0,
        duration:0.8,
        ease:"power2.out",
        scrollTrigger:{
          trigger:'.content p',
          start:"top bottom",
          end:'top center',
          scrub:true,
          invalidateOnRefresh:true,
        },
      }
    );

    if(isMobile) return;

    const tl=gsap.timeline({
        defaults:{ease: "power1.inOut" , duration:2 ,overwrite:"auto"},
        scrollTrigger:{
          trigger:sectionEl,
          start:"top bottom",
          end:"center center",
          scrub:1,
          invalidateOnRefresh:true,
        },
      });

      performanceImgPositions.forEach((pos) => {
        if(pos.id==='p5') return ;

         const selector = `.${pos.id}`;
         const toVars = {};

        if (typeof pos.left === "number") toVars.left = `${pos.left}%`;
        if (typeof pos.right === "number") toVars.right = `${pos.right}%`;
        if (typeof pos.bottom === "number") toVars.bottom = `${pos.bottom}%`;

        if (pos.transform) toVars.transform=pos.transform;

        tl.to(selector,toVars,0);

      });
    },{ scope: sectionRef, dependencies: [isMobile] 
    });
 
  return (
    <section id="performance" ref={sectionRef}>
        <h2>Next-level graphics performance.Game on.</h2>

        <div className="wrapper">
          {performanceImages.map((pos,index) => (
            <img 
            key={index} 
            src={pos.src} 
            className={pos.id}
            alt={pos.alt || `Performance Image #${index+1}`} />
          ))}

        </div>

        <div className="content">
            <p>Run graphics-intensive workflows with a responsiveness that keeps up with your imagination. The M4 family of chips features a GPU with a second-generation hardware-accelerated ray tracing engine that renders images faster, so {' '}
            <span className="text-white" >
            gaming feels more Immersive and realistic than ever.</span>{' '}
             And Dynamic Caching optimizes fast on-chip memory to dramatically increase average GPU utilization-driving a huge performance boost for the most demanding pro apps and games.
            </p>
        </div>
    </section>
  );
};

export default Performance