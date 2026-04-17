"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useContact } from "@/app/contact-context";
import { isPastBulgarianScheduleLabel } from "@/lib/bg-schedule-past";
import { useClientScheduleReferenceDate } from "@/hooks/use-client-schedule-reference-date";

interface TimelineEvent {
  date: string;
  name: string;
  city: string;
  cityColor: "sofia" | "varna";
  duration: string;
  soldOut?: boolean;
  /** Допълнителен ред (теория онлайн, цена и т.н.) */
  detail?: string;
  /** Низ за формата за контакт — трябва да съвпада с SCHEDULE в ContactModal. */
  contactDate?: string;
}

const events: TimelineEvent[] = [
  {
    date: "30–31 март 2026",
    name: "INTRASCULPT™",
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
    soldOut: true,
  },
  {
    date: "4–6 април 2026",
    name: "FACE MASSAGE MASTERY LEVEL 1",
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
    soldOut: true,
  },
  {
    date: "8–9 април 2026",
    name: "INTRASCULPT™",
    city: "Варна",
    cityColor: "varna",
    duration: "2 дни",
  },
  {
    date: "17–19 юни 2026",
    detail: "Практика (София). Теория (онлайн): събота, 13 юни · €870",
    contactDate:
      "17, 18, 19 юни 2026 (практика) · теория (онлайн): събота, 13 юни 2026 · €870",
    name: "FACE MASSAGE MASTERY LEVEL 1",
    city: "София",
    cityColor: "sofia",
    duration: "3 дни",
  },
  {
    date: "22 юни 2026",
    detail: "€370",
    contactDate: "22 юни 2026 · €370",
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
  const scheduleRef = useClientScheduleReferenceDate();

  const orderedEvents = useMemo(() => {
    if (scheduleRef == null) return events;
    const upcoming = events.filter(
      (e) => !isPastBulgarianScheduleLabel(e.date, scheduleRef)
    );
    const past = events.filter((e) =>
      isPastBulgarianScheduleLabel(e.date, scheduleRef)
    );
    return [...upcoming, ...past];
  }, [scheduleRef]);

  function contactDateFor(event: TimelineEvent) {
    return event.contactDate ?? event.date;
  }

  const renderSoldOutPill = () => (
    <span className="shrink-0 text-[10px] font-semibold tracking-widest text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
      Sold out
    </span>
  );

  const renderExpiredPill = () => (
    <span className="shrink-0 text-[10px] font-semibold tracking-widest text-warm-600 bg-warm-100 border border-warm-300 px-2.5 py-1 rounded-full">
      Изтекла дата
    </span>
  );

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
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2.5 rounded-full border border-warm-200 bg-parchment px-3 py-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-warm-900" />
              <span className="text-xs text-warm-600 tracking-wide">
                София
              </span>
            </div>
            <div className="flex items-center gap-2.5 rounded-full border border-warm-200 bg-parchment px-3 py-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-warm-400" />
              <span className="text-xs text-warm-600 tracking-wide">
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
            {orderedEvents.map((event, i) => {
              const isLeft = i % 2 === 0;
              const styles = cityStyles[event.cityColor];
              const isPastEvent = isPastBulgarianScheduleLabel(
                event.date,
                scheduleRef
              );

              return (
                <motion.div
                  key={`${event.date}-${event.name}-${event.city}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="relative flex items-center md:justify-center pb-10"
                >
                  {/* Mobile layout */}
                  <div className="flex md:hidden items-start gap-6 pl-0">
                    {/* Dot */}
                    <div className="relative shrink-0 mt-1.5">
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
                      {(event.soldOut || isPastEvent) && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {event.soldOut && renderSoldOutPill()}
                          {isPastEvent && renderExpiredPill()}
                        </div>
                      )}
                      <h4 className="font-playfair text-base sm:text-lg font-medium text-warm-900 mb-1">
                        {event.name}
                      </h4>
                      <p
                        className={`text-xs text-warm-500 font-light ${event.detail ? "mb-1" : "mb-3"}`}
                      >
                        {event.date}
                      </p>
                      {event.detail ? (
                        <p className="text-[11px] text-warm-400 font-light mb-3 leading-relaxed">
                          {event.detail}
                        </p>
                      ) : null}
                      {isPastEvent ? (
                        <p className="text-[10px] font-medium tracking-widest uppercase text-warm-400">
                          Записването е приключило
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            openContact(
                              event.name,
                              event.city,
                              contactDateFor(event)
                            )
                          }
                          className="group/btn inline-flex items-center gap-1.5 text-[10px] font-medium tracking-widest uppercase text-warm-400 hover:text-warm-900 transition-colors duration-200"
                        >
                          Запиши се
                          <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
                        </button>
                      )}
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
                          {(event.soldOut || isPastEvent) && (
                            <div className="flex flex-wrap justify-end gap-2 mb-2">
                              {event.soldOut && renderSoldOutPill()}
                              {isPastEvent && renderExpiredPill()}
                            </div>
                          )}
                          <h4 className="font-playfair text-lg font-medium text-warm-900 mb-1 text-right">
                            {event.name}
                          </h4>
                          <p
                            className={`text-xs text-warm-500 font-light text-right ${event.detail ? "mb-1" : "mb-3"}`}
                          >
                            {event.date}
                          </p>
                          {event.detail ? (
                            <p className="text-[11px] text-warm-400 font-light text-right mb-3 leading-relaxed">
                              {event.detail}
                            </p>
                          ) : null}
                          <div className="flex justify-end">
                            {isPastEvent ? (
                              <p className="text-[10px] font-medium tracking-widest uppercase text-warm-400 text-right">
                                Записването е приключило
                              </p>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  openContact(
                                    event.name,
                                    event.city,
                                    contactDateFor(event)
                                  )
                                }
                                className="group/btn inline-flex items-center gap-1.5 text-[10px] font-medium tracking-widest uppercase text-warm-400 hover:text-warm-900 transition-colors duration-200"
                              >
                                Запиши се
                                <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
                              </button>
                            )}
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
                          {(event.soldOut || isPastEvent) && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              {event.soldOut && renderSoldOutPill()}
                              {isPastEvent && renderExpiredPill()}
                            </div>
                          )}
                          <h4 className="font-playfair text-lg font-medium text-warm-900 mb-1">
                            {event.name}
                          </h4>
                          <p
                            className={`text-xs text-warm-500 font-light ${event.detail ? "mb-1" : "mb-3"}`}
                          >
                            {event.date}
                          </p>
                          {event.detail ? (
                            <p className="text-[11px] text-warm-400 font-light mb-3 leading-relaxed">
                              {event.detail}
                            </p>
                          ) : null}
                          {isPastEvent ? (
                            <p className="text-[10px] font-medium tracking-widest uppercase text-warm-400">
                              Записването е приключило
                            </p>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                openContact(
                                  event.name,
                                  event.city,
                                  contactDateFor(event)
                                )
                              }
                              className="group/btn inline-flex items-center gap-1.5 text-[10px] font-medium tracking-widest uppercase text-warm-400 hover:text-warm-900 transition-colors duration-200"
                            >
                              Запиши се
                              <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
                            </button>
                          )}
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
          className="mt-16 pt-14 border-t border-warm-100 text-center bg-parchment/60 rounded-3xl px-4 py-10"
        >
          <p className="label-sm mb-4">Готови ли сте?</p>
          <h3 className="font-playfair text-2xl md:text-3xl font-light text-warm-900 mb-8">
            Запишете се сега
          </h3>
          <button
            onClick={() => openContact()}
            className="group inline-flex items-center gap-3 bg-warm-900 text-white px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-warm-700 transition-all duration-300 shadow-[0_10px_35px_rgba(35,30,27,0.24)] hover:-translate-y-0.5"
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
