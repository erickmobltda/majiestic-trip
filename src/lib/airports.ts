export interface Airport {
  code: string
  name: string
  city: string
  country: string
  countryCode: string
}

export const AIRPORTS: Airport[] = [
  // United States
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International', city: 'Atlanta', country: 'United States', countryCode: 'US' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'United States', countryCode: 'US' },
  { code: 'ORD', name: "O'Hare International", city: 'Chicago', country: 'United States', countryCode: 'US' },
  { code: 'DFW', name: 'Dallas/Fort Worth International', city: 'Dallas', country: 'United States', countryCode: 'US' },
  { code: 'DEN', name: 'Denver International', city: 'Denver', country: 'United States', countryCode: 'US' },
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'United States', countryCode: 'US' },
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'United States', countryCode: 'US' },
  { code: 'SEA', name: 'Seattle-Tacoma International', city: 'Seattle', country: 'United States', countryCode: 'US' },
  { code: 'LAS', name: 'Harry Reid International', city: 'Las Vegas', country: 'United States', countryCode: 'US' },
  { code: 'MCO', name: 'Orlando International', city: 'Orlando', country: 'United States', countryCode: 'US' },
  { code: 'EWR', name: 'Newark Liberty International', city: 'Newark', country: 'United States', countryCode: 'US' },
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'United States', countryCode: 'US' },
  { code: 'PHX', name: 'Phoenix Sky Harbor International', city: 'Phoenix', country: 'United States', countryCode: 'US' },
  { code: 'IAH', name: 'George Bush Intercontinental', city: 'Houston', country: 'United States', countryCode: 'US' },
  { code: 'BOS', name: 'Logan International', city: 'Boston', country: 'United States', countryCode: 'US' },
  { code: 'MSP', name: 'Minneapolis-Saint Paul International', city: 'Minneapolis', country: 'United States', countryCode: 'US' },
  { code: 'DTW', name: 'Detroit Metropolitan Wayne County', city: 'Detroit', country: 'United States', countryCode: 'US' },
  { code: 'FLL', name: 'Fort Lauderdale-Hollywood International', city: 'Fort Lauderdale', country: 'United States', countryCode: 'US' },
  { code: 'PHL', name: 'Philadelphia International', city: 'Philadelphia', country: 'United States', countryCode: 'US' },
  { code: 'LGA', name: 'LaGuardia Airport', city: 'New York', country: 'United States', countryCode: 'US' },
  { code: 'BWI', name: 'Baltimore/Washington International', city: 'Baltimore', country: 'United States', countryCode: 'US' },
  { code: 'DCA', name: 'Ronald Reagan Washington National', city: 'Washington D.C.', country: 'United States', countryCode: 'US' },
  { code: 'IAD', name: 'Dulles International', city: 'Washington D.C.', country: 'United States', countryCode: 'US' },
  { code: 'SLC', name: 'Salt Lake City International', city: 'Salt Lake City', country: 'United States', countryCode: 'US' },
  { code: 'SAN', name: 'San Diego International', city: 'San Diego', country: 'United States', countryCode: 'US' },
  { code: 'TPA', name: 'Tampa International', city: 'Tampa', country: 'United States', countryCode: 'US' },
  { code: 'PDX', name: 'Portland International', city: 'Portland', country: 'United States', countryCode: 'US' },
  { code: 'HNL', name: 'Daniel K. Inouye International', city: 'Honolulu', country: 'United States', countryCode: 'US' },
  { code: 'STL', name: 'St. Louis Lambert International', city: 'St. Louis', country: 'United States', countryCode: 'US' },
  { code: 'BNA', name: 'Nashville International', city: 'Nashville', country: 'United States', countryCode: 'US' },
  { code: 'AUS', name: 'Austin-Bergstrom International', city: 'Austin', country: 'United States', countryCode: 'US' },
  { code: 'MCI', name: 'Kansas City International', city: 'Kansas City', country: 'United States', countryCode: 'US' },
  { code: 'RDU', name: 'Raleigh-Durham International', city: 'Raleigh', country: 'United States', countryCode: 'US' },
  { code: 'CLE', name: 'Cleveland Hopkins International', city: 'Cleveland', country: 'United States', countryCode: 'US' },
  { code: 'SMF', name: 'Sacramento International', city: 'Sacramento', country: 'United States', countryCode: 'US' },
  { code: 'OAK', name: 'Oakland International', city: 'Oakland', country: 'United States', countryCode: 'US' },
  { code: 'SJC', name: 'Norman Y. Mineta San José International', city: 'San Jose', country: 'United States', countryCode: 'US' },
  { code: 'MKE', name: 'Milwaukee Mitchell International', city: 'Milwaukee', country: 'United States', countryCode: 'US' },
  { code: 'PIT', name: 'Pittsburgh International', city: 'Pittsburgh', country: 'United States', countryCode: 'US' },
  { code: 'ANC', name: 'Ted Stevens Anchorage International', city: 'Anchorage', country: 'United States', countryCode: 'US' },
  { code: 'JAN', name: 'Jackson-Medgar Wiley Evers International', city: 'Jackson', country: 'United States', countryCode: 'US' },
  { code: 'MSY', name: 'Louis Armstrong New Orleans International', city: 'New Orleans', country: 'United States', countryCode: 'US' },
  // Canada
  { code: 'YYZ', name: 'Toronto Pearson International', city: 'Toronto', country: 'Canada', countryCode: 'CA' },
  { code: 'YVR', name: 'Vancouver International', city: 'Vancouver', country: 'Canada', countryCode: 'CA' },
  { code: 'YUL', name: 'Montréal-Pierre Elliott Trudeau International', city: 'Montreal', country: 'Canada', countryCode: 'CA' },
  { code: 'YYC', name: 'Calgary International', city: 'Calgary', country: 'Canada', countryCode: 'CA' },
  { code: 'YEG', name: 'Edmonton International', city: 'Edmonton', country: 'Canada', countryCode: 'CA' },
  { code: 'YOW', name: 'Ottawa Macdonald-Cartier International', city: 'Ottawa', country: 'Canada', countryCode: 'CA' },
  { code: 'YHZ', name: 'Halifax Stanfield International', city: 'Halifax', country: 'Canada', countryCode: 'CA' },
  { code: 'YWG', name: 'Winnipeg James Armstrong Richardson International', city: 'Winnipeg', country: 'Canada', countryCode: 'CA' },
  // Mexico
  { code: 'MEX', name: 'Benito Juárez International', city: 'Mexico City', country: 'Mexico', countryCode: 'MX' },
  { code: 'CUN', name: 'Cancún International', city: 'Cancún', country: 'Mexico', countryCode: 'MX' },
  { code: 'GDL', name: 'Don Miguel Hidalgo y Costilla International', city: 'Guadalajara', country: 'Mexico', countryCode: 'MX' },
  { code: 'MTY', name: 'General Mariano Escobedo International', city: 'Monterrey', country: 'Mexico', countryCode: 'MX' },
  { code: 'TIJ', name: 'General Abelardo L. Rodríguez International', city: 'Tijuana', country: 'Mexico', countryCode: 'MX' },
  { code: 'SJD', name: 'Los Cabos International', city: 'San José del Cabo', country: 'Mexico', countryCode: 'MX' },
  { code: 'PVR', name: 'Licenciado Gustavo Díaz Ordaz International', city: 'Puerto Vallarta', country: 'Mexico', countryCode: 'MX' },
  // Brazil
  { code: 'GRU', name: 'São Paulo-Guarulhos International', city: 'São Paulo', country: 'Brazil', countryCode: 'BR' },
  { code: 'CGH', name: 'São Paulo-Congonhas Airport', city: 'São Paulo', country: 'Brazil', countryCode: 'BR' },
  { code: 'VCP', name: 'Viracopos International', city: 'Campinas', country: 'Brazil', countryCode: 'BR' },
  { code: 'GIG', name: 'Rio de Janeiro-Galeão International', city: 'Rio de Janeiro', country: 'Brazil', countryCode: 'BR' },
  { code: 'SDU', name: 'Santos Dumont Airport', city: 'Rio de Janeiro', country: 'Brazil', countryCode: 'BR' },
  { code: 'BSB', name: 'Presidente Juscelino Kubitschek International', city: 'Brasília', country: 'Brazil', countryCode: 'BR' },
  { code: 'SSA', name: 'Deputado Luís Eduardo Magalhães International', city: 'Salvador', country: 'Brazil', countryCode: 'BR' },
  { code: 'FOR', name: 'Pinto Martins International', city: 'Fortaleza', country: 'Brazil', countryCode: 'BR' },
  { code: 'REC', name: 'Recife/Guararapes International', city: 'Recife', country: 'Brazil', countryCode: 'BR' },
  { code: 'POA', name: 'Salgado Filho International', city: 'Porto Alegre', country: 'Brazil', countryCode: 'BR' },
  { code: 'MAO', name: 'Eduardo Gomes International', city: 'Manaus', country: 'Brazil', countryCode: 'BR' },
  { code: 'BEL', name: 'Val de Cans International', city: 'Belém', country: 'Brazil', countryCode: 'BR' },
  { code: 'CWB', name: 'Afonso Pena International', city: 'Curitiba', country: 'Brazil', countryCode: 'BR' },
  // Argentina
  { code: 'EZE', name: 'Ministro Pistarini International (Ezeiza)', city: 'Buenos Aires', country: 'Argentina', countryCode: 'AR' },
  { code: 'AEP', name: 'Jorge Newbery Airfield', city: 'Buenos Aires', country: 'Argentina', countryCode: 'AR' },
  { code: 'COR', name: 'Ingeniero Ambrosio L.V. Taravella International', city: 'Córdoba', country: 'Argentina', countryCode: 'AR' },
  { code: 'MDZ', name: 'Governor Francisco Gabrielli International', city: 'Mendoza', country: 'Argentina', countryCode: 'AR' },
  { code: 'BRC', name: 'San Carlos de Bariloche Airport', city: 'Bariloche', country: 'Argentina', countryCode: 'AR' },
  // Chile
  { code: 'SCL', name: 'Arturo Merino Benítez International', city: 'Santiago', country: 'Chile', countryCode: 'CL' },
  // Colombia
  { code: 'BOG', name: 'El Dorado International', city: 'Bogotá', country: 'Colombia', countryCode: 'CO' },
  { code: 'MDE', name: 'José María Córdova International', city: 'Medellín', country: 'Colombia', countryCode: 'CO' },
  { code: 'CTG', name: 'Rafael Núñez International', city: 'Cartagena', country: 'Colombia', countryCode: 'CO' },
  // Peru
  { code: 'LIM', name: 'Jorge Chávez International', city: 'Lima', country: 'Peru', countryCode: 'PE' },
  // Venezuela
  { code: 'CCS', name: 'Simón Bolívar International', city: 'Caracas', country: 'Venezuela', countryCode: 'VE' },
  // Ecuador
  { code: 'UIO', name: 'Mariscal Sucre International', city: 'Quito', country: 'Ecuador', countryCode: 'EC' },
  { code: 'GYE', name: 'José Joaquín de Olmedo International', city: 'Guayaquil', country: 'Ecuador', countryCode: 'EC' },
  // United Kingdom
  { code: 'LHR', name: 'London Heathrow', city: 'London', country: 'United Kingdom', countryCode: 'GB' },
  { code: 'LGW', name: 'London Gatwick', city: 'London', country: 'United Kingdom', countryCode: 'GB' },
  { code: 'STN', name: 'London Stansted', city: 'London', country: 'United Kingdom', countryCode: 'GB' },
  { code: 'LTN', name: 'London Luton', city: 'London', country: 'United Kingdom', countryCode: 'GB' },
  { code: 'LCY', name: 'London City Airport', city: 'London', country: 'United Kingdom', countryCode: 'GB' },
  { code: 'MAN', name: 'Manchester Airport', city: 'Manchester', country: 'United Kingdom', countryCode: 'GB' },
  { code: 'EDI', name: 'Edinburgh Airport', city: 'Edinburgh', country: 'United Kingdom', countryCode: 'GB' },
  { code: 'BHX', name: 'Birmingham Airport', city: 'Birmingham', country: 'United Kingdom', countryCode: 'GB' },
  { code: 'GLA', name: 'Glasgow Airport', city: 'Glasgow', country: 'United Kingdom', countryCode: 'GB' },
  // France
  { code: 'CDG', name: 'Paris Charles de Gaulle', city: 'Paris', country: 'France', countryCode: 'FR' },
  { code: 'ORY', name: 'Paris Orly', city: 'Paris', country: 'France', countryCode: 'FR' },
  { code: 'NCE', name: 'Nice Côte d\'Azur International', city: 'Nice', country: 'France', countryCode: 'FR' },
  { code: 'LYS', name: 'Lyon-Saint Exupéry Airport', city: 'Lyon', country: 'France', countryCode: 'FR' },
  { code: 'MRS', name: 'Marseille Provence Airport', city: 'Marseille', country: 'France', countryCode: 'FR' },
  // Germany
  { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany', countryCode: 'DE' },
  { code: 'MUC', name: 'Munich Airport', city: 'Munich', country: 'Germany', countryCode: 'DE' },
  { code: 'DUS', name: 'Düsseldorf Airport', city: 'Düsseldorf', country: 'Germany', countryCode: 'DE' },
  { code: 'TXL', name: 'Berlin Tegel Airport', city: 'Berlin', country: 'Germany', countryCode: 'DE' },
  { code: 'BER', name: 'Berlin Brandenburg Airport', city: 'Berlin', country: 'Germany', countryCode: 'DE' },
  { code: 'HAM', name: 'Hamburg Airport', city: 'Hamburg', country: 'Germany', countryCode: 'DE' },
  { code: 'STR', name: 'Stuttgart Airport', city: 'Stuttgart', country: 'Germany', countryCode: 'DE' },
  { code: 'CGN', name: 'Cologne Bonn Airport', city: 'Cologne', country: 'Germany', countryCode: 'DE' },
  // Netherlands
  { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands', countryCode: 'NL' },
  // Spain
  { code: 'MAD', name: 'Adolfo Suárez Madrid-Barajas Airport', city: 'Madrid', country: 'Spain', countryCode: 'ES' },
  { code: 'BCN', name: 'Barcelona-El Prat Airport', city: 'Barcelona', country: 'Spain', countryCode: 'ES' },
  { code: 'AGP', name: 'Málaga Airport', city: 'Málaga', country: 'Spain', countryCode: 'ES' },
  { code: 'PMI', name: 'Palma de Mallorca Airport', city: 'Palma', country: 'Spain', countryCode: 'ES' },
  { code: 'ALC', name: 'Alicante-Elche Miguel Hernández Airport', city: 'Alicante', country: 'Spain', countryCode: 'ES' },
  { code: 'SVQ', name: 'Seville Airport', city: 'Seville', country: 'Spain', countryCode: 'ES' },
  { code: 'VLC', name: 'Valencia Airport', city: 'Valencia', country: 'Spain', countryCode: 'ES' },
  // Italy
  { code: 'FCO', name: 'Leonardo da Vinci International (Fiumicino)', city: 'Rome', country: 'Italy', countryCode: 'IT' },
  { code: 'MXP', name: 'Milan Malpensa Airport', city: 'Milan', country: 'Italy', countryCode: 'IT' },
  { code: 'LIN', name: 'Milan Linate Airport', city: 'Milan', country: 'Italy', countryCode: 'IT' },
  { code: 'VCE', name: 'Venice Marco Polo Airport', city: 'Venice', country: 'Italy', countryCode: 'IT' },
  { code: 'NAP', name: 'Naples International Airport', city: 'Naples', country: 'Italy', countryCode: 'IT' },
  { code: 'BLQ', name: 'Bologna Guglielmo Marconi Airport', city: 'Bologna', country: 'Italy', countryCode: 'IT' },
  // Portugal
  { code: 'LIS', name: 'Humberto Delgado Airport (Lisbon)', city: 'Lisbon', country: 'Portugal', countryCode: 'PT' },
  { code: 'OPO', name: 'Francisco de Sá Carneiro Airport (Porto)', city: 'Porto', country: 'Portugal', countryCode: 'PT' },
  // Switzerland
  { code: 'ZRH', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland', countryCode: 'CH' },
  { code: 'GVA', name: 'Geneva Airport', city: 'Geneva', country: 'Switzerland', countryCode: 'CH' },
  // Austria
  { code: 'VIE', name: 'Vienna International Airport', city: 'Vienna', country: 'Austria', countryCode: 'AT' },
  // Belgium
  { code: 'BRU', name: 'Brussels Airport', city: 'Brussels', country: 'Belgium', countryCode: 'BE' },
  // Sweden
  { code: 'ARN', name: 'Stockholm Arlanda Airport', city: 'Stockholm', country: 'Sweden', countryCode: 'SE' },
  { code: 'GOT', name: 'Gothenburg Landvetter Airport', city: 'Gothenburg', country: 'Sweden', countryCode: 'SE' },
  // Norway
  { code: 'OSL', name: 'Oslo Airport Gardermoen', city: 'Oslo', country: 'Norway', countryCode: 'NO' },
  // Denmark
  { code: 'CPH', name: 'Copenhagen Airport', city: 'Copenhagen', country: 'Denmark', countryCode: 'DK' },
  // Finland
  { code: 'HEL', name: 'Helsinki-Vantaa Airport', city: 'Helsinki', country: 'Finland', countryCode: 'FI' },
  // Ireland
  { code: 'DUB', name: 'Dublin Airport', city: 'Dublin', country: 'Ireland', countryCode: 'IE' },
  // Poland
  { code: 'WAW', name: 'Warsaw Chopin Airport', city: 'Warsaw', country: 'Poland', countryCode: 'PL' },
  { code: 'KRK', name: 'John Paul II International Airport Kraków-Balice', city: 'Kraków', country: 'Poland', countryCode: 'PL' },
  // Czech Republic
  { code: 'PRG', name: 'Václav Havel Airport Prague', city: 'Prague', country: 'Czech Republic', countryCode: 'CZ' },
  // Hungary
  { code: 'BUD', name: 'Budapest Ferenc Liszt International Airport', city: 'Budapest', country: 'Hungary', countryCode: 'HU' },
  // Romania
  { code: 'OTP', name: 'Henri Coandă International Airport', city: 'Bucharest', country: 'Romania', countryCode: 'RO' },
  // Greece
  { code: 'ATH', name: 'Athens Eleftherios Venizelos International', city: 'Athens', country: 'Greece', countryCode: 'GR' },
  { code: 'SKG', name: 'Thessaloniki Macedonia International', city: 'Thessaloniki', country: 'Greece', countryCode: 'GR' },
  // Turkey
  { code: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey', countryCode: 'TR' },
  { code: 'SAW', name: 'Istanbul Sabiha Gökçen International', city: 'Istanbul', country: 'Turkey', countryCode: 'TR' },
  { code: 'AYT', name: 'Antalya Airport', city: 'Antalya', country: 'Turkey', countryCode: 'TR' },
  { code: 'ESB', name: 'Esenboğa International Airport', city: 'Ankara', country: 'Turkey', countryCode: 'TR' },
  // Russia
  { code: 'SVO', name: 'Sheremetyevo International', city: 'Moscow', country: 'Russia', countryCode: 'RU' },
  { code: 'DME', name: 'Domodedovo International', city: 'Moscow', country: 'Russia', countryCode: 'RU' },
  { code: 'LED', name: 'Pulkovo Airport', city: 'St. Petersburg', country: 'Russia', countryCode: 'RU' },
  // United Arab Emirates
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE' },
  { code: 'AUH', name: 'Abu Dhabi International Airport', city: 'Abu Dhabi', country: 'United Arab Emirates', countryCode: 'AE' },
  { code: 'SHJ', name: 'Sharjah International Airport', city: 'Sharjah', country: 'United Arab Emirates', countryCode: 'AE' },
  // Qatar
  { code: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar', countryCode: 'QA' },
  // Saudi Arabia
  { code: 'RUH', name: 'King Khalid International Airport', city: 'Riyadh', country: 'Saudi Arabia', countryCode: 'SA' },
  { code: 'JED', name: 'King Abdulaziz International Airport', city: 'Jeddah', country: 'Saudi Arabia', countryCode: 'SA' },
  { code: 'DMM', name: 'King Fahd International Airport', city: 'Dammam', country: 'Saudi Arabia', countryCode: 'SA' },
  // Kuwait
  { code: 'KWI', name: 'Kuwait International Airport', city: 'Kuwait City', country: 'Kuwait', countryCode: 'KW' },
  // Bahrain
  { code: 'BAH', name: 'Bahrain International Airport', city: 'Manama', country: 'Bahrain', countryCode: 'BH' },
  // Israel
  { code: 'TLV', name: 'Ben Gurion International Airport', city: 'Tel Aviv', country: 'Israel', countryCode: 'IL' },
  // Jordan
  { code: 'AMM', name: 'Queen Alia International Airport', city: 'Amman', country: 'Jordan', countryCode: 'JO' },
  // Egypt
  { code: 'CAI', name: 'Cairo International Airport', city: 'Cairo', country: 'Egypt', countryCode: 'EG' },
  { code: 'HRG', name: 'Hurghada International Airport', city: 'Hurghada', country: 'Egypt', countryCode: 'EG' },
  // Morocco
  { code: 'CMN', name: 'Mohammed V International Airport', city: 'Casablanca', country: 'Morocco', countryCode: 'MA' },
  { code: 'RAK', name: 'Marrakesh Menara Airport', city: 'Marrakesh', country: 'Morocco', countryCode: 'MA' },
  // South Africa
  { code: 'JNB', name: 'O.R. Tambo International Airport', city: 'Johannesburg', country: 'South Africa', countryCode: 'ZA' },
  { code: 'CPT', name: 'Cape Town International Airport', city: 'Cape Town', country: 'South Africa', countryCode: 'ZA' },
  { code: 'DUR', name: 'King Shaka International Airport', city: 'Durban', country: 'South Africa', countryCode: 'ZA' },
  // Nigeria
  { code: 'LOS', name: 'Murtala Muhammed International Airport', city: 'Lagos', country: 'Nigeria', countryCode: 'NG' },
  { code: 'ABV', name: 'Nnamdi Azikiwe International Airport', city: 'Abuja', country: 'Nigeria', countryCode: 'NG' },
  // Kenya
  { code: 'NBO', name: 'Jomo Kenyatta International Airport', city: 'Nairobi', country: 'Kenya', countryCode: 'KE' },
  // Ethiopia
  { code: 'ADD', name: 'Addis Ababa Bole International Airport', city: 'Addis Ababa', country: 'Ethiopia', countryCode: 'ET' },
  // Tanzania
  { code: 'DAR', name: 'Julius Nyerere International Airport', city: 'Dar es Salaam', country: 'Tanzania', countryCode: 'TZ' },
  // India
  { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'New Delhi', country: 'India', countryCode: 'IN' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International', city: 'Mumbai', country: 'India', countryCode: 'IN' },
  { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bangalore', country: 'India', countryCode: 'IN' },
  { code: 'MAA', name: 'Chennai International Airport', city: 'Chennai', country: 'India', countryCode: 'IN' },
  { code: 'CCU', name: 'Netaji Subhas Chandra Bose International', city: 'Kolkata', country: 'India', countryCode: 'IN' },
  { code: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', country: 'India', countryCode: 'IN' },
  { code: 'AMD', name: 'Sardar Vallabhbhai Patel International', city: 'Ahmedabad', country: 'India', countryCode: 'IN' },
  { code: 'COK', name: 'Cochin International Airport', city: 'Kochi', country: 'India', countryCode: 'IN' },
  { code: 'GOI', name: 'Goa International Airport (Dabolim)', city: 'Goa', country: 'India', countryCode: 'IN' },
  // China
  { code: 'PEK', name: 'Beijing Capital International Airport', city: 'Beijing', country: 'China', countryCode: 'CN' },
  { code: 'PKX', name: 'Beijing Daxing International Airport', city: 'Beijing', country: 'China', countryCode: 'CN' },
  { code: 'PVG', name: 'Shanghai Pudong International Airport', city: 'Shanghai', country: 'China', countryCode: 'CN' },
  { code: 'SHA', name: 'Shanghai Hongqiao International Airport', city: 'Shanghai', country: 'China', countryCode: 'CN' },
  { code: 'CAN', name: 'Guangzhou Baiyun International Airport', city: 'Guangzhou', country: 'China', countryCode: 'CN' },
  { code: 'CTU', name: 'Chengdu Tianfu International Airport', city: 'Chengdu', country: 'China', countryCode: 'CN' },
  { code: 'SZX', name: 'Shenzhen Bao\'an International Airport', city: 'Shenzhen', country: 'China', countryCode: 'CN' },
  { code: 'HGH', name: 'Hangzhou Xiaoshan International Airport', city: 'Hangzhou', country: 'China', countryCode: 'CN' },
  { code: 'KMG', name: 'Kunming Changshui International Airport', city: 'Kunming', country: 'China', countryCode: 'CN' },
  { code: 'WUH', name: 'Wuhan Tianhe International Airport', city: 'Wuhan', country: 'China', countryCode: 'CN' },
  // Japan
  { code: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan', countryCode: 'JP' },
  { code: 'HND', name: 'Tokyo Haneda Airport', city: 'Tokyo', country: 'Japan', countryCode: 'JP' },
  { code: 'KIX', name: 'Kansai International Airport', city: 'Osaka', country: 'Japan', countryCode: 'JP' },
  { code: 'ITM', name: 'Osaka Itami Airport', city: 'Osaka', country: 'Japan', countryCode: 'JP' },
  { code: 'NGO', name: 'Chubu Centrair International Airport', city: 'Nagoya', country: 'Japan', countryCode: 'JP' },
  { code: 'CTS', name: 'New Chitose Airport', city: 'Sapporo', country: 'Japan', countryCode: 'JP' },
  { code: 'FUK', name: 'Fukuoka Airport', city: 'Fukuoka', country: 'Japan', countryCode: 'JP' },
  { code: 'OKA', name: 'Naha Airport', city: 'Okinawa', country: 'Japan', countryCode: 'JP' },
  // South Korea
  { code: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea', countryCode: 'KR' },
  { code: 'GMP', name: 'Gimpo International Airport', city: 'Seoul', country: 'South Korea', countryCode: 'KR' },
  { code: 'PUS', name: 'Gimhae International Airport', city: 'Busan', country: 'South Korea', countryCode: 'KR' },
  // Singapore
  { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore', countryCode: 'SG' },
  // Thailand
  { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand', countryCode: 'TH' },
  { code: 'DMK', name: 'Don Mueang International Airport', city: 'Bangkok', country: 'Thailand', countryCode: 'TH' },
  { code: 'HKT', name: 'Phuket International Airport', city: 'Phuket', country: 'Thailand', countryCode: 'TH' },
  { code: 'CNX', name: 'Chiang Mai International Airport', city: 'Chiang Mai', country: 'Thailand', countryCode: 'TH' },
  // Malaysia
  { code: 'KUL', name: 'Kuala Lumpur International Airport', city: 'Kuala Lumpur', country: 'Malaysia', countryCode: 'MY' },
  { code: 'PEN', name: 'Penang International Airport', city: 'Penang', country: 'Malaysia', countryCode: 'MY' },
  // Indonesia
  { code: 'CGK', name: 'Soekarno-Hatta International Airport', city: 'Jakarta', country: 'Indonesia', countryCode: 'ID' },
  { code: 'DPS', name: 'Ngurah Rai International Airport (Bali)', city: 'Bali', country: 'Indonesia', countryCode: 'ID' },
  { code: 'SUB', name: 'Juanda International Airport', city: 'Surabaya', country: 'Indonesia', countryCode: 'ID' },
  // Philippines
  { code: 'MNL', name: 'Ninoy Aquino International Airport', city: 'Manila', country: 'Philippines', countryCode: 'PH' },
  { code: 'CEB', name: 'Mactan-Cebu International Airport', city: 'Cebu', country: 'Philippines', countryCode: 'PH' },
  // Vietnam
  { code: 'SGN', name: 'Tan Son Nhat International Airport', city: 'Ho Chi Minh City', country: 'Vietnam', countryCode: 'VN' },
  { code: 'HAN', name: 'Noi Bai International Airport', city: 'Hanoi', country: 'Vietnam', countryCode: 'VN' },
  { code: 'DAD', name: 'Da Nang International Airport', city: 'Da Nang', country: 'Vietnam', countryCode: 'VN' },
  // Hong Kong
  { code: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'Hong Kong', countryCode: 'HK' },
  // Taiwan
  { code: 'TPE', name: 'Taiwan Taoyuan International Airport', city: 'Taipei', country: 'Taiwan', countryCode: 'TW' },
  { code: 'TSA', name: 'Taipei Songshan Airport', city: 'Taipei', country: 'Taiwan', countryCode: 'TW' },
  // Australia
  { code: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia', countryCode: 'AU' },
  { code: 'MEL', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia', countryCode: 'AU' },
  { code: 'BNE', name: 'Brisbane Airport', city: 'Brisbane', country: 'Australia', countryCode: 'AU' },
  { code: 'PER', name: 'Perth Airport', city: 'Perth', country: 'Australia', countryCode: 'AU' },
  { code: 'ADL', name: 'Adelaide Airport', city: 'Adelaide', country: 'Australia', countryCode: 'AU' },
  { code: 'CBR', name: 'Canberra Airport', city: 'Canberra', country: 'Australia', countryCode: 'AU' },
  { code: 'OOL', name: 'Gold Coast Airport', city: 'Gold Coast', country: 'Australia', countryCode: 'AU' },
  // New Zealand
  { code: 'AKL', name: 'Auckland Airport', city: 'Auckland', country: 'New Zealand', countryCode: 'NZ' },
  { code: 'CHC', name: 'Christchurch Airport', city: 'Christchurch', country: 'New Zealand', countryCode: 'NZ' },
  { code: 'WLG', name: 'Wellington Airport', city: 'Wellington', country: 'New Zealand', countryCode: 'NZ' },
  // Panama
  { code: 'PTY', name: 'Tocumen International Airport', city: 'Panama City', country: 'Panama', countryCode: 'PA' },
  // Costa Rica
  { code: 'SJO', name: 'Juan Santamaría International Airport', city: 'San José', country: 'Costa Rica', countryCode: 'CR' },
  // Dominican Republic
  { code: 'PUJ', name: 'Punta Cana International Airport', city: 'Punta Cana', country: 'Dominican Republic', countryCode: 'DO' },
  { code: 'SDQ', name: 'Las Américas International Airport', city: 'Santo Domingo', country: 'Dominican Republic', countryCode: 'DO' },
  // Cuba
  { code: 'HAV', name: 'José Martí International Airport', city: 'Havana', country: 'Cuba', countryCode: 'CU' },
  // Jamaica
  { code: 'MBJ', name: 'Sangster International Airport', city: 'Montego Bay', country: 'Jamaica', countryCode: 'JM' },
  // Bahamas
  { code: 'NAS', name: 'Lynden Pindling International Airport', city: 'Nassau', country: 'Bahamas', countryCode: 'BS' },
  // Maldives
  { code: 'MLE', name: 'Velana International Airport', city: 'Malé', country: 'Maldives', countryCode: 'MV' },
  // Sri Lanka
  { code: 'CMB', name: 'Bandaranaike International Airport', city: 'Colombo', country: 'Sri Lanka', countryCode: 'LK' },
  // Nepal
  { code: 'KTM', name: 'Tribhuvan International Airport', city: 'Kathmandu', country: 'Nepal', countryCode: 'NP' },
  // Pakistan
  { code: 'KHI', name: 'Jinnah International Airport', city: 'Karachi', country: 'Pakistan', countryCode: 'PK' },
  { code: 'LHE', name: 'Allama Iqbal International Airport', city: 'Lahore', country: 'Pakistan', countryCode: 'PK' },
  { code: 'ISB', name: 'Islamabad International Airport', city: 'Islamabad', country: 'Pakistan', countryCode: 'PK' },
  // Bangladesh
  { code: 'DAC', name: 'Hazrat Shahjalal International Airport', city: 'Dhaka', country: 'Bangladesh', countryCode: 'BD' },
  // Iran
  { code: 'IKA', name: 'Imam Khomeini International Airport', city: 'Tehran', country: 'Iran', countryCode: 'IR' },
  // Iraq
  { code: 'BGW', name: 'Baghdad International Airport', city: 'Baghdad', country: 'Iraq', countryCode: 'IQ' },
  // Lebanon
  { code: 'BEY', name: 'Rafic Hariri International Airport', city: 'Beirut', country: 'Lebanon', countryCode: 'LB' },
  // Oman
  { code: 'MCT', name: 'Muscat International Airport', city: 'Muscat', country: 'Oman', countryCode: 'OM' },
  // Ukraine
  { code: 'KBP', name: 'Boryspil International Airport', city: 'Kyiv', country: 'Ukraine', countryCode: 'UA' },
  // Serbia
  { code: 'BEG', name: 'Belgrade Nikola Tesla Airport', city: 'Belgrade', country: 'Serbia', countryCode: 'RS' },
  // Croatia
  { code: 'ZAG', name: 'Zagreb Airport', city: 'Zagreb', country: 'Croatia', countryCode: 'HR' },
  { code: 'DBV', name: 'Dubrovnik Airport', city: 'Dubrovnik', country: 'Croatia', countryCode: 'HR' },
  // Iceland
  { code: 'KEF', name: 'Keflavík International Airport', city: 'Reykjavik', country: 'Iceland', countryCode: 'IS' },
  // Luxembourg
  { code: 'LUX', name: 'Luxembourg Airport', city: 'Luxembourg', country: 'Luxembourg', countryCode: 'LU' },
  // Malta
  { code: 'MLA', name: 'Malta International Airport', city: 'Valletta', country: 'Malta', countryCode: 'MT' },
  // Cyprus
  { code: 'LCA', name: 'Larnaca International Airport', city: 'Larnaca', country: 'Cyprus', countryCode: 'CY' },
]

export function searchAirports(query: string, limit = 50): Airport[] {
  if (!query || query.trim().length < 1) return []
  const q = query.trim().toLowerCase()
  return AIRPORTS.filter(
    (a) =>
      a.code.toLowerCase().startsWith(q) ||
      a.name.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q) ||
      a.countryCode.toLowerCase() === q
  ).slice(0, limit)
}

export function findAirportByCode(code: string): Airport | undefined {
  return AIRPORTS.find((a) => a.code.toUpperCase() === code.toUpperCase())
}
