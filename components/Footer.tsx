export default function Footer() {
  return (
    <footer className="bg-warm-900 border-t border-warm-800 py-6 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <p className="text-warm-600 text-[11px] tracking-wider font-light">
          Разработено от{" "}
          <a
            href="https://serenity.rapid-frame.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warm-400 hover:text-warm-200 transition-colors duration-200 underline underline-offset-4 decoration-warm-700 hover:decoration-warm-400"
          >
            Serenity Web Studio
          </a>
        </p>
      </div>
    </footer>
  );
}
