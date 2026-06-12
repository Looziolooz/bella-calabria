// Mock "Airbnb-style" accommodations across Calabria.
// Images reuse verified Wikimedia photos (they double as the stay's view).

// Coherent set of bright modern interiors (+ one villa pool) so every
// listing looks like a real holiday home in a consistent style.
const POOL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Villa_Miragalli_infinity_swimminh_pool.jpg/1280px-Villa_Miragalli_infinity_swimminh_pool.jpg";
const LIVING1 =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Modern_living_room_with_stylish_furniture_and_a_view_of_the_outdoors_in_a_cozy_apartment_setting.jpg/1280px-Modern_living_room_with_stylish_furniture_and_a_view_of_the_outdoors_in_a_cozy_apartment_setting.jpg";
const LIVING2 =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Modern_luxury_living_room_with_kitchen_interior.jpg/1280px-Modern_luxury_living_room_with_kitchen_interior.jpg";
const BED1 =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Cozy_modern_bedroom_with_plush_pillows_and_elegant_drapes_in_bright_daylight.jpg/1280px-Cozy_modern_bedroom_with_plush_pillows_and_elegant_drapes_in_bright_daylight.jpg";
const BED2 =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Modern_bedroom_design_in_a_stylish_hotel_room_featuring_geometric_patterns_and_soft_linens.jpg/1280px-Modern_bedroom_design_in_a_stylish_hotel_room_featuring_geometric_patterns_and_soft_linens.jpg";
const KITCHEN1 =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Bright_kitchen_on_a_winter_day_with_a_mixer_and_fruits_on_the_counter_near_a_large_window.jpg/1280px-Bright_kitchen_on_a_winter_day_with_a_mixer_and_fruits_on_the_counter_near_a_large_window.jpg";
const KITCHEN2 =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Modern_kitchen_interior_featuring_wooden_shelving_and_organized_dishware_in_a_cozy_setting.jpg/1280px-Modern_kitchen_interior_featuring_wooden_shelving_and_organized_dishware_in_a_cozy_setting.jpg";
const DINING =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Elegant_dining_setup_with_cozy_atmosphere_in_a_modern_room_featuring_gourmet_dishes_and_elegant_glassware.jpg/1280px-Elegant_dining_setup_with_cozy_atmosphere_in_a_modern_room_featuring_gourmet_dishes_and_elegant_glassware.jpg";

const IMG = {
  tropea: POOL,
  scilla: LIVING1,
  sila: LIVING2,
  capovaticano: BED2,
  gerace: BED1,
  pizzo: DINING,
  dino: LIVING2,
  morano: KITCHEN2,
  reggio: KITCHEN1,
  lecastella: BED1,
  arcomagno: LIVING1,
  badolato: BED2,
};

