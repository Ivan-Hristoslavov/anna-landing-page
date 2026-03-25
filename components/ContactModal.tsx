"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContact } from "@/app/contact-context";

const EMAIL = "contact@anna.london";

interface Session {
  course: string;
  date: string;
}

const SCHEDULE: Record<string, Session[]> = {
  "София": [
    { course: "INTRASCULPT™",            date: "30–31 март 2026" },
    { course: "BLEPH EFFECT™",             date: "1 април 2026" },
    { course: "FACE MASSAGE MASTERY LEVEL 1", date: "15, 16, 17 юни 2026" },
    { course: "BLEPH EFFECT™",             date: "18 юни 2026" },
  ],
  "Варна": [
    { course: "FACE MASSAGE MASTERY LEVEL 1", date: "4, 5, 6 април 2026" },
    { course: "BLEPH EFFECT™",             date: "7 април 2026" },
    { course: "INTRASCULPT™",            date: "8–9 април 2026" },
  ],
};

export default function ContactModal() {
  const { state, closeContact } = useContact();

  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]); // ["CourseName — date", ...]
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState(
    "Моля, потвърдете наличните места и условията за участие."
  );
  const [formErrors, setFormErrors] = useState({
    courses: false,
    city: false,
    sessions: false,
    name: false,
    phone: false,
  });
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Sync pre-filled values when modal opens
  useEffect(() => {
    if (!state.isOpen) return;
    const courses = state.course ? [state.course] : [];
    setSelectedCourses(courses);
    setSelectedCity(state.city || "");
    // Pre-select session if course + date are both provided
    setSelectedSessions(
      state.course && state.date ? [`${state.course} — ${state.date}`] : []
    );
    setName("");
    setPhone("");
    setMsg("Моля, потвърдете наличните места и условията за участие.");
    setFormErrors({
      courses: false,
      city: false,
      sessions: false,
      name: false,
      phone: false,
    });
    setIsConfirmOpen(false);
  }, [state.isOpen, state.course, state.city, state.date]);

  const availableCourses = useMemo<string[]>(() => {
    if (!selectedCity) return [];
    const uniqueCourses = new Set(
      (SCHEDULE[selectedCity] ?? []).map((session) => session.course)
    );
    return Array.from(uniqueCourses);
  }, [selectedCity]);

  // Filtered sessions
  const availableSessions = useMemo<Session[]>(() => {
    const all = SCHEDULE[selectedCity] ?? [];
    if (!selectedCourses.length) return all;
    return all.filter((s) => selectedCourses.includes(s.course));
  }, [selectedCity, selectedCourses]);

  // Keep only sessions that still appear in the filtered list
  useEffect(() => {
    if (!selectedSessions.length) return;
    const availableValues = new Set(
      availableSessions.map((s) => `${s.course} — ${s.date}`)
    );
    setSelectedSessions((prev) =>
      prev.filter((session) => availableValues.has(session))
    );
  }, [availableSessions, selectedSessions.length]);

  // Close on Escape
  useEffect(() => {
    if (!state.isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContact();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [state.isOpen, closeContact]);

  const toggleCourse = (courseName: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseName)
        ? prev.filter((c) => c !== courseName)
        : [...prev, courseName]
    );
    setFormErrors((prev) => ({ ...prev, courses: false }));
  };

  const toggleSession = (sessionValue: string) => {
    setSelectedSessions((prev) =>
      prev.includes(sessionValue)
        ? prev.filter((session) => session !== sessionValue)
        : [...prev, sessionValue]
    );
    setFormErrors((prev) => ({ ...prev, sessions: false }));
  };

  // Build mailto href reactively — submit button IS this <a> tag
  const mailtoHref = useMemo(() => {
    const courseList = selectedCourses.length
      ? selectedCourses.join(", ")
      : "—";
    const sessionList = selectedSessions.length
      ? selectedSessions.join(", ")
      : "—";
    const subject = `Записване${selectedCourses[0] ? ` — ${selectedCourses[0]}` : ""}${selectedCity ? ` — ${selectedCity}` : ""}`;
    const body = [
      "Здравейте,",
      "",
      "Искам да се запиша за следното обучение:",
      "",
      `Обучение: ${courseList}`,
      `Град: ${selectedCity || "—"}`,
      `Сесии / дати: ${sessionList}`,
      "",
      `Иme и фамилия: ${name || "—"}`,
      `Телефон за връзка: ${phone || "—"}`,
      "",
      "Допълнително съобщение:",
      msg,
      "",
      "С уважение,",
      name || "",
    ].join("\n");

    return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [selectedCourses, selectedCity, selectedSessions, name, phone, msg]);

  const handleSubmitClick = () => {
    const nextErrors = {
      courses: selectedCourses.length === 0,
      city: !selectedCity,
      sessions: selectedSessions.length === 0,
      name: !name.trim(),
      phone: !phone.trim(),
    };

    setFormErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleConfirmSend = () => {
    window.location.href = mailtoHref;
    setIsConfirmOpen(false);
    setTimeout(closeContact, 100);
  };

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-warm-900/70 backdrop-blur-sm"
            onClick={closeContact}
          />

          {/* Centered wrapper */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[96dvh]"
            >
              {/* Header */}
              <div className="bg-warm-900 px-6 sm:px-7 pt-5 pb-4 flex items-start justify-between shrink-0">
                <div>
                  <p className="label-sm text-warm-500 mb-2">
                    Записване за обучение
                  </p>
                  <h3 className="font-playfair text-2xl font-light text-white leading-tight">
                    Запиши се сега
                  </h3>
                </div>
                <button
                  onClick={closeContact}
                  aria-label="Затвори"
                  className="text-warm-500 hover:text-white transition-colors duration-200 mt-1 p-1 -mr-1"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto px-6 sm:px-7 py-5 space-y-4">
                {/* Courses – multi-select */}
                {/* City */}
                <div>
                  <label className="label-sm block mb-1.5">
                    Град <span className="text-warm-400 normal-case font-light">*</span>
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      setSelectedCourses([]);
                      setSelectedSessions([]);
                      setFormErrors((prev) => ({
                        ...prev,
                        city: false,
                        courses: false,
                        sessions: false,
                      }));
                    }}
                    className={`w-full border rounded-xl px-3.5 py-2.5 text-sm text-warm-900 bg-warm-50 focus:outline-none transition-colors ${
                      formErrors.city
                        ? "border-red-300 focus:border-red-400"
                        : "border-warm-200 focus:border-warm-600"
                    }`}
                  >
                    <option value="">Изберете…</option>
                    <option value="София">София</option>
                    <option value="Варна">Варна</option>
                  </select>
                  {formErrors.city && (
                    <p className="text-[11px] text-red-400 mt-1">
                      Моля, изберете град.
                    </p>
                  )}
                </div>

                {/* Courses – shown after city */}
                {selectedCity && (
                  <div>
                    <label className="label-sm block mb-2">
                      Обучение{" "}
                      <span className="text-warm-400 normal-case font-light tracking-normal">*</span>
                      <span className="text-warm-400 normal-case font-light tracking-normal ml-1">
                        (може да изберете повече от едно)
                      </span>
                    </label>
                    <div className="space-y-2">
                      {availableCourses.map((courseName) => {
                        const checked = selectedCourses.includes(courseName);
                        return (
                          <button
                            key={courseName}
                            type="button"
                            onClick={() => toggleCourse(courseName)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm text-left transition-all duration-200 ${
                              checked
                                ? "border-warm-700 bg-warm-900 text-white"
                                : "border-warm-200 bg-warm-50 text-warm-700 hover:border-warm-400"
                            }`}
                          >
                            <span
                              className={`shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                checked ? "bg-white border-white" : "border-warm-300"
                              }`}
                            >
                              {checked && (
                                <svg
                                  width="10"
                                  height="10"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                >
                                  <path
                                    d="M2 6l3 3 5-5"
                                    stroke="#2a2522"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </span>
                            {courseName}
                          </button>
                        );
                      })}
                    </div>
                    {formErrors.courses && (
                      <p className="text-[11px] text-red-400 mt-1">
                        Моля, изберете поне едно обучение.
                      </p>
                    )}
                  </div>
                )}

                {/* Dates / sessions – shown after courses */}
                {selectedCity && selectedCourses.length > 0 && (
                  <div>
                    <label className="label-sm block mb-1.5">
                      Дати / сесии
                      <span className="text-warm-400 normal-case font-light ml-1">*</span>
                    </label>
                    {availableSessions.length === 0 ? (
                      <p className="text-xs text-warm-400 italic">
                        Няма намерени сесии за избраната комбинация.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {availableSessions.map((s) => {
                          const val = `${s.course} — ${s.date}`;
                          const checked = selectedSessions.includes(val);
                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => toggleSession(val)}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm text-left transition-all duration-200 ${
                                checked
                                  ? "border-warm-700 bg-warm-900 text-white"
                                  : "border-warm-200 bg-warm-50 text-warm-700 hover:border-warm-400"
                              }`}
                            >
                              <span
                                className={`shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                  checked
                                    ? "bg-white border-white"
                                    : "border-warm-300"
                                }`}
                              >
                                {checked && (
                                  <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                  >
                                    <path
                                      d="M2 6l3 3 5-5"
                                      stroke="#2a2522"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                              </span>
                              {s.course} — {s.date}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    {formErrors.sessions && (
                      <p className="text-[11px] text-red-400 mt-1">
                        Моля, изберете поне една сесия/дата.
                      </p>
                    )}
                  </div>
                )}

                {/* Date selection hint when no course is selected */}
                {selectedCity && (
                  selectedCourses.length === 0 && (
                    <p className="text-xs text-warm-400 italic">
                      Изберете обучение, за да се покажат наличните дати.
                    </p>
                  )
                )}

                {/* Name */}
                <div>
                  <label className="label-sm block mb-1.5">
                    Иme и фамилия{" "}
                    <span className="text-warm-400 normal-case font-light">
                      *
                    </span>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (e.target.value.trim()) {
                        setFormErrors((prev) => ({ ...prev, name: false }));
                      }
                    }}
                    placeholder="Вашето иme и фамилия"
                    className={`w-full border rounded-xl px-3.5 py-2.5 text-sm text-warm-900 placeholder:text-warm-400 bg-warm-50 focus:outline-none transition-colors ${
                      formErrors.name
                        ? "border-red-300 focus:border-red-400"
                        : "border-warm-200 focus:border-warm-600"
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-[11px] text-red-400 mt-1">
                      Моля, въведете вашето иme.
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="label-sm block mb-1.5">
                    Телефон за връзка{" "}
                    <span className="text-warm-400 normal-case font-light">*</span>
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => {
                      const onlyDigits = e.target.value.replace(/\D/g, "");
                      setPhone(onlyDigits);
                      if (onlyDigits) {
                        setFormErrors((prev) => ({ ...prev, phone: false }));
                      }
                    }}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="359..."
                    className={`w-full border rounded-xl px-3.5 py-2.5 text-sm text-warm-900 placeholder:text-warm-400 bg-warm-50 focus:outline-none transition-colors ${
                      formErrors.phone
                        ? "border-red-300 focus:border-red-400"
                        : "border-warm-200 focus:border-warm-600"
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] text-red-400 mt-1">
                      Моля, въведете телефонен номер (само цифри).
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="label-sm block mb-1.5">Съобщение</label>
                  <textarea
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    rows={3}
                    className="w-full border border-warm-200 rounded-xl px-3.5 py-2.5 text-sm text-warm-900 bg-warm-50 focus:outline-none focus:border-warm-600 transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Submit */}
                <button
                  type="button"
                  onClick={handleSubmitClick}
                  className="block w-full text-center bg-warm-900 text-white text-[11px] font-medium tracking-widest uppercase py-3.5 rounded-xl hover:bg-warm-700 active:bg-warm-900 transition-colors duration-200 cursor-pointer"
                >
                  Изпрати запитване →
                </button>

                {/* Hint about mail app */}
                <p className="text-[11px] text-warm-400 font-light leading-relaxed pb-1">
                  Бутонът ще отвори вашия имейл клиент с попълнено запитване
                  до{" "}
                  <span className="text-warm-600">{EMAIL}</span>.
                  {" "}Ако браузърът поиска разрешение — изберете{" "}
                  <span className="text-warm-600 font-medium">„Open Mail"</span>
                  {" "}или поставете отметка{" "}
                  <span className="text-warm-600 font-medium">„Always allow"</span>.
                </p>
              </div>

              {/* Site confirmation modal */}
              <AnimatePresence>
                {isConfirmOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-warm-900/40 backdrop-blur-[1px]"
                      onClick={() => setIsConfirmOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 top-1/2 w-[calc(100%-2.5rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white border border-warm-200 shadow-2xl p-4 sm:p-5"
                    >
                      <p className="font-playfair text-lg text-warm-900 mb-1.5">
                        Потвърждение
                      </p>
                      <p className="text-xs sm:text-sm text-warm-600 leading-relaxed mb-4">
                        Ще отворим вашия имейл клиент с вече попълнени данни от формата.
                        Няма нужда да ги въвеждате отново.
                      </p>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsConfirmOpen(false)}
                          className="px-3 py-1.5 rounded-lg border border-warm-300 text-warm-700 text-xs sm:text-sm hover:border-warm-500 transition-colors"
                        >
                          Отказ
                        </button>
                        <button
                          type="button"
                          onClick={handleConfirmSend}
                          className="px-3 py-1.5 rounded-lg bg-warm-900 text-white text-xs sm:text-sm hover:bg-warm-700 transition-colors"
                        >
                          Продължи
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
