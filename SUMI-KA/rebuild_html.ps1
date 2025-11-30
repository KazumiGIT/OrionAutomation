$content = @'
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sumi-Ka • Authentic Japanese Yakitori • SS15 Subang Jaya</title>
    <meta name="description"
        content="Experience authentic Japanese yakitori at Sumi-Ka in SS15, Subang Jaya. Small, cozy izakaya run by Japanese chefs. Rated 4.6 stars. Reservations recommended.">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;600;700&family=Noto+Serif+JP:wght@400;700;900&display=swap"
        rel="stylesheet">

    <!-- Stylesheet -->
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <!-- Header/Navigation -->
    <header class="header">
        <nav class="nav container">
            <div class="logo">炭火 Sumi-Ka</div>
            <ul class="nav-links" id="navLinks">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#menu">Menu</a></li>
                <li><a href="#hours">Hours</a></li>
                <li><a href="#reviews">Reviews</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div class="mobile-toggle" id="mobileToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    </header>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <!-- Animated Skewers -->
        <div class="skewer skewer-left skewer-1"></div>
        <div class="skewer skewer-right skewer-2"></div>
        <div class="skewer skewer-left skewer-3"></div>
        <div class="skewer skewer-right skewer-4"></div>
        
        <div class="hero-content container">
            <p class="hero-subtitle">Authentic Japanese Cuisine</p>
            <h1 class="hero-title">炭火 Sumi-Ka</h1>
            <p class="hero-tagline">Traditional Yakitori Experience in the Heart of Subang Jaya</p>
            <div class="hero-rating">
                <span class="stars">★★★★★</span>
                <span>4.6 (611 Reviews)</span>
            </div>
            <a href="#contact" class="cta-button">Make a Reservation</a>
        </div>
    </section>
'@

# Write to temp file
$content | Out-File -FilePath "index_part1.txt" -Encoding UTF8 -NoNewline
