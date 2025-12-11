import React from "react";
import { MapPin } from "lucide-react";

const locations = [
  {
    title: "ROYAL FLOOR INC",
    addressLine1: "2305 E Belt Line Rd, Suite 100,",
    addressLine2: "Carrollton, TX 75006, USA",
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6695.723444899971!2d-96.876819!3d32.95466!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c26f573672677%3A0x6412da4ecf3c7c1!2s2305%20E%20Belt%20Line%20Rd%2C%20Carrollton%2C%20TX%2075006%2C%20USA!5e0!3m2!1sen!2sin!4v1765434409010!5m2!1sen!2sin",
  },
  {
    title: "ROYAL FLOOR INC",
    addressLine1: "1547 B Finnegan Ln",
    addressLine2: "North Brunswick, NJ 08902, USA",
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6073.09921165434!2d-74.530055!3d40.440971!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3c3a46ade0645%3A0xa646cf5fc69b9fed!2s1547%20Finnegans%20Ln%2C%20North%20Brunswick%20Township%2C%20NJ%2008902%2C%20USA!5e0!3m2!1sen!2sin!4v1765434504232!5m2!1sen!2sin",
  },
  {
    title: "ROYAL FLOOR INC",
    addressLine1: "Khodiyar Estate, Nr. Gota Bridge,",
    addressLine2: "Gota, Ahmedabad, 382481",
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14679.586699370233!2d72.53326201244816!3d23.100877953105353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e82e76893cd85%3A0xd302251c8dc381c6!2sGota%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1765434603140!5m2!1sen!2sin",
  },
];

export default function LocationsSection() {
  return (
    <div className="w-full py-12 px-6 lg:px-12 bg-white text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-0">

        {locations.map((loc, i) => (
          <div key={i} className="flex flex-col gap-4">
            
            <p className="text-xl! text-black! font-medium! tracking-wide">
              {loc.title}
            </p>

            <div className="flex gap-3 items-start text-[#333]">
              <MapPin className="w-8 h-8 px-1 shrink-0 border border-b-cyan-800 rounded-md" />
              <p className="leading-relaxed">
                {loc.addressLine1} <br /> {loc.addressLine2}
              </p>
            </div>

            <div className="w-full h-[350px] rounded-md overflow-hidden">
              <iframe
                src={loc.iframeSrc}
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
