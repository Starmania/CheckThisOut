VERSION=`jq -r '.version' manifest.json`

if [ -z "$VERSION" ]; then
    echo "Error: Could not determine version from manifest.json"
    exit 1
fi

git tag -a "v$VERSION" -m "Release version $VERSION"
git push origin "v$VERSION"

echo "Version $VERSION tagged and pushed."

$(dirname "$0")/newBuild.sh
