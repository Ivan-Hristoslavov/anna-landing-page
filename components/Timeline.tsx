"use client";

import { motion } from "framer-motion";
import { useContact } from "@/app/contact-context";

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
  {
    date: "18 юни 2026",
    name: "BLEPH EFFECT™",
    city: "София",
    cityColor: "sofia",
    duration: "1 ден",
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
  const { openContact } = useContact();

  return (
    <section id="timeline" className="section-padding bg-white">
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
                      <p className="text-xs text-warm-500 font-light mb-3">
                        {event.date}
                      </p>
                      <button
                        onClick={() =>
                          openContact(event.name, event.city, event.date)
                        }
                        className="group/btn inline-flex items-center gap-1.5 text-[10px] font-medium tracking-widest uppercase text-warm-400 hover:text-warm-900 transition-colors duration-200"
                      >
                        Запиши се
                        <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
                      </button>
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
                          <p className="text-xs text-warm-500 font-light text-right mb-3">
                            {event.date}
                          </p>
                          <div className="flex justify-end">
                            <button
                              onClick={() =>
                                openContact(event.name, event.city, event.date)
                              }
                              className="group/btn inline-flex items-center gap-1.5 text-[10px] font-medium tracking-widest uppercase text-warm-400 hover:text-warm-900 transition-colors duration-200"
                            >
                              Запиши се
                              <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
                            </button>
                          </div>
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
                          <p className="text-xs text-warm-500 font-light mb-3">
                            {event.date}
                          </p>
                          <button
                            onClick={() =>
                              openContact(event.name, event.city, event.date)
                            }
                            className="group/btn inline-flex items-center gap-1.5 text-[10px] font-medium tracking-widest uppercase text-warm-400 hover:text-warm-900 transition-colors duration-200"
                          >
                            Запиши се
                            <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          id="enroll"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8 }}
          className="mt-16 pt-14 border-t border-warm-100 text-center"
        >
          <p className="label-sm mb-4">Готови ли сте?</p>
          <h3 className="font-playfair text-2xl md:text-3xl font-light text-warm-900 mb-8">
            Запишете се сега
          </h3>
          <button
            onClick={() => openContact()}
            className="group inline-flex items-center gap-3 bg-warm-900 text-white px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-warm-700 transition-all duration-300"
          >
            Запиши се сега
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
          <p className="mt-5 text-xs text-warm-400 font-light">
            или пишете директно на{" "}
            <a
              href="mailto:contact@anna.london"
              className="text-warm-600 hover:text-warm-900 transition-colors underline underline-offset-2"
            >
              contact@anna.london
            </a>
          </p>
          <p className="mt-2 text-[11px] text-warm-300 font-light">
            Моля, посочете обучение, град и дата в запитването.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
