VERSION=`jq -r '.version' manifest.json`

if [ -z "$VERSION" ]; then
    echo "Error: Could not determine version from manifest.json"
    exit 1
fi

if [ -e "CheckThisOut_$VERSION.zip" ]; then
    rm "CheckThisOut_$VERSION.zip"
fi

zip -r "CheckThisOut_$VERSION.zip" . -x "*.git*" "*.DS_Store" "scripts/*"

echo "Created CheckThisOut_$VERSION.zip"
