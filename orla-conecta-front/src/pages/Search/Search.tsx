import 'bootstrap/dist/css/bootstrap.min.css'
import HotelCards from '../../components/cards/HotelCard/HotelCard';
import FiltersSection from '../../components/Filters/FiltersSection/FiltersSection';



function SearchSection() {
  return (
    <section
      className="container-fluid text-white py-5"
      style={{
        backgroundImage: "url(/img/imgnav.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="row">
        <div className="col-md-3 px-4">
          <FiltersSection />
         
          <hr className="my-4 text-white" />
        </div>
         <div className="col-md-9 px-4">
        
          <HotelCards />
          <hr className="my-4 text-white" />
        </div>
      </div>
    </section>
  )
}

export default SearchSection
