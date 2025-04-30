// import_products.js
console.log("Démarrage du script d'importation");
importProducts().catch(console.error);

const admin = require('firebase-admin');

// Remplacez par le chemin vers votre fichier de clé privée Firebase
const serviceAccount = require('./cncgeii-firebase-adminsdk-fbsvc-a18fae8a57.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Liste de vos produits (peut venir d’un fichier JSON ou directement dans le script)
const products = [
  {
    title: "Découpe CNC",
    price: "150 €",
    image: "images/image1.jpg"
  },
  {
    title: "Fraisage CNC",
    price: "200 €",
    image: "images/image2.jpg"
  },
  {
    title: "Gravure CNC",
    price: "100 €",
    image: "images/image3.jpg"
  }
];

// Fonction pour importer
async function importProducts() {
  const collectionRef = db.collection('products');

  for (const product of products) {
    await collectionRef.add(product);
    console.log(`Ajouté : ${product.title}`);
  }

  console.log('Importation terminée');
}

importProducts().catch(console.error);