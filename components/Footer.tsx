const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-warm-900 text-warm-500">
      {/* Top bar */}
      <div className="border-t border-warm-800 px-6 md:px-12 lg:px-24 pt-14 pb-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">

          {/* Brand */}
          <div>
            <p className="text-[10px] font-medium tracking-widest uppercase text-warm-600 mb-3">
              Анна
            </p>
            <h4 className="font-playfair text-xl font-light text-warm-200 mb-3 leading-snug">
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
            <ul className="space-y-2.5">
              {[
                { label: "Начало", href: "#" },
                { label: "Обучения", href: "#courses" },
                { label: "График", href: "#courses" },
                { label: "Записване", href: "#courses" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-warm-500 hover:text-warm-200 transition-colors duration-200"
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
            <ul className="space-y-2.5 text-xs text-warm-500 font-light">
              <li className="flex items-start gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0 text-warm-600">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="currentColor"/>
                </svg>
                <span>София, Варна — България</span>
              </li>
              <li className="flex items-start gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0 text-warm-600">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                </svg>
                <a
                  href="mailto:info@anna-trainings.bg"
                  className="hover:text-warm-200 transition-colors duration-200"
                >
                  info@anna-trainings.bg
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0 text-warm-600">
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                </svg>
                <a
                  href="tel:+359000000000"
                  className="hover:text-warm-200 transition-colors duration-200"
                >
                  +359 000 000 000
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-warm-800 mx-6 md:mx-12 lg:mx-24" />

      {/* Bottom bar */}
      <div className="px-6 md:px-12 lg:px-24 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-warm-700 font-light tracking-wide">

          <p>
            © {CURRENT_YEAR} Анна. Всички права запазени.
          </p>

          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-warm-400 transition-colors duration-200">
              Политика за поверителност
            </a>
            <span className="text-warm-800">·</span>
            <a href="#" className="hover:text-warm-400 transition-colors duration-200">
              Условия за ползване
            </a>
            <span className="text-warm-800">·</span>
            <a href="#" className="hover:text-warm-400 transition-colors duration-200">
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
