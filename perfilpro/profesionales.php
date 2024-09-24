<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "barberia";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener el ID del profesional (puede ser dinámico)
$profesional_id = 1; // Cambia este valor dinámicamente según sea necesario

// Consulta para obtener los datos del profesional
$sql_profesional = "SELECT * FROM profesionales WHERE id = $profesional_id";
$result_profesional = $conn->query($sql_profesional);

// Consulta para obtener los servicios del profesional
$sql_services = "SELECT servicios.* 
                 FROM servicios 
                 JOIN profesional_servicio ON servicios.id = profesional_servicio.servicio_id 
                 WHERE profesional_servicio.profesional_id = $profesional_id";

$result_services = $conn->query($sql_services);

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil del Profesional</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="style1.css">
</head>
<body>

    <div class="container">
        <div class="profile-header d-flex align-items-center">
            <?php if ($result_profesional->num_rows > 0) : ?>
                <?php while($row = $result_profesional->fetch_assoc()) : ?>
                    <!-- Imagen del profesional -->
                    <img id="professional-image" src="peluqueros/<?php echo $row['id']; ?>.jpg" alt="Profesional" class="me-3 rounded-circle" style="width: 150px; height: 150px;">
                    <div>
                        <!-- Nombre del profesional -->
                        <h1 id="professional-name"><?php echo $row['nombre']; ?></h1>
                        <h2><?php echo $row['especialidad']; ?></h2>
                    </div>
                <?php endwhile; ?>
            <?php else : ?>
                <p>No se encontró información sobre el profesional.</p>
            <?php endif; ?>
        </div>

        <!-- Servicios -->
        <div class="services mt-4">
            <h3>Servicios</h3>
            <?php if ($result_services->num_rows > 0) : ?>
                <?php while($row = $result_services->fetch_assoc()) : ?>
                    <div class="service-item d-flex justify-content-between align-items-center p-2 mb-2 bg-light border rounded">
                        <span><?php echo $row['nombre']; ?></span>
                        <span class="price">desde $<?php echo number_format($row['precio'], 2); ?></span>
                        <span class="arrow" onclick="showScheduleCard()">→</span>
                    </div>
                <?php endwhile; ?>
            <?php else : ?>
                <p>Este profesional no ofrece servicios actualmente.</p>
            <?php endif; ?>
        </div>
    </div>

    <!-- Contenedor de selección de horario -->
    <div id="selectScheduleCard" class="card">
        <div class="card-body">
            <div class="header d-flex justify-content-between align-items-center">
                <h2 class="card-title">Elegir horario</h2>
                <span class="close" onclick="closeScheduleCard()">&times;</span>
            </div>
            <p class="card-text">Cambio de esmalte · Aprox. 30 minutos · desde $7500</p>
            
            <div class="d-flex align-items-center mb-3">
                <img src="peluqueros/1.jpg" alt="Adriana" class="rounded-circle me-2">
                <div>
                    <p class="mb-0">Adriana</p>
                </div>
            </div>

            <div class="dates-container d-flex mb-3">
                <div class="date-card selected">
                    <p class="mb-0">9</p>
                    <small>Septiembre</small>
                </div>
                <div class="date-card">
                    <p class="mb-0">11</p>
                    <small>Septiembre</small>
                </div>
                <div class="date-card">
                    <p class="mb-0">12</p>
                    <small>Septiembre</small>
                </div>
                <div class="date-card">
                    <p class="mb-0">13</p>
                    <small>Septiembre</small>
                </div>
            </div>

            <div class="d-flex align-items-center justify-content-between mb-3">
                <p class="mb-0"><i class="fas fa-clock"></i> 08:00</p>
            </div>

            <button id="continueBtn" class="btn btn-gradient w-100">
                Continuar <i class="fas fa-arrow-right"></i>
                <span id="loadingBar"></span>
            </button>
        </div>
    </div>

    <!-- Scripts -->
    <script src="script1.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

<?php
$conn->close();
?>