import Link from "next/link";

export const metadata = {
  title: "Условия за ползване — Анна",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-parchment">
      {/* Top bar */}
      <div className="border-b border-warm-200 px-6 md:px-12 py-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-warm-500 hover:text-warm-900 transition-colors duration-200"
        >
          ← Назад
        </Link>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <p className="text-[11px] font-medium tracking-widest uppercase text-warm-400 mb-4">
          Правна информация
        </p>
        <h1 className="font-playfair text-4xl md:text-5xl font-light text-warm-900 mb-4 leading-tight">
          Условия за ползване
        </h1>
        <div className="w-12 h-px bg-warm-300 mb-10" />

        <div>
          <Section title="1. Приемане на условията">
            <p>
              С достъпа и използването на този уебсайт вие потвърждавате, че
              сте прочели, разбрали и приемате настоящите Условия за ползване.
              Ако не сте съгласни с тях, моля, не използвайте сайта.
            </p>
          </Section>

          <Section title="2. Предлагани услуги">
            <p>
              Сайтът предоставя информация за професионални обучения по лицев
              масаж, скулптуриране и козметология, провеждани в България.
              Записването за обучение се извършва по електронна поща и
              потвърждава се допълнително от организатора.
            </p>
          </Section>

          <Section title="3. Записване и плащане">
            <ul>
              <li>
                Записването е валидно след потвърждаване по имейл от страна на
                организатора.
              </li>
              <li>
                Конкретните условия за плащане, анулиране и отстъпки се
                уточняват индивидуално при записването.
              </li>
              <li>
                Организаторът си запазва правото да промени дата, локация или
                съдържание на обучение при необходимост, като уведоми
                записаните участници своевременно.
              </li>
            </ul>
          </Section>

          <Section title="4. Интелектуална собственост">
            <p>
              Всички материали, публикувани на сайта — текстове, изображения,
              видеоклипове, търговски марки и лога — са собственост на Анна
              или са публикувани с разрешение на притежателите на правата.
              Забранено е копирането, разпространението или използването им без
              изрично писмено разрешение.
            </p>
          </Section>

          <Section title="5. Ограничаване на отговорността">
            <p>
              Информацията на сайта е с образователен и информационен характер.
              Организаторът не носи отговорност за:
            </p>
            <ul>
              <li>
                технически прекъсвания или недостъпност на сайта;
              </li>
              <li>
                действия или бездействия на трети лица, засягащи сайта;
              </li>
              <li>
                вреди, произтичащи от неправилно приложение на обучителния
                материал извън обучението.
              </li>
            </ul>
          </Section>

          <Section title="6. Поверителност и бисквитки">
            <p>
              Обработването на лични данни е уредено в нашата{" "}
              <Link href="/privacy" className="legal-link">
                Политика за поверителност
              </Link>
              , която е неразделна част от настоящите условия.
            </p>
          </Section>

          <Section title="7. Приложимо право">
            <p>
              Настоящите условия се уреждат от законодателството на Република
              България. Всички спорове се отнасят до компетентния български
              съд.
            </p>
          </Section>

          <Section title="8. Промени в условията">
            <p>
              Запазваме правото си да актуализираме условията по всяко време.
              Продължаването на ползването на сайта след публикуване на промените
              се счита за приемането им.
            </p>
          </Section>

          <Section title="9. Контакт">
            <p>
              За въпроси, свързани с тези условия, пишете на{" "}
              <a href="mailto:contact@anna.london" className="legal-link">
                contact@anna.london
              </a>
              .
            </p>
          </Section>

          <p className="text-xs text-warm-400 font-light mt-12">
            Последна актуализация: март 2026 г.
          </p>
        </div>
      </article>

      {/* Footer strip */}
      <div className="border-t border-warm-200 px-6 md:px-12 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs font-medium tracking-widest uppercase text-warm-400 hover:text-warm-700 transition-colors duration-200"
        >
          ← Начало
        </Link>
        <Link
          href="/privacy"
          className="text-xs font-medium tracking-widest uppercase text-warm-400 hover:text-warm-700 transition-colors duration-200"
        >
          Поверителност →
        </Link>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="font-playfair text-xl font-medium text-warm-900 mb-4">
        {title}
      </h2>
      <div className="text-sm text-warm-700 font-light leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:font-medium [&_strong]:text-warm-800 [&_.legal-link]:text-warm-700 [&_.legal-link]:underline [&_.legal-link]:underline-offset-2 [&_.legal-link]:hover:text-warm-900 [&_.legal-link]:transition-colors">
        {children}
      </div>
    </section>
  );
}
