import CMSMap from "./components/CMSMap/CMSMap";
import "mapbox-gl/dist/mapbox-gl.css";
import "./components/CMSMap/CMSMap.css";
const mapKey = import.meta.env.VITE_MAP_KEY;

const SlotExmaple = () => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<div slot="MarkersCollection"><div class="w-dyn-list"><div role="list" class="w-dyn-items"><div role="listitem" class="w-dyn-item"><div data-lng="-83.507" data-lat="35.6532" class="marker-pin"><div class="maker-pop-up"><img src="https://cdn.prod.website-files.com/693804a804d7d9530e01df9c/693804c60caefc8ba5b3415b_image15.jpeg" loading="eager" alt="Great Smoky Mountains" class="marker-popup-img"><p class="marker-popup-heading">Great Smoky Mountains</p><p>The Great Smoky Mountains National Park is located on the border between North Carolina and Tennessee. It is famous for its biodiversity, scenic views, and rich Appalachian culture, making it a popular destination for outdoor enthusiasts.</p></div></div></div><div role="listitem" class="w-dyn-item"><div data-lng="-115.1398" data-lat="36.1699" class="marker-pin"><div class="maker-pop-up"><img src="https://cdn.prod.website-files.com/693804a804d7d9530e01df9c/693804c60caefc8ba5b3416c_image2.jpeg" loading="eager" alt="Las Vegas" class="marker-popup-img"><p class="marker-popup-heading">Las Vegas</p><p>Las Vegas is a world-renowned resort city known for its vibrant nightlife, casinos, and entertainment options. Visitors can enjoy shows, fine dining, and a variety of attractions along the famous Las Vegas Strip.</p></div></div></div><div role="listitem" class="w-dyn-item"><div data-lng="-74.006" data-lat="40.7128" class="marker-pin"><div class="maker-pop-up"><img src="https://cdn.prod.website-files.com/693804a804d7d9530e01df9c/693804c60caefc8ba5b3416f_image17.jpeg" loading="eager" alt="New York City" class="marker-popup-img"><p class="marker-popup-heading">New York City</p><p>New York City, often referred to as NYC, is a bustling metropolis known for its iconic skyline, diverse culture, and vibrant arts scene. Attractions include Times Square, Central Park, and the Empire State Building.</p></div></div></div><div role="listitem" class="w-dyn-item"><div data-lng="-156.3319" data-lat="20.7984" class="marker-pin"><div class="maker-pop-up"><img src="https://cdn.prod.website-files.com/693804a804d7d9530e01df9c/693804c60caefc8ba5b34175_image1.jpeg" loading="eager" alt="Maui" class="marker-popup-img"><p class="marker-popup-heading">Maui</p><p>Maui is the second-largest island in Hawaii, known for its stunning beaches, lush landscapes, and vibrant culture. Visitors can enjoy activities such as snorkeling, hiking in Haleakalā National Park, and exploring the scenic Road to Hana.</p></div></div></div><div role="listitem" class="w-dyn-item"><div data-lng="-117.919" data-lat="33.8121" class="marker-pin"><div class="maker-pop-up"><img src="https://cdn.prod.website-files.com/693804a804d7d9530e01df9c/693804c60caefc8ba5b34163_image4.jpeg" loading="eager" alt="Disneyland" class="marker-popup-img"><p class="marker-popup-heading">Disneyland</p><p>Disneyland is a world-famous theme park located in Anaheim, California. It is known as 'The Happiest Place on Earth' and features attractions based on Disney characters and stories, making it a favorite destination for families.</p></div></div></div><div role="listitem" class="w-dyn-item"><div data-lng="-122.4783" data-lat="37.8199" class="marker-pin"><div class="maker-pop-up"><img src="https://cdn.prod.website-files.com/693804a804d7d9530e01df9c/693804c60caefc8ba5b34169_image16.jpeg" loading="eager" alt="Golden Gate Bridge" class="marker-popup-img"><p class="marker-popup-heading">Golden Gate Bridge</p><p>The Golden Gate Bridge is an iconic suspension bridge that spans the Golden Gate Strait, connecting San Francisco to Marin County. It is known for its stunning Art Deco design and vibrant International Orange color.</p></div></div></div><div role="listitem" class="w-dyn-item"><div data-lng="-79.0377" data-lat="43.0962" class="marker-pin"><div class="maker-pop-up"><img src="https://cdn.prod.website-files.com/693804a804d7d9530e01df9c/693804c60caefc8ba5b3415e_image7.jpeg" loading="eager" alt="Niagara Falls" class="marker-popup-img"><p class="marker-popup-heading">Niagara Falls</p><p>Niagara Falls is a group of three waterfalls located on the border between the United States and Canada. It is renowned for its beauty and is a popular destination for tourists seeking adventure and natural beauty.</p></div></div></div><div role="listitem" class="w-dyn-item"><div data-lng="-74.0445" data-lat="40.6892" class="marker-pin"><div class="maker-pop-up"><img src="https://cdn.prod.website-files.com/693804a804d7d9530e01df9c/693804c60caefc8ba5b34158_image8.jpeg" loading="eager" alt="Statue of Liberty" class="marker-popup-img"><p class="marker-popup-heading">Statue of Liberty</p><p>The Statue of Liberty is a symbol of freedom and democracy located on Liberty Island in New York Harbor. This colossal statue was a gift from France and has welcomed millions of immigrants arriving by sea.</p></div></div></div><div role="listitem" class="w-dyn-item"><div data-lng="-110.5885" data-lat="44.428" class="marker-pin"><div class="maker-pop-up"><img src="https://cdn.prod.website-files.com/693804a804d7d9530e01df9c/693804c60caefc8ba5b34166_image4.jpeg" loading="eager" alt="Yellowstone National Park" class="marker-popup-img"><p class="marker-popup-heading">Yellowstone National Park</p><p>Yellowstone National Park, established in 1872, is the first national park in the United States. It is famous for its geothermal features, including the iconic Old Faithful geyser, and diverse wildlife such as bison and grizzly bears.</p></div></div></div><div role="listitem" class="w-dyn-item"><div data-lng="-112.1129" data-lat="36.1069" class="marker-pin"><div class="maker-pop-up"><img src="https://cdn.prod.website-files.com/693804a804d7d9530e01df9c/693804c60caefc8ba5b34172_image1.jpeg" loading="eager" alt="Grand Canyon" class="marker-popup-img"><p class="marker-popup-heading">Grand Canyon</p><p>The Grand Canyon is a breathtaking natural wonder located in Arizona. It is known for its stunning vistas, unique geological formations, and rich history. Visitors can explore various trails, take guided tours, and enjoy breathtaking views from the rim.</p></div></div></div></div></div></div>`,
      }}
    ></div>
  );
};
function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <CMSMap
        mapKey={mapKey}
        centerLat={-98.5795}
        centerLng={39.8283}
        zoom={3}
        fitBounds={true}
        fitBoundsPadding={50}
        fitBoundsMaxZoom={15}
        controlsVerticalPadding={100}
        controlsHorizontalPadding={100}
        MarkersCollection={<SlotExmaple />}
      />
    </div>
  );
}

export default App;
