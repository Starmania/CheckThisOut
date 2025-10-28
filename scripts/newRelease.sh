VERSION=`jq -r '.version' manifest.json`
git tag -a "v$VERSION" -m "Release version $VERSION"
git push origin "v$VERSION"

if [ -e "CheckThisOut_$VERSION.zip" ]; then
    rm "CheckThisOut_$VERSION.zip"
fi

zip -r "CheckThisOut_$VERSION.zip" . -x "*.git*" "*.DS_Store" "scripts/*"
echo "Created CheckThisOut_$VERSION.zip"

