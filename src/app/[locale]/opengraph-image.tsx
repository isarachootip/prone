import { ImageResponse } from "next/og";

export const alt = "PR One Network — Tech Event & PR Agency";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Design token equivalents for Next.js Satori canvas (Satori cannot read external CSS variables)
const OG_THEME = {
  background: "#08090c", // token-ok: next/og satori canvas requirement
  dotPattern: "#1a1c24", // token-ok: next/og satori canvas requirement
  foreground: "#ffffff", // token-ok: next/og satori canvas requirement
  muted: "#a1a1aa", // token-ok: next/og satori canvas requirement
  border: "#27272a", // token-ok: next/og satori canvas requirement
  cardBg: "#121318", // token-ok: next/og satori canvas requirement
  primary: "#c6ff00", // token-ok: next/og satori canvas requirement
};

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const isThai = locale === "th";
  const headline = isThai
    ? "Tech Event & PR ระดับแนวหน้าในประเทศไทย"
    : "Bangkok's Premier Tech Event & PR Agency";
  const subline = isThai
    ? "ขับเคลื่อนความสำเร็จขององค์กรและแบรนด์เทคโนโลยีระดับโลก ก่อตั้งปี 2004"
    : "Bridging global technology leaders with enterprise decision-makers since 2004";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: OG_THEME.background,
          padding: "70px 80px",
          color: OG_THEME.foreground,
        }}
      >
        {/* Header Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "9999px",
              backgroundColor: OG_THEME.primary,
            }}
          />
          <span
            style={{
              fontSize: "32px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: OG_THEME.foreground,
            }}
          >
            PR One Network
          </span>
          <span
            style={{
              fontSize: "16px",
              letterSpacing: "0.15em",
              color: OG_THEME.muted,
              textTransform: "uppercase",
              marginLeft: "12px",
              padding: "6px 14px",
              borderRadius: "9999px",
              border: `1px solid ${OG_THEME.border}`,
              backgroundColor: OG_THEME.cardBg,
            }}
          >
            Est. 2004
          </span>
        </div>

        {/* Center Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "980px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: OG_THEME.foreground,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              fontSize: "24px",
              lineHeight: 1.4,
              color: OG_THEME.muted,
              maxWidth: "850px",
            }}
          >
            {subline}
          </div>
        </div>

        {/* Footer Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${OG_THEME.border}`,
            paddingTop: "28px",
          }}
        >
          <div style={{ display: "flex", gap: "32px", fontSize: "16px", color: OG_THEME.muted }}>
            <span>Summit & Conferences</span>
            <span>·</span>
            <span>Executive Roadshows</span>
            <span>·</span>
            <span>PR & Media Relations</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: OG_THEME.primary,
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            <span>prone.network</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
