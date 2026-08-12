# Simple rule-based mapping from density -> signal decision.
# This is intentionally basic: a real traffic-engineering system would
# also weigh multiple directions, pedestrian timing, and historical data.
SIGNAL_RULES = {
    "Low":    {"signal": "Green", "duration": 15},
    "Medium": {"signal": "Green", "duration": 30},
    "High":   {"signal": "Green", "duration": 45},
}


def get_signal_decision(density):
    """
    Takes a density label ("Low"/"Medium"/"High") and returns a dict
    with the recommended signal status and green-light duration in seconds.
    """
    return SIGNAL_RULES.get(density, {"signal": "Green", "duration": 20})


# Quick manual test when this file is run directly
if __name__ == "__main__":
    for level in ["Low", "Medium", "High"]:
        print(f"{level} density -> {get_signal_decision(level)}")