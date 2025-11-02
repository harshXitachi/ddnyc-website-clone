"use client"

import React from "react"

const ShowreelVideo = () => {
  return (
    <section className="bg-[#212121] text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-8 lg:py-[100px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="aspect-video w-full">
            <video
              className="h-full w-full object-cover"
              src="https://dd.nyc/wp-content/uploads/2025/03/DD.NYC-music4.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-4xl font-bold leading-[1.2] text-white lg:text-[44px]">
              DD.NYC® 2025 Design Agency Showreel
            </h2>
            <p className="mt-6 text-lg font-normal leading-relaxed text-neutral-300">
              A glimpse into the creativity, precision, and impact that define
              DD.NYC®. Our award-winning Manhattan-based agency specializes in
              branding, web design, packaging, and video storytelling. With
              nearly a decade of experience as a team and over 30+ years of
              combined expertise, we’ve partnered with global leaders and
              innovators in healthcare, real estate, and beyond. From the
              rebranding of WillowWood at Hanger Live to designing VTS’
              Accelerate conference and unveiling New York City FC’s Etihad
              Park, we deliver elevated design solutions that inspire and drive
              results.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShowreelVideo