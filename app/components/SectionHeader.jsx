import Reveal from './Reveal';

/*
  Every section is named in both of the site's languages: the current
  language carries the heading, the other appears as a quiet gloss.
*/
export default function SectionHeader({ title, gloss, lede }) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-baseline gap-4">
        <h2 className="section-title text-ink">{title}</h2>
        <span aria-hidden="true" className="font-mark text-2xl text-accent/40">
          {gloss}
        </span>
      </div>
      {lede && <p className="mt-3 max-w-xl text-muted">{lede}</p>}
      <div className="mt-6 h-px w-16 bg-accent/60" />
    </Reveal>
  );
}
