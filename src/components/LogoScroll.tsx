import type React from "react"
import Image from "next/image"

const LogoScroll: React.FC = () => {
  const logos = [
    {
      name: "Microsoft",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-22%20at%202.46.41%E2%80%AFAM-9Tid8PfNL8BXEIN5sz5zAJ4pR4MPRd.png#microsoft",
    },
    {
      name: "Tesla",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-22%20at%202.46.41%E2%80%AFAM-9Tid8PfNL8BXEIN5sz5zAJ4pR4MPRd.png#tesla",
    },
    {
      name: "Adobe",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-22%20at%202.46.41%E2%80%AFAM-9Tid8PfNL8BXEIN5sz5zAJ4pR4MPRd.png#adobe",
    },
    {
      name: "Square",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-22%20at%202.46.41%E2%80%AFAM-9Tid8PfNL8BXEIN5sz5zAJ4pR4MPRd.png#square",
    },
    {
      name: "Netflix",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-22%20at%202.46.41%E2%80%AFAM-9Tid8PfNL8BXEIN5sz5zAJ4pR4MPRd.png#netflix",
    },
    {
      name: "Google",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-22%20at%202.46.41%E2%80%AFAM-9Tid8PfNL8BXEIN5sz5zAJ4pR4MPRd.png#google",
    },
    {
      name: "BBC",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-22%20at%202.46.41%E2%80%AFAM-9Tid8PfNL8BXEIN5sz5zAJ4pR4MPRd.png#bbc",
    },
    {
      name: "AOL",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-22%20at%202.46.41%E2%80%AFAM-9Tid8PfNL8BXEIN5sz5zAJ4pR4MPRd.png#aol",
    },
  ]

  return (
    <div className="w-full overflow-hidden bg-black relative">
      <div className="flex animate-scroll">
        {/* First set of logos */}
        <div className="flex space-x-16 items-center whitespace-nowrap">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center justify-center h-20">
              <Image
                src="/placeholder.svg?height=32&width=120"
                alt={`${logo.name} logo`}
                width={120}
                height={32}
                className="opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
        {/* Duplicate set of logos for seamless loop */}
        <div className="flex space-x-16 items-center whitespace-nowrap">
          {logos.map((logo) => (
            <div key={`${logo.name}-duplicate`} className="flex items-center justify-center h-20">
              <Image
                src="/placeholder.svg?height=32&width=120"
                alt={`${logo.name} logo`}
                width={120}
                height={32}
                className="opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LogoScroll

