from flask import Flask, jsonify, render_template_string, send_from_directory
import random
import os

app = Flask(__name__)

# Cargar el HTML
with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

@app.route('/')
def home():
    return render_template_string(html)

# 👇 NUEVO: Rutas para servir tus archivos CSS y JS
@app.route('/<path:filename>')
def serve_static_files(filename):
    return send_from_directory(os.getcwd(), filename)

@app.route('/data')
def get_data():
    """Genera valores aleatorios simulando los sensores"""
    data = {
        "temperature": round(random.uniform(20.0, 35.0), 2),
        "humidity": round(random.uniform(40.0, 80.0), 2),
        "air_quality": round(random.uniform(100, 400), 2)
    }
    return jsonify(data)

if __name__ == '__main__':
    print("✅ FarruSense corriendo en http://127.0.0.1:5000")
    app.run(debug=True, host='0.0.0.0')
