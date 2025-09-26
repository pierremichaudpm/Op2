#!/bin/bash

echo "🖼️ Optimisation des images..."

# Installer les outils si nécessaire
if ! command -v convert &> /dev/null; then
    echo "Installation d'ImageMagick..."
    sudo apt-get update && sudo apt-get install -y imagemagick
fi

# Créer un dossier de backup
mkdir -p public/images/backup

# Fonction pour optimiser une image
optimize_image() {
    local file=$1
    local max_width=$2
    local quality=$3
    
    # Backup
    cp "$file" "public/images/backup/$(basename $file)"
    
    # Optimiser
    convert "$file" \
        -resize "${max_width}x>" \
        -quality "$quality" \
        -strip \
        "$file"
    
    echo "✓ Optimisé: $file"
}

# Optimiser les plus grosses images
echo "Optimisation de slider-1.png (2.4MB)..."
optimize_image "public/images/slider-1.png" 1920 85

echo "Optimisation de expertise.png (950KB)..."
optimize_image "public/images/world-expertise/expertise.png" 1200 85

echo "Optimisation des images de réalisations..."
for img in public/images/nos_realisations/*.png; do
    size=$(stat -c%s "$img")
    if [ $size -gt 300000 ]; then  # Si plus de 300KB
        optimize_image "$img" 1200 85
    fi
done

echo "Optimisation des images d'experts..."
for img in public/images/experts/*.png; do
    optimize_image "$img" 600 90
done

echo "Optimisation des autres grandes images..."
optimize_image "public/images/image-collee.png" 1200 85
optimize_image "public/images/image-8.png" 1000 85
optimize_image "public/images/image-7.png" 1000 85
optimize_image "public/images/image-9.png" 1000 85
optimize_image "public/images/rectangle-2.png" 800 85

echo "✅ Optimisation terminée!"
echo "📊 Nouvelles tailles:"
ls -lh public/images/*.png public/images/*/*.png | grep -E "(slider-1|expertise|image-[0-9]|rectangle)" | head -10
