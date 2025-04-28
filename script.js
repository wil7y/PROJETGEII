// Vérifie si on est sur la page boutique pour charger les produits
if (document.querySelector('#productGrid')) {
    const products = [
        {
            title: "Service de découpe CNC",
            price: "150 €",
            image: "images/decoupe.jpg"
        },
        {
            title: "Fraisage CNC personnalisé",
            price: "200 €",
            image: "images/fraisage.jpg"
        },
        {
            title: "Gravure CNC",
            price: "100 €",
            image: "images/gravure.jpg"
        }
    ];

    const grid = document.getElementById('productGrid');

    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const productLink = `product.html?product=${index}`;

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image"/>
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">${product.price}</p>
            <a href="${productLink}" class="btn">Voir plus</a>
        `;

        grid.appendChild(card);
    });
}

// Gestion de la fiche produit dynamique
if (document.querySelector('#productTitle')) {
    const products = [
        {
            title: "Service de découpe CNC",
            description: "Nous proposons un service de découpe CNC précis pour tous vos projets. Matériaux disponibles : bois, plastique, métal léger. Livraison rapide et devis personnalisé.",
            price: "150 €",
            image: "images/decoupe.jpg"
        },
        {
            title: "Fraisage CNC personnalisé",
            description: "Fraisage CNC pour pièces complexes avec précision. Matériaux variés, délais rapides.",
            price: "200 €",
            image: "images/fraisage.jpg"
        },
        {
            title: "Gravure CNC",
            description: "Service de gravure sur divers matériaux, idéal pour logos, plaques, etc.",
            price: "100 €",
            image: "images/gravure.jpg"
        }
    ];

    // Fonction pour récupérer un paramètre URL
    function getQueryParam(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    const productIndex = getQueryParam('product');

    if (productIndex !== null && products[productIndex]) {
        const product = products[productIndex];
        document.getElementById('productTitle').textContent = product.title;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productPrice').textContent = product.price;
        document.getElementById('productImage').src = product.image;
        document.getElementById('productImage').alt = product.title;
    } else {
        document.querySelector('.product-details').innerHTML = "<p>Produit non trouvé.</p>";
    }
}

// Gestion du formulaire de demande de devis
const form = document.getElementById('devisForm');
if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const productTitle = document.getElementById('productTitle').textContent;

        // Envoi à Firebase (si configuré)
        try {
            await addDoc(collection(db, "devis_requests"), {
                name: name,
                email: email,
                message: message,
                product: productTitle,
                date: new Date()
            });
            alert(`Merci ${name} ! Votre demande a été envoyée.`);
            form.reset();
        } catch (e) {
            alert("Erreur lors de l'envoi. Veuillez réessayer.");
            console.error("Error adding document: ", e);
        }
    });
}



