import satori from 'satori';
import sharp from 'sharp';
import { join } from 'node:path';

let fontData: { regular: ArrayBuffer; bold: ArrayBuffer } | null = null;

async function loadFonts(): Promise<{ regular: ArrayBuffer; bold: ArrayBuffer }> {
  if (fontData) return fontData;

  const [regular, bold] = await Promise.all([
    fetch(
      'https://cdn.jsdelivr.net/fontsource/fonts/lora@latest/latin-400-normal.ttf',
    ).then((r) => r.arrayBuffer()),
    fetch(
      'https://cdn.jsdelivr.net/fontsource/fonts/lora@latest/latin-700-normal.ttf',
    ).then((r) => r.arrayBuffer()),
  ]);

  fontData = { regular, bold };
  return fontData;
}

/**
 * Extract the first markdown image path from post body.
 * Matches ![alt](/images/...) patterns.
 */
export function extractFirstImage(markdown: string): string | null {
  const match = markdown.match(/!\[.*?\]\((.+?)\)/);
  return match ? match[1] : null;
}

async function loadArticleImage(
  imagePath: string,
): Promise<string | null> {
  try {
    const fullPath = join(process.cwd(), 'public', imagePath);
    const resized = await sharp(fullPath)
      .resize(400, 360, { fit: 'cover', position: 'center' })
      .png()
      .toBuffer();
    return `data:image/png;base64,${resized.toString('base64')}`;
  } catch {
    return null;
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
}

function getTitleFontSize(title: string, hasImage: boolean): number {
  const len = title.length;
  if (hasImage) {
    if (len > 55) return 36;
    if (len > 40) return 42;
    return 48;
  }
  if (len > 60) return 42;
  if (len > 40) return 50;
  return 58;
}

function buildElement(
  title: string,
  type: string,
  formattedDate: string,
  imageDataUri: string | null,
) {
  const hasImage = !!imageDataUri;
  const titleFontSize = getTitleFontSize(title, hasImage);

  const textColumn = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center' as const,
        flex: 1,
        paddingRight: hasImage ? '48px' : '0',
      },
      children: [
        // Type + date
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              fontSize: '22px',
              color: '#78716c',
              marginBottom: '16px',
              fontFamily: 'Lora',
            },
            children: `${type} · ${formattedDate}`,
          },
        },
        // Title
        {
          type: 'div',
          props: {
            style: {
              fontSize: `${titleFontSize}px`,
              fontWeight: 700,
              color: '#1c1917',
              lineHeight: 1.15,
              fontFamily: 'Lora',
              marginBottom: '28px',
            },
            children: title,
          },
        },
        // Amber separator
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              width: '60px',
              height: '4px',
              backgroundColor: '#d97706',
              borderRadius: '2px',
              marginBottom: '20px',
            },
          },
        },
        // Author + URL
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              fontSize: '20px',
              color: '#a8a29e',
              fontFamily: 'Lora',
            },
            children: 'Ben Shoemaker · benshoemaker.us',
          },
        },
      ],
    },
  };

  const imageColumn = hasImage
    ? [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center' as const,
              justifyContent: 'center' as const,
              width: '400px',
              height: '360px',
              flexShrink: 0,
              borderRadius: '16px',
              overflow: 'hidden' as const,
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            },
            children: [
              {
                type: 'img',
                props: {
                  src: imageDataUri,
                  width: 400,
                  height: 360,
                },
              },
            ],
          },
        },
      ]
    : [];

  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column' as const,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #faf8f5 0%, #f0ebe3 100%)',
      },
      children: [
        // Main content area
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flex: 1,
              padding: '50px 60px 30px',
              alignItems: 'center' as const,
            },
            children: [textColumn, ...imageColumn],
          },
        },
        // Bottom amber accent bar
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              height: '8px',
              backgroundColor: '#d97706',
            },
          },
        },
      ],
    },
  };
}

export async function generateOgImage(options: {
  title: string;
  type: string;
  date: Date;
  articleImagePath?: string | null;
}): Promise<Buffer> {
  const fonts = await loadFonts();

  let imageDataUri: string | null = null;
  if (options.articleImagePath) {
    imageDataUri = await loadArticleImage(options.articleImagePath);
  }

  const formattedDate = formatDate(options.date);
  const element = buildElement(
    options.title,
    options.type,
    formattedDate,
    imageDataUri,
  );

  const svg = await satori(element as React.ReactNode, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Lora',
        data: fonts.regular,
        weight: 400,
        style: 'normal' as const,
      },
      {
        name: 'Lora',
        data: fonts.bold,
        weight: 700,
        style: 'normal' as const,
      },
    ],
  });

  return sharp(Buffer.from(svg)).png().toBuffer() as Promise<Buffer>;
}
