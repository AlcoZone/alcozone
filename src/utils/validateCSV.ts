export function validateCSV(content: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    const requiredHeaders = [
        "Fecha",
        "Hora",
        "Tipo",
        "SubTipo",
        "Reportado Por",
        "Alcaldia",
        "Colonia",
        "Latitud",
        "Longitud",
    ];

    const allowedAlcaldias = [
        "Álvaro Obregón",
        "Azcapotzalco",
        "Benito Juárez",
        "Coyoacán",
        "Cuajimalpa de Morelos",
        "Cuauhtémoc",
        "Gustavo A. Madero",
        "Iztacalco",
        "Iztapalapa",
        "La Magdalena Contreras",
        "Magdalena Contreras",
        "Miguel Hidalgo",
        "Milpa Alta",
        "Tláhuac",
        "Tlalpan",
        "Venustiano Carranza",
        "Xochimilco",
    ];

    const normalize = (str: string) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

    const normalizedAlcaldias = allowedAlcaldias.map(normalize);

    const lines = content.trim().split(/\r?\n/);
    if (lines.length === 0) {
        return {
            valid: false,
            errors: ["El archivo CSV está vacío o no contiene encabezados."],
        };
    }

    const headers = lines[0].split(",").map((h) => h.trim());
    const missing = requiredHeaders.filter((h) => !headers.includes(h));
    const extra = headers.filter((h) => !requiredHeaders.includes(h));

    if (missing.length > 0) {
        errors.push(`Faltan los siguientes encabezados: ${missing.join(", ")}`);
    }

    if (extra.length > 0) {
        errors.push(`Encabezados no esperados: ${extra.join(", ")}`);
    }

    const alcaldiaIndex = headers.indexOf("Alcaldia");
    const latIndex = headers.indexOf("Latitud");
    const lonIndex = headers.indexOf("Longitud");

    if (errors.length === 0) {
        // Alcaldías inválidas
        const invalidAlcaldias = new Set<string>();

        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(",");

            if (row.length !== headers.length) continue;

            // Alcaldía
            const alcaldiaRaw = row[alcaldiaIndex];
            const alcaldiaNorm = normalize(alcaldiaRaw);
            if (!normalizedAlcaldias.includes(alcaldiaNorm)) {
                invalidAlcaldias.add(alcaldiaRaw.trim());
            }
        }

        if (invalidAlcaldias.size > 0) {
            errors.push(
                `Se encontraron alcaldías inválidas: ${[...invalidAlcaldias].join(", ")}`
            );
        }

        // Coordenadas fuera de CDMX
        const invalidCoords: number[] = [];

        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(",");

            if (row.length !== headers.length) continue;

            const lat = parseFloat(row[latIndex]);
            const lon = parseFloat(row[lonIndex]);

            const latOk = lat >= 19.0 && lat <= 19.9;
            const lonOk = lon >= -99.5 && lon <= -98.9;

            if (isNaN(lat) || isNaN(lon) || !latOk || !lonOk) {
                invalidCoords.push(i + 1);
            }
        }

        if (invalidCoords.length > 0) {
            errors.push(
                `Se encontraron coordenadas fuera de la CDMX en las líneas: ${invalidCoords.join(
                    ", "
                )}`
            );
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}
