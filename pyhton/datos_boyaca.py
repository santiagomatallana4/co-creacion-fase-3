import os
import requests
from bs4 import BeautifulSoup
import json

# URL de la página
url = "https://www.corpoboyaca.gov.co/noticias/conozca-las-seis-especies-invasoras-que-estan-ahogando-ecosistemas-estrategicos-en-boyaca/"

# Realizar la solicitud
response = requests.get(url, verify=False)
soup = BeautifulSoup(response.text, 'html.parser')

# Lista para almacenar datos de las especies
especies_data = []

# Buscar todos los elementos <strong> y verificar el patrón exacto
for nombre_comun in soup.find_all('strong'):
    # Verificar si el siguiente elemento en el árbol es <em> y luego <p>
    nombre_cientifico = nombre_comun.find_next('em')
    descripcion = nombre_cientifico.find_next('p') if nombre_cientifico else None

    # Validar si los tres elementos existen y cumplen condiciones específicas
    if nombre_comun and nombre_cientifico and descripcion:
        especie_info = {
            "Especie": nombre_comun.get_text(strip=True),
            "Nombre científico": nombre_cientifico.get_text(strip=True),
            "Descripción": descripcion.get_text(strip=True)
        }
        # Filtros adicionales para excluir entradas irrelevantes
        if "Retamo" in especie_info["Especie"] or "Ojo de poeta" in especie_info["Especie"] or "Caracol" in especie_info["Especie"] or "Cangrejo" in especie_info["Especie"] or "Buchón" in especie_info["Especie"]:
            especies_data.append(especie_info)

# Directorio donde deseas guardar el archivo
directorio = 'assets/json'  # Ruta relativa a la raíz del proyecto

# Verificar si el directorio existe, si no, lo crea
if not os.path.exists(directorio):
    os.makedirs(directorio)

# Ruta completa para el archivo JSON
archivo_json = os.path.join(directorio, "especies_invasoras_boyaca.json")

# Guardar datos en el archivo JSON
with open(archivo_json, "w", encoding="utf-8") as f:
    json.dump(especies_data, f, ensure_ascii=False, indent=4)

print(f"Datos guardados en {archivo_json}")
