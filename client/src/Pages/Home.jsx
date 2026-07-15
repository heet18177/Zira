import Pricing from "@/Components/Pricing"
import Hero from "../Components/Hero"
import Navabar from "../Components/Navabar"
import Tools from "../Components/Tools"
import Footer from "@/Components/Footer"


const Home = () => {
  return (
    <div className="bg-[#f0f9ff] min-h-screen flex flex-col">
        <Navabar/>
        <main className="flex-grow">
          <Hero/>
          <Tools/>
          <Pricing/>
          <Footer/>
        </main>
    </div>
  )
}

export default Home