def calculate_density(vehicle_count):
    """
    Converts a raw vehicle count into a simple traffic density label.

    These thresholds are a simplified mini-project approximation,
    not based on real traffic-engineering standards.
    """
    if vehicle_count <= 5:
        return "Low"
    elif vehicle_count <= 15:
        return "Medium"
    else:
        return "High"


# Quick manual test when this file is run directly
if __name__ == "__main__":
    test_counts = [0, 3, 5, 6, 10, 15, 16, 25]

    for count in test_counts:
        print(f"{count} vehicles -> {calculate_density(count)}")