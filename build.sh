#!/bin/bash
# Sinowealth Distributor Website Build Script

echo "Sinowealth Distributor Website Build Process"
echo "============================================"

echo "Validating project structure..."

# Check if required directories exist
dirs=("css" "js" "images" "images/svg" "products" "solutions" "support" "news")
for dir in "${dirs[@]}"; do
  if [ ! -d "$dir" ]; then
    echo "Creating directory: $dir"
    mkdir -p "$dir"
  fi
done

# Check if main files exist
files=("index.html" "about.html" "contact.html" "faq.html" "privacy-policy.html" "terms.html" "404.html")
for file in "${files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "Error: Required file $file is missing!"
    exit 1
  fi
done

echo "Checking product subdirectories..."
subdirs=("mcu-8bit" "mcu-32bit" "bms" "display-drivers")
for subdir in "${subdirs[@]}"; do
  if [ ! -d "products/$subdir" ]; then
    echo "Creating product directory: products/$subdir"
    mkdir -p "products/$subdir"
  fi
done

echo "Checking solution subdirectories..."
subdirs=("ebike-bms" "refrigerator-control" "smart-appliance" "vacuum-motor-control")
for subdir in "${subdirs[@]}"; do
  if [ ! -d "solutions/$subdir" ]; then
    echo "Creating solution directory: solutions/$subdir"
    mkdir -p "solutions/$subdir"
  fi
done

echo "Checking support subdirectories..."
subdirs=("selection-guides" "app-notes" "ide-setup")
for subdir in "${subdirs[@]}"; do
  if [ ! -d "support/$subdir" ]; then
    echo "Creating support directory: support/$subdir"
    mkdir -p "support/$subdir"
  fi
done

echo ""
echo "Build validation completed successfully!"
echo ""
echo "Project structure is ready for deployment."
echo ""
echo "To serve locally, you can use:"
echo "  python -m http.server 8000"
echo "  or"
echo "  npx serve ."
echo ""