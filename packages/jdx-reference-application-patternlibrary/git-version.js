#!/usr/bin/env node

const shell = require('shelljs');

if (! shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

const semver = require('semver');

function getCurrentVersionTag() {
  const currentTags = shell.exec("git tag --points-at HEAD", {silent: true})
    .split("\n")
    .filter(x => x.length > 0);

  return currentTags.find(semver.valid);
}

if (process.argv.indexOf("--next-major") >= 0 || process.argv.indexOf("--next-minor") >= 0 || process.argv.indexOf("--next-patch") >= 0) {
  let versionTag = getCurrentVersionTag();
  let tagOption = (process.argv.indexOf("--tag") >= 0);
  let pushOption = (process.argv.indexOf("--push") >= 0);

  if (versionTag && !tagOption && !pushOption) {
    console.error("This commit is already tagged: " + getCurrentVersionTag());
    process.exit(1);
  }

  if (! versionTag) {
    console.info("Fetching remote  tags...");
    shell.exec("git fetch --tags", {silent: false});

    const versionTags = shell.exec("git tag", {silent: true})
      .split("\n")
      .filter(semver.valid)
      .sort(semver.rcompare)
    ;

    const versionParts = (versionTags[0] || "v0.0.0")
      .replace(/^v/, "") // Chop off the "v"
      .split(".") // Split into parts
      .map(n => parseInt(n)) // Numberify
    ;

    if (process.argv.indexOf("--next-major") >= 0) {
      versionParts[0] ++;
      versionParts[1] = 0;
      versionParts[2] = 0;
    } else if (process.argv.indexOf("--next-minor") >= 0) {
      versionParts[1] ++;
      versionParts[2] = 0;
    } else if (process.argv.indexOf("--next-patch") >= 0) {
      versionParts[2] ++;
    }

    versionTag = "v" + versionParts.join(".");
    console.info(versionTag);
  }

  if (tagOption) {
    shell.exec("git tag " + versionTag, {silent: false});
    console.info("Tagged commit: " + versionTag);
  }

  if (pushOption) {
    shell.exec("git push", {silent: false});
    shell.exec("git push origin " + versionTag, {silent: false});

    console.info("Pushed tag: " + versionTag)
  }
} else if(process.argv.indexOf("--current") >= 0) {
  const currentVersionTag = getCurrentVersionTag();

  if (currentVersionTag) {
    console.info(currentVersionTag.replace(/^v/, ""));
  } else {
    process.exit(1)
  }
} else {
  console.info("Usage: node git-version.js [OPTIONS]");
  console.info("\t--current\tPrints the current semver version based on git tags, or 0.0.0 if no tag points at this commit");
  console.info("\t--next-major\tPrints the tag name of the next major version");
  console.info("\t--next-minor\tPrints the tag name of the next minor version");
  console.info("\t--next-patch\tPrints the tag name of the next patch version");
  console.info("\t--tag\tTags the current commit with the printed version");
  console.info("\t--push\tWhen used with --tag, pushes the current commit and any tags to the remote repository");
}