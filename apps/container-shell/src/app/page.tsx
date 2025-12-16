// import { Button, Card } from '@pwa-easy-rental/shared-ui';

// export default function Home() {
//   return (
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-secondary-900 mb-4">
//             Welcome to Easy Rental
//           </h1>
//           <p className="text-lg text-secondary-600">
//             Your one-stop platform for easy rental management
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           <Card className="text-center hover:shadow-lg transition-shadow">
//             <div className="mb-4">
//               <span className="text-4xl">👤</span>
//             </div>
//             <h2 className="text-xl font-semibold text-secondary-800 mb-2">
//               Client Portal
//             </h2>
//             <p className="text-secondary-600 mb-4">
//               Browse rentals, make bookings, and manage your reservations.
//             </p>
//             <a href="/client">
//               <Button variant="primary">Go to Client Portal</Button>
//             </a>
//           </Card>

//           <Card className="text-center hover:shadow-lg transition-shadow">
//             <div className="mb-4">
//               <span className="text-4xl">🏢</span>
//             </div>
//             <h2 className="text-xl font-semibold text-secondary-800 mb-2">
//               Agency Dashboard
//             </h2>
//             <p className="text-secondary-600 mb-4">
//               Manage your rental listings, bookings, and customer relationships.
//             </p>
//             <a href="/agency">
//               <Button variant="primary">Go to Agency Dashboard</Button>
//             </a>
//           </Card>

//           <Card className="text-center hover:shadow-lg transition-shadow">
//             <div className="mb-4">
//               <span className="text-4xl">🏛️</span>
//             </div>
//             <h2 className="text-xl font-semibold text-secondary-800 mb-2">
//               Organisation Hub
//             </h2>
//             <p className="text-secondary-600 mb-4">
//               Oversee multiple agencies, analytics, and system settings.
//             </p>
//             <a href="/organisation">
//               <Button variant="primary">Go to Organisation Hub</Button>
//             </a>
//           </Card>
//         </div>

//         <div className="mt-12 text-center">
//           <Card className="inline-block">
//             <h3 className="text-lg font-semibold text-secondary-800 mb-2">
//               ✨ Works Offline
//             </h3>
//             <p className="text-secondary-600">
//               This app supports offline mode. Your data syncs automatically when
//               you&apos;re back online.
//             </p>
//           </Card>
//         </div>
//       </div>
//   );
// }
import React from 'react';
import { Star, User, Building, Briefcase, CheckCircle, Shield, RotateCcw, MapPin} from 'lucide-react';
import { SatisfiedEntity } from '@/components/satisfiedEntity';
import { ServiceCard } from '@/components/serviceCard';
import { Button } from '@/components/button';
import { VehicleCard } from '@/components/vehicleCard';
import { Feature } from '@/components/feature';

// --- COMPONENTS ---

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="text-center mb-12">
    {subtitle && <p className="text-orange-500 font-medium uppercase tracking-wide mb-2">{subtitle}</p>}
    <h2 className="text-3xl md:text-4xl font-bold text-blue-700">{title}</h2>
    <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
  </div>
);


// --- MAIN PAGE ---

