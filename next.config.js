// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn2.thecatapi.com', // ¡Este es el dominio correcto para las imágenes de The Cat API!
        pathname: '/images/**', // No es necesario, las imágenes están directamente en la raíz de cdn2.thecatapi.com
      },
    ]
  }
}

module.exports = nextConfig