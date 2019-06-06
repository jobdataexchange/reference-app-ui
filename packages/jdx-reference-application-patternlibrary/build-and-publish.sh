#!/usr/bin/env sh

S3_URL=s3://patternlibrary.csky.ws/jdx-patternlibrary

# Executes a Continuous Integration build.
# 1. Builds the pattern library
# 2. Publishes the NPM artifact IF:
#    - There is a semver tag pointed at this commit AND
#    - That version isn't already published
# 3. Publishes the pattern library to AWS

function awsPublish() {
    echo "Publishing to AWS..."
    pushd patternlibrary/ || exit 1
    aws s3 sync . $S3_URL --delete || exit 1
    popd
}

npm install || exit 1

if ./git-version.js --current; then
    GIT_REPO_VERSION=$(./git-version.js --current)
    LATEST_ARTIFACT_VERSION=$(npm view $NPM_PROJECT version)

    # Update package.json with the version from git
    node node_modules/json/lib/json.js -I -f package.json -e 'this.version="'$GIT_REPO_VERSION'"' || exit 1

    if [ "$GIT_REPO_VERSION" -eq "$LATEST_ARTIFACT_VERSION" ]; then
      echo "Skipping NPM publication; version $GIT_REPO_VERSION has already been published"
    else
      echo "Publishing version $GIT_REPO_VERSION to NPM"
      npm publish || exit 1
    fi

    npm run build || exit 1
    awsPublish || exit 1

    # Restore the old package.json
    git checkout -- package.json
else
    echo "Skipping NPM publication; no version tag present"
    npm run build || exit 1
    awsPublish || exit 1
fi