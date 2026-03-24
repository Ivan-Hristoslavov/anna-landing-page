const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-warm-900 text-warm-500">
      {/* Top bar */}
      <div className="border-t border-warm-800 px-6 md:px-12 lg:px-24 pt-16 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-11 md:gap-8">

          {/* Brand */}
          <div>
            <p className="text-[10px] font-medium tracking-widest uppercase text-warm-600 mb-3">
              Анна
            </p>
            <h4 className="font-playfair text-xl font-light text-warm-100 mb-3 leading-snug">
              Професионални обучения<br />в България
            </h4>
            <p className="text-xs font-light leading-relaxed text-warm-600 max-w-xs">
              Премиум майсторски класове по лицев масаж, скулптуриране и козметология — София и Варна.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-[10px] font-medium tracking-widest uppercase text-warm-600 mb-4">
              Навигация
            </p>
            <ul className="space-y-3">
              {[
                { label: "Начало", href: "#home" },
                { label: "Обучения", href: "#courses" },
                { label: "График", href: "#timeline" },
                { label: "Записване", href: "#enroll" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-warm-400 hover:text-warm-100 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-medium tracking-widest uppercase text-warm-600 mb-4">
              Контакт
            </p>
            <ul className="space-y-3 text-xs text-warm-400 font-light">
              <li className="flex items-start gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-warm-600">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="currentColor"/>
                </svg>
                <span>София, Варна — България</span>
              </li>
              <li className="flex items-start gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-warm-600">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                </svg>
                <a
                  href="mailto:contact@anna.london"
                  className="hover:text-warm-100 transition-colors duration-200"
                >
                  contact@anna.london
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-warm-800 mx-6 md:mx-12 lg:mx-24" />

      {/* Bottom bar */}
      <div className="px-6 md:px-12 lg:px-24 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-warm-700 font-light tracking-wide">

          <p>
            © {CURRENT_YEAR} Анна. Всички права запазени.
          </p>

          <div className="flex items-center gap-5">
            <a href="/privacy" className="hover:text-warm-400 transition-colors duration-200">
              Поверителност
            </a>
            <span className="text-warm-800">·</span>
            <a href="/terms" className="hover:text-warm-400 transition-colors duration-200">
              Условия
            </a>
            <span className="text-warm-800">·</span>
            <a href="/privacy#cookies" className="hover:text-warm-400 transition-colors duration-200">
              Бисквитки
            </a>
          </div>

          <p>
            Разработено от{" "}
            <a
              href="https://serenity.rapid-frame.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-500 hover:text-warm-300 transition-colors duration-200 underline underline-offset-4 decoration-warm-800 hover:decoration-warm-500"
            >
              Serenity Web Studio
            </a>
          </p>

        </div>
      </div>
    </footer>
  );
}
