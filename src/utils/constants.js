// import { BASE_API } from "../../src/services/api.js";
//
// useEffect(() => {
//     if (BASE_API) {
//         setFacturen([
//             { id: 1, klant: "Test BV", bedrag: "€0", datum: "2025-01-01" }
//         ]);
//         return;
//     }
//
//     axios.get(`${BASE_API}/facturen`)
//         .then(res => setFacturen(res.data))
//         .catch(err => console.error(err));
// }, []);
