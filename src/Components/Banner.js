import B1 from '../Images/banner1.png';
import B2 from '../Images/banner2.png';
import B3 from '../Images/banner3.jpg';
export function Banner(){
    return(
<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={B1} class="d-block w-100" alt="..." style={{width:'100%',height:'500px'}}/>
    </div>
    <div class="carousel-item">
      <img src={B2} class="d-block w-100" alt="..." style={{width:'100%',height:'500px'}}/>
    </div>
    <div class="carousel-item">
      <img src={B3} class="d-block w-100" alt="..." style={{width:'100%',height:'500px'}}/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

    )
}