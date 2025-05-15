import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has('title');
    const pageTitle = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'High-Quality Medical Datasets'; // Default page title if not provided

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
            backgroundColor: '#0a2463', // Dark blue from WavyBackground
            color: 'white',
            fontFamily: 'sans-serif', // Using a common sans-serif, ensure Geist is loaded if used
            padding: '60px', // Increased padding
            textAlign: 'center',
          }}
        >
          {/* Top Branding */}
          <div style={{ position: 'absolute', top: '40px', left: '40px', fontSize: 30, display: 'flex', alignItems: 'center' }}>
            DataMaster ��
          </div>

          {/* Main Hero Heading */}
          <div
            style={{
              fontSize: 72, // Larger font size for main heading
              fontWeight: 'bold', // Bold
              marginBottom: '25px',
              lineHeight: '1.2',
            }}
          >
            Comprehensive Medical Datasets for Research & Developers
          </div>

          {/* Sub-description */}
          <div
            style={{
              fontSize: 38, // Adjusted font size for description
              color: '#E0E0E0', // Lighter color for subheading
              maxWidth: '900px', // Max width for readability
              marginBottom: '40px',
              lineHeight: '1.5',
            }}
          >
            Access high-quality healthcare data to accelerate your medical research, analytics, and machine learning projects.
          </div>
          
          {/* Page Title from params - smaller at the bottom */}
          {hasTitle && (
            <div
              style={{
                fontSize: 28,
                color: '#A0A0A0',
                position: 'absolute',
                bottom: '40px',
              }}
            >
              {pageTitle}
            </div>
          )}
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
    console.log(`Failed to generate OG image: ${errorMessage}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 