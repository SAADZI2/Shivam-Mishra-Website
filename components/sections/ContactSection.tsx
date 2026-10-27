import SectionHeading from "../ui/SectionHeading";
import { Clock, MapPin, MessageCircle, Navigation, Phone } from "../ui/icons";
import { site, whatsappLink } from "@/content/site";

export default function ContactSection({ asPageIntro = false }: { asPageIntro?: boolean }) {
  const rows = [
    {
      icon: Phone,
      label: "Helpline / consultation call",
      value: (
        <a href={site.phone.tel} className="whitespace-nowrap hover:text-forest-600">
          {site.phone.display}
        </a>
      ),
    },
    {
      icon: MessageCircle,
      label: "Direct WhatsApp desk",
      value: (
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap hover:text-forest-600">
          {site.phone.display}
        </a>
      ),
    },
    { icon: MapPin, label: "Clinic address", value: site.address.full },
    { icon: Clock, label: "Consultation timings", value: site.hours },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="shell">
        {!asPageIntro && (
          <SectionHeading
            title="Visit our Mumbai clinic"
            lead="Conveniently located in Bandra West, Mumbai. In-clinic consultations and Panchakarma therapies conducted daily by prior appointment."
          />
        )}

        <div className={`grid gap-6 lg:grid-cols-12 ${asPageIntro ? "" : "mt-14"}`}>
          <div className="flex flex-col rounded-[1.75rem] bg-white p-7 ring-1 ring-line sm:p-9 lg:col-span-5" data-reveal>
            <h3 className="font-display text-[1.75rem] leading-tight text-forest-950">{site.name}</h3>
            <p className="mt-1 text-sm font-semibold text-gold-ink">{site.role}</p>

            <dl className="mt-8 space-y-6">
              {rows.map((r) => (
                <div key={r.label} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mint text-forest-800">
                    <r.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <dt className="text-sm text-muted">{r.label}</dt>
                    <dd className="mt-0.5 font-semibold leading-snug text-ink">{r.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-auto grid grid-cols-1 gap-2.5 pt-9 sm:grid-cols-3">
              <a href={site.phone.tel} className="btn btn-forest w-full px-4">
                <Phone />
                Call now
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full px-4">
                <MessageCircle />
                WhatsApp
              </a>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline w-full px-4">
                <Navigation />
                Directions
              </a>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] bg-sand ring-1 ring-line lg:col-span-7" data-reveal>
            <iframe
              title="Map showing Dr Shivam Mishra Ayurveda clinic in Bandra West, Mumbai"
              src={site.mapEmbedUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