export default function Home() {
  const services = [
            { title: "Vehicle Reservation", desc: "With this app, a customer can book a vehicle, all type of vehicle: car, motorcycle, truck.", img: "/vehicle-service.avif" },
            { title: "Booking A Driver", desc: "With this app, a customer should be able to book a driver with a car when he cannot drive it.", img: "/driver-service.webp" },
            { title: "Management of Agency", desc: "With this app, when you have an agency, you can be our partner by signing in your agency.", img: "/agency-service.jpg" },
          ]
  const features = [
                { icon: <CheckCircle className="w-10 h-10 text-orange-500"/>, title: "Easy Rent", text: "Rent a car at our rental with an easy and fast process without disturbing your productivity." },
                { icon: <Star className="w-10 h-10 text-orange-500"/>, title: "Premium Quality", text: "Our cars are always maintained engine health and cleanliness to provide a more comfortable driving experience." },
                { icon: <User className="w-10 h-10 text-orange-500"/>, title: "Professional Agent", text: "You can ask your travel companion to escort and guide your journey." },
                { icon: <Shield className="w-10 h-10 text-orange-500"/>, title: "Car Safety", text: "We guarantee the safety of the engine on the car always running well with regular checks." },
                { icon: <RotateCcw className="w-10 h-10 text-orange-500"/>, title: "Refund", text: "Our service guarantee provides a money back opportunity if the car does not match the information provided." },
                { icon: <MapPin className="w-10 h-10 text-orange-500"/>, title: "Live Monitoring", text: "Our service provides direct customer monitoring to monitor trips in terms of safety and comfort." },
            ]
  const satisfiedClients = [
                { name: "M. Cyrille Tchadeu", text: "Je cherchais une voiture de location avec chauffeur à Douala pour un entretien et je ne connaissais personne mais grâce à ce site j'ai pu en trouver une.", rating:5 },
                { name: "M. Avom Samuel", text: "Très simple d'utilisation on s'y retrouve facilement. Service impeccable.", rating: 1 },
                { name: "Mlle. Danwe Kagou", text: "Cette application a changé ma vie. Grâce à elle, chaque matin, je m'en vais au travail sans stress car une voiture est toujours prête.", rating:4 },
            ];
  const satisfiedAgencies = [
      { name: "JCD SARL", text: "En tant que concessionnaire, j'ai eu à confier mes véhicules aux gestionnaires de cette application et je n'ai pas été déçu. Bonne gestion.", rating:3 },
      { name: "M. Yannick SIYAPZE", text: "Ils gèrent plusieurs de mes véhicules, et sont devenus des partenaires financiers fiables.", rating: 2 },
      { name: "Hotel LE CONFORT", text: "Lorsque nous voulons des véhicules pour nos clients, cette entreprise se montre toujours prompte et efficace.", rating: 5 },
  ];
  return (
    <main className="min-h-screen font-sans text-slate-800 bg-gray-50">
      
      {/* 1. NAVBAR (Based on PDF Page 1) */}
      {/* <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">EASY-<span className="text-orange-500">RENT</span></div>
          
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-1/3">
            <Search className="text-gray-400 w-5 h-5" />
            <input type="text" placeholder="Search here" className="bg-transparent border-none outline-none ml-2 w-full text-sm" />
          </div>

          <div className="hidden md:flex space-x-6 font-medium text-slate-700">
            <a href="#" className="text-blue-600 border-b-2 border-blue-600">Home</a>
            <a href="#" className="hover:text-blue-600">Cars</a>
            <a href="#" className="hover:text-blue-600">Agencies</a>
            <a href="#" className="hover:text-blue-600">Help</a>
          </div>

          <div className="flex space-x-3">
            <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"><Heart size={20}/></button>
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div> 
          </div>
        </div>
      </nav> */}

      {/* 2. HERO (Based on PDF Page 1 & 6) */}
      <section className="bg-blue-600 text-white pt-10 pb-14 relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Rent your dream car <br/> in a click.
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg">
              You can rent all type of vehicle and for many occasions. And in many agencies directly from your home.
            </p>
            <Button variant="primary">Join Us Now</Button>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 relative">
            {/* Image Placeholder mimicking the red BMW/Toyota */}
            {/* <div className="w-full h-64 md:h-full relative">
                 <Image src="/hero_car.png" alt="Dream Car" fill className="object-contain w-full h-full drop-shadow-2xl transform md:scale-125 md:translate-x-10" />
            </div> */}
          </div>
        </div>
      </section>

       {/* 4. WHO WE ARE (Based on PDF Page 19) */}
      <section className="bg-blue-50 py-20">
        <SectionTitle title="About Us" subtitle="Who we are" />
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-2">
          <div className="md:w-2/3 px-4">
            <p className=" mb-8 ">
              {"Easy-rent est une application de location des véhicules d'une part et de gestion des agences de véhicules d’une autre part."}
            </p>
            
          </div>
          <div className="md:w-1/3 grid grid-cols-2 gap-4">
             {"We pride ourselves on:"}
          </div>
        </div>
      </section>

      {/* 4. OUR SERVICES (Based on PDF Page 11) */}
      <section className="py-20 container mx-auto px-4">
        <SectionTitle title="Our Services" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={idx} title={service.title} description={service.desc} img={service.img} />
          ))}
        </div>
      </section>

      {/* 5. FEATURED VEHICLES (Based on PDF Page 2 & 17) */}
      <section className="py-20 container mx-auto px-4">
        <SectionTitle title="Featured Vehicles" subtitle="Our Flagship" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <VehicleCard key={item} img="" title="" description="" />
          ))}
        </div>
        <div className="text-center mt-10">
             <a href="/client/vehicles"><Button variant="primary">View More</Button></a>
        </div>
      </section>

      {/* 6. ROLE: CLIENT (Specific Request) */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
            <User className="w-16 h-16 mx-auto mb-4 text-orange-500" />
            <h2 className="text-3xl font-bold mb-4">I am a Client</h2>
            <p className="mb-8 max-w-2xl mx-auto text-gray">Find the perfect vehicle for your trip easily and quickly. Secure payment and 24/7 support.</p>
            <Button variant="primary" className="text-lg px-10"><a href="/client" target="_blank">Book a Car</a></Button>
        </div>
      </section>

      {/* 7. OUR AGENCIES (Based on PDF Page 12) */}
      <section className="py-20 container mx-auto px-4 bg-white">
        <SectionTitle title="Our Quality Agencies" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition">
                    <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-blue-600">
                        <Building />
                    </div>
                    <h4 className="font-bold text-lg text-blue-900 mb-2">Company Name</h4>
                    <p className="text-sm text-gray-500 mb-4">{"C'est une agence de livraison des vivres."}</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-xs text-gray-400">Douala</span>
                        <button className="bg-orange-500 text-white text-xs px-3 py-1 rounded">View More</button>
                    </div>
                </div>
            ))}
        </div>
        <div className="text-center mt-10">
             <a href="/client/agencies"><Button variant="primary">View More</Button></a>
        </div>
      </section>

      {/* 8. ROLE: AGENT (Specific Request) */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
            <Briefcase className="w-16 h-16  mx-auto text-secondary" />
            <h2 className="text-3xl font-bold mb-4">I am an Agent</h2>   
            <p className="text-blue-100 text-lg">Join our network of professional agents. Manage rentals and earn commissions.</p>
            <div className="flex gap-4 align-center justify-center mt-8">
                <a href="/agency" target="_blank"><Button variant="primary">Work Now</Button></a>
                <a href="/agency" target="_blank"><Button variant="outline">Connect</Button></a>
            </div>
        </div>
      </section>

      {/* 9. WHY CHOOSE US (Based on PDF Page 25) */}
      <section className="py-20 container mx-auto px-4">
        <SectionTitle title="Why Choose Us?" subtitle="Our Advantages" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((item, idx) => (
                <Feature key={idx} icon= {item.icon} title={item.title} description={item.text} />
            ))}
        </div>
      </section>

      {/* 10. ROLE: ORGANIZATION (Specific Request) */}
      <section className="bg-gray-800 text-white py-16 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gray-700 rounded-full -mr-32 -mt-32 opacity-50"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
            <Building className="w-16 h-16 mx-auto mb-4 text-blue-400" />
            <h2 className="text-3xl font-bold mb-4">I am an Organization</h2>
            <p className="mb-8 max-w-2xl mx-auto text-gray-400">Manage your fleet, track expenses, and optimize your logistics with our dedicated dashboard.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/organisation" target="_blank"><Button variant="primary">Become an Organization</Button></a>
                <a href="/organisation" target="_blank"><Button variant="outline">Go on Dashboard</Button></a>
            </div>
        </div>
      </section>

      {/* 11. RENT A CAR NOW (Banner) */}
      {/* <section className="py-24 bg-secondary text-white text-center">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-6">Ready to hit the road?</h2>
            <p className="text-xl mb-8 opacity-90">{"Don't wait any longer. Find your ideal car today."}</p>
            <Button className="bg-white text-orange-600 hover:bg-gray-100 px-12 py-4 text-lg shadow-xl">Rent a Car Now</Button>
        </div>
      </section> */}

      {/* 12. SATISFIED CLIENTS (Based on PDF Page 20) */}
      <section className="py-20 container mx-auto px-4 bg-blue-50">
        <SectionTitle title="Satisfied Clients" subtitle="Testimonials" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {satisfiedClients.map((client, idx) => (
                <SatisfiedEntity key={idx} name={client.name} text={client.text} rating={client.rating} />
            ))}
        </div>
      </section>

       {/* 13. SATISFIED AGENCIES (Based on PDF Page 22) */}
       <section className="py-20 container mx-auto px-4">
        <SectionTitle title="Satisfied Agencies" subtitle="Partners" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {satisfiedAgencies.map((agency, idx) => (
                <SatisfiedEntity key={idx} name={agency.name} text={agency.text} rating={agency.rating} />
            ))}
        </div>
      </section>

      {/* 14. PERFORMANCE (Based on PDF Page 24) */}
      <section className="bg-primary text-white py-10">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Performance</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                    { val: "10000 +", label: "Cars" },
                    { val: "150 +", label: "Companies" },
                    { val: "1M +", label: "Users" },
                    { val: "1000 +", label: "Drivers" },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-blue-700/50 p-6 rounded-xl backdrop-blur-sm border border-blue-500">
                        <div className="text-4xl font-bold mb-2">{stat.val}</div>
                        <div className="text-blue-200">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 15. DON'T BE LATE (Recap Section) */}
      <section className="py-4 container mx-auto px-4 bg-gray-50">
        <SectionTitle title="Don't Be Late" subtitle="Start Now" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Client Recap */}
            <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
                <User className="w-12 h-12 text-gray-700 mb-4" />
                <h3 className="text-xl font-bold mb-4">You need a car?</h3>
                <p className="text-gray-500 text-center mb-8 flex-grow">Book instantly and enjoy your trip.</p>
                <a href="/client" target="_blank"><Button variant="primary" className="w-full">Rent a car</Button></a>
            </div>
            
            {/* Agent Recap */}
            <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
                <Briefcase className="w-12 h-12 text-gray-700 mb-4" />
                <h3 className="text-xl font-bold mb-4">Looking for work?</h3>
                <p className="text-gray-500 text-center mb-8 flex-grow">Connect as an agent and manage rentals.</p>
                <a href="/agency" target="_blank"><Button variant="secondary" className="w-full">Agent Space</Button></a>
            </div>

            {/* Org Recap */}
            <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
                <Building className="w-12 h-12 text-gray-700 mb-4" />
                <h3 className="text-xl font-bold mb-4">Fleet Manager?</h3>
                <p className="text-gray-500 text-center mb-8 flex-grow">Digitize your agency with our tools.</p>
                <a href="/organisation" target="_blank"><Button className="w-full bg-slate-800 text-white hover:bg-slate-900">Organization</Button></a>
            </div>
        </div>
      </section>

    </main>
  );
}