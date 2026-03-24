"use client";

import { motion } from "framer-motion";

const REGISTRATION_URL = "https://forms.gle/your-form-id";

interface Course {
  name: string;
  date: string;
  description: string;
  badge?: string;
}

interface CityGroup {
  city: string;
  cityEn: string;
  courses: Course[];
}

const courseData: CityGroup[] = [
  {
    city: "София",
    cityEn: "Sofia",
    courses: [
      {
        name: "IntraSculpt™",
        date: "30–31 март 2026",
        badge: "2 дни",
        description:
          "Напреднала техника за трансбукален контур, ремоделиране и освобождаване на напрежението на средната и долна част на лицето.",
      },
      {
        name: "BLEPH EFFECT™",
        date: "1 април 2026",
        badge: "1 ден",
        description: "Неинвазивен лифтинг за околоочната зона.",
      },
      {
        name: "Face Massage Mastery",
        date: "15, 16, 17 юни 2026",
        badge: "Level 1 · 3 дни",
        description:
          "Базово ниво – изкуство и майсторство на лицевия масаж.",
      },
    ],
  },
  {
    city: "Варна",
    cityEn: "Varna",
    courses: [
      {
        name: "Face Massage Mastery",
        date: "4, 5, 6 април 2026",
        badge: "Level 1 · 3 дни",
        description:
          "Базово ниво – изкуство и майсторство на лицевия масаж.",
      },
      {
        name: "BLEPH EFFECT™",
        date: "7 април 2026",
        badge: "1 ден",
        description: "Неинвазивен лифтинг за околоочната зона.",
      },
      {
        name: "IntraSculpt™",
        date: "8–9 април 2026",
        badge: "2 дни",
        description:
          "Напреднала техника за трансбукален контур, ремоделиране и освобождаване на напрежението на средната и долна част на лицето.",
      },
    ],
  },
];

const ImagePlaceholder = ({
  className,
  index,
}: {
  className?: string;
  index: number;
}) => (
  <div
    className={`relative bg-warm-100 rounded-2xl border border-warm-200 overflow-hidden flex flex-col items-center justify-center gap-3 ${className}`}
    style={{ minHeight: 200 }}
  >
    <div className="w-10 h-10 rounded-full border border-warm-300 flex items-center justify-center">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="text-warm-400"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
        <path
          d="M3 14l5-5 4 4 3-3 6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <p className="text-xs text-warm-400 font-light tracking-wide text-center px-4">
      Място за снимка
      <br />
      <span className="text-warm-300">(ще бъде добавена по-късно)</span>
    </p>
    <span className="absolute bottom-3 right-3 text-[10px] text-warm-300 font-light">
      {String(index).padStart(2, "0")}
    </span>
  </div>
);

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Courses() {
  return (
    <section id="courses" className="section-padding bg-parchment">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="label-sm mb-4">Програма 2026</p>
          <h2 className="heading-lg text-warm-900 mb-6">
            Предстоящи обучения
          </h2>
          <div className="divider-line" />
        </motion.div>

        {/* City columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 xl:gap-16">
          {courseData.map((group, gi) => (
            <motion.div
              key={group.city}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: gi * 0.15 }}
            >
              {/* City header */}
              <div className="flex items-center gap-4 mb-10">
                <div>
                  <p className="label-sm text-warm-400 mb-1">{group.cityEn}</p>
                  <h3 className="font-playfair text-3xl md:text-4xl font-light text-warm-900">
                    {group.city}
                  </h3>
                </div>
                <div className="flex-1 h-px bg-warm-200 ml-4" />
              </div>

              {/* Course cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="space-y-4"
              >
                {group.courses.map((course, ci) => (
                  <motion.div
                    key={`${group.city}-${ci}`}
                    variants={itemVariants}
                    className="group bg-white rounded-2xl border border-warm-100 p-6 hover:border-warm-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h4 className="font-playfair text-xl font-medium text-warm-900 group-hover:text-warm-700 transition-colors">
                        {course.name}
                      </h4>
                      {course.badge && (
                        <span className="flex-shrink-0 text-[10px] font-medium tracking-wider uppercase text-warm-500 bg-warm-50 border border-warm-200 px-2.5 py-1 rounded-full">
                          {course.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-warm-500 mb-3 flex items-center gap-2">
                      <span className="w-4 h-px bg-warm-300 inline-block" />
                      {course.date}
                    </p>
                    <p className="text-sm text-warm-600 font-light leading-relaxed">
                      {course.description}
                    </p>
                  </motion.div>
                ))}

                {/* Image placeholder per city */}
                <motion.div variants={itemVariants}>
                  <ImagePlaceholder
                    className="w-full aspect-[16/7]"
                    index={gi + 1}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Gallery placeholders */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <p className="label-sm text-center mb-8">Галерия</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[3, 4, 5, 6].map((n) => (
              <ImagePlaceholder
                key={n}
                className="aspect-[3/4] w-full"
                index={n}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
