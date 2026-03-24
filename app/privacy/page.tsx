import Link from "next/link";

export const metadata = {
  title: "Политика за поверителност — Анна",
};

export default function PrivacyPage() {
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
          Политика за поверителност
        </h1>
        <div className="w-12 h-px bg-warm-300 mb-10" />

        <div className="prose-legal">
          <Section title="1. Кой събира данните">
            <p>
              Тази политика се отнася за уебсайта на Анна, предлагащ
              професионални обучения по лицев масаж, скулптуриране и козметология
              в България. За въпроси, свързани с личните ви данни, се обърнете
              към нас на{" "}
              <a href="mailto:contact@anna.london" className="legal-link">
                contact@anna.london
              </a>
              .
            </p>
          </Section>

          <Section title="2. Какви данни събираме">
            <p>Събираме единствено данните, които вие ни предоставяте доброволно:</p>
            <ul>
              <li>
                <strong>Данни за контакт</strong> — иmе, фамилия, имейл адрес и
                телефонен номер, подадени чрез формата за записване.
              </li>
              <li>
                <strong>Данни за интерес</strong> — избрано обучение, дата и
                локация.
              </li>
              <li>
                <strong>Технически данни</strong> — IP адрес, вид браузър и
                страниците, посетени на сайта (само при приемане на
                бисквитките).
              </li>
            </ul>
          </Section>

          <Section title="3. Как използваме данните">
            <ul>
              <li>За обработка на запитвания и потвърждения за записване.</li>
              <li>
                За изпращане на информация, свързана с избраното обучение.
              </li>
              <li>За подобряване на услугите и уебсайта.</li>
            </ul>
            <p>
              Не продаваме, не отдаваме под наем и не споделяме личните ви
              данни с трети лица за маркетингови цели.
            </p>
          </Section>

          <Section title="4. Правно основание за обработване (GDPR)">
            <p>
              Обработваме данните ви въз основа на:
            </p>
            <ul>
              <li>
                <strong>Изпълнение на договор</strong> — при записване за
                обучение (чл. 6, пар. 1, б. „б" GDPR).
              </li>
              <li>
                <strong>Легитимен интерес</strong> — за подобряване на
                услугите ни (чл. 6, пар. 1, б. „е" GDPR).
              </li>
              <li>
                <strong>Съгласие</strong> — за аналитични бисквитки (чл. 6,
                пар. 1, б. „а" GDPR).
              </li>
            </ul>
          </Section>

          <Section title="5. Срок на съхранение">
            <p>
              Пазим данните ви за период от{" "}
              <strong>3 години</strong> след последния ви контакт с нас или
              до момента, в който поискате заличаването им. Счетоводните
              документи се съхраняват за законово изискуемия срок.
            </p>
          </Section>

          <Section title="6. Вашите права">
            <p>Имате право да:</p>
            <ul>
              <li>получите достъп до данните, съхранявани за вас;</li>
              <li>поискате коригиране или заличаване;</li>
              <li>ограничите обработването;</li>
              <li>оттеглите съгласието си по всяко вреmе;</li>
              <li>
                подадете жалба до Комисията за защита на личните данни (
                <a
                  href="https://www.cpdp.bg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="legal-link"
                >
                  cpdp.bg
                </a>
                ).
              </li>
            </ul>
            <p>
              За упражняване на правата си пишете на{" "}
              <a href="mailto:contact@anna.london" className="legal-link">
                contact@anna.london
              </a>
              .
            </p>
          </Section>

          <Section title="7. Бисквитки (Cookies)">
            <p>
              Използваме следните видове бисквитки:
            </p>
            <ul>
              <li>
                <strong>Задължителни</strong> — необходими за работата на
                сайта; не изискват съгласие.
              </li>
              <li>
                <strong>Аналитични</strong> — помагат ни да разберем как се
                използва сайтът; активират се само след вашето съгласие.
              </li>
            </ul>
            <p>
              Можете да управлявате или изтривате бисквитките от настройките
              на браузъра си по всяко вреmе.
            </p>
          </Section>

          <Section title="8. Промени в политиката">
            <p>
              Запазваме правото си да актуализираме тази политика. При
              съществени промени ще ви уведомим чрез видимо съобщение на
              сайта. Датата на последна актуализация е посочена по-долу.
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
          href="/terms"
          className="text-xs font-medium tracking-widest uppercase text-warm-400 hover:text-warm-700 transition-colors duration-200"
        >
          Условия за ползване →
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
