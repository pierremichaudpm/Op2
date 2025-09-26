#!/bin/bash

# Installation des outils d'optimisation si nécessaire
echo "Installation des outils d'optimisation d'images..."

# Vérifier si les outils sont installés
if ! command -v convert &> /dev/null; then
    echo "Installation d'ImageMagick..."
    sudo apt-get update && sudo apt-get install -y imagemagick
fi

if ! command -v pngquant &> /dev/null; then
    echo "Installation de pngquant..."
    sudo apt-get install -y pngquant
fi

if ! command -v jpegoptim &> /dev/null; then
    echo "Installation de jpegoptim..."
    sudo apt-get install -y jpegoptim
fi

echo "Optimisation des images en cours..."

# Créer un dossier de sauvegarde
mkdir -p public/images/backup

# Optimiser les PNG
echo "Optimisation des fichiers PNG..."
find public/images -name "*.png" -type f | while read file; do
    # Sauvegarde
    cp "$file" "public/images/backup/$(basename "$file")"
    
    # Réduire la taille si l'image est trop grande
    width=$(identify -format "%w" "$file")
    height=$(identify -format "%h" "$file")
    
    if [ "$width" -gt 2000 ] || [ "$height" -gt 2000 ]; then
        echo "Redimensionnement de $file..."
        convert "$file" -resize "2000x2000>" "$file"
    fi
    
    # Optimisation avec pngquant
    pngquant --force --quality=85-95 --skip-if-larger --output "$file" "$file" || true
done

# Optimiser les JPG/JPEG
echo "Optimisation des fichiers JPG/JPEG..."
find public/images -name "*.jpg" -o -name "*.jpeg" -type f | while read file; do
    # Sauvegarde
    cp "$file" "public/images/backup/$(basename "$file")"
    
    # Réduire la taille si l'image est trop grande
    width=$(identify -format "%w" "$file")
    height=$(identify -format "%h" "$file")
    
    if [ "$width" -gt 2000 ] || [ "$height" -gt 2000 ]; then
        echo "Redimensionnement de $file..."
        convert "$file" -resize "2000x2000>" -quality 90 "$file"
    else
        # Optimisation avec jpegoptim
        jpegoptim --max=90 "$file"
    fi
done

echo "Optimisation terminée !"

# Afficher les tailles avant/après
echo ""
echo "Comparaison des tailles:"
echo "Avant: $(du -sh public/images/backup | cut -f1)"
echo "Après: $(du -sh public/images --exclude=backup | cut -f1)"