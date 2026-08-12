from flask import Flask, jsonify
from flask_cors import CORS

from detector import detect_vehicles
from density import calculate_density
from signal_control import get_signal_decision

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "Smart Traffic Management backend is running."


@app.route("/api/ping")
def ping():
    return jsonify({"status": "ok", "message": "pong"})


@app.route("/api/traffic-status")
def traffic_status():
    # For now, we always analyze the same sample image.
    # Later (Phase 7/8) this could come from a live camera or an upload —
    # that's a future enhancement, not required for the core mini project.
    image_path = "sample_media/traffic1.jpeg"

    detections = detect_vehicles(image_path)
    vehicle_count = len(detections)
    density = calculate_density(vehicle_count)
    signal_decision = get_signal_decision(density)

    return jsonify({
        "vehicle_count": vehicle_count,
        "density": density,
        "signal": signal_decision["signal"],
        "duration": signal_decision["duration"],
        "detections": detections
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)