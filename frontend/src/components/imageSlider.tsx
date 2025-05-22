"use client";

import { motion } from "motion/react";
import React from "react";
import { ImagesSlider } from "./ui/image-slider";

export function ImagesSliderComp() {
    const images = [
        "/bg-1.jpg",
        "/bg-3.jpg",
    ];
    return (
        <div className="relative w-full">
            <ImagesSlider className="h-[35rem]" images={images} overlay={false}>/
                <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-background via-background/10 to-transparent z-40" />
                <motion.div
                    initial={{
                        opacity: 0,
                        y: -80,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 3,
                    }}
                    className="z-50 flex flex-col justify-center items-center"
                >
                    <p className="font-bold text-white text-3xl md:text-7xl text-center py-4 z-20">
                        Swan Lake Citizen Science Lab
                    </p>
                </motion.div>
            </ImagesSlider>
            <div className="absolute -bottom-10 left-0 w-full h-10 bg-gradient-to-t from-background to-transparent" />
        </div>
    );

}
