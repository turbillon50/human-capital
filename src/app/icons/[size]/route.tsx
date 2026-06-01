import { ImageResponse } from "next/og";

export const dynamic = "force-static";

/** Pre-generate the icon sizes referenced by the web manifest. */
export function generateStaticParams() {
  return [{ size: "192" }, { size: "512" }];
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ size: string }> },
) {
  const { size: sizeParam } = await params;
  const size = Number(sizeParam) === 512 ? 512 : 192;
  const r = size * 0.22;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #101d33 0%, #00030c 100%)",
          borderRadius: r,
        }}
      >
        <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 48 48" fill="none">
          <path
            d="M24 3 6 9v13c0 11 7.6 19.6 18 23 10.4-3.4 18-12 18-23V9L24 3Z"
            fill="#2d5dab"
            stroke="#80abfe"
            strokeWidth="1.4"
          />
          <path
            d="m17 24 5 5 9-10"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    { width: size, height: size },
  );
}
