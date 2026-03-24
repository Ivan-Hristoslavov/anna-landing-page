"use client";

import { motion } from "framer-motion";

interface TimelineEvent {
  date: string;
  name: string;
  city: string;
  cityColor: "sofia" | "varna";
  duration: string;
}

const events: TimelineEvent[] = [
  {
    date: "30–31 март 2026",
    name: "IntraSculpt™",
    city: "София",
    cityColor: "sofia",
    duration: "2 дни",
  },
  {
    date: "1 април 2026",
    name: "BLEPH EFFECT™",
    city: "София",
    cityColor: "sofia",
    duration: "1 ден",
  },
  {
    date: "4–6 април 2026",
    name: "Face Massage Mastery Level 1",
    city: "Варна",
    cityColor: "varna",
    duration: "3 дни",
  },
  {
    date: "7 април 2026",
    name: "BLEPH EFFECT™",
    city: "Варна",
    cityColor: "varna",
    duration: "1 ден",
  },
  {
    date: "8–9 април 2026",
    name: "IntraSculpt™",
    city: "Варна",
    cityColor: "varna",
    duration: "2 дни",
  },
  {
    date: "15–17 юни 2026",
    name: "Face Massage Mastery Level 1",
    city: "София",
    cityColor: "sofia",
    duration: "3 дни",
  },
];

const cityStyles = {
  sofia: {
    dot: "bg-warm-900",
    badge: "bg-warm-900 text-white",
  },
  varna: {
    dot: "bg-warm-400",
    badge: "bg-warm-100 text-warm-700",
  },
};

export default function Timeline() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="label-sm mb-4">Всички дати</p>
          <h2 className="heading-lg text-warm-900 mb-6">
            График на обученията
          </h2>
          <div className="divider-line mb-8" />

          {/* Legend */}
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-warm-900" />
              <span className="text-xs text-warm-500 tracking-wide">
                София
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-warm-400" />
              <span className="text-xs text-warm-500 tracking-wide">
                Варна
              </span>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-warm-100 md:-translate-x-px" />

          <div className="space-y-0">
            {events.map((event, i) => {
              const isLeft = i % 2 === 0;
              const styles = cityStyles[event.cityColor];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="relative flex items-center md:justify-center pb-10"
                >
                  {/* Mobile layout */}
                  <div className="flex md:hidden items-start gap-6 pl-0">
                    {/* Dot */}
                    <div className="relative flex-shrink-0 mt-1.5">
                      <div
                        className={`w-3 h-3 rounded-full ${styles.dot} ring-4 ring-white relative z-10`}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-parchment rounded-2xl border border-warm-100 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full ${styles.badge}`}
                        >
                          {event.city}
                        </span>
                        <span className="text-[10px] text-warm-400 tracking-wide">
                          {event.duration}
                        </span>
                      </div>
                      <h4 className="font-playfair text-lg font-medium text-warm-900 mb-1">
                        {event.name}
                      </h4>
                      <p className="text-xs text-warm-500 font-light">
                        {event.date}
                      </p>
                    </div>
                  </div>

                  {/* Desktop layout – alternating */}
                  <div className="hidden md:grid md:grid-cols-2 md:gap-8 w-full">
                    {/* Left side content */}
                    <div
                      className={`flex ${isLeft ? "justify-end" : "justify-start opacity-0 pointer-events-none"}`}
                    >
                      {isLeft && (
                        <div className="bg-parchment rounded-2xl border border-warm-100 p-5 w-72 hover:border-warm-200 hover:shadow-sm transition-all duration-300">
                          <div className="flex items-center justify-end gap-2 mb-2">
                            <span className="text-[10px] text-warm-400 tracking-wide">
                              {event.duration}
                            </span>
                            <span
                              className={`text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full ${styles.badge}`}
                            >
                              {event.city}
                            </span>
                          </div>
                          <h4 className="font-playfair text-xl font-medium text-warm-900 mb-1 text-right">
                            {event.name}
                          </h4>
                          <p className="text-xs text-warm-500 font-light text-right">
                            {event.date}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-4">
                      <div
                        className={`w-3.5 h-3.5 rounded-full ${styles.dot} ring-4 ring-white`}
                      />
                    </div>

                    {/* Right side content */}
                    <div
                      className={`flex ${!isLeft ? "justify-start" : "justify-end opacity-0 pointer-events-none"}`}
                    >
                      {!isLeft && (
                        <div className="bg-parchment rounded-2xl border border-warm-100 p-5 w-72 hover:border-warm-200 hover:shadow-sm transition-all duration-300">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full ${styles.badge}`}
                            >
                              {event.city}
                            </span>
                            <span className="text-[10px] text-warm-400 tracking-wide">
                              {event.duration}
                            </span>
                          </div>
                          <h4 className="font-playfair text-xl font-medium text-warm-900 mb-1">
                            {event.name}
                          </h4>
                          <p className="text-xs text-warm-500 font-light">
                            {event.date}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
