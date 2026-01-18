"use client";

import { useTranslations } from "next-intl";
import { Clock, Phone, Mail, Facebook, Youtube } from "lucide-react";
import Link from "next/link";

type MapProps = {
  title: string;
  src: string;
};

function GoogleMap({ title, src }: MapProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/15 bg-white/5">
      <iframe
        title={title}
        src={src}
        width="100%"
        height="220"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block w-full"
      />
    </div>
  );
}

export default function footer() {
  const t = useTranslations("footer");

  // ✅ Map embed links bạn cung cấp (dùng src, không dán cả <iframe> vào đây)
  const MAIN_OFFICE_MAP =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.796710373993!2d106.27497831012329!3d10.437700365308267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310abb1c443ae929%3A0xb84d4339404766c6!2zVHJ1bmcgdMOibSDEkMOgbyB04bqhbyB2w6AgU8OhdCBo4bqhY2ggTMOhaSB4ZSBTw7RuZyBUaeG7gW4!5e0!3m2!1svi!2s!4v1768729867520!5m2!1svi!2s";

  const MY_THO_OFFICE_MAP =
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d62797.02509949653!2d106.363129!3d10.356747!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310aaf8535613c7d%3A0x63632d3e9cb583ce!2zVsSDbiBwaMOybmcgR2hpIGRhbmggxJDDoG8gdOG6oW8gdsOgIFPDoXQgaOG6oWNoIEzDoWkgeGUgU8O0bmcgVGnhu4Fu!5e0!3m2!1sen!2sus!4v1768729966998!5m2!1sen!2sus";

  return (
    <footer id="site-footer" className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* 2 blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* ===== Main Office ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Info */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-5 uppercase tracking-wide">
                {t("main_office.title")}
              </h3>

              <p className="mb-4 leading-relaxed text-white/90">
                {t("main_office.address")}
              </p>

              <div className="space-y-2 mb-6 text-white/90">
                <p className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>
                    {t("main_office.office_hours_label")}:{" "}
                    {t("main_office.office_hours")}
                  </span>
                </p>

                <p className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>
                    {t("main_office.practice_hours_label")}:{" "}
                    {t("main_office.practice_hours")}
                  </span>
                </p>

                <p className="flex items-start gap-3">
                  <Phone className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>{t("main_office.phone")}</span>
                </p>

                <p className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>{t("main_office.email")}</span>
                </p>
              </div>
            </div>

            {/* Map */}
            <GoogleMap title={t("main_office.map_title")} src={MAIN_OFFICE_MAP} />
          </div>

          {/* ===== My Tho Office ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Info */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-5 uppercase tracking-wide">
                {t("my_tho_office.title")}
              </h3>

              <p className="mb-4 leading-relaxed text-white/90">
                {t("my_tho_office.address")}
              </p>

              <div className="space-y-2 mb-6 text-white/90">
                <p className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>{t("my_tho_office.hours")}</span>
                </p>

                <p className="flex items-start gap-3">
                  <Phone className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>{t("my_tho_office.phone")}</span>
                </p>

                <p className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>{t("my_tho_office.email")}</span>
                </p>
              </div>
            </div>

            {/* Map */}
            <GoogleMap title={t("my_tho_office.map_title")} src={MY_THO_OFFICE_MAP} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-blue-700/70 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-center md:text-left text-white/90">
            © {new Date().getFullYear()} {t("copyright")}
          </p>

          <div className="flex gap-6">
            <Link
              href={t("social.facebook_link")}
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-300 transition"
              aria-label="Facebook"
            >
              <Facebook className="w-8 h-8" />
            </Link>

            <Link
              href={t("social.youtube_link")}
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-300 transition"
              aria-label="YouTube"
            >
              <Youtube className="w-8 h-8" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
