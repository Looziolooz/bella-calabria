export const airports = [
  {
    code: "SUF",
    name: "Lamezia Terme",
    detail: "L'hub principale della Calabria, centrale tra le due coste.",
  },
  {
    code: "REG",
    name: "Reggio Calabria",
    detail: "L'aeroporto dello Stretto, vicino a Scilla e all'Aspromonte.",
  },
  {
    code: "CRV",
    name: "Crotone",
    detail: "Sullo Ionio, comodo per Le Castella e l'Area Marina Protetta.",
  },
];

export const originCities = [
  "Milano",
  "Roma",
  "Torino",
  "Bologna",
  "Venezia",
  "Napoli",
  "Bergamo",
  "Verona",
];

// Mock flight results, keyed by destination airport code.
export const flightsByAirport = {
  SUF: [
    { airline: "ITA Airways", from: "Roma Fiumicino", dep: "07:40", arr: "08:55", duration: "1h 15m", stops: "Diretto", price: 59 },
    { airline: "Ryanair", from: "Milano Bergamo", dep: "10:20", arr: "12:00", duration: "1h 40m", stops: "Diretto", price: 39 },
    { airline: "easyJet", from: "Milano Malpensa", dep: "15:05", arr: "16:50", duration: "1h 45m", stops: "Diretto", price: 47 },
    { airline: "Ryanair", from: "Torino", dep: "18:30", arr: "20:20", duration: "1h 50m", stops: "Diretto", price: 44 },
  ],
  REG: [
    { airline: "ITA Airways", from: "Roma Fiumicino", dep: "08:10", arr: "09:25", duration: "1h 15m", stops: "Diretto", price: 72 },
    { airline: "ITA Airways", from: "Milano Linate", dep: "12:45", arr: "14:40", duration: "1h 55m", stops: "Diretto", price: 88 },
    { airline: "ITA Airways", from: "Bologna", dep: "16:20", arr: "17:55", duration: "1h 35m", stops: "Diretto", price: 69 },
  ],
  CRV: [
    { airline: "Ryanair", from: "Milano Bergamo", dep: "09:15", arr: "11:00", duration: "1h 45m", stops: "Diretto", price: 42 },
    { airline: "Ryanair", from: "Venezia", dep: "13:50", arr: "15:30", duration: "1h 40m", stops: "Diretto", price: 49 },
    { airline: "Ryanair", from: "Bologna", dep: "20:05", arr: "21:40", duration: "1h 35m", stops: "Diretto", price: 38 },
  ],
};
