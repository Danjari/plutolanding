import { WaitlistForm } from "@/components/waitlistForm"
import { MeshGradient } from "@paper-design/shaders-react"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      <div className="fixed inset-0 z-0">
        <MeshGradient
          style={{ height: "100vh", width: "100vw" }}
          distortion={0.8}
          swirl={0.1}
          offsetX={0}
          offsetY={0}
          scale={1}
          rotation={0}
          speed={1}
          colors={["hsl(216, 90%, 27%)", "hsl(243, 68%, 36%)", "hsl(205, 91%, 64%)", "hsl(211, 61%, 57%)"]}
        />
      </div>

      <div className="relative z-10">
        {/* Main content */}
        <main className="flex items-center justify-center min-h-screen p-4 my-0">
          <div className="w-full max-w-2xl mx-auto text-center space-y-8">
            {/* Hero section */}
            <div className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-2xl font-sans">
              <h1 className="text-4xl md:text-6xl tracking-tight text-white drop-shadow-2xl py-[23px] font-semibold">
                We are launching Pluto Soon
                <span className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-2xl font-sansking-tight text-white drop-shadow-2xl font-sans">
                  {" "}
                </span>
              </h1>
              <p className="max-w-lg drop-shadow-xl font-body h-auto text-center text-white leading-6 mx-auto px-0 py-0 font-normal text-lg tracking-[0.01em]">
                Turn any YouTube playlist into a structured course and get roasted for skipping lessons. Join our
                waitlist for early access.
              </p>
            </div>

            {/* Waitlist form */}
            <WaitlistForm />

            {/* Footer */}
            <div className="pt-8 text-sm text-white/80 drop-shadow-lg font-body">
              <p>Don&#39;t Worry. We don&#39;t Spam </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
