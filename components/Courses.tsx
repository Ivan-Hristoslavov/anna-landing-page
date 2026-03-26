"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useContact } from "@/app/contact-context";

interface Course {
  name: string;
  date: string;
  description: string;
  badge?: string;
  soldOut?: boolean;
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
        name: "INTRASCULPT™",
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
        soldOut: true,
      },
      {
        name: "FACE MASSAGE MASTERY LEVEL 1",
        date: "15, 16, 17 юни 2026",
        badge: "LEVEL 1 · 3 дни",
        description:
          "Изкуство и майсторство на лицевия масаж - Ниво 1.",
      },
      {
        name: "BLEPH EFFECT™",
        date: "18 юни 2026",
        badge: "1 ден",
        description: "Неинвазивен лифтинг за околоочната зона.",
      },
    ],
  },
  {
    city: "Варна",
    cityEn: "Varna",
    courses: [
      {
        name: "FACE MASSAGE MASTERY LEVEL 1",
        date: "4, 5, 6 април 2026",
        badge: "LEVEL 1 · 3 дни",
        description:
          "Изкуство и майсторство на лицевия масаж - Ниво 1.",
      },
      {
        name: "BLEPH EFFECT™",
        date: "7 април 2026",
        badge: "1 ден",
        description: "Неинвазивен лифтинг за околоочната зона.",
        soldOut: true,
      },
      {
        name: "INTRASCULPT™",
        date: "8–9 април 2026",
        badge: "2 дни",
        description:
          "Напреднала техника за трансбукален контур, ремоделиране и освобождаване на напрежението на средната и долна част на лицето.",
      },
    ],
  },
];

const galleryImages = [
  "/images/other/Anna-wach-camera.jpeg",
  "/images/other/face-massage-1.jpeg",
  "/images/other/face-massage-2.jpeg",
];

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
  const { openContact } = useContact();

  const renderCourseBadge = (badge: string) => {
    const parts = badge.split("·").map((p) => p.trim());
    const isSplit = parts.length === 2 && parts[0] && parts[1];

    return (
      <span className="shrink-0 text-[10px] font-medium tracking-wider uppercase text-warm-500 bg-warm-50 border border-warm-200 px-2.5 py-1 rounded-full">
        {isSplit ? (
          <span className="flex flex-col items-center leading-tight">
            <span className="text-[11px] font-semibold tracking-widest text-warm-800">
              {parts[0]}
            </span>
            <span className="text-[10px] mt-0.5">{parts[1]}</span>
          </span>
        ) : (
          badge
        )}
      </span>
    );
  };

  const renderSoldOutPill = () => (
    <span className="shrink-0 text-[10px] font-semibold tracking-widest text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
      Sold out
    </span>
  );

  return (
    <section id="courses" className="section-padding bg-parchment">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="label-sm mb-4">Програма 2026</p>
          <h2 className="heading-lg text-warm-900 mb-6">
            Предстоящи обучения
          </h2>
          <div className="divider-line mb-8" />
          <p className="text-sm text-warm-500 font-light max-w-lg mx-auto leading-relaxed">
            Изберете обучение и натиснете „Запиши се" — ще попълним детайлите автоматично.
          </p>
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
              <div className="flex items-center gap-4 mb-8 md:mb-10">
                <div>
                  <p className="label-sm text-warm-400 mb-1.5">{group.cityEn}</p>
                  <h3 className="font-playfair text-3xl md:text-4xl font-light text-warm-900">
                    {group.city}
                  </h3>
                </div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-warm-400 border border-warm-200 rounded-full px-3 py-1">
                  {group.courses.length} курса
                </span>
                <div className="flex-1 h-px bg-warm-200 ml-2" />
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
                    className="group bg-white rounded-2xl border border-warm-100 p-6 hover:border-warm-300 hover:shadow-[0_14px_45px_rgba(35,30,27,0.12)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h4 className="font-playfair text-lg md:text-xl font-medium text-warm-900 group-hover:text-warm-700 transition-colors">
                        {course.name}
                      </h4>
                      <div className="flex flex-col items-end gap-2">
                        {course.badge && renderCourseBadge(course.badge)}
                        {course.soldOut && renderSoldOutPill()}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-warm-500 mb-3 flex items-center gap-2">
                      <span className="w-4 h-px bg-warm-300 inline-block" />
                      {course.date}
                    </p>
                    <p className="text-sm text-warm-600 font-light leading-relaxed mb-4">
                      {course.description}
                    </p>
                    <button
                      onClick={() =>
                        openContact(course.name, group.city, course.date)
                      }
                      className="group/btn inline-flex items-center gap-2 text-[11px] font-medium tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-colors duration-200"
                    >
                      Запиши се
                      <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">
                        →
                      </span>
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <p className="label-sm text-center mb-8">Галерия</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryImages.map((src, i) => (
              <div key={i} className="relative aspect-3/4 w-full rounded-2xl overflow-hidden">
                <Image
                  src={src}
                  alt={`Галерия ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={85}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
