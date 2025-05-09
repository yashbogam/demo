import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'DataMaster'; // Default title

    // For custom fonts, you'd fetch the font data here
    // Example: const fontData = await fetch(new URL('../../../../assets/GeistVariableVF.woff2', import.meta.url)).then(res => res.arrayBuffer());
    // This path above is an EXAMPLE and would need to be correct if you place the font file there.

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            fontSize: 60,
            fontWeight: 700,
            color: 'white',
            fontFamily: '"Geist Sans", sans-serif', // Using Geist Sans with fallback
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <div style={{ marginBottom: 30, fontSize: 80 }}>
            DataMaster 🏥
          </div>
          <div
            style={{
              fontSize: 48,
              color: '#BBBBBB',
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // fonts: [
        //   {
        //     name: 'Geist Sans',
        //     data: fontData, // This would be the ArrayBuffer of your font file
        //     style: 'normal',
        //     weight: 700,
        //   },
        // ],
      }
    );
  } catch (e: Error | unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    console.log(`${errorMessage}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 