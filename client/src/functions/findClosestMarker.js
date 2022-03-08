const rad = (x) => {
    return x * Math.PI / 180;
}

const findClosestMarker = (lat, lng, markers) => {
    const R = 6371; // radius of earth in km
    var distances = [];
    var closest = -1;
    for (var i = 0; i < markers.length; i++) {
        var mlat = markers[i].latitude;
        var mlng = markers[i].longitude;
        var dLat = rad(mlat - lat);
        var dLong = rad(mlng - lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        distances[i] = d;
        if (closest == -1 || d < distances[closest]) {
            closest = i;
        }
    }

    return markers[closest];
}

export default findClosestMarker;