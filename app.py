from flask import Flask, render_template, send_from_directory, request, jsonify#Importamos tres componentes esenciales de Flask:
import csv # Importa el módulo csv para trabajar con archivos CSV
import json #Inporta el módulo json para trabajar con archivos JSON
import pandas as pd
import plotly.express as px
import os
app=Flask(__name__, template_folder="pages") #Crea una instancia Flask y la asigna a la variable app. __name__ indica el módulo actual.

@app.route('/styles/<path:filename>')
def styles(filename):
    return send_from_directory('styles', filename)

@app.route('/js/<path:filename>')
def javascript(filename): 
    return send_from_directory('js', filename)

@app.route('/assets/img/<path:filename>')
def images(filename):
    return send_from_directory('assets/img', filename)

@app.route('/especies')
def obtener_especies():
    archivo_json= os.path.join('assets', 'json', 'especies_invasoras_boyaca.json')

    try:
        with open(archivo_json, 'r', encoding='utf-8') as f:
            especies_data = json.load(f)
        return jsonify(especies_data)
    except FileNotFoundError:
        return jsonify({"error": "Archivo no encontrado"}), 404

@app.route("/") #Asocia la función index con la URL raíz (/) de la aplicación
def index(): #Define la función index que maneja la solicitud de la página principal.
    return render_template("index.html") #Renderiza la plantilla HTML "index.html".

@app.route("/flora")
def flora():
    return render_template('flora.html')

@app.route("/fauna")
def fauna():
    return render_template('fauna.html')

@app.route("/ecosistemas")
def ecosistemas():
    return render_template('ecosistemas.html')

@app.route("/especies-invasoras")
def especies_invasoras():
    return render_template('especies-invasoras.html')

@app.route("/datos")
def datos():
    # 1. Cargar los CSV desde la carpeta 'assets/csv'
    boyaca_df = pd.read_csv('assets/csv/boyaca.csv')
    cundinamarca_df = pd.read_csv('assets/csv/cundinamarca.csv')

    # 2. Combinar los dos DataFrames en uno solo
    df = pd.concat([boyaca_df, cundinamarca_df], ignore_index=True)

    # 3. Eliminar datos duplicados
    df = df.drop_duplicates()

    # 4. Agrupar por la columna 'reino' y contar las ocurrencias
    df_grouped = df.groupby('Reino').size().reset_index(name='Count')

    # 5. Crear el gráfico de barras interactivo con Plotly
    bar_fig = px.bar(df_grouped, x='Reino', y='Count', title="Número de Ocurrencias por Reino", labels={'Reino': 'Reino', 'Count': 'Número de Ocurrencias'})

    # 6. Crear el gráfico circular interactivo con Plotly
    pie_fig = px.pie(df_grouped, names='Reino', values='Count', title='Distribución de Reinos')

    # 7. Convertir los gráficos a HTML para insertarlos en la plantilla
    bar_html = bar_fig.to_html(full_html=False)
    pie_html = pie_fig.to_html(full_html=False)
    
    # 8. Guardar el DataFrame combinado en un nuevo archivo CSV en la misma carpeta
    df_grouped.to_csv('assets/csv/especies_combinadas.csv', index=False)

    # 9. Pasar los datos y las gráficas a la plantilla HTML
    return render_template('datos.html', bar_html=bar_html, pie_html=pie_html)

if __name__ == '__main__':
    app.debug=True
    app.run()          