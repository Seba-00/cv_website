'use client';

import { useState } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import Breeze from '../components/Breeze';

const content = {
  EN: {
    title: 'Contact',
    gloss: 'تواصل',
    lede: 'Have a role, a project, or just a question? My inbox is open.',
    emailLabel: 'Write to me at',
    form: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      submit: 'Send message',
      sending: 'Sending…',
    },
    toasts: {
      success: 'Message sent — I will get back to you soon.',
      error: 'Something went wrong. Please try again.',
    },
    footer: 'Designed and built by Saba Salamah in Jeddah',
  },
  AR: {
    title: 'تواصل معي',
    gloss: 'Contact',
    lede: 'عندك فرصة عمل، مشروع، أو حتى سؤال؟ بريدي مفتوح دائماً.',
    emailLabel: 'راسلني على',
    form: {
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      message: 'الرسالة',
      submit: 'إرسال الرسالة',
      sending: 'جارٍ الإرسال…',
    },
    toasts: {
      success: 'وصلت رسالتك — بردّ عليك قريباً.',
      error: 'صار خطأ ما. حاول مرة ثانية.',
    },
    footer: 'صممته وبنيته صبا سلامة في جدة',
  },
};

const socials = [
  { icon: FaGithub, href: 'https://github.com/Seba-00', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/seba-salamah-7916742b8/', label: 'LinkedIn' },
  { icon: FaWhatsapp, href: 'https://wa.me/966555948067', label: 'WhatsApp' },
];

const inputClass =
  'w-full rounded-lg border border-line bg-background px-4 py-2.5 text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none';

export default function Contact() {
  const { language } = useTheme();
  const [isSending, setIsSending] = useState(false);
  const t = content[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const formData = new FormData(e.target);
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');
      formData.append('_subject', 'New message from sabasalamah.dev');

      const res = await fetch('https://formsubmit.co/ajax/sebasalamah00@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (!res.ok) throw new Error('send failed');
      toast.success(t.toasts.success);
      e.target.reset();
    } catch {
      toast.error(t.toasts.error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <Breeze className="opacity-60" />
      <Toaster position="top-center" />

      <div className="wrap relative z-10">
        <SectionHeader title={t.title} gloss={t.gloss} lede={t.lede} />

        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <p className="text-sm font-medium text-muted">{t.emailLabel}</p>
            <a
              href="mailto:sebasalamah00@gmail.com"
              className="link-slide mt-2 inline-flex items-center gap-3 break-all font-display text-2xl font-semibold text-ink hover:text-accent sm:text-3xl"
            >
              <FiMail className="hidden h-6 w-6 shrink-0 text-accent sm:block" />
              sebasalamah00@gmail.com
            </a>

            <div className="mt-10 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-lg border border-line bg-surface p-3 text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
                    {t.form.name}
                  </label>
                  <input id="name" name="name" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                    {t.form.email}
                  </label>
                  <input id="email" name="email" type="email" required className={inputClass} />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
                  {t.form.message}
                </label>
                <textarea id="message" name="message" rows={5} required className={inputClass} />
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="w-full rounded-lg bg-accent px-6 py-3 font-medium text-background transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
              >
                {isSending ? t.form.sending : t.form.submit}
              </button>
            </form>
          </Reveal>
        </div>

        <footer className="mt-24 flex flex-col items-center gap-3 border-t border-line pt-8 text-center">
          <span className="font-mark text-3xl text-accent/70" aria-hidden="true">
            صبا
          </span>
          <p className="text-sm text-muted">
            {t.footer} · {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </section>
  );
}
