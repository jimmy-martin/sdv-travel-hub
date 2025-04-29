// Création des villes
CREATE (:City {code: 'PAR', name: 'Paris', country: 'FR'});
CREATE (:City {code: 'TYO', name: 'Tokyo', country: 'JP'});
CREATE (:City {code: 'NYC', name: 'New York', country: 'US'});
CREATE (:City {code: 'LON', name: 'London', country: 'UK'});
CREATE (:City {code: 'ROM', name: 'Rome', country: 'IT'});
CREATE (:City {code: 'BER', name: 'Berlin', country: 'DE'});
CREATE (:City {code: 'MAD', name: 'Madrid', country: 'ES'});
CREATE (:City {code: 'SYD', name: 'Sydney', country: 'AU'});
CREATE (:City {code: 'DXB', name: 'Dubai', country: 'AE'});
CREATE (:City {code: 'SFO', name: 'San Francisco', country: 'US'});
CREATE (:City {code: 'BKK', name: 'Bangkok', country: 'TH'});
CREATE (:City {code: 'LAX', name: 'Los Angeles', country: 'US'});
CREATE (:City {code: 'AMS', name: 'Amsterdam', country: 'NL'});
CREATE (:City {code: 'YVR', name: 'Vancouver', country: 'CA'});
CREATE (:City {code: 'IST', name: 'Istanbul', country: 'TR'});
CREATE (:City {code: 'DEL', name: 'Delhi', country: 'IN'});
CREATE (:City {code: 'SIN', name: 'Singapore', country: 'SG'});
CREATE (:City {code: 'MEX', name: 'Mexico City', country: 'MX'});
CREATE (:City {code: 'SAO', name: 'São Paulo', country: 'BR'});
CREATE (:City {code: 'JNB', name: 'Johannesburg', country: 'ZA'});

// Création des relations NEAR
MATCH (a:City {code: 'PAR'}), (b:City {code: 'LON'})
CREATE (a)-[:NEAR {weight: 0.91}]->(b);
MATCH (a:City {code: 'PAR'}), (b:City {code: 'ROM'})
CREATE (a)-[:NEAR {weight: 0.72}]->(b);
MATCH (a:City {code: 'PAR'}), (b:City {code: 'BER'})
CREATE (a)-[:NEAR {weight: 0.78}]->(b);
MATCH (a:City {code: 'PAR'}), (b:City {code: 'MAD'})
CREATE (a)-[:NEAR {weight: 0.74}]->(b);
MATCH (a:City {code: 'PAR'}), (b:City {code: 'AMS'})
CREATE (a)-[:NEAR {weight: 0.89}]->(b);
MATCH (a:City {code: 'PAR'}), (b:City {code: 'IST'})
CREATE (a)-[:NEAR {weight: 0.43}]->(b);
MATCH (a:City {code: 'NYC'}), (b:City {code: 'LAX'})
CREATE (a)-[:NEAR {weight: 0.1}]->(b);
MATCH (a:City {code: 'NYC'}), (b:City {code: 'YVR'})
CREATE (a)-[:NEAR {weight: 0.1}]->(b);
MATCH (a:City {code: 'NYC'}), (b:City {code: 'MEX'})
CREATE (a)-[:NEAR {weight: 0.16}]->(b);
MATCH (a:City {code: 'LON'}), (b:City {code: 'ROM'})
CREATE (a)-[:NEAR {weight: 0.64}]->(b);
MATCH (a:City {code: 'LON'}), (b:City {code: 'BER'})
CREATE (a)-[:NEAR {weight: 0.77}]->(b);
MATCH (a:City {code: 'LON'}), (b:City {code: 'MAD'})
CREATE (a)-[:NEAR {weight: 0.68}]->(b);
MATCH (a:City {code: 'LON'}), (b:City {code: 'AMS'})
CREATE (a)-[:NEAR {weight: 0.91}]->(b);
MATCH (a:City {code: 'LON'}), (b:City {code: 'IST'})
CREATE (a)-[:NEAR {weight: 0.37}]->(b);
MATCH (a:City {code: 'ROM'}), (b:City {code: 'BER'})
CREATE (a)-[:NEAR {weight: 0.7}]->(b);
MATCH (a:City {code: 'ROM'}), (b:City {code: 'MAD'})
CREATE (a)-[:NEAR {weight: 0.66}]->(b);
MATCH (a:City {code: 'ROM'}), (b:City {code: 'AMS'})
CREATE (a)-[:NEAR {weight: 0.68}]->(b);
MATCH (a:City {code: 'ROM'}), (b:City {code: 'IST'})
CREATE (a)-[:NEAR {weight: 0.66}]->(b);
MATCH (a:City {code: 'BER'}), (b:City {code: 'MAD'})
CREATE (a)-[:NEAR {weight: 0.53}]->(b);
MATCH (a:City {code: 'BER'}), (b:City {code: 'AMS'})
CREATE (a)-[:NEAR {weight: 0.86}]->(b);
MATCH (a:City {code: 'BER'}), (b:City {code: 'IST'})
CREATE (a)-[:NEAR {weight: 0.57}]->(b);
MATCH (a:City {code: 'MAD'}), (b:City {code: 'AMS'})
CREATE (a)-[:NEAR {weight: 0.63}]->(b);
MATCH (a:City {code: 'MAD'}), (b:City {code: 'IST'})
CREATE (a)-[:NEAR {weight: 0.31}]->(b);
MATCH (a:City {code: 'DXB'}), (b:City {code: 'IST'})
CREATE (a)-[:NEAR {weight: 0.25}]->(b);
MATCH (a:City {code: 'DXB'}), (b:City {code: 'DEL'})
CREATE (a)-[:NEAR {weight: 0.45}]->(b);
MATCH (a:City {code: 'SFO'}), (b:City {code: 'LAX'})
CREATE (a)-[:NEAR {weight: 0.86}]->(b);
MATCH (a:City {code: 'SFO'}), (b:City {code: 'YVR'})
CREATE (a)-[:NEAR {weight: 0.68}]->(b);
MATCH (a:City {code: 'SFO'}), (b:City {code: 'MEX'})
CREATE (a)-[:NEAR {weight: 0.24}]->(b);
MATCH (a:City {code: 'BKK'}), (b:City {code: 'DEL'})
CREATE (a)-[:NEAR {weight: 0.27}]->(b);
MATCH (a:City {code: 'BKK'}), (b:City {code: 'SIN'})
CREATE (a)-[:NEAR {weight: 0.65}]->(b);
MATCH (a:City {code: 'LAX'}), (b:City {code: 'YVR'})
CREATE (a)-[:NEAR {weight: 0.57}]->(b);
MATCH (a:City {code: 'LAX'}), (b:City {code: 'MEX'})
CREATE (a)-[:NEAR {weight: 0.38}]->(b);
MATCH (a:City {code: 'AMS'}), (b:City {code: 'IST'})
CREATE (a)-[:NEAR {weight: 0.45}]->(b);
MATCH (a:City {code: 'YVR'}), (b:City {code: 'MEX'})
CREATE (a)-[:NEAR {weight: 0.1}]->(b);