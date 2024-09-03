import React, { useEffect } from 'react';
import './style.css';
import gsap from "gsap"; // For loader animation

function Loader() {
    useEffect(() => {
        preLoaderAnim();
    }, []);

    return (
        <div className="loader">
            <div className="loader__text">
                <span className="soul">Soul</span>
                <span className="move">Move</span>
                <span className="yours">Yours</span>
            </div>
        </div>
    );
}

export default Loader;

// Declare a general timeline to use in all the animation functions.
const tl = gsap.timeline();

// Preloader Animation
export const preLoaderAnim = () => {
    tl.to(["html", "body"], {
        duration: 0.1,
        css: { overflow: "hidden" },  // Hide scrollbars and prevent scrolling
        ease: "power3.inOut",
    })

    .from(".loader__text .soul", {
        duration: 1,
        opacity: 1,
        stagger: 0.5,
        ease: 'back.in',
        overflow: 'visible',
        x:0,
    })
        
        .to(".loader__text .soul", {
            duration: 1.5,
            stagger: 0.5,
            x: 300, 
            opacity: 0,
            
            overflowX: 'visible',
        })
        .from([".loader__text .move", ".loader__text .yours"], {
            duration: 0.7,
            delay: -0.8, // Start showing Move and yours while Soul is moving
            x: 300, // Start from right
            opacity: 0,
            skewY: 5,
            stagger: 0.5,
            ease: "Power3.easeInOut",
        })
        .to([".loader__text .move", ".loader__text .yours"], {
            duration: 0.7,
            opacity: 1,
            skewY: 0,
            x: 0,
            stagger: 0.5,
            ease: "Power3.easeOut",
        })
        .to(".loader", {
            duration: 0.7,
            x: "-100%",
            ease: "Power3.easeInOut",
            onComplete: () => {
                document.body.style.overflow = 'scroll'; // Restore scrolling
                document.querySelector(".loader").style.display = "none";
            }
        });
};
