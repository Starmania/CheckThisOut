#!/bin/bash

# This script generates downscaled icons from a source icon.png file.

CURRENT_DIR=$(dirname "$0")
WORKSPACE_DIR=$(realpath "$CURRENT_DIR/..")
ICON_SRC="$WORKSPACE_DIR/icon.png"
ICON_DIR="$WORKSPACE_DIR/icons"

mkdir -p "$ICON_DIR"
sizes=(16 32 48 128)
for size in "${sizes[@]}"; do
    convert "$ICON_SRC" -resize "${size}x${size}" "$ICON_DIR/icon${size}.png"
done

echo "Icons generated."
