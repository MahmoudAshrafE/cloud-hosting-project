'use client';

export default function GlobalNotFound() {
    return (
        <html lang="en">
            <body style={{
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                background: '#020617',
                color: 'white',
                fontFamily: 'sans-serif'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '5rem', margin: 0 }}>404</h1>
                    <p style={{ fontSize: '1.5rem', opacity: 0.7 }}>Page Not Found</p>
                    <a href="/" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>
                        Return Home
                    </a>
                </div>
            </body>
        </html>
    );
}
