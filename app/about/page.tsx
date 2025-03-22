import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { PhoneCall, Mail, MapPin, ArrowRight, Users, Award, Clock, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-24 lg:pt-32 border-b">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center" />
        <div className="container relative z-20 px-4 md:px-6 py-12 md:py-20 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">About Modia Properties</h1>
            <p className="text-lg text-white/90 mb-6">
              Your trusted real estate consultant in Abuja, providing premium landed property solutions
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-modia-red/10 px-4 py-1.5 rounded-full text-modia-red font-medium text-sm mb-4">
                OUR STORY
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Committed to Excellence in Real Estate</h2>
              <p className="text-gray-600 mb-6">
                Modia Properties is a premier real estate consultant based in Abuja, Nigeria. We specialize in helping
                clients find their dream landed properties across the most sought-after locations in the city.
              </p>
              <p className="text-gray-600 mb-6">
                Founded with a vision to transform the real estate experience, we combine industry expertise with
                personalized service to ensure our clients make informed decisions about their property investments.
              </p>
              <p className="text-gray-600 mb-6">
                Our team of dedicated professionals is committed to understanding your unique needs and preferences,
                guiding you through every step of your real estate journey with transparency and integrity.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-modia-red rounded-tl-xl z-0" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-modia-red rounded-br-xl z-0" />
              <div className="relative z-10 bg-white p-4 shadow-xl rounded-xl">
                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden">
                  <Image
                    src="/images/estate-view.png"
                    alt="Modia Properties Estate"
                    width={600}
                    height={450}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-modia-red/10 px-4 py-1.5 rounded-full text-modia-red font-medium text-sm mb-4">
              OUR VALUES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Sets Us Apart</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              At Modia Properties, our core values guide everything we do, ensuring we deliver exceptional service and
              results for our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-modia-red/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-modia-red" />
              </div>
              <h3 className="text-xl font-bold mb-2">Client-Centered</h3>
              <p className="text-gray-600">
                We put our clients' needs first, providing personalized service tailored to your unique requirements.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-modia-red/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-modia-red" />
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our service, from property selection to client
                communication.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-modia-red/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-modia-red" />
              </div>
              <h3 className="text-xl font-bold mb-2">Efficiency</h3>
              <p className="text-gray-600">
                We value your time and work efficiently to help you find the perfect property without unnecessary
                delays.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-modia-red/10 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-modia-red" />
              </div>
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-gray-600">
                We operate with transparency and honesty, ensuring you have all the information needed to make informed
                decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-block bg-modia-red/10 px-4 py-1.5 rounded-full text-modia-red font-medium text-sm mb-4">
                  GET IN TOUCH
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Find Your Dream Property?</h2>
                <p className="text-gray-600 mb-6">
                  Contact us today to schedule a consultation with one of our real estate experts. We're here to help
                  you find the perfect landed property that meets your needs and preferences.
                </p>
                <div>
                  <Link
                    href={`https://wa.me/2348039743274?text=${encodeURIComponent(
                      "Hello Modia Properties, I'm interested in learning more about your properties. Can you help me?",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-modia-red hover:bg-modia-red/90 text-white">
                      Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-auto">
                <Image src="/images/estate-view.png" alt="Estate View" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-950 text-white py-12">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/116428749_150444476706619_5091404093001730072_n-removebg-preview-ByRF9g5S06sxPDyGyps3yHxXdVaZCb.png"
                  alt="Modia Properties Logo"
                  width={150}
                  height={60}
                  className="h-12 w-auto"
                />
              </Link>
              <p className="text-gray-400">
                Your trusted real estate consultant in Abuja, providing premium property solutions.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/properties" className="text-gray-400 hover:text-white transition-colors">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Properties</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/properties?location=kuje" className="text-gray-400 hover:text-white transition-colors">
                    Kuje Home City
                  </Link>
                </li>
                <li>
                  <Link href="/properties?location=modia" className="text-gray-400 hover:text-white transition-colors">
                    Modia Estate Phase 4
                  </Link>
                </li>
                <li>
                  <Link href="/properties?location=koko" className="text-gray-400 hover:text-white transition-colors">
                    KOKO Court Galadimawa
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-modia-red shrink-0 mt-0.5" />
                  <span className="text-gray-400">Area 11, Suit A06, Al-maliha Commercial Complex, Abuja</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-modia-red" />
                  <a
                    href="mailto:modiapropertiesnigeria@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    modiapropertiesnigeria@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <PhoneCall className="h-5 w-5 text-modia-red" />
                  <a href="tel:+2348039743274" className="text-gray-400 hover:text-white transition-colors">
                    +234 803 974 3274
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Modia Properties. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