export const stays = [
  {
    slug: "villa-santa-maria-tropea",
    name: "Villa Santa Maria, vista sull'isola",
    type: "Villa",
    location: "Tropea",
    province: "Vibo Valentia",
    coast: "Costa degli Dei",
    price: 240,
    rating: 4.96,
    reviews: 184,
    guests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 2,
    superhost: true,
    host: "Marisa",
    image: IMG.tropea,
    gallery: [IMG.tropea, IMG.capovaticano, IMG.lecastella],
    amenities: [
      "Wi-Fi",
      "Vista mare",
      "Piscina",
      "Aria condizionata",
      "Parcheggio gratuito",
      "Cucina attrezzata",
    ],
    description:
      "A due passi dal santuario di Santa Maria dell'Isola, una villa luminosa con terrazza panoramica sul mare di Tropea. Tramonti sulla Costa degli Dei e spiaggia raggiungibile a piedi.",
  },
  {
    slug: "casa-chianalea-scilla",
    name: "Casa di pescatori a Chianalea",
    type: "Casa intera",
    location: "Scilla",
    province: "Reggio Calabria",
    coast: "Costa Viola",
    price: 155,
    rating: 4.89,
    reviews: 132,
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 1,
    superhost: true,
    host: "Domenico",
    image: IMG.scilla,
    gallery: [IMG.scilla, IMG.reggio, IMG.gerace],
    amenities: [
      "Wi-Fi",
      "Vista mare",
      "Aria condizionata",
      "Accesso al mare",
      "Cucina attrezzata",
      "Animali ammessi",
    ],
    description:
      "Nel cuore di Chianalea, la piccola Venezia del Sud: una casa con i piedi nell'acqua, finestre sul porticciolo e le barche dei pescatori di pesce spada. Ristoranti tipici sotto casa.",
  },
  {
    slug: "chalet-lago-arvo-sila",
    name: "Chalet sul Lago Arvo, Lorica",
    type: "Chalet",
    location: "Lorica · Sila",
    province: "Cosenza",
    coast: "Parco della Sila",
    price: 130,
    rating: 4.84,
    reviews: 97,
    guests: 5,
    bedrooms: 2,
    beds: 3,
    baths: 1,
    superhost: false,
    host: "Anna",
    image: IMG.sila,
    gallery: [IMG.sila, IMG.morano, IMG.badolato],
    amenities: [
      "Wi-Fi",
      "Camino",
      "Vista lago",
      "Parcheggio gratuito",
      "Cucina attrezzata",
      "Animali ammessi",
    ],
    description:
      "Tra i pini larici della Sila, uno chalet in legno affacciato sul Lago Arvo. Perfetto per ciaspolate d'inverno e trekking d'estate, con i Giganti della Sila a pochi minuti.",
  },
  {
    slug: "resort-capo-vaticano",
    name: "Suite con piscina a Capo Vaticano",
    type: "Suite",
    location: "Ricadi · Capo Vaticano",
    province: "Vibo Valentia",
    coast: "Costa degli Dei",
    price: 290,
    rating: 4.92,
    reviews: 210,
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    superhost: true,
    host: "Giuseppe",
    image: IMG.capovaticano,
    gallery: [IMG.capovaticano, IMG.tropea, IMG.dino],
    amenities: [
      "Wi-Fi",
      "Piscina a sfioro",
      "Vista mare",
      "Aria condizionata",
      "Colazione inclusa",
      "Spa",
    ],
    description:
      "Suite romantica su una delle spiagge più belle del mondo. Piscina a sfioro sul blu, colazione servita in terrazza e calette di sabbia bianca ai tuoi piedi.",
  },
  {
    slug: "palazzo-storico-gerace",
    name: "Appartamento nel palazzo storico",
    type: "B&B",
    location: "Gerace",
    province: "Reggio Calabria",
    coast: "Borghi & Aspromonte",
    price: 95,
    rating: 4.8,
    reviews: 76,
    guests: 3,
    bedrooms: 1,
    beds: 2,
    baths: 1,
    superhost: false,
    host: "Caterina",
    image: IMG.gerace,
    gallery: [IMG.gerace, IMG.badolato, IMG.morano],
    amenities: [
      "Wi-Fi",
      "Colazione inclusa",
      "Aria condizionata",
      "Centro storico",
      "Terrazza",
    ],
    description:
      "Nel borgo medievale di Gerace, una camera in un palazzo nobiliare con soffitti affrescati e vista sulla cattedrale normanna. Tra vicoli, botteghe e ceramiche.",
  },
  {
    slug: "loft-castello-pizzo",
    name: "Loft con vista castello a Pizzo",
    type: "Casa intera",
    location: "Pizzo",
    province: "Vibo Valentia",
    coast: "Costa degli Dei",
    price: 140,
    rating: 4.87,
    reviews: 118,
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 1,
    superhost: true,
    host: "Rocco",
    image: IMG.pizzo,
    gallery: [IMG.pizzo, IMG.tropea, IMG.reggio],
    amenities: [
      "Wi-Fi",
      "Vista mare",
      "Aria condizionata",
      "Balcone",
      "Cucina attrezzata",
    ],
    description:
      "Affacciato sul Castello Murat, un loft nel centro di Pizzo, patria del tartufo. Gelaterie storiche e tonnara a due passi, spiaggia della Marinella sotto il borgo.",
  },
  {
    slug: "villa-isola-di-dino",
    name: "Villa fronte Isola di Dino",
    type: "Villa",
    location: "Praia a Mare",
    province: "Cosenza",
    coast: "Riviera dei Cedri",
    price: 205,
    rating: 4.9,
    reviews: 143,
    guests: 8,
    bedrooms: 4,
    beds: 5,
    baths: 3,
    superhost: false,
    host: "Lucia",
    image: IMG.dino,
    gallery: [IMG.dino, IMG.arcomagno, IMG.capovaticano],
    amenities: [
      "Wi-Fi",
      "Vista mare",
      "Giardino",
      "Parcheggio gratuito",
      "Barbecue",
      "Cucina attrezzata",
    ],
    description:
      "Grande villa per famiglie di fronte all'Isola di Dino, sull'alto Tirreno cosentino. Giardino con barbecue, tramonti rosa e gite in barca alle grotte marine e all'Arcomagno.",
  },
  {
    slug: "casa-nel-borgo-morano",
    name: "Casa nel borgo del Pollino",
    type: "Casa intera",
    location: "Morano Calabro",
    province: "Cosenza",
    coast: "Parco del Pollino",
    price: 88,
    rating: 4.82,
    reviews: 64,
    guests: 4,
    bedrooms: 2,
    beds: 3,
    baths: 1,
    superhost: false,
    host: "Salvatore",
    image: IMG.morano,
    gallery: [IMG.morano, IMG.sila, IMG.badolato],
    amenities: [
      "Wi-Fi",
      "Camino",
      "Cucina attrezzata",
      "Centro storico",
      "Parcheggio gratuito",
    ],
    description:
      "In uno dei borghi più belli d'Italia, una casa in pietra tra i vicoli di Morano Calabro. Base ideale per il Parco del Pollino, le gole del Raganello e i pini loricati.",
  },
  {
    slug: "loft-lungomare-reggio",
    name: "Loft sul lungomare di Reggio",
    type: "Appartamento",
    location: "Reggio Calabria",
    province: "Reggio Calabria",
    coast: "Stretto di Messina",
    price: 110,
    rating: 4.85,
    reviews: 101,
    guests: 3,
    bedrooms: 1,
    beds: 2,
    baths: 1,
    superhost: true,
    host: "Francesca",
    image: IMG.reggio,
    gallery: [IMG.reggio, IMG.scilla, IMG.gerace],
    amenities: [
      "Wi-Fi",
      "Vista mare",
      "Aria condizionata",
      "Balcone",
      "Vicino ai musei",
    ],
    description:
      "Sul lungomare Falcomatà, definito il più bello d'Italia, un loft a pochi passi dal Museo dei Bronzi di Riace. Affaccio sullo Stretto e sull'Etna all'orizzonte.",
  },
];

export function getStay(slug) {
  return stays.find((s) => s.slug === slug);
}

export const stayTypes = ["Tutti", "Villa", "Casa intera", "Suite", "B&B", "Chalet", "Appartamento"];
