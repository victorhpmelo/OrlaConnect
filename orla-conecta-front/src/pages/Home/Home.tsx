import HospedagemCards from "../../components/cards/HospedagemCards/HospedagemCards"
import TravelForm from "../../components/forms/TravelForm/TravelForm"

function Home() {
   return (
    <section className="search-section text-white py-5" style={{ backgroundImage: 'url(/public/img/imgnav.jpg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container bg-dark bg-opacity-50 p-4 rounded">
        <h2 className="mb-4 text-center">Escolha seu destino</h2>
        <TravelForm />
         <HospedagemCards />
      </div>
      
     
    </section>
  )
}
export default Home