const speciesData = {
    oso: {
        name: "Oso de Anteojos",
        scientificName: "Tremarctos ornatus",
        description: "El oso de anteojos es el único oso nativo de América del Sur y habita principalmente en los Andes, incluyendo zonas de páramo y bosques montanos en Colombia, Venezuela, Ecuador, Perú y Bolivia. Este oso es conocido por las marcas blancas o amarillentas alrededor de sus ojos, que varían en cada individuo, dándole su nombre común. Aunque es principalmente herbívoro, su dieta incluye una variedad de plantas, frutas y ocasionalmente pequeños animales, lo que lo convierte en un actor fundamental para la dispersión de semillas en los ecosistemas andinos. Su rol en el mantenimiento de la biodiversidad es vital, ya que favorece el crecimiento de nuevas plantas a través de su consumo y desplazamiento. Desafortunadamente, el oso de anteojos enfrenta grandes amenazas, principalmente la caza ilegal y la fragmentación de su hábitat debido a la expansión agrícola y ganadera. A pesar de ser una especie solitaria y generalmente tímida con los humanos, su futuro depende de los esfuerzos de conservación en los Andes.",
        images: ["../assets/img/fauna/oso-anteojos/oso-anteojos-1.jpg", "../assets/img/fauna/oso-anteojos/oso-anteojos-2.jpg", "../assets/img/fauna/oso-anteojos/oso-anteojos-3.jpg"]
    },
    venado: {
        name: "Venado Cola Blanca",
        scientificName: "Odocoileus virginianus",
        description: "El venado cola blanca es una especie ampliamente distribuida en América, adaptada a una variedad de hábitats que incluyen bosques y páramos en Colombia, particularmente en los departamentos de Boyacá y Cundinamarca. Su nombre proviene de su distintiva cola, que es blanca en la parte inferior y que levanta como señal de alerta. Durante los meses de invierno, su pelaje adquiere un tono más grisáceo, mientras que en primavera y verano se vuelve más rojizo, lo que le proporciona un camuflaje estacional. Este venado es fundamental en la dispersión de semillas, contribuyendo al ciclo de vida de muchas especies de plantas. Sin embargo, enfrenta desafíos significativos debido a la caza furtiva y la destrucción de su hábitat natural. Es una especie clave no solo por su papel ecológico, sino también por su valor cultural e histórico en la región.",
        images: ["../assets/img/fauna/venado/venado-1.jpg", "../assets/img/fauna/venado/venado-2.jpg", "../assets/img/fauna/venado/venado-3.jpg"]
    },
    condor: {
        name: "Cóndor de los Andes",
        scientificName: "Vultur gryphus",
        description: "El cóndor de los Andes es una de las aves voladoras más grandes del mundo, con una envergadura que puede alcanzar los 3 metros. Este majestuoso ave carroñera es un símbolo de libertad y poder en las culturas andinas y desempeña un papel ecológico crucial al consumir animales muertos, lo que ayuda a mantener el ecosistema limpio y reducir la propagación de enfermedades. Habita principalmente en los páramos y zonas montañosas, donde utiliza las corrientes térmicas para volar sin esfuerzo durante largas distancias. El cóndor está actualmente en peligro de extinción debido a la pérdida de su hábitat y a la caza ilegal, ya que se le ha considerado, erróneamente, una amenaza para el ganado. Sin embargo, los esfuerzos de conservación buscan proteger tanto su hábitat como educar a las comunidades locales sobre la importancia de esta especie emblemática.",
        images: ["../assets/img/fauna/condor/condor-1.webp", "../assets/img/fauna/condor/condor-2.jpg", "../assets/img/fauna/condor/condor-3.jpg"]
    },
    paujil: {
        name: "Paujil de Pico Azul",
        scientificName: "Crax alberti",
        description: "El paujil de pico azul es una especie críticamente amenazada que habita en los bosques de montaña de Colombia. Esta ave de gran tamaño se distingue por su vistoso pico azul y su plumaje negro brillante. Es una especie rara y extremadamente vulnerable debido a la destrucción de los bosques, la fragmentación de su hábitat y la caza. El paujil de pico azul es esencial para los ecosistemas donde vive, ya que ayuda en la dispersión de semillas grandes, contribuyendo a la regeneración del bosque. A pesar de su estado crítico, los esfuerzos de conservación han comenzado a enfocarse en la protección de su hábitat natural y en campañas de concienciación en las comunidades locales para reducir la caza.",
        images: ["../assets/img/fauna/paujil/paujil-1.jpg", "../assets/img/fauna/paujil/paujil-2.jpg", "../assets/img/fauna/paujil/paujil-3.webp"]
    },
    rana: {
        name: "Rana de Cristal",
        scientificName: "Hyalinobatrachium aureoguttatum",
        description: "Una rana transparente, endémica de Colombia, que habita en los cuerpos de agua y bosques húmedos...",
        images: ["/img/rana-cristal-1.jpg", "/img/rana-cristal-2.jpg", "/img/rana-cristal-3.jpg"]
    },
    trucha: {
        name: "Trucha Arcoíris",
        scientificName: "Oncorhynchus mykiss",
        description: "Especie introducida en los cuerpos de agua de la región, importante en la pesca deportiva...",
        images: ["/img/trucha-1.jpg", "/img/trucha-2.jpg", "/img/trucha-3.jpg"]
    }
};

let currentImageIndex = 0;
let currentSpecies = '';
let imageChangeInterval;

function abrirModal(species) {
    const modal = document.getElementById('modal-carrusel');
    const speciesInfo = speciesData[species];

    currentSpecies = species;
    currentImageIndex = 0;

    document.getElementById('species-name').textContent = speciesInfo.name;
    document.getElementById('species-scientific-name').textContent = speciesInfo.scientificName;
    document.getElementById('species-description').textContent = speciesInfo.description;
    document.getElementById('carousel-img').src = speciesInfo.images[currentImageIndex];

    setTimeout(() => {
        const descriptionContainer = document.querySelector('.description-container');
        if (descriptionContainer) {
            descriptionContainer.scrollTop = 0;
            console.log('Scroll reset: ', descriptionContainer.scrollTop);
        }
    }, 0);

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'
    startImageCarousel(speciesInfo.images.length);
}

function startImageCarousel(imageCount) {
    clearInterval(imageChangeInterval);

    imageChangeInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % imageCount;
        document.getElementById('carousel-img').src = speciesData[currentSpecies].images[currentImageIndex]; 
    }, 3000);
}

function cerrarModal() {
    const modal = document.getElementById('modal-carrusel');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'
    clearInterval(imageChangeInterval);
}

document.addEventListener('keydown', (Event)=> {
    if (Event.key === 'Escape') {
        cerrarModal();
    }
});

window.onload = function() {
    cerrarModal();
};